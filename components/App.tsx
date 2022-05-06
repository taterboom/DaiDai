import Desktop from "../components/Desktop"
import { SettingsProvider } from "../contexts/settings"
import { TagsProvider } from "../contexts/tags"

const App = () => (
  <SettingsProvider>
    <TagsProvider>
      <Desktop></Desktop>
    </TagsProvider>
  </SettingsProvider>
)

export default App
