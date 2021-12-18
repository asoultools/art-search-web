
import { ChangeEventHandler, DragEventHandler, RefObject, useEffect } from "react"
// import { unix } from "dayjs"
import { AiOutlineCloudUpload, AiOutlineLink, AiOutlineCloseCircle } from "react-icons/ai"

import type { FC } from "react"
import type { UploadFileResponseSuccess, UploadFileResponseError } from "../interface"


export const Layout: FC = ({ children }) => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500">
      {children}
    </div>
  )
}


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
        alt="your image"
      />
      <div className="w-full h-full absolute inset-0">
        <AiOutlineCloseCircle className="cursor-pointer fill-orange-400 bg-orange-200 rounded-full absolute -top-[14px] -right-[14px]" size={28} onClick={onClose} />
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

export const ImageUploadInput: FC<ImageUploadInputProps> = ({ inputRef, onInputChange, onDragOver, onDrop }) => {

  return (
    <label
      className="block w-full h-full flex flex-col justify-center items-center cursor-pointer"
      htmlFor="image-upload"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <input type="file" id="image-upload" accept="image/jpg,image/jpeg,image/png,image/webp" style={{ display: "none" }} onChange={onInputChange} ref={inputRef} />
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

type ProgressCircle = {
  progress: number
}

export const ProgressCircle: FC<ProgressCircle> = ({ progress }) => {
  return (
    <div className="w-12 h-12 relative">
      <svg className="-rotate-90" width="100%" height="100%" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" strokeWidth="12" />
        <circle cx="60" cy="60" r="54" fill="none" stroke="#f77a52" strokeWidth="12" pathLength="100" strokeDasharray={100} strokeDashoffset={100 - progress} />
      </svg>
      <div className="w-full h-full absolute inset-0 flex justify-center items-center">
        <span className="text-orange-700 text-[12px]">{`${progress.toFixed(0)}%`}</span>
      </div>
    </div>
  )
}

type ResultContentProps = {
  file: File
  res: UploadFileResponseSuccess
}

export const ResultContent: FC<ResultContentProps> = ({ res, file }) => {
  const matchpics = res.data
    .map(item => `${item.detail.dynamic_id}_${item.detail.dynamic_index}`)
    .join(",")

  useEffect(() => {
    if (gtag) {
      gtag("event", "search_pic_success", {
        filename: file.name,
        matchpics
      })
    }
  }, [])
  return (
    <div className="w-full h-full">
      {res.data.map(item => (
        <div className="m-4 bg-orange-200 rounded-xl overflow-hidden shadow flex" key={item.detail.dynamic_id}>
          <div className="flex-none w-24 h-24 relative">
            <img src={item.detail.src_url + "@96w_96h_1c_100q.webp"} alt="" />
          </div>
          <div className="p-2 flex-auto flex flex-col justify-between">
            <p className="mt-1 line-clamp-2 break-all text-sm text-orange-700 hover:underline underline-offset-2">
              <a href={`https://t.bilibili.com/${item.detail.dynamic_id}`} target="_blank">
                <span className="font-bold">@{item.detail.author_name}: </span>
                <span className="">{item.detail.content}</span>
              </a>
            </p>

            <div className="flex justify-between items-center">
              <a className="text-orange-700 text-sm" href={item.detail.src_url} target="_blank">
                <AiOutlineLink className="inline" size={18} />
                <span className="relative top-[1px]">高清原图</span>
              </a>
            </div>
          </div>
          <div className="flex-none w-[4rem] h-24 relative flex justify-center items-center">
            <ProgressCircle progress={item.similarity * 100}></ProgressCircle>
          </div>
        </div>
      ))}
    </div >
  )
}

type ResultContentWithErrorProps = {
  file: File
  res: UploadFileResponseError
}

export const ResultContentWithError: FC<ResultContentWithErrorProps> = ({ res, file }) => {
  useEffect(() => {
    if (gtag) {
      gtag("event", "search_pic_error", {
        filename: file.name,
        message: res.message
      })
    }
  }, [])
  return (
    <div className="w-full h-full p-4">
      <div className="p-4 bg-red-200 rounded-xl text-red-500">
        {res.message}
      </div>
    </div >
  )
}

export const ResultContentFallBack: FC = ({ }) => {
  return (
    <div className="w-full h-full">
      {[0, 1, 2, 3].map((item, index) => (
        <div className="animate-pulse m-4 bg-orange-200 rounded-xl overflow-hidden shadow flex" key={index}>
          <div className="flex-none w-24 h-24 bg-orange-100"></div>
          <div className="flex-auto flex">
            <div className="p-4 flex-auto flex flex-col justify-between">
              <div className="">
                <p className="h-2 my-2 bg-orange-300"></p>
                <p className="h-2 my-2 bg-orange-300"></p>
              </div>
              <div className="">
                <p className="w-12 h-2 my-2 bg-orange-300"></p>
              </div>
            </div>
            <div className="flex-none flex w-[4rem] h-24 justify-center items-center">
              <ProgressCircle progress={0} />
            </div>
          </div>
        </div>))}
    </div>
  )
}

