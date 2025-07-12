import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as authAPI from '../api/auth';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      userRole: null,
      loading: false,
      
      // Set user from auth response
      setUser: (user) => set({
        user,
        isAuthenticated: !!user,
        userRole: user?.role || null
      }),
      
      // Toggle loading state
      setLoading: (loading) => set({ loading }),
      
      // Check if user session exists on app load
      initialize: async () => {
        try {
          set({ loading: true });
          const user = await authAPI.getCurrentUser();
          
          if (user) {
            set({
              user,
              isAuthenticated: true,
              userRole: user.role
            });
          }
        } catch (error) {
          console.error('Failed to initialize auth:', error);
        } finally {
          set({ loading: false });
        }
      },
      
      // Login user
      login: async (email, password) => {
        set({ loading: true });
        try {
          const { user } = await authAPI.signIn(email, password);
          set({
            user,
            isAuthenticated: true,
            userRole: user.role,
            loading: false
          });
          return user;
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },
      
      // Register user
      register: async (userData) => {
        set({ loading: true });
        try {
          const { user } = await authAPI.signUp(userData.email, userData.password, userData);
          set({
            user,
            isAuthenticated: true,
            userRole: user.role,
            loading: false
          });
          return user;
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },
      
      // Logout user
      logout: async () => {
        set({ loading: true });
        try {
          await authAPI.signOut();
          set({
            user: null,
            isAuthenticated: false,
            userRole: null,
            loading: false
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      }
    }),
    {
      name: 'fokushub-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated, userRole: state.userRole })
    }
  )
);

export default useAuthStore;