import ClickAway from "./ClickAway"
import Fade from "./Fade"
import Portal from "./Portal"

const Popup: React.FC<{ show: boolean; children: React.ReactNode; onClose?: () => void }> = ({
  children,
  show,
  onClose,
}) => {
  return (
    <Portal>
      <Fade in={show}>
        <div className="fixed inset-0 bg-white/30 backdrop-blur-2xl">
          <ClickAway onClickAway={() => show && onClose?.()}>{children}</ClickAway>
        </div>
      </Fade>
    </Portal>
  )
}

export default Popup
