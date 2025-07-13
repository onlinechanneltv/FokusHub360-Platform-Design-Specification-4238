import { create } from 'zustand';
import * as focusGroupAPI from '../api/focusGroups';

const useFocusGroupStore = create((set, get) => ({
  focusGroups: [],
  currentGroup: null,
  loading: false,
  
  // Set loading state
  setLoading: (loading) => set({ loading }),
  
  // Set focus groups
  setFocusGroups: (groups) => set({ focusGroups: groups }),
  
  // Set current group
  setCurrentGroup: (group) => set({ currentGroup: group }),
  
  // Load focus groups for the current user
  loadFocusGroups: async () => {
    set({ loading: true });
    try {
      console.log("Loading focus groups...");
      const data = await focusGroupAPI.getFocusGroups();
      console.log("Loaded focus groups:", data);
      set({ focusGroups: data, loading: false });
    } catch (error) {
      console.error('Error loading focus groups:', error);
      set({ loading: false });
    }
  },
  
  // Load a specific focus group
  loadFocusGroup: async (groupId) => {
    set({ loading: true });
    try {
      const data = await focusGroupAPI.getFocusGroupById(groupId);
      set({ currentGroup: data, loading: false });
      return data;
    } catch (error) {
      console.error('Error loading focus group:', error);
      set({ loading: false });
      return null;
    }
  },
  
  // Create a new focus group
  createFocusGroup: async (groupData) => {
    set({ loading: true });
    try {
      console.log("Creating focus group from store:", groupData);
      const newGroup = await focusGroupAPI.createFocusGroup(groupData);
      console.log("New group created:", newGroup);
      
      // Add to local state
      set({
        focusGroups: [newGroup, ...get().focusGroups],
        loading: false
      });
      
      return newGroup;
    } catch (error) {
      console.error('Error in createFocusGroup store function:', error);
      set({ loading: false });
      throw error;
    }
  },
  
  // Update a focus group
  updateFocusGroup: async (groupId, updates) => {
    set({ loading: true });
    try {
      const updatedGroup = await focusGroupAPI.updateFocusGroup(groupId, updates);
      set({
        focusGroups: get().focusGroups.map(group =>
          group.id === groupId ? updatedGroup : group
        ),
        currentGroup: get().currentGroup?.id === groupId ? updatedGroup : get().currentGroup,
        loading: false
      });
      return updatedGroup;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  
  // Delete a focus group
  deleteFocusGroup: async (groupId) => {
    set({ loading: true });
    try {
      await focusGroupAPI.deleteFocusGroup(groupId);
      set({
        focusGroups: get().focusGroups.filter(group => group.id !== groupId),
        currentGroup: get().currentGroup?.id === groupId ? null : get().currentGroup,
        loading: false
      });
      return { success: true };
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  }
}));

export default useFocusGroupStore;