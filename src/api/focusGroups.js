import supabase from '../lib/supabase';
import { toast } from 'react-hot-toast';

// Get all focus groups for the current user
export const getFocusGroups = async () => {
  try {
    const { data, error } = await supabase
      .from('focus_groups_fokus360')
      .select(`
        *,
        organizations_fokus360 (*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting focus groups:', error.message);
    return [];
  }
};

// Get a specific focus group by ID
export const getFocusGroupById = async (groupId) => {
  try {
    const { data, error } = await supabase
      .from('focus_groups_fokus360')
      .select(`
        *,
        organizations_fokus360 (*),
        questions_fokus360 (*)
      `)
      .eq('id', groupId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting focus group:', error.message);
    return null;
  }
};

// Create a new focus group
export const createFocusGroup = async (groupData) => {
  try {
    console.log("Creating focus group with data:", groupData);
    
    // First create the focus group
    const { data: focusGroup, error: groupError } = await supabase
      .from('focus_groups_fokus360')
      .insert({
        title: groupData.title,
        description: groupData.description,
        content_type: groupData.contentType,
        content_url: groupData.contentUrl,
        target_participants: groupData.targetParticipants,
        starts_at: groupData.startsAt,
        ends_at: groupData.endsAt,
        reward_type: groupData.rewardType,
        reward_amount: groupData.rewardAmount,
        status: 'active'
      })
      .select()
      .single();

    if (groupError) throw groupError;

    // Then create the questions if any
    if (groupData.questions && groupData.questions.length > 0) {
      const questions = groupData.questions.map(q => ({
        focus_group_id: focusGroup.id,
        question_text: q.text,
        question_type: q.type,
        options: q.options || null,
        required: q.required
      }));

      const { error: questionsError } = await supabase
        .from('questions_fokus360')
        .insert(questions);

      if (questionsError) throw questionsError;
    }

    return focusGroup;
  } catch (error) {
    console.error('Error creating focus group:', error.message);
    toast.error(error.message || 'Failed to create focus group');
    throw error;
  }
};

// Update a focus group
export const updateFocusGroup = async (groupId, updates) => {
  try {
    const { data, error } = await supabase
      .from('focus_groups_fokus360')
      .update(updates)
      .eq('id', groupId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating focus group:', error.message);
    toast.error(error.message || 'Failed to update focus group');
    throw error;
  }
};

// Delete a focus group
export const deleteFocusGroup = async (groupId) => {
  try {
    const { error } = await supabase
      .from('focus_groups_fokus360')
      .delete()
      .eq('id', groupId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting focus group:', error.message);
    toast.error(error.message || 'Failed to delete focus group');
    throw error;
  }
};

// Get focus group participants
export const getFocusGroupParticipants = async (groupId) => {
  try {
    const { data, error } = await supabase
      .from('participants_fokus360')
      .select(`
        *,
        profiles_fokus360 (*)
      `)
      .eq('focus_group_id', groupId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting participants:', error.message);
    return [];
  }
};

// Add participant to focus group
export const addParticipant = async (groupId, participantId) => {
  try {
    const { data, error } = await supabase
      .from('participants_fokus360')
      .insert({
        focus_group_id: groupId,
        profile_id: participantId,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding participant:', error.message);
    toast.error(error.message || 'Failed to add participant');
    throw error;
  }
};

// Update participant status
export const updateParticipantStatus = async (participantId, status) => {
  try {
    const { data, error } = await supabase
      .from('participants_fokus360')
      .update({ status })
      .eq('id', participantId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating participant status:', error.message);
    toast.error(error.message || 'Failed to update participant status');
    throw error;
  }
};