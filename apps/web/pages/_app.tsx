import "app/src/styles/globals.css"
import "app/src/styles/editor.css"
import "app/src/styles/daysiui-enhance.css"
import "react-toastify/dist/ReactToastify.css"
import "app/src/styles/toastify-enhance.css"
import type { AppProps } from "next/app"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { ToastContainer } from "react-toastify"
import { supabaseClient } from "app/src/utils/supabaseClient"

// @filename: client.ts
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import type { AppRouter } from "server/trpc"
import { useEffect } from "react"

// Notice the <AppRouter> generic here.
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "https://local.daidai.cyou:3000/api/trpc",
    }),
  ],
})

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== undefined) {
      trpc.user.getUsers.query().then((res) => {
        console.log(res.data)
      })
    }
  })
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
