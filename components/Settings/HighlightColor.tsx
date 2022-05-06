import { useSettings } from "../../contexts/settings"

const HighlightColor: React.FC = () => {
  const {
    value: { highlightColor },
    onChange,
  } = useSettings()
  return <div className="w-12 h-4" style={{ backgroundColor: highlightColor }}></div>
}

export default HighlightColor
