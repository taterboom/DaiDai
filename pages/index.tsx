import type { NextPage } from "next"
import Desktop from "../components/Desktop"
import { SettingsProvider } from "../components/Settings"
import data from "../test.json"

const Home: NextPage = () => {
  return (
    <SettingsProvider>
      <Desktop json={data}></Desktop>
    </SettingsProvider>
  )
}

export default Home
