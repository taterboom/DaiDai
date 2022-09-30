import useDaiDaiStore from "../store/daidai"
import Button from "./Common/Button"
import Popup from "./Common/Popup"

type DaidaiObjectDeleterProps = {
  show: boolean
  onClose: () => void
  id?: number
}

const DaidaiObjectDeleter = (props: DaidaiObjectDeleterProps) => {
  const popupShow = props.show && props.id !== undefined
  const remove = useDaiDaiStore((state) => state.remove)

  return (
    <Popup show={popupShow} onClose={props.onClose}>
      <div className="p-4 bg-neutral/30 ">
        <p className="font-bold text-xl mb-2">Are you sure to delete this?</p>
        <div className="flex justify-end gap-4">
          <Button className="opacity-70" onClick={() => props.onClose()}>
            No
          </Button>
          <Button
            onClick={() => {
              remove(props.id!)
              props.onClose()
            }}
          >
            Yes
          </Button>
        </div>
      </div>
    </Popup>
  )
}

export default DaidaiObjectDeleter
