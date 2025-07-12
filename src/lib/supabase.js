import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jahvmiuoyzbritoexcvp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphaHZtaXVveXpicml0b2V4Y3ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMTI2NTUsImV4cCI6MjA2NzY4ODY1NX0.FHvhOQgGNVOj1vyaCIlVSRDF7JsA2geUqWQL3qaGQ10';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || SUPABASE_URL === 'https://YOUR_PROJECT_ID.supabase.co' || SUPABASE_ANON_KEY === 'YOUR_ANON_KEY') {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

export default supabase;