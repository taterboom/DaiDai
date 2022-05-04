import Site from "../modules/Site"
import SiteItem from "./SiteItem"

const Sites: React.FC<{ value: Site[] }> = ({ value }) => {
  return (
    <section className="grid grid-cols-[repeat(5,_minmax(200px,_1fr))] gap-4">
      {value.map((site) => (
        <SiteItem value={site} key={site.url}></SiteItem>
      ))}
    </section>
  )
}

export default Sites
