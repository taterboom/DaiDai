import React, { useEffect } from "react"
import Button from "./Button"
import ClickAway from "./ClickAway"
import Fade from "./Fade"
import { IcRoundClose } from "./icons"
import Portal from "./Portal"
import clsx from "classnames"

const usePreventScroll = (on: boolean) => {
  useEffect(() => {
    if (on) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.removeProperty("overflow")
      }
    }
  }, [on])
}

const Popup: React.FC<{
  show: boolean
  closeIcon?: React.ReactElement
  centerX?: boolean
  centerY?: boolean
  children: React.ReactNode
  closeOnClickAway?: boolean
  closeable?: boolean
  className?: string
  wrapperClassName?: string
  onClose?: () => void
}> = ({
  children,
  show,
  closeIcon = <IcRoundClose />,
  closeOnClickAway = false,
  closeable = true,
  centerX = true,
  centerY = true,
  wrapperClassName,
  className,
  onClose,
}) => {
  usePreventScroll(show)
  const body = (
    <div className={clsx(`relative`, wrapperClassName)}>
      {closeable && (
        <div className="absolute left-0 -top-2 -translate-y-full -translate-x-1/2 text-2xl">
          <Button rounded onClick={() => show && onClose?.()}>
            {closeIcon}
          </Button>
        </div>
      )}
      {children}
    </div>
  )
  return (
    <Portal>
      <Fade in={show}>
        <div
          className={clsx(
            `fixed inset-0 bg-white/30 backdrop-blur-2xl overflow-auto py-4 flex`,
            centerX && "justify-center",
            centerY && "items-center",
            className
          )}
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
