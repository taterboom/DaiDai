import "app/src/styles/globals.css"
import "app/src/styles/editor.css"
import "app/src/styles/daysiui-enhance.css"
import "react-toastify/dist/ReactToastify.css"
import "app/src/styles/toastify-enhance.css"
import type { AppProps } from "next/app"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { ToastContainer } from "react-toastify"
import { supabaseClient } from "app/src/utils/supabaseClient"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Component {...pageProps} />
      </SessionContextProvider>
    </>
  )
}

export default MyApp
