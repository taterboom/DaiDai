import { useRef } from "react"
import { useSettings } from "../../contexts/settings"

const HrefTarget: React.FC = () => {
  const blankRadioRef = useRef<HTMLInputElement>(null)
  const selfRadioRef = useRef<HTMLInputElement>(null)
  const {
    value: { hrefTarget },
    onChange,
  } = useSettings()

  return (
    <div
      className="inline-block"
      onChange={() => {
        onChange({
          hrefTarget: selfRadioRef.current?.checked ? "_self" : "_blank",
        })
      }}
    >
      <div className="mb-2 font-medium">Where to display the linked URL</div>
      <div className="inline-flex items-center rounded-lg">
        <input
          ref={blankRadioRef}
          type="radio"
          name="hrefTarget"
          id="hrefTargetBlank"
          checked={hrefTarget === "_blank"}
          value="_blank"
          className="peer h-4 w-4 border-gray-300"
        />
        <label htmlFor="hrefTargetBlank" className="ml-1">
          New Tab
        </label>
      </div>
      <div className="inline-flex items-center rounded-lg ml-4">
        <input
          ref={selfRadioRef}
          type="radio"
          name="hrefTarget"
          id="hrefTargetSelf"
          checked={hrefTarget === "_self"}
          value="_self"
          className="peer h-4 w-4 border-gray-300"
        />
        <label htmlFor="hrefTargetSelf" className="ml-1">
          Current Tab
        </label>
      </div>
    </div>
  )
}

export default HrefTarget
