import type { CSSProperties, FC, MouseEventHandler } from "react"
import { useRef } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { Transition } from "react-transition-group"

const wrapperStyles: CSSProperties = {
  height: "100vh",
  width: "100vw",
  position: "fixed",
  top: 0,
  left: 0,
}

const wrapperTransitionStyles: Record<string, CSSProperties> = {
  entering: { visibility: "visible" },
  entered: { visibility: "visible" },
  exiting: { visibility: "visible" },
  exited: { visibility: "hidden" },
}

type WrapperTransitionStatus = keyof typeof wrapperTransitionStyles

const backgroundStyles: CSSProperties = {
  height: "100vh",
  width: "100%",
  backgroundColor: "rgba(0, 0, 0, .3)",
  transition: "opacity 400ms cubic-bezier(0.165, 0.840, 0.440, 1.000)",
}

const backgroundTransitionStyles: Record<string, CSSProperties> = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
}

type BackgroundTransitionStatus = keyof typeof backgroundTransitionStyles

const modalStyles: CSSProperties = {
  height: "100%",
  width: "100%",
  transition: "transform 400ms cubic-bezier(0.165, 0.840, 0.440, 1.000)",
}

const modalTransitionStyles: Record<string, CSSProperties> = {
  entering: { transform: "translateY(0%)" },
  entered: { transform: "translateY(0%)" },
  exiting: { transform: "translateY(50%)" },
  exited: { transform: "translateY(50%)" },
}

type ModalTransitionStatus = keyof typeof modalTransitionStyles

type ModalProps = {
  isOpen: boolean
}

export const Modal: FC<ModalProps> = ({ children, isOpen }) => {
  const refWrapper = useRef(null)
  const refBackground = useRef(null)
  const refModal = useRef(null)
  return (
    <Transition in={isOpen} timeout={400} nodeRef={refWrapper}>
      {(state: WrapperTransitionStatus) => (
        <div
          ref={refWrapper}
          style={{ ...wrapperStyles, ...wrapperTransitionStyles[state] }}
        >
          <Transition in={isOpen} timeout={400} nodeRef={refBackground}>
            {(state: BackgroundTransitionStatus) => (
              <div
                ref={refBackground}
                style={{
                  ...backgroundStyles,
                  ...backgroundTransitionStyles[state],
                }}
              >
                <Transition in={isOpen} timeout={400} nodeRef={refModal}>
                  {(state: ModalTransitionStatus) => (
                    <div
                      ref={refModal}
                      style={{
                        ...modalStyles,
                        ...modalTransitionStyles[state],
                      }}
                    >
                      {children}
                    </div>
                  )}
                </Transition>
              </div>
            )}
          </Transition>
        </div>
      )}
    </Transition>
  )
}

type ModalContainerProps = {
  onClick: () => void
}

export const ModalContainer: FC<ModalContainerProps> = ({
  children,
  onClick,
}) => {
  return (
    <div
      className="w-full h-full flex flex-col justify-end md:justify-center items-center"
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="w-full h-[85vh] max-w-[40rem] max-h-[40rem] bg-white shadow-md rounded-2xl md:rounded">
        <div className="w-full h-full flex flex-col items-center divide-y-2">
          {children}
        </div>
      </div>
    </div>
  )
}

type ModalTitleProps = {
  title: string
  onClose: MouseEventHandler
}
export const ModalTitle: FC<ModalTitleProps> = ({ title, onClose }) => {
  return (
    <div className="w-full flex justify-between items-center">
      <h2 className="p-4 font-bold">{title}</h2>
      <button
        className="w-14 h-14 flex justify-center items-center focus:outline-none"
        onClick={onClose}
      >
        <AiOutlineClose size={18} />
      </button>
    </div>
  )
}

export const ModalBody: FC = ({ children }) => {
  return (
    <div className="w-full overflow-y-scroll flex flex-col justify-center items-center">
      {children}
    </div>
  )
}
