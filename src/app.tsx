
import { useEffect, useMemo, useRef, useState } from "react"
// import { unix } from "dayjs"
import { AiOutlineCloudUpload, AiOutlineClose, AiOutlineLink, AiOutlineQuestionCircle, AiOutlineCloseCircle } from "react-icons/ai"
import { Modal } from "./modal"
import Compressor from 'compressorjs'

import type { FC, ChangeEvent, MouseEvent } from "react"
import type { UploadFileResponse, UploadFileResponseSuccess, UploadFileResponseError } from "./interface"

const validFileExtensions = [".jpg", ".jpeg", ".bmp", ".png", "webp"]

const Topbar: FC = ({ }) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)
  const handleDescriptionClose = () => setIsDescriptionOpen(false)
  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleDescriptionClose()
    }
  }
  return (
    <div className="w-screen h-16 px-4 fixed inset-0 flex justify-between items-center z-10">
      <div className="text-white">
        <div className="flex justify-center items-baseline">
          <svg className="inline" height="24" viewBox="0 0 102 39" fill="" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.3431 26.5747H32.9367L19.5976 0L4.33245 30.4093L0 39H10.5953L14.0837 32.0841L19.5976 21.1093L22.3431 26.5747Z" fill="#ffffff" />
            <path d="M42.2637 2.21238C36.4344 2.21238 31.6923 7.04446 31.6923 12.9922V13.1812C31.6782 15.3523 32.3212 17.4754 33.5342 19.2636C33.9209 19.8771 34.3717 20.4464 34.8789 20.9617L34.8976 20.9807C36.8686 22.9286 39.5129 24.0152 42.2637 24.0076H54.0498C54.7537 24.0135 55.4271 24.2999 55.925 24.8051C56.4228 25.3103 56.7052 25.9938 56.7112 26.7084C56.7019 27.4219 56.4185 28.1036 55.9214 28.6081C55.4243 29.1126 54.7527 29.4 54.0498 29.4092L19.3698 29.5032L14.7152 38.9586H54.383C54.4306 38.9482 54.4995 38.9327 54.5811 38.9128C59.5255 37.729 65.7951 33.079 66.1121 26.7886C66.2864 23.332 64.606 20.5251 63.3922 18.9365L63.3284 18.8554L63.2553 18.7812C63.2426 18.7683 63.206 18.7234 63.1796 18.6949C63.115 18.6155 63.0284 18.5111 62.9179 18.3946C61.785 17.1411 60.4081 16.1401 58.8742 15.4551C57.3403 14.77 55.683 14.4159 54.0073 14.4151H42.2637C41.9549 14.4111 41.6598 14.2848 41.4413 14.0632C41.2229 13.8416 41.0983 13.5421 41.0941 13.2286V13.0388C41.0996 12.725 41.2252 12.4257 41.4443 12.2042C41.6634 11.9828 41.9588 11.8566 42.2679 11.8524L97.2502 11.7186L102 2.25639L42.2637 2.21238Z" fill="#ffffff" />
            <path d="M68.2108 25.3762V38.9586H77.6339L77.6603 25.3762C77.6642 25.0627 77.7886 24.7631 78.0069 24.5414C78.2252 24.3196 78.5202 24.1931 78.829 24.1888H90.9908L95.8052 14.5972H78.7823C72.953 14.5972 68.2108 19.4327 68.2108 25.3762Z" fill="#ffffff" />
          </svg>
          <span className="ml-1 text-xl tracking-wider relative bottom-0.5">搜图姬</span>
        </div>
      </div>
      <div>
        <button onClick={() => setIsDescriptionOpen(true)} className="m-4 text-white"><AiOutlineQuestionCircle className="inline" size={24} /></button>
        <Modal isOpen={isDescriptionOpen} onClose={handleDescriptionClose}>
          <div className="w-full h-full flex flex-col justify-end md:justify-center items-center" onClick={handleModalClick} >
            <div className="w-full h-[85vh] max-w-[40rem] max-h-[40rem] bg-white shadow-md rounded-2xl md:rounded">
              <div className="w-full h-full flex flex-col items-center divide-y-2">
                <div className="w-full flex justify-between items-center">
                  <h2 className="p-4 font-bold">
                    搜图姬介绍
                  </h2>
                  <button className="w-14 h-14 flex justify-center items-center focus:outline-none" onClick={handleDescriptionClose} onKeyDown={handleDescriptionClose}><AiOutlineClose size={18} /></button>
                </div>
                <div className="w-full overflow-y-scroll flex flex-col justify-center items-center">
                  <div className="w-full">
                    <div className="p-4 m-4 rounded-xl bg-sky-200 shadow">
                      <p className="mb-1">
                        本网站用于搜索 A-SOUL B站相关Tag下的动态图片
                      </p>
                      <p className="mb-1">
                        图片搜索算法为pHash，所以有时搜到的图会不太准确，望谅解！
                      </p>
                    </div>
                    <div className="p-4 m-4 rounded-xl bg-indigo-200 shadow">
                      <p className="mb-1">
                        作者：<a href="https://space.bilibili.com/32957695" target="_blank" className="hover:underline">晓轩iMIKU</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div >
  )
}

const BottomBar: FC = ({ }) => {
  return (
    <div className="w-screen h-16 px-4 fixed inset-x-0 bottom-0 flex justify-center items-center">
      <div className="text-orange-300">
        <p className="m-4">version: {import.meta.env.VITE_APP_VERSION}</p>

      </div>
    </div>
  )
}
import.meta.env.VITE_APP_VERSION

const Container: FC = ({ children }) => {
  return <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500">
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-5/6 h-full max-w-[48rem] max-h-[40rem] flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  </div>
}
type ImagePreviewProps = {
  file: File
  setFile: (file: File | null) => void
}
const ImagePreview: FC<ImagePreviewProps> = ({ file, setFile }) => {
  const src = useMemo(() => file ? URL.createObjectURL(file) : "#", [file])

  const handleClose = () => setFile(null)

  return (
    <div className="w-full h-full relative">
      <img
        className="w-full h-full object-contain"
        id="preview"
        src={src}
        alt="your image"
      />
      <div className="w-full h-full absolute inset-0">
        <AiOutlineCloseCircle className="cursor-pointer fill-orange-400 bg-orange-200 rounded-full absolute -top-[14px] -right-[14px]" size={28} onClick={handleClose} />
      </div>
    </div>
  )
}

type ImageUploadInputProps = {
  file: File | null
  setFile: (file: File) => void
}

const ImageUploadInput: FC<ImageUploadInputProps> = ({ file, setFile }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const input = inputRef.current
    if (input && !file) {
      input.value = ""
    }
  }, [file, inputRef])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files
    if (inputFiles && inputFiles.length > 0) {
      setFile(inputFiles[0])
    }
  }


  return (
    <label
      className="block w-full h-full flex flex-col justify-center items-center cursor-pointer"
      htmlFor="image-upload"
      onDragOver={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onDrop={(e) => {
        e.preventDefault()
        e.stopPropagation()
        setFile(e.dataTransfer.files[0])
      }}
    >
      <input type="file" id="image-upload" accept="image/jpg,image/jpeg,image/png,image/webp" style={{ display: "none" }} onChange={handleInputChange} ref={inputRef} />
      <div className="w-[6rem] fill-white">
        <AiOutlineCloudUpload className="fill-white" size={96} />
      </div>
      <p className="text-white text-lg">(支持拖拽上传)</p>
    </label>
  )
}

const ImageUploadArea: FC = ({ children }) => {
  return (
    <div className="w-[20rem] h-[20rem] aspect-square border-2 border-dashed border-white flex flex-col justify-center items-center">
      {children}
    </div>
  )
}

type ProgressCircle = {
  progress: number
}

const ProgressCircle: FC<ProgressCircle> = ({ progress }) => {
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

const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max)



type ResultContentProps = {
  file: File
  res: UploadFileResponseSuccess
}

const ResultContent: FC<ResultContentProps> = ({ res, file }) => {
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

const ResultContentWithError: FC<ResultContentWithErrorProps> = ({ res, file }) => {
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

const ResultContentFallBack: FC = ({ }) => {
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

type ResultProps = {
  isOpen: boolean
  onClose: () => void
}

export const Result: FC<ResultProps> = ({ isOpen, onClose, children }) => {
  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full h-full flex flex-col justify-end md:justify-center items-center" onClick={handleModalClick} >
        <div className="w-full h-[85vh] max-w-[40rem] max-h-[40rem] bg-white shadow-md rounded-t-2xl md:rounded">
          <div className="w-full h-full flex flex-col items-center divide-y-2">
            <div className="w-full flex justify-between items-center">
              <h2 className="p-4 font-bold">
                搜索结果
              </h2>
              <button className="w-14 h-14 flex justify-center items-center focus:outline-none" onClick={onClose} onKeyDown={onClose}><AiOutlineClose size={18} /></button>
            </div>
            <div className="w-full overflow-y-scroll flex flex-col justify-center items-center">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

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
    <BottomBar />
  </>)
}

