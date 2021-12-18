
import { useRef, useState } from "react"
// import { unix } from "dayjs"

import { ImageUploadArea, ImageUploadInput, ImagePreview, ResultContent, ResultContentWithError, ResultContentFallBack } from "../components/Layout"
import { compressImage, uploadImage } from "../helpers/image"

import { useValidImage } from "./useValidImage"
import { useImagePreviewUrl } from "./useImagePreviewUrl"
import { useFileInput } from "./useFileInput"
import { useListenIsResultOpen } from "./useListenIsResultOpen"

import { Layout } from "../components"

import type { FC } from "react"
import type { UploadFileResponse } from "../interface"
import { Topbar, TopbarBrand, TopbarLeft, TopbarQuestionButton, TopbarRight } from "~/components/Topbar"
import {
  Container,
  Modal,
  ModalBody,
  ModalContainer,
  ModalTitle
} from "~/components"
import { Description } from "./Description"

export const App: FC = () => {
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false)

  const [file, setFile] = useState<File | null>(null)

  useValidImage(file, setFile, alert)


  const imagePreviewUrl = useImagePreviewUrl(file)

  const handleImagePreviewClose = () => setFile(null)


  const inputRef = useRef<HTMLInputElement>(null)

  const [handleInputChange, handleDragOver, handleDrop] = useFileInput(inputRef, file, setFile)


  const [isResultOpen, setIsResultOpen] = useState(false)

  const [res, setRes] = useState<UploadFileResponse | null>(null)

  const upload = (file: File) => compressImage(file, 0.6)
    .then(file => uploadImage(file))
    .then(res => setRes(res))

  useListenIsResultOpen(isResultOpen, file, upload, alert)

  const handleSearch = () => setIsResultOpen(true)
  const handleResultClose = () => setIsResultOpen(false)

  return (
    <Layout>
      <Topbar>
        <TopbarLeft>
          <TopbarBrand logo="/logo.svg" title="搜图姬" />
        </TopbarLeft>
        <TopbarRight>
          <TopbarQuestionButton onClick={() => setIsQuestionModalOpen(true)}>
            <Modal isOpen={isQuestionModalOpen}>
              <ModalContainer onClick={() => setIsQuestionModalOpen(false)}>
                <ModalTitle title="搜图姬介绍" onClose={() => setIsQuestionModalOpen(false)} />
                <ModalBody>
                  <Description />
                </ModalBody>
              </ModalContainer>
            </Modal>
          </TopbarQuestionButton>
        </TopbarRight>
      </Topbar>
      <Container>
        <ImageUploadArea>
          {file
            ? <ImagePreview src={imagePreviewUrl} onClose={handleImagePreviewClose} />
            : <ImageUploadInput inputRef={inputRef} onInputChange={handleInputChange} onDragOver={handleDragOver} onDrop={handleDrop} />
          }
        </ImageUploadArea>
        <div className="my-4 flex justify-center items-center">
          {/* <button className="px-8 py-2 mx-2 text-white bg-transparent border-2 border-white rounded-full" onClick={handleReset}>重置图片</button> */}
          <button className="px-8 py-2 mx-2 text-orange-600 bg-white border-2 border-white rounded-full" onClick={handleSearch}>搜索出处</button>
        </div>
        {file && (
          <Modal isOpen={isResultOpen}>
            <ModalContainer onClick={handleResultClose}>
              <ModalTitle title="搜索结果" onClose={handleResultClose} />
              <ModalBody>
                {res
                  ? "data" in res
                    ? <ResultContent file={file} res={res} />
                    : <ResultContentWithError file={file} res={res} />
                  : <ResultContentFallBack />
                }
              </ModalBody>
            </ModalContainer>
          </Modal>
          // <Result isOpen={isResultOpen} onClose={handleResultClose} >
          //   {res
          //     ? "data" in res
          //       ? <ResultContent file={file} res={res} />
          //       : <ResultContentWithError file={file} res={res} />
          //     : <ResultContentFallBack />
          //   }
          //   {/* <ResultContentFallBack /> */}
          // </Result>
        )}
      </Container>
    </Layout>
  )
}
