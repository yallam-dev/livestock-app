// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zbpkanclylupxxfxtbwu.supabase.co'; // 🔁 Replace this
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpicGthbmNseWx1cHh4Znh0Ynd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MjczMzUsImV4cCI6MjA1OTIwMzMzNX0.bjXSA2iku2XbMiAwWjp7rbvgE-AtBMWRduqdh9u_UnU';             // 🔁 Replace this

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
