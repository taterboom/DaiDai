function getHost(url: string) {
  try {
    return new URL(url).host
  } catch (err) {
    return ""
  }
}

function getGoogleFaviconUrl(host?: string) {
  if (!host) return ""
  // return `https://www.google.com/s2/favicons?domain=${decodeURIComponent(host)}&sz=128`
  return `https://icon.horse/icon/${decodeURIComponent(host)}`
}

class Site {
  name: string
  url: string
  tagStr: string
  iconUrl: string
  constructor(name: string, url: string, tagStr: string) {
    this.name = name
    this.url = url
    this.tagStr = tagStr.trim() || "No Tag"
    this.iconUrl = getGoogleFaviconUrl(getHost(url))
  }
  get tags() {
    return this.tagStr.split(",")
  }
}

export default Site
