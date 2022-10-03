import { supabaseClient } from "@supabase/auth-helpers-nextjs"

export type DaidaiApiResult = {
  id: string
  user_id: string
  created_at: string
  updated_at: string
  url: string
  c_html: string
}

export const daidaisQuery = supabaseClient.from<DaidaiApiResult>("daidais")
