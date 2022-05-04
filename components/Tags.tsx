import TagItem from "./TagItem"

const Tags: React.FC<{ value: Map<string, Set<string>> }> = ({ value }) => {
  return (
    <section>
      <ul>
        {[...value].map(([tag, urlsSet]) => (
          <li key={tag}>
            <TagItem>{tag}</TagItem>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Tags
