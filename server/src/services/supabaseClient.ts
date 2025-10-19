
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_PROJECT_URL
const supabaseKey = process.env.SUPABASE_API_KEY
let supabase: SupabaseClient | null = null

if ( supabaseUrl && supabaseKey){
    supabase = createClient(supabaseUrl, supabaseKey)
}

export default supabase