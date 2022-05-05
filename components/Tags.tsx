import TagItem from "./TagItem"

const Tags: React.FC<{ value: Map<string, Set<string>> }> = ({ value }) => {
  return (
    <section>
      <ul className="flex flex-wrap">
        {[...value].map(([tag, urlsSet]) => (
          <li key={tag} className="ml-2 mb-2">
            <TagItem>{tag}</TagItem>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Tags
