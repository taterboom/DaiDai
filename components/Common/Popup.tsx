import React from "react"
import Button from "./Button"
import ClickAway from "./ClickAway"
import Fade from "./Fade"
import { IcRoundClose } from "./icons"
import Portal from "./Portal"

const Popup: React.FC<{
  show: boolean
  closeIcon?: React.ReactElement
  centerX?: boolean
  centerY?: boolean
  children: React.ReactNode
  closeOnClickAway?: boolean
  closeable?: boolean
  onClose?: () => void
}> = ({
  children,
  show,
  closeIcon = <IcRoundClose />,
  closeOnClickAway = false,
  closeable = true,
  centerX = true,
  centerY = true,
  onClose,
}) => {
  const body = (
    <div className="relative">
      {closeable && (
        <Button className="text-2xl" rounded onClick={() => show && onClose?.()}>
          {closeIcon}
        </Button>
      )}
      {children}
    </div>
  )
  return (
    <Portal>
      <Fade in={show}>
        <div
          className={`fixed inset-0 flex ${centerY ? "items-center" : ""} ${
            centerX ? "justify-center" : ""
          } bg-white/30 backdrop-blur-2xl overflow-auto py-4`}
        >
          {closeOnClickAway ? (
            <ClickAway onClickAway={() => show && onClose?.()}>{body}</ClickAway>
          ) : (
            body
          )}
        </div>
      </Fade>
    </Portal>
  )
}

export default Popup
