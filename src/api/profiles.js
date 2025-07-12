import supabase from '../lib/supabase';
import { toast } from 'react-hot-toast';

// Get profile by ID
export const getProfile = async (profileId) => {
  try {
    const { data, error } = await supabase
      .from('profiles_fokus360')
      .select('*, organizations_fokus360(*)')
      .eq('id', profileId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting profile:', error.message);
    return null;
  }
};

// Update profile
export const updateProfile = async (profileId, updates) => {
  try {
    const { data, error } = await supabase
      .from('profiles_fokus360')
      .update(updates)
      .eq('id', profileId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating profile:', error.message);
    toast.error(error.message || 'Failed to update profile');
    throw error;
  }
};

// Save profile details (for participant profile setup)
export const saveProfileDetails = async (profileId, category, questionId, answer) => {
  try {
    // Check if the detail already exists
    const { data: existingData, error: checkError } = await supabase
      .from('profile_details_fokus360')
      .select('*')
      .eq('profile_id', profileId)
      .eq('question_id', questionId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 means no rows returned, which is expected if not found
      throw checkError;
    }

    if (existingData) {
      // Update existing record
      const { data, error } = await supabase
        .from('profile_details_fokus360')
        .update({
          answer,
          updated_at: new Date()
        })
        .eq('id', existingData.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      // Insert new record
      const { data, error } = await supabase
        .from('profile_details_fokus360')
        .insert({
          profile_id: profileId,
          category,
          question_id: questionId,
          answer
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error('Error saving profile detail:', error.message);
    toast.error(error.message || 'Failed to save profile detail');
    throw error;
  }
};

// Save multiple profile details at once (batch save)
export const saveProfileDetailsBatch = async (profileId, details) => {
  try {
    const batch = details.map(detail => ({
      profile_id: profileId,
      category: detail.category,
      question_id: detail.questionId,
      answer: detail.answer
    }));

    const { data, error } = await supabase
      .from('profile_details_fokus360')
      .upsert(batch, {
        onConflict: 'profile_id, question_id',
        ignoreDuplicates: false
      })
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving profile details batch:', error.message);
    toast.error(error.message || 'Failed to save profile details');
    throw error;
  }
};

// Get all profile details for a user
export const getProfileDetails = async (profileId) => {
  try {
    const { data, error } = await supabase
      .from('profile_details_fokus360')
      .select('*')
      .eq('profile_id', profileId);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting profile details:', error.message);
    return [];
  }
};

// Get profile details by category
export const getProfileDetailsByCategory = async (profileId, category) => {
  try {
    const { data, error } = await supabase
      .from('profile_details_fokus360')
      .select('*')
      .eq('profile_id', profileId)
      .eq('category', category);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error getting profile details for category ${category}:`, error.message);
    return [];
  }
};

// Check if profile setup is complete
export const isProfileSetupComplete = async (profileId) => {
  try {
    // Get total number of required questions
    const requiredCategories = ['demographics']; // Minimum required categories
    let requiredQuestionsCount = 0;
    
    requiredCategories.forEach(category => {
      const categoryQuestions = require('../data/participantQuestions').participantQuestions[category].questions;
      const requiredInCategory = categoryQuestions.filter(q => q.required).length;
      requiredQuestionsCount += requiredInCategory;
    });

    // Count how many required questions have been answered
    const { count, error } = await supabase
      .from('profile_details_fokus360')
      .select('*', { count: 'exact', head: true })
      .eq('profile_id', profileId)
      .in('category', requiredCategories);

    if (error) throw error;
    
    return count >= requiredQuestionsCount;
  } catch (error) {
    console.error('Error checking profile completion:', error.message);
    return false;
  }
};