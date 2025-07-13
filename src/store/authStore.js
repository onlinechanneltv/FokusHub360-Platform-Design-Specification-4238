import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as authAPI from '../api/auth';

// Demo accounts for mock auth
const demoAccounts = [
  { 
    email: 'admin@demo.com', 
    password: 'demo123456', 
    role: 'admin', 
    name: 'Admin User',
    id: 'admin-demo-id'
  },
  { 
    email: 'manager@demo.com', 
    password: 'demo123456', 
    role: 'manager', 
    name: 'Manager User',
    id: 'manager-demo-id'
  },
  { 
    email: 'client@demo.com', 
    password: 'demo123456', 
    role: 'client', 
    name: 'Client User',
    id: 'client-demo-id'
  },
  { 
    email: 'participant@demo.com', 
    password: 'demo123456', 
    role: 'participant', 
    name: 'Participant User',
    id: 'participant-demo-id'
  }
];

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      userRole: null,
      loading: false,

      setUser: (user) => 
        set({
          user,
          isAuthenticated: !!user,
          userRole: user?.role || null
        }),

      setLoading: (loading) => set({ loading }),

      initialize: async () => {
        try {
          set({ loading: true });
          const storedUser = get().user;
          if (storedUser && storedUser.isDemoAccount) {
            set({ 
              user: storedUser,
              isAuthenticated: true,
              userRole: storedUser.role,
              loading: false 
            });
            return;
          }
          
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

      login: async (email, password) => {
        set({ loading: true });
        
        const demoAccount = demoAccounts.find(
          acc => acc.email === email && acc.password === password
        );
        
        if (demoAccount) {
          const user = {
            id: demoAccount.id,
            email: demoAccount.email,
            name: demoAccount.name,
            role: demoAccount.role,
            isDemoAccount: true
          };
          
          set({
            user,
            isAuthenticated: true,
            userRole: demoAccount.role,
            loading: false
          });
          
          return user;
        }
        
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

      logout: async () => {
        set({ loading: true });
        try {
          if (get().user?.isDemoAccount) {
            set({
              user: null,
              isAuthenticated: false,
              userRole: null,
              loading: false
            });
            return;
          }
          
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
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        userRole: state.userRole
      })
    }
  )
);

export default useAuthStore;