import { serialize } from "cookie"

const NAME = "supabase-auth-token"

const token = {
  _cache: null as string | null | undefined,
  set current(value: string | null | undefined) {
    if (value) {
      this._cache = `${NAME}=${value}`
    } else {
      this._cache = serialize(NAME, "", {
        expires: new Date(0),
      })
    }
    chrome.runtime.sendMessage({
      type: "SYNC_COOKIE",
      payload: this._cache,
    })
  },
  get current() {
    return this._cache
  },
}

async function syncCookie() {
  const _token = await chrome.cookies.get({
    url: "https://www.daidai.cyou",
    name: NAME,
  })

  console.log("cookie", token)

  if (_token?.value) {
    token.current = _token.value
  }
}

syncCookie()

chrome.cookies.onChanged.addListener((e) => {
  console.log("co", e)
  if (e.cookie.domain === ".daidai.cyou" && e.cookie.name === "supabase-auth-token") {
    if (e.removed) {
      token.current = null
    } else {
      token.current = e.cookie.value
    }
  }
})

chrome.runtime.onMessage.addListener((messsage, sender, sendResponse) => {
  switch (messsage.type) {
    case "GET_COOKIE": {
      sendResponse({
        payload: token.current,
      })
      return true
    }
  }
})

export {}
