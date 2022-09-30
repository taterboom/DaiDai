import Desktop from "../components/Desktop"
import { ConfigProvider } from "../contexts/config"
import { GithubGraphqlClientProvider } from "../contexts/githubGraphql"
import { SettingsProvider } from "../contexts/settings"
import { TagsProvider } from "../contexts/tags"

const App = () => (
  <SettingsProvider>
    <TagsProvider>
      <GithubGraphqlClientProvider>
        <Desktop></Desktop>
      </GithubGraphqlClientProvider>
    </TagsProvider>
  </SettingsProvider>
)

export default App
