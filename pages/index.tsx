import type { NextPage } from "next"
import Desktop from "../components/Desktop"
import { SettingsProvider } from "../contexts/settings"
import { TagsProvider } from "../contexts/tags"
import data from "../test.json"

const Home: NextPage = () => {
  return (
    <SettingsProvider>
      <TagsProvider>
        <Desktop json={data}></Desktop>
      </TagsProvider>
    </SettingsProvider>
  )
}

export default Home
