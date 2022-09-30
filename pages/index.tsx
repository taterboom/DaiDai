import {
  getProviderToken,
  getUser,
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs"
import type { NextPage } from "next"
import dynamic from "next/dynamic"
import { ConfigProvider } from "../contexts/config"

const App = dynamic(() => import("../components/App"), { ssr: false })

const Home: NextPage<{ data: any; user: any; provider_token: any }> = (props) => {
  return (
    <ConfigProvider
      dataFromServer={props.data}
      userFromServer={props.user}
      providerTokenFromServer={props.provider_token}
    >
      <App></App>
    </ConfigProvider>
  )
}

export const getServerSideProps = withPageAuth({
  authRequired: false,
  async getServerSideProps(ctx) {
    // Retrieve provider_token from cookies
    const provider_token = getProviderToken(ctx)
    // Get logged in user's third-party id from metadata
    const { user } = await getUser(ctx)

    const { data, error } = await supabaseServerClient(ctx)
      .from("profiles")
      .select("*")
      .eq("id", user.id)
    console.log("???")
    return { props: { data, user, provider_token } }
  },
})

export default Home
