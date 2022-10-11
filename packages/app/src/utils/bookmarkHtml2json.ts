export type Bookmark = {
  title: string
  url: string
  tags: string[]
}

export function bookmarkHTMLString2json(htmlString: string) {
  return bookmarkHTML2json(new DOMParser().parseFromString(htmlString, "text/html"))
}

export function bookmarkHTML2json(doc: Document, ignoreTags = ["书签栏"]) {
  const result: Bookmark[] = []
  function traverse(dl: Element, tags: string[] = []) {
    for (const childElement of dl.children) {
      if (childElement.tagName === "DT") {
        const fe = childElement.firstElementChild
        if (!fe) continue
        if (
          fe.tagName === "H3" &&
          fe.nextElementSibling &&
          fe.nextElementSibling.tagName === "DL"
        ) {
          traverse(fe.nextElementSibling, tags.concat(fe.textContent || ""))
        } else if (fe.tagName === "A") {
          result.push({
            title: fe.textContent || "",
            url: (<HTMLAnchorElement>fe).href,
            tags: tags.filter((t) => !ignoreTags.includes(t)),
          })
        }
      }
    }
  }
  traverse(doc.querySelector("dl") as Element)
  return result
}
