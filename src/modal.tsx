import type { CSSProperties, FC, MouseEvent } from "react"
import { useRef } from "react"
import { Transition } from "react-transition-group"

const wrapperStyles: CSSProperties = {
  height: "100vh",
  width: "100vw",
  position: "fixed",
  top: 0,
  left: 0
}

const wrapperTransitionStyles: Record<string, CSSProperties> = {
  entering: { visibility: "visible" },
  entered: { visibility: "visible" },
  exiting: { visibility: "visible" },
  exited: { visibility: "hidden" }
}

type WrapperTransitionStatus = keyof (typeof wrapperTransitionStyles)

const backgroundStyles: CSSProperties = {
  height: "100vh",
  width: "100%",
  backgroundColor: "rgba(0, 0, 0, .3)",
  transition: "opacity 400ms cubic-bezier(0.165, 0.840, 0.440, 1.000)"

}

const backgroundTransitionStyles: Record<string, CSSProperties> = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
}

type BackgroundTransitionStatus = keyof (typeof backgroundTransitionStyles)

const modalStyles: CSSProperties = {
  height: "100%",
  width: "100%",
  transition: "transform 400ms cubic-bezier(0.165, 0.840, 0.440, 1.000)"
}

const modalTransitionStyles: Record<string, CSSProperties> = {
  entering: { transform: "translateY(0%)" },
  entered: { transform: "translateY(0%)" },
  exiting: { transform: "translateY(50%)" },
  exited: { transform: "translateY(50%)" }
}

type ModalTransitionStatus = keyof (typeof modalTransitionStyles)

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
  const refWrapper = useRef(null)
  const refBackground = useRef(null)
  const refModal = useRef(null)
  return (
    <Transition in={isOpen} timeout={400} nodeRef={refWrapper}>
      {(state: WrapperTransitionStatus) => <div ref={refWrapper} style={{ ...wrapperStyles, ...wrapperTransitionStyles[state] }} >
        <Transition in={isOpen} timeout={400} nodeRef={refBackground}>
          {(state: BackgroundTransitionStatus) => <div ref={refBackground} style={{ ...backgroundStyles, ...backgroundTransitionStyles[state] }}>
            <Transition in={isOpen} timeout={400} nodeRef={refModal}>
              {(state: ModalTransitionStatus) => <div ref={refModal} style={{ ...modalStyles, ...modalTransitionStyles[state] }}>
                {children}
              </div>}
            </Transition>
          </div>}
        </Transition>
      </div>}
    </Transition>
  )
}
