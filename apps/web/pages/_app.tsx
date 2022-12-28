import "app/src/styles/globals.css"
import "app/src/styles/editor.css"
import "app/src/styles/daysiui-enhance.css"
import "react-toastify/dist/ReactToastify.css"
import "app/src/styles/toastify-enhance.css"
import type { AppProps } from "next/app"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { ToastContainer } from "react-toastify"
import { supabaseClient } from "app/src/utils/supabaseClient"
import { trpcClient } from "../utils/trpcClient"
import { useEffect } from "react"
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  useEffect(() => {
    if (typeof window !== undefined) {
      trpcClient.user.getUsers.query().then((res) => {
        console.log("!!!!!", res.data)
      })
    }
  })
  return (
    <>
      <ToastContainer />
      <SessionProvider session={session}>
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          <Component {...pageProps} />
        </SessionContextProvider>
      </SessionProvider>
    </>
  )
}

export default MyApp
