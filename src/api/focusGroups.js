import supabase from '../lib/supabase';
import { toast } from 'react-hot-toast';

// Create a new focus group
export const createFocusGroup = async (groupData) => {
  try {
    // Get current user's organization
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('User not authenticated');
    
    const { data: profileData, error: profileError } = await supabase
      .from('profiles_fokus360')
      .select('organization_id')
      .eq('id', user.id)
      .single();
    
    if (profileError) throw profileError;
    
    // Create focus group
    const { data, error } = await supabase
      .from('focus_groups_fokus360')
      .insert({
        organization_id: profileData.organization_id,
        title: groupData.title,
        description: groupData.description,
        content_type: groupData.contentType,
        content_url: groupData.contentUrl,
        target_participants: groupData.targetParticipants,
        reward_type: groupData.rewardType,
        reward_amount: groupData.rewardAmount,
        reward_details: groupData.rewardDetails || {},
        target_criteria: groupData.targetCriteria || {},
        created_by: user.id,
        starts_at: groupData.startsAt || new Date(),
        ends_at: groupData.endsAt
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // If questions are provided, create them
    if (groupData.questions && groupData.questions.length > 0) {
      const questionsData = groupData.questions.map((q, index) => ({
        focus_group_id: data.id,
        question_text: q.text,
        question_type: q.type,
        options: q.options || null,
        required: q.required || true,
        order_index: index
      }));
      
      const { error: questionsError } = await supabase
        .from('questions_fokus360')
        .insert(questionsData);
      
      if (questionsError) throw questionsError;
    }
    
    return data;
  } catch (error) {
    console.error('Error creating focus group:', error.message);
    toast.error(error.message || 'Failed to create focus group');
    throw error;
  }
};

// Get all focus groups for the current user's organization
export const getFocusGroups = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('User not authenticated');
    
    const { data: profileData, error: profileError } = await supabase
      .from('profiles_fokus360')
      .select('role, organization_id')
      .eq('id', user.id)
      .single();
    
    if (profileError) throw profileError;
    
    let query = supabase
      .from('focus_groups_fokus360')
      .select(`
        *,
        profiles_fokus360!created_by(full_name),
        questions_fokus360(*)
      `);
    
    // If admin, show all groups. Otherwise, show only the user's organization groups
    if (profileData.role !== 'admin') {
      query = query.eq('organization_id', profileData.organization_id);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching focus groups:', error.message);
    return [];
  }
};

// Get focus group by ID
export const getFocusGroupById = async (groupId) => {
  try {
    const { data, error } = await supabase
      .from('focus_groups_fokus360')
      .select(`
        *,
        profiles_fokus360!created_by(full_name),
        questions_fokus360(*),
        participants_fokus360(
          *,
          profiles_fokus360(*)
        )
      `)
      .eq('id', groupId)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching focus group:', error.message);
    return null;
  }
};

// Update focus group
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

// Delete focus group
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

// Join a focus group as a participant
export const joinFocusGroup = async (groupId, profileId) => {
  try {
    // Check if already joined
    const { data: existingData, error: checkError } = await supabase
      .from('participants_fokus360')
      .select('*')
      .eq('focus_group_id', groupId)
      .eq('profile_id', profileId)
      .single();
    
    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }
    
    if (existingData) {
      return existingData; // Already joined
    }
    
    // Calculate match score (this would be more sophisticated in a real app)
    const matchScore = 85 + Math.floor(Math.random() * 15); // 85-100% match for demo
    
    // Join the focus group
    const { data, error } = await supabase
      .from('participants_fokus360')
      .insert({
        focus_group_id: groupId,
        profile_id: profileId,
        status: 'accepted',
        match_score: matchScore
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // Increment current participants count
    const { error: updateError } = await supabase.rpc('increment_participants', {
      p_focus_group_id: groupId
    });
    
    if (updateError) throw updateError;
    
    return data;
  } catch (error) {
    console.error('Error joining focus group:', error.message);
    toast.error(error.message || 'Failed to join focus group');
    throw error;
  }
};

// Submit responses to a focus group
export const submitResponses = async (participantId, responses) => {
  try {
    // Format responses for insertion
    const formattedResponses = responses.map(response => ({
      participant_id: participantId,
      question_id: response.questionId,
      response: response.answer
    }));
    
    const { data, error } = await supabase
      .from('responses_fokus360')
      .insert(formattedResponses)
      .select();
    
    if (error) throw error;
    
    // Update participant status to completed
    const { error: updateError } = await supabase
      .from('participants_fokus360')
      .update({
        status: 'completed',
        completed_at: new Date()
      })
      .eq('id', participantId);
    
    if (updateError) throw updateError;
    
    return data;
  } catch (error) {
    console.error('Error submitting responses:', error.message);
    toast.error(error.message || 'Failed to submit responses');
    throw error;
  }
};

// Get available focus groups for a participant
export const getAvailableFocusGroups = async (profileId) => {
  try {
    // Get focus groups that the participant hasn't joined yet
    const { data, error } = await supabase
      .from('focus_groups_fokus360')
      .select(`
        *,
        participants_fokus360!inner(*)
      `)
      .eq('status', 'active')
      .not('participants_fokus360.profile_id', 'eq', profileId);
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching available focus groups:', error.message);
    return [];
  }
};