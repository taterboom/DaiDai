import { createBrowserSupabaseClient as createBrowserSupabaseClientForNextjs } from "@supabase/auth-helpers-nextjs"
import { CookieOptions } from "@supabase/auth-helpers-shared"

export const cookieOptions: CookieOptions = {
  domain: "daidai.cyou",
}

export type DaidaiApiResult = {
  id: string
  user_id: string
  created_at: string
  updated_at: string
  url: string
  c_html: string
}

interface Database {
  public: {
    Tables: {
      daidais: {
        Row: DaidaiApiResult // The data expected to be returned from a "select" statement.
        Insert: {
          url: string
          c_html: string
          user_id: string
        } // The data expected passed to an "insert" statement.
        Update: {
          url: string
          c_html: string
        } // The data expected passed to an "update" statement.
      }
    }
  }
}

export const supabaseClient = createBrowserSupabaseClientForNextjs<Database>({ cookieOptions })

export const daidaisQuery = () => supabaseClient.from("daidais")
