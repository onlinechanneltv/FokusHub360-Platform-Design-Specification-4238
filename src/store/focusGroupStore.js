import { create } from 'zustand';

const useFocusGroupStore = create((set, get) => ({
  focusGroups: [],
  currentGroup: null,
  loading: false,
  
  // Mock data
  mockGroups: [
    {
      id: '1',
      title: 'Movie Trailer Feedback - Action Thriller',
      status: 'active',
      participantCount: 45,
      targetCount: 50,
      createdAt: new Date('2024-01-15'),
      deadline: new Date('2024-01-25'),
      budget: 2500,
      type: 'video',
      client: 'Universal Studios',
      description: 'Get feedback on our upcoming action thriller trailer',
      rewards: { type: 'cash', amount: 50 }
    },
    {
      id: '2',
      title: 'App UI/UX Design Review',
      status: 'completed',
      participantCount: 30,
      targetCount: 30,
      createdAt: new Date('2024-01-10'),
      deadline: new Date('2024-01-20'),
      budget: 1500,
      type: 'design',
      client: 'TechStart Inc.',
      description: 'Review new mobile app interface designs',
      rewards: { type: 'gift_card', amount: 25 }
    },
    {
      id: '3',
      title: 'Book Cover Design Testing',
      status: 'draft',
      participantCount: 0,
      targetCount: 25,
      createdAt: new Date('2024-01-18'),
      deadline: new Date('2024-01-28'),
      budget: 1000,
      type: 'image',
      client: 'Penguin Random House',
      description: 'Test multiple book cover designs for new romance novel',
      rewards: { type: 'product', description: 'Free book copy + $20' }
    }
  ],

  setLoading: (loading) => set({ loading }),
  
  setFocusGroups: (groups) => set({ focusGroups: groups }),
  
  setCurrentGroup: (group) => set({ currentGroup: group }),

  loadFocusGroups: async () => {
    set({ loading: true });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    set({ focusGroups: get().mockGroups, loading: false });
  },

  createFocusGroup: async (groupData) => {
    set({ loading: true });
    
    const newGroup = {
      id: Date.now().toString(),
      ...groupData,
      status: 'draft',
      participantCount: 0,
      createdAt: new Date(),
    };

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedGroups = [...get().focusGroups, newGroup];
    set({ focusGroups: updatedGroups, loading: false });
    
    return newGroup;
  },

  updateFocusGroup: async (id, updates) => {
    set({ loading: true });
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedGroups = get().focusGroups.map(group => 
      group.id === id ? { ...group, ...updates } : group
    );
    
    set({ focusGroups: updatedGroups, loading: false });
  }
}));

export default useFocusGroupStore;