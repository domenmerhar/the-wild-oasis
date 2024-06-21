import { createClient } from "@supabase/supabase-js";

export const supabaseUrl: string = "https://gpefokjrystvjmjaobrz.supabase.co";
const supabaseKey: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwZWZva2pyeXN0dmptamFvYnJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY5MTY0NjYsImV4cCI6MjAzMjQ5MjQ2Nn0.NQ3_YAdz1vr-sgJocr4l-tqxO3VFJFuUjv8iwQSjo1s";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
