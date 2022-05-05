import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

type TypeBoxClientProps = { onChange?: (text: string) => any }
const TypeBoxClient: React.FC<TypeBoxClientProps> = ({ onChange }) => {
  const [text, setText] = useState("")
  const root = useRef(document.createElement("div"))
  const changeHander = useRef(onChange)
  changeHander.current = onChange
  useEffect(() => {
    changeHander.current?.(text)
  }, [text])
  useEffect(() => {
    const rootEl = root.current
    document.body.appendChild(rootEl)
    return () => {
      rootEl.remove()
    }
  }, [])
  useEffect(() => {
    const onType = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) return
      if (/^\w$/.test(e.key)) {
        setText((text) => text.concat(e.key))
      }
      if (e.key.toUpperCase() === "BACKSPACE") {
        setText((text) => (e.metaKey ? "" : text.slice(0, -1)))
      }
    }
    document.addEventListener("keydown", onType)
    return () => {
      document.removeEventListener("keydown", onType)
    }
  }, [])
  if (!text) return null
  return createPortal(
    <div className="fixed top-0 right-0 px-2 py-0.5 pointer-events-none bg-gray-100 rounded-bl-md border border-gray-200 backdrop-blur-sm">
      {text}
    </div>,
    root.current
  )
}

const TypeBox: React.FC<TypeBoxClientProps> = (props) => {
  if (typeof window === "undefined") return null
  return <TypeBoxClient {...props}></TypeBoxClient>
}

export default TypeBox
