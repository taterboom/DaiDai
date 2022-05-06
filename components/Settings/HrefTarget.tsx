import { useSettings } from "../../contexts/settings"

const HrefTarget: React.FC = () => {
  const {
    value: { hrefTarget },
    onChange,
  } = useSettings()
  return (
    <div>
      <div
        onClick={() =>
          onChange({
            hrefTarget: "_self",
          })
        }
      >
        当前Tab
      </div>
      <div
        onClick={() =>
          onChange({
            hrefTarget: "_blank",
          })
        }
      >
        新开Tab
      </div>
    </div>
  )
}

export default HrefTarget
