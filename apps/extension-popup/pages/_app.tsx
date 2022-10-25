import "app/src/styles/globals.css"
import "app/src/styles/editor.css"
import "app/src/styles/daysiui-enhance.css"
import "react-toastify/dist/ReactToastify.css"
import "app/src/styles/toastify-enhance.css"
import type { AppProps } from "next/app"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { ToastContainer } from "react-toastify"
import { supabaseClient } from "app/src/utils/supabaseClient"
import { useEffect, useState } from "react"
import { parse, serialize } from "cookie"

function MyApp({ Component, pageProps }: AppProps) {
  const [cookieOk, setCookieOk] = useState(false)
  useEffect(() => {
    chrome.runtime?.onMessage.addListener((message) => {
      if (message.type === "SYNC_COOKIE") {
        document.cookie = message.payload
        console.log("sc", document.cookie)
        window.location.reload()
      }
    })
    chrome.runtime
      ?.sendMessage({
        type: "GET_COOKIE",
      })
      .then((message) => {
        document.cookie = message.payload
        console.log("gc", document.cookie)
        setCookieOk(true)
      })
  }, [])
  if (!cookieOk) return
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
