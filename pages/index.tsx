import type { NextPage } from "next"
import dynamic from "next/dynamic"

const App = dynamic(() => import("../components/App"), { ssr: false })

const Home: NextPage<{ githubClientId: string }> = ({ githubClientId }) => {
  return <App githubClientId={githubClientId}></App>
}

export const getServerSideProps = async () => {
  return {
    props: {
      githubClientId: process.env.CLIENT_ID,
    },
  }
}

export default Home
