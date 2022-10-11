import { toast } from "react-toastify"
import useDaiDaiStore from "./store/daidai"
import { TOAST_CONFIG } from "./utils/toast"
import Button from "ui/src/Button"
import Popup from "ui/src/Popup"

type DaidaiObjectDeleterProps = {
  show: boolean
  onClose: () => void
  index?: number
}

const DaidaiObjectDeleter = (props: DaidaiObjectDeleterProps) => {
  const popupShow = props.show && props.index !== undefined
  const remove = useDaiDaiStore((state) => state.remove)

  return (
    <Popup show={popupShow} onClose={props.onClose} closeOnClickAway={false}>
      <div className="pannel">
        <p className="font-bold text-xl mb-2">Are you sure to delete this?</p>
        <div className="flex justify-end gap-4">
          <Button className="opacity-70 btn-outline" onClick={() => props.onClose()}>
            No
          </Button>
          <Button
            className="!btn-error"
            onClick={() => {
              remove(props.index!).then(
                () => {
                  toast.success("Success!", TOAST_CONFIG)
                  props.onClose()
                },
                (e) => {
                  toast.error("Faild!", TOAST_CONFIG)
                  console.error("error: ", e)
                }
              )
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
