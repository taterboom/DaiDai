import { SET_INFO } from "./constants"

const script = document.createElement("script")
script.src = chrome.runtime.getURL("./injectGlobal.js")
// This script runs before the <head> element is created,
// so we add the script to <html> instead.
document.documentElement.appendChild(script)

// 接收__WNB_DEVTOOLS__的消息，转发给background
window.addEventListener("message", (e) => {
  if (e.data.source === "__daidai_terminal__") {
    console.log("+++cs.onmessage", e)
    chrome.runtime.sendMessage({
      type: SET_INFO,
      payload: e.data,
    })
  }
})

export {}
