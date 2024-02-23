import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bwglppilzhoxmasmvsra.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3Z2xwcGlsemhveG1hc212c3JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc3MzMwMDUsImV4cCI6MjAyMzMwOTAwNX0.lJl9sjpn85CIBkHrI4j0IqIOZW_ik3xC7g-nQOi_qZs'
export const supabase = createClient(supabaseUrl, supabaseKey)
