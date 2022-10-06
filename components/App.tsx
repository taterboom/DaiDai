import Desktop from "../components/Desktop"
import { ConfigProvider } from "../contexts/config"
import { GithubGraphqlClientProvider } from "../contexts/githubGraphql"
import { SettingsProvider } from "../contexts/settings"

const App = () => (
  <>
    {/* <SettingsProvider> */}
    <GithubGraphqlClientProvider>
      <Desktop></Desktop>
    </GithubGraphqlClientProvider>
    {/* </SettingsProvider> */}
  </>
)

export default App
