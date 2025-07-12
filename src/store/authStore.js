import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  userRole: null,
  loading: false,

  setUser: (user) => set({ 
    user, 
    isAuthenticated: !!user,
    userRole: user?.role || null 
  }),

  setLoading: (loading) => set({ loading }),

  logout: () => set({ 
    user: null, 
    isAuthenticated: false, 
    userRole: null 
  }),

  // Mock authentication functions
  login: async (email, password) => {
    set({ loading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data based on email
    let mockUser = {
      id: '1',
      email,
      name: 'John Doe',
      role: 'client'
    };

    if (email.includes('admin')) {
      mockUser.role = 'admin';
      mockUser.name = 'Admin User';
    } else if (email.includes('manager')) {
      mockUser.role = 'manager';
      mockUser.name = 'Manager User';
    } else if (email.includes('participant')) {
      mockUser.role = 'participant';
      mockUser.name = 'Participant User';
    }

    set({ 
      user: mockUser, 
      isAuthenticated: true, 
      userRole: mockUser.role,
      loading: false 
    });

    return mockUser;
  },

  register: async (userData) => {
    set({ loading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: Date.now().toString(),
      ...userData,
      role: userData.role || 'client'
    };

    set({ 
      user: mockUser, 
      isAuthenticated: true, 
      userRole: mockUser.role,
      loading: false 
    });

    return mockUser;
  }
}));

export default useAuthStore;