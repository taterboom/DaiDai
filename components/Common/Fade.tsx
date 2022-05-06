import { Children, cloneElement, isValidElement, useRef } from "react"
import { Transition } from "react-transition-group"

const styles: any = {
  entering: {
    opacity: 1,
  },
  entered: {
    opacity: 1,
  },
}
const Fade: React.FC<{ in: boolean; children: React.ReactNode }> = ({ children, in: inProp }) => {
  const nodeRef = useRef()
  if (!isValidElement(children) || !Children.only(children)) return null
  return (
    <Transition in={inProp} timeout={200} nodeRef={nodeRef} unmountOnExit>
      {(state) =>
        cloneElement(children, {
          style: {
            opacity: 0,
            visibility: state === "exited" && !inProp ? "hidden" : undefined,
            ...styles[state],
            ...children.props.style,
          },
          ...children.props,
          ref: nodeRef,
        })
      }
    </Transition>
  )
}

export default Fade
