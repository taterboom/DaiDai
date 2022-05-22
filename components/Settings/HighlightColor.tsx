import { useSettings } from "../../contexts/settings"

const HighlightColor: React.FC = () => {
  const {
    value: { highlightColor },
    onChange,
  } = useSettings()
  return (
    <div>
      <div className="mb-2 flex items-center select-none font-medium">
        <span>Tag Highlight</span>
      </div>
      <div className="flex items-center">
        <div
          className="w-8 h-8 mr-2 rounded-full border border-gray-300"
          style={{ backgroundColor: highlightColor }}
        ></div>
        <input
          type="text"
          name="highlightcolor"
          value={highlightColor}
          onChange={(e) => onChange({ highlightColor: e.target.value })}
          className="px-4 py-1 rounded-lg border border-gray-300 focus:outline-none focus:shadow-ios"
        />
      </div>
    </div>
  )
}

export default HighlightColor
