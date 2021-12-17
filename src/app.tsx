
import { useEffect, useState } from "react"
// import { unix } from "dayjs"
import Compressor from 'compressorjs'

import type { FC } from "react"
import type { UploadFileResponse } from "./interface"
import { Container, Topbar, ImageUploadArea, ImageUploadInput, ImagePreview, Result, ResultContent, ResultContentWithError, ResultContentFallBack, } from "./components"

const validFileExtensions = [".jpg", ".jpeg", ".bmp", ".png", "webp"]

const imageUploadUrl = import.meta.env.VITE_APP_IMAGE_UPLOAD_URL

export const App: FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [isResultOpen, setIsResultOpen] = useState(false)
  const [uploadFileResponse, setUploadFileResponse] = useState<UploadFileResponse | null>(null)


  const handleResultClose = () => {
    setUploadFileResponse(null)
    setIsResultOpen(false)
  }

  const handleSearch = () => {
    if (file && !isResultOpen) {
      setUploadFileResponse(null)
      setIsResultOpen(true)
    } else {
      alert("请选择图片！")
    }
  }

  useEffect(() => {
    if (file) {
      const isImage = file.type.startsWith("image/")
      const isValidExt = validFileExtensions.some(ext => file.name.endsWith(ext))
      const isTooBig = file.size > 1024 * 1024 * 10

      if (!(isImage && isValidExt)) {
        alert("不支持的图片类型！")
        setFile(null)
      }
      if (isTooBig) {
        alert("不支持大于10MB的图片")
        setFile(null)
      }
    }
  }, [file])



  useEffect(() => {
    if (file && isResultOpen) {
      // mockFetch()
      // .then(res => setUploadFileResponse(res))
      new Compressor(file, {
        quality: 0.5,
        success: (result: File) => {
          const method = "POST"
          const body = new FormData()
          body.append("file", result)
          fetch(imageUploadUrl, { method, body })
            .then<UploadFileResponse>(res => res.json())
            .then(res => setUploadFileResponse(res))
            .catch(err => {
              setUploadFileResponse({
                code: 0,
                message: "服务器遇到了一些问题"
              })
            })
        }
      })

    }
  }, [file, isResultOpen])
  return (<>
    <Topbar />
    <Container>
      <ImageUploadArea>
        {file
          ? <ImagePreview file={file} setFile={setFile} />
          : <ImageUploadInput file={file} setFile={setFile} />
        }
      </ImageUploadArea>
      <div className="my-4 flex justify-center items-center">
        {/* <button className="px-8 py-2 mx-2 text-white bg-transparent border-2 border-white rounded-full" onClick={handleReset}>重置图片</button> */}
        <button className=" px-8 py-2 mx-2 text-orange-600 bg-white border-2 border-white rounded-full" onClick={handleSearch}>搜索出处</button>
      </div>
      {file && (
        <Result isOpen={isResultOpen} onClose={handleResultClose} >
          {uploadFileResponse
            ? "data" in uploadFileResponse
              ? <ResultContent file={file} res={uploadFileResponse} />
              : <ResultContentWithError file={file} res={uploadFileResponse} />
            : <ResultContentFallBack />
          }
          {/* <ResultContentFallBack /> */}
        </Result>
      )}
    </Container>
  </>)
}

