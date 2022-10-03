import "../styles/globals.css"
import "../styles/editor.css"
import "../styles/daysiui-enhance.css"
import "react-toastify/dist/ReactToastify.css"
import "../styles/toastify-enhance.css"
import type { AppProps } from "next/app"
import { UserProvider } from "@supabase/auth-helpers-react"
import { supabaseClient } from "@supabase/auth-helpers-nextjs"
import { ToastContainer } from "react-toastify"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      <UserProvider supabaseClient={supabaseClient}>
        <Component {...pageProps} />
      </UserProvider>
    </>
  )
}

export default MyApp
