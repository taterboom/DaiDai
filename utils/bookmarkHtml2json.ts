type Site = {
  name: string
  url: string
  tagStr: string
}

export function bookmarkHTMLString2json(htmlString: string) {
  return bookmarkHTML2json(new DOMParser().parseFromString(htmlString, "text/html"))
}

function bookmarkHTML2json(doc: Document, ignoreTags = ["书签栏"]) {
  const result: Site[] = []
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
            name: fe.textContent || "",
            url: (<HTMLAnchorElement>fe).href,
            tagStr: tags.filter((t) => !ignoreTags.includes(t)).join(","),
          })
        }
      }
    }
  }
  traverse(doc.querySelector("dl") as Element)
  return result
}

export default bookmarkHTML2json
