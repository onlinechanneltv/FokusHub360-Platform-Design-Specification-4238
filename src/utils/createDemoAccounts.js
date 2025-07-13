import supabase from '../lib/supabase';

// This utility function helps create demo accounts
// You can run this in the browser console or call it from a component

export const createDemoAccounts = async () => {
  const demoAccounts = [
    {
      email: 'admin@demo.com',
      password: 'demo123456',
      userData: {
        name: 'Admin Demo User',
        role: 'admin',
        company: 'FokusHub360'
      }
    },
    {
      email: 'manager@demo.com', 
      password: 'demo123456',
      userData: {
        name: 'Manager Demo User',
        role: 'manager',
        company: 'Demo Management Co'
      }
    },
    {
      email: 'client@demo.com',
      password: 'demo123456', 
      userData: {
        name: 'Client Demo User',
        role: 'client',
        company: 'Demo Client Corp'
      }
    },
    {
      email: 'participant@demo.com',
      password: 'demo123456',
      userData: {
        name: 'Participant Demo User',
        role: 'participant'
      }
    }
  ];

  console.log('Creating demo accounts...');

  for (const account of demoAccounts) {
    try {
      // First, try to sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: account.email,
        password: account.password,
        options: {
          data: {
            full_name: account.userData.name,
            role: account.userData.role
          }
        }
      });

      if (authError && authError.message !== 'User already registered') {
        console.error(`Error creating ${account.userData.role}:`, authError.message);
        continue;
      }

      if (authData?.user) {
        // Create organization if needed
        let organizationId = null;
        if (account.userData.company) {
          const { data: orgData, error: orgError } = await supabase
            .from('organizations_fokus360')
            .upsert({
              name: account.userData.company,
              industry: 'Technology'
            }, {
              onConflict: 'name'
            })
            .select()
            .single();

          if (orgError) {
            console.error(`Error creating organization for ${account.userData.role}:`, orgError.message);
          } else {
            organizationId = orgData.id;
          }
        }

        // Create or update profile
        const { error: profileError } = await supabase
          .from('profiles_fokus360')
          .upsert({
            id: authData.user.id,
            full_name: account.userData.name,
            role: account.userData.role,
            organization_id: organizationId
          }, {
            onConflict: 'id'
          });

        if (profileError) {
          console.error(`Error creating profile for ${account.userData.role}:`, profileError.message);
        } else {
          console.log(`✅ Created ${account.userData.role} account: ${account.email}`);
        }
      }
    } catch (error) {
      console.error(`Error with ${account.userData.role} account:`, error.message);
    }
  }

  console.log('Demo account creation completed!');
};

// Helper function to call from browser console
window.createDemoAccounts = createDemoAccounts;