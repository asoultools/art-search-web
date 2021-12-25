import { useRef, useState } from "react"

import { ResponsiveContainer } from "~/core/components/responsive-container"

import { useValidImage } from "./useValidImage"
import { useImagePreviewUrl } from "./useImagePreviewUrl"
import { useFileInput } from "./useFileInput"

import { AiOutlineCloudUpload, AiOutlineCloseCircle } from "react-icons/ai"

import type { FC, RefObject, ChangeEventHandler, DragEventHandler } from "react"

import { Result } from "./result"
import { useUpload } from "./useUpload"

type ImagePreviewProps = {
  src: string
  onClose: () => void
}

export const ImagePreview: FC<ImagePreviewProps> = ({ src, onClose }) => {
  return (
    <div className="w-full h-full relative">
      <img
        className="w-full h-full object-contain"
        id="preview"
        src={src}
        alt="preview"
      />
      <div className="w-full h-full absolute inset-0">
        <AiOutlineCloseCircle
          className="cursor-pointer fill-orange-400 bg-orange-200 rounded-full absolute -top-[14px] -right-[14px]"
          size={28}
          onClick={onClose}
        />
      </div>
    </div>
  )
}

type ImageUploadInputProps = {
  inputRef: RefObject<HTMLInputElement>
  onInputChange: ChangeEventHandler<HTMLInputElement>
  onDragOver: DragEventHandler<HTMLLabelElement>
  onDrop: DragEventHandler<HTMLLabelElement>
}

export const ImageUploadInput: FC<ImageUploadInputProps> = ({
  inputRef,
  onInputChange,
  onDragOver,
  onDrop,
}) => {
  return (
    <label
      className="block w-full h-full flex flex-col justify-center items-center cursor-pointer"
      htmlFor="image-upload"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <input
        type="file"
        id="image-upload"
        accept="image/jpg,image/jpeg,image/png,image/webp"
        style={{ display: "none" }}
        onChange={onInputChange}
        ref={inputRef}
      />
      <div className="w-[6rem] fill-white">
        <AiOutlineCloudUpload className="fill-white" size={96} />
      </div>
      <p className="text-white text-lg">(支持拖拽上传)</p>
    </label>
  )
}

export const ImageUploadArea: FC = ({ children }) => {
  return (
    <div className="w-[20rem] h-[20rem] aspect-square border-2 border-dashed border-white flex flex-col justify-center items-center">
      {children}
    </div>
  )
}

export const ImageSearch: FC = () => {
  const [file, setFile] = useState<File | null>(null)

  useValidImage(file, setFile, alert)

  const imagePreviewUrl = useImagePreviewUrl(file)

  const handleImagePreviewClose = () => setFile(null)

  const inputRef = useRef<HTMLInputElement>(null)

  const [handleInputChange, handleDragOver, handleDrop] = useFileInput(
    inputRef,
    file,
    setFile,
  )

  const [isResultOpen, setIsResultOpen] = useState(false)

  const [res, upload, reset] = useUpload()

  const handleSearch = () => {
    if (file) {
      setIsResultOpen(true)
      upload(file)
    } else {
      alert("请选择图片")
    }
  }

  const handleResultClose = () => {
    setIsResultOpen(false)
    reset()
  }

  return (
    <ResponsiveContainer>
      <ImageUploadArea>
        {file ? (
          <ImagePreview
            src={imagePreviewUrl}
            onClose={handleImagePreviewClose}
          />
        ) : (
          <ImageUploadInput
            inputRef={inputRef}
            onInputChange={handleInputChange}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        )}
      </ImageUploadArea>
      <div className="my-4 flex justify-center items-center">
        {/* <button className="px-8 py-2 mx-2 text-white bg-transparent border-2 border-white rounded-full" onClick={handleReset}>重置图片</button> */}
        <button
          className="px-8 py-2 mx-2 text-orange-600 bg-white border-2 border-white rounded-full"
          onClick={handleSearch}
        >
          搜索出处
        </button>
      </div>
      {file && (
        <Result
          isOpen={isResultOpen}
          onClose={handleResultClose}
          res={res}
        ></Result>
      )}
    </ResponsiveContainer>
  )
}
