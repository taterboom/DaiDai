import { toast } from "react-toastify"
import useDaiDaiStore from "../store/daidai"
import DaidaiObject from "../store/DaidaiObject"
import { TOAST_CONFIG } from "../utils/toast"
import Popup from "./Common/Popup"
import ObjectEditor, { ObjectEditorProps, Result } from "./ObjectEditor/ObjectEditor"

const DaidaiObjectArea = (props: ObjectEditorProps) => {
  return (
    <div className="bg-neutral/30 w-[320px] sm:w-[500px] md:w-[640px] lg:w-[768px] xl:w-[1024px]">
      <ObjectEditor {...props}></ObjectEditor>
    </div>
  )
}

export const DaidaiObjectCreator = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  const add = useDaiDaiStore((state) => state.add)
  return (
    <Popup show={show} onClose={onClose} closeOnClickAway={false}>
      <DaidaiObjectArea
        editable
        onSubmit={(result) => {
          add(new DaidaiObject(result)).then(
            () => {
              toast.success("Success!", TOAST_CONFIG)
              onClose()
            },
            (e) => {
              toast.error("Faild!", TOAST_CONFIG)
              console.error("error:", e)
            }
          )
        }}
      ></DaidaiObjectArea>
    </Popup>
  )
}

export const DaidaiObjectEditor = ({
  show,
  onClose,
  id,
}: {
  show: boolean
  onClose: () => void
  id?: number
}) => {
  const popupShow = show && id !== undefined
  const daidaiObject = useDaiDaiStore((state) => (id === undefined ? undefined : state.data[id]))
  const update = useDaiDaiStore((state) => state.update)
  return (
    <Popup show={popupShow} onClose={onClose} closeOnClickAway={false}>
      <DaidaiObjectArea
        editable
        initialValue={daidaiObject}
        onSubmit={(result) => {
          update(id!, new DaidaiObject(result)).then(
            () => {
              toast.success("Success!", TOAST_CONFIG)
              onClose()
            },
            (e) => {
              toast.error("Faild!", TOAST_CONFIG)
              console.error("error: ", e)
            }
          )
        }}
      ></DaidaiObjectArea>
    </Popup>
  )
}
