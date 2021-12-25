import { useState } from "react"
import { AiOutlineQuestionCircle } from "react-icons/ai"

import {
  Modal,
  ModalContainer,
  ModalTitle,
  ModalBody,
} from "~/core/components/modal"

import type { FC } from "react"

export const Topbar: FC = ({}) => {
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false)

  const handleQuestionButtonClick = () => setIsQuestionModalOpen(true)
  const handleDescriptionModalClose = () => setIsQuestionModalOpen(false)

  const logoSrc = "/logo.svg"
  const brandTitle = "搜图姬"

  const brand = (
    <div className="flex justify-center items-baseline">
      <img src={logoSrc} alt="" />
      <span className="ml-1 text-white text-xl tracking-wider relative bottom-0.5">
        {brandTitle}
      </span>
    </div>
  )

  const questionButton = (
    <button onClick={handleQuestionButtonClick} className="m-4 text-white">
      <AiOutlineQuestionCircle className="inline" size={24} />
    </button>
  )

  const descriptionTitle = "搜图姬介绍"

  const description = (
    <div className="w-full">
      <div className="p-4 m-4 rounded-xl bg-sky-200 shadow">
        <p className="mb-1">本网站用于搜索 A-SOUL B站相关Tag下的动态图片</p>
        <p className="mb-1">
          图片搜索算法为pHash，所以有时搜到的图会不太准确，望谅解！
        </p>
      </div>
      <div className="p-4 m-4 rounded-xl bg-indigo-200 shadow">
        <p className="mb-1">
          作者：
          <a
            href="https://space.bilibili.com/32957695"
            target="_blank"
            className="hover:underline"
            rel="noreferrer"
          >
            晓轩iMIKU
          </a>
        </p>
      </div>
      <div className="p-4 m-4 rounded-xl bg-green-200 shadow">
        <p className="mb-1">version: {import.meta.env.VITE_APP_VERSION}</p>
      </div>
    </div>
  )

  return (
    <div className="w-screen h-16 px-4 fixed inset-0 flex justify-between items-center z-10">
      <div>{brand}</div>
      <div>
        {questionButton}
        <Modal isOpen={isQuestionModalOpen}>
          <ModalContainer onClick={handleDescriptionModalClose}>
            <ModalTitle
              title={descriptionTitle}
              onClose={handleDescriptionModalClose}
            />
            <ModalBody>{description}</ModalBody>
          </ModalContainer>
        </Modal>
      </div>
    </div>
  )
}
