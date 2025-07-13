import { create } from 'zustand';

const useParticipantStore = create((set, get) => ({
  // Availability status
  availabilityStatus: 'available', // 'available' or 'busy'
  setAvailabilityStatus: (status) => set({ availabilityStatus: status }),
  
  // Participant focus groups
  invitations: [],
  activeGroups: [],
  completedGroups: [],
  
  // Warning system
  warnings: 0,
  warningHistory: [],
  addWarning: (reason) => {
    const warning = {
      id: Date.now(),
      reason,
      date: new Date().toISOString(),
      read: false
    };
    
    set(state => ({
      warnings: state.warnings + 1,
      warningHistory: [warning, ...state.warningHistory]
    }));
    
    // If 3 or more warnings, automatically mark as busy
    if (get().warnings >= 3) {
      set({ availabilityStatus: 'busy' });
    }
  },
  
  markWarningRead: (warningId) => {
    set(state => ({
      warningHistory: state.warningHistory.map(warning => 
        warning.id === warningId ? { ...warning, read: true } : warning
      )
    }));
  },
  
  // Response handling
  respondToInvitation: (invitationId, response) => {
    set(state => ({
      invitations: state.invitations.map(inv => 
        inv.id === invitationId 
          ? { ...inv, status: response, respondedAt: new Date().toISOString() } 
          : inv
      )
    }));
  },
  
  // Load participant data
  loadInvitations: async () => {
    // In a real app, this would call an API
    // For demo purposes, we'll just set some mock data
    set({
      invitations: [
        {
          id: 'inv-1',
          focusGroupId: '1',
          title: 'Movie Trailer Feedback',
          client: 'Universal Studios',
          reward: '$50',
          sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
          status: 'pending'
        },
        {
          id: 'inv-2',
          focusGroupId: '2',
          title: 'Mobile App Testing',
          client: 'TechStart Inc',
          reward: '$35',
          sentAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
          status: 'pending'
        },
        {
          id: 'inv-3',
          focusGroupId: '3',
          title: 'Book Cover Feedback',
          client: 'Penguin Books',
          reward: '$25',
          sentAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
          status: 'pending'
        }
      ]
    });
  }
}));

export default useParticipantStore;