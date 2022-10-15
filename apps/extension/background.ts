import { SET_INFO } from "./constants"

let info: {
  user: any
  accesstoken: string | null
} = {
  user: null,
  accesstoken: null,
}

const accesstoken = chrome.cookies.get({
  url: "https://daidai.cyou",
  name: "sb-access-token",
})

console.log("cookie", accesstoken)

chrome.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case SET_INFO: {
      info = message.payload
      console.log(message)
      break
    }
  }
})

export {}
