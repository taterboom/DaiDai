import { LinkButton } from "./Common/Button"

type DockProps = {
  children?: React.ReactNode
}

const Dock = (props: DockProps) => {
  return (
    <div className="fixed right-2 top-2 py-1 px-2 rounded-lg border border-white/30 bg-gray-500/30 backdrop-blur-md">
      <LinkButton href="/?pannel=creator">+</LinkButton>
      <LinkButton href="/?pannel=importer">Import Bookmarks</LinkButton>
    </div>
  )
}

export default Dock
