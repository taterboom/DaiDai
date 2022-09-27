import { LinkButton } from "./Common/Button"

type DockProps = {
  children?: React.ReactNode
}

const Dock = (props: DockProps) => {
  return (
    <div className="fixed right-2 top-2 handlebar">
      <LinkButton href="/?pannel=creator">+</LinkButton>
      <LinkButton href="/?pannel=importer">Import Bookmarks</LinkButton>
    </div>
  )
}

export default Dock
