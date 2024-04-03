import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://jwlsdhdsxepmcebvriht.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3bHNkaGRzeGVwbWNlYnZyaWh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxMjY4MDIsImV4cCI6MjAyNzcwMjgwMn0.33Btyx2dt_VW0jlGQH9UfthPCmh8XGtcsUH6ZKAPlAQ';
const supabase = createClient(supabaseUrl, supabaseKey);


export default supabase;