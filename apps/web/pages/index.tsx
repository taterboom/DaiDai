import { withPageAuth } from "@supabase/auth-helpers-nextjs"
import { cookieOptions } from "app/src/utils/supabaseClient"
import type { NextPage } from "next"
import dynamic from "next/dynamic"

const App = dynamic(() => import("app/src/App"), { ssr: false })

const Home: NextPage = (props) => {
  return <App></App>
}

export const getServerSideProps = withPageAuth({
  authRequired: false,
  cookieOptions,
})

// export const getServerSideProps = withPageAuth({
//   authRequired: false,
//   async getServerSideProps(ctx) {
//     // // Retrieve provider_token from cookies
//     // const provider_token = getProviderToken(ctx)
//     // // Get logged in user's third-party id from metadata
//     // const { user } = await getUser(ctx)

//     // const { data, error } = await supabaseServerClient(ctx)
//     //   .from("profiles")
//     //   .select("*")
//     //   .eq("id", user.id)
//     // console.log("???")
//     // return { props: { data, user, provider_token } }
//   },
// })

export default Home
