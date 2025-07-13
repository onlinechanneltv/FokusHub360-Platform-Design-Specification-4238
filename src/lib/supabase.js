import { createClient } from '@supabase/supabase-js'

// Use the actual Supabase credentials
const supabaseUrl = 'https://jahvmiuoyzbritoexcvp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphaHZtaXVveXpicml0b2V4Y3ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMTI2NTUsImV4cCI6MjA2NzY4ODY1NX0.FHvhOQgGNVOj1vyaCIlVSRDF7JsA2geUqWQL3qaGQ10'

// Validate credentials
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

if (supabaseUrl === 'https://your-project-url.supabase.co' || supabaseAnonKey === 'your-anon-key') {
  throw new Error('Please update Supabase configuration with real credentials')
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})

export default supabase