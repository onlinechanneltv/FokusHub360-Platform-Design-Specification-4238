import supabase from '../lib/supabase';
import { toast } from 'react-hot-toast';

// Sign up a new user
export const signUp = async (email, password, userData) => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.name,
          role: userData.role
        }
      }
    });

    if (authError) throw authError;

    if (authData?.user) {
      // Create profile
      const { error: profileError } = await supabase
        .from('profiles_fokus360')
        .insert({
          id: authData.user.id,
          full_name: userData.name,
          role: userData.role,
          organization_id: userData.organizationId || null
        });

      if (profileError) throw profileError;

      // If user is registering as a client and has a company
      if (userData.role === 'client' && userData.company) {
        const { data: orgData, error: orgError } = await supabase
          .from('organizations_fokus360')
          .insert({
            name: userData.company,
            industry: userData.industry || null
          })
          .select()
          .single();

        if (orgError) throw orgError;

        // Update profile with organization id
        if (orgData) {
          const { error: updateError } = await supabase
            .from('profiles_fokus360')
            .update({ organization_id: orgData.id })
            .eq('id', authData.user.id);

          if (updateError) throw updateError;
        }
      }

      return {
        user: {
          id: authData.user.id,
          email: authData.user.email,
          name: userData.name,
          role: userData.role
        }
      };
    }
  } catch (error) {
    console.error('Error signing up:', error.message);
    toast.error(error.message || 'Failed to sign up');
    throw error;
  }
};

// Sign in a user
export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    // Get profile data
    const { data: profileData, error: profileError } = await supabase
      .from('profiles_fokus360')
      .select('*, organizations_fokus360(*)')
      .eq('id', data.user.id)
      .single();

    if (profileError) throw profileError;

    return {
      user: {
        id: data.user.id,
        email: data.user.email,
        name: profileData.full_name,
        role: profileData.role,
        organization: profileData.organizations_fokus360 || null
      }
    };
  } catch (error) {
    console.error('Error signing in:', error.message);
    toast.error(error.message || 'Failed to sign in');
    throw error;
  }
};

// Sign out a user
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error signing out:', error.message);
    toast.error(error.message || 'Failed to sign out');
    throw error;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;

    if (!session) return null;

    const { data: profileData, error: profileError } = await supabase
      .from('profiles_fokus360')
      .select('*, organizations_fokus360(*)')
      .eq('id', session.user.id)
      .single();

    if (profileError) throw profileError;

    return {
      id: session.user.id,
      email: session.user.email,
      name: profileData.full_name,
      role: profileData.role,
      organization: profileData.organizations_fokus360 || null
    };
  } catch (error) {
    console.error('Error getting current user:', error.message);
    return null;
  }
};

// Reset password
export const resetPassword = async (email) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error resetting password:', error.message);
    toast.error(error.message || 'Failed to reset password');
    throw error;
  }
};

// Update password
export const updatePassword = async (password) => {
  try {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error updating password:', error.message);
    toast.error(error.message || 'Failed to update password');
    throw error;
  }
};