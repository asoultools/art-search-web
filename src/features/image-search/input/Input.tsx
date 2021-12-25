import { useMemo, useRef } from "react"

import type { Dispatch, FC } from "react"
import { useFileInput } from "./useFileInput"
import { AiOutlineCloseCircle, AiOutlineCloudUpload } from "react-icons/ai"
import { ImagePreview } from "./ImagePreview"

type InputProps = {
  file: File | null
  setFile: Dispatch<File | null>
}

export const Input: FC<InputProps> = ({ file, setFile }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [handleInputChange, handleDragOver, handleDrop] = useFileInput(
    inputRef,
    file,
    setFile,
  )

  const imagePreviewSrc = useMemo(
    () => (file ? URL.createObjectURL(file) : "#"),
    [file],
  )

  return (
    <>
      <div className="w-[20rem] h-[20rem] aspect-square border-2 border-dashed border-white flex flex-col justify-center items-center relative">
        {file && <ImagePreview src={imagePreviewSrc}></ImagePreview>}
        <label
          className="block w-full h-full flex flex-col justify-center items-center cursor-pointer"
          htmlFor="image-upload"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="image-upload"
            accept="image/jpg,image/jpeg,image/png,image/webp"
            style={{ display: "none" }}
            onChange={handleInputChange}
            ref={inputRef}
          />

          <div className="w-[6rem] fill-white">
            <AiOutlineCloudUpload className="fill-white" size={96} />
          </div>
          <p className="text-white text-lg">(支持拖拽上传)</p>
        </label>
        <AiOutlineCloseCircle
          className="cursor-pointer fill-orange-400 bg-orange-200 rounded-full absolute -top-[14px] -right-[14px]"
          size={28}
          onClick={() => setFile(null)}
        />
      </div>
    </>
  )
}
