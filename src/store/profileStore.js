import { create } from 'zustand';
import * as profileAPI from '../api/profiles';

const useProfileStore = create((set, get) => ({
  profileDetails: {},
  completedCategories: [],
  currentCategory: null,
  isProfileComplete: false,
  loading: false,
  
  // Set loading state
  setLoading: (loading) => set({ loading }),
  
  // Set current category
  setCurrentCategory: (category) => set({ currentCategory: category }),
  
  // Check if profile setup is complete
  checkProfileCompletion: async (profileId) => {
    try {
      const isComplete = await profileAPI.isProfileSetupComplete(profileId);
      set({ isProfileComplete: isComplete });
      return isComplete;
    } catch (error) {
      console.error('Error checking profile completion:', error);
      return false;
    }
  },
  
  // Load all profile details
  loadProfileDetails: async (profileId) => {
    set({ loading: true });
    try {
      const data = await profileAPI.getProfileDetails(profileId);
      
      // Organize data by category and question ID
      const detailsByCategory = {};
      const completedCats = new Set();
      
      data.forEach(detail => {
        if (!detailsByCategory[detail.category]) {
          detailsByCategory[detail.category] = {};
        }
        detailsByCategory[detail.category][detail.question_id] = detail.answer;
        completedCats.add(detail.category);
      });
      
      set({
        profileDetails: detailsByCategory,
        completedCategories: [...completedCats],
        loading: false
      });
    } catch (error) {
      console.error('Error loading profile details:', error);
      set({ loading: false });
    }
  },
  
  // Save a single profile detail
  saveProfileDetail: async (profileId, category, questionId, answer) => {
    try {
      await profileAPI.saveProfileDetails(profileId, category, questionId, answer);
      
      // Update local state
      const updatedDetails = { ...get().profileDetails };
      if (!updatedDetails[category]) {
        updatedDetails[category] = {};
      }
      updatedDetails[category][questionId] = answer;
      
      // Update completed categories
      const completedCats = new Set(get().completedCategories);
      completedCats.add(category);
      
      set({
        profileDetails: updatedDetails,
        completedCategories: [...completedCats]
      });
      
      return true;
    } catch (error) {
      console.error('Error saving profile detail:', error);
      return false;
    }
  },
  
  // Save multiple profile details at once
  saveProfileDetailsBatch: async (profileId, category, answers) => {
    set({ loading: true });
    try {
      const detailsToSave = Object.entries(answers).map(([questionId, answer]) => ({
        category,
        questionId,
        answer
      }));
      
      await profileAPI.saveProfileDetailsBatch(profileId, detailsToSave);
      
      // Update local state
      const updatedDetails = { ...get().profileDetails };
      if (!updatedDetails[category]) {
        updatedDetails[category] = {};
      }
      
      Object.entries(answers).forEach(([questionId, answer]) => {
        updatedDetails[category][questionId] = answer;
      });
      
      // Update completed categories
      const completedCats = new Set(get().completedCategories);
      completedCats.add(category);
      
      set({
        profileDetails: updatedDetails,
        completedCategories: [...completedCats],
        loading: false
      });
      
      return true;
    } catch (error) {
      console.error('Error saving profile details batch:', error);
      set({ loading: false });
      return false;
    }
  }
}));

export default useProfileStore;