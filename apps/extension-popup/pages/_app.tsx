import "app/src/styles/globals.css"
import "app/src/styles/editor.css"
import "app/src/styles/daysiui-enhance.css"
import "react-toastify/dist/ReactToastify.css"
import "app/src/styles/toastify-enhance.css"
import type { AppProps } from "next/app"
import { UserProvider } from "supabase-auth-helpers-shared/src"
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
