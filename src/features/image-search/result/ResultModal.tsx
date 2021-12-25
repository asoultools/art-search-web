import {
  Modal,
  ModalBody,
  ModalContainer,
  ModalTitle,
} from "~/core/components/modal"

import type { FC } from "react"

type ResultModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const ResultModal: FC<ResultModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalContainer onClick={onClose}>
        <ModalTitle title="搜索结果" onClose={onClose} />
        <ModalBody>{children}</ModalBody>
      </ModalContainer>
    </Modal>
  )
}
