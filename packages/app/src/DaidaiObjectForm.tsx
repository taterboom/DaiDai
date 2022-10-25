import { useUser } from "@supabase/auth-helpers-react"
import { toast } from "react-toastify"
import useDaiDaiStore from "./store/daidai"
import DaidaiObject from "./store/DaidaiObject"
import { TOAST_CONFIG } from "./utils/toast"
import Popup from "ui/src/Popup"
import ObjectEditor, { ObjectEditorProps, Result } from "./ObjectEditor/ObjectEditor"

const DaidaiObjectArea = (props: ObjectEditorProps) => {
  return (
    <div className="pannel w-[320px] popup:w-[400px] sm:w-[500px] md:w-[640px] lg:w-[768px] xl:w-[1024px]">
      <ObjectEditor {...props}></ObjectEditor>
    </div>
  )
}

export const DaidaiObjectCreator = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  const user = useUser()

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
  index,
}: {
  show: boolean
  onClose: () => void
  index?: number
}) => {
  const popupShow = show && index !== undefined
  const daidaiObject = useDaiDaiStore((state) =>
    index === undefined ? undefined : state.data[index]
  )
  const update = useDaiDaiStore((state) => state.update)
  return (
    <Popup show={popupShow} onClose={onClose} closeOnClickAway={false}>
      <DaidaiObjectArea
        editable
        initialValue={daidaiObject}
        onSubmit={(result) => {
          update(index!, new DaidaiObject(result)).then(
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
