import { createClient } from "@supabase/supabase-js";

export const supabase = createClient("https://gyenvskfeojpvxfhpdwu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5ZW52c2tmZW9qcHZ4ZmhwZHd1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzAwMDg3NywiZXhwIjoyMDA4NTc2ODc3fQ.6HtdUmDMqh-M29I_S8FSKSin-R6fDIc5gpU2PI-0axc");