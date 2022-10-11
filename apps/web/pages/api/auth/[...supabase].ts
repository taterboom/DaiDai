import { handleAuth } from "@supabase/auth-helpers-nextjs"

export default handleAuth({
  logout: { returnTo: "/" },
  cookieOptions: { lifetime: 1 * 365 * 24 * 60 * 60, domain: "daidai.cyou" }, // Keep the user logged in for a year.
})
