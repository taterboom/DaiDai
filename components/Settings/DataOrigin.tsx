// 输入url/html
// 输出json

import dynamic from "next/dynamic"
import { useState } from "react"
import { useSettings } from "../../contexts/settings"
import { bookmarkHTMLString2json } from "../../utils/bookmarkHtml2json"

const Editor = dynamic(() => import("../Common/Editor"), { ssr: false })

type DataOriginType = "json" | "html"

const DataOrigin: React.FC = () => {
  const {
    value: { dataOrigin },
    onChange,
  } = useSettings()
  const [type, setType] = useState<DataOriginType>("json")
  const [jsonStr, setJsonStr] = useState(() => JSON.stringify(dataOrigin))

  const setDataOrigin = (jsonStr?: string) => {
    if (!jsonStr) return
    try {
      const newDataOrigin = JSON.parse(jsonStr)
      setJsonStr(jsonStr)
      onChange({
        dataOrigin: newDataOrigin,
      })
    } catch (err) {
      //
    }
  }

  const handleHtmlChange = (v?: string) => {
    try {
      const json = bookmarkHTMLString2json(v || "")
      setJsonStr(JSON.stringify(json))
      onChange({
        dataOrigin: json,
      })
    } catch (err) {
      //
    }
  }

  return (
    <div className="flex">
      <div>
        <div onClick={() => setType("json")}>json</div>
        <div onClick={() => setType("html")}>html</div>
      </div>
      <div className="flex-1 grid grid-cols-2">
        {type === "html" && (
          <div className="">
            <Editor language="html" onChange={handleHtmlChange}></Editor>
          </div>
        )}
        <div className="">
          <Editor language="json" value={jsonStr} onChange={setDataOrigin}></Editor>
        </div>
      </div>
    </div>
  )
}

export default DataOrigin
