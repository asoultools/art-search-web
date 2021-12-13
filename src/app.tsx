
import { useMemo, useRef, useState } from "react"
import { Modal } from "./modal"

import type { RefObject, ChangeEvent, FC } from "react"

const Container: FC = ({ children }) => {
  return <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500">
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-5/6 h-full max-w-[48rem] max-h-[40rem] flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  </div>
}

type ImageUploadAreaProps = {
  imagePreviewSrc: string | null
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  inputRef: RefObject<HTMLInputElement>
}
const ImageUploadArea: FC<ImageUploadAreaProps> = ({ imagePreviewSrc, onInputChange, inputRef }) => {
  return (
    <div className="w-[20rem] h-[20rem] border-2 border-dashed border-white flex flex-col justify-center items-center">
      {imagePreviewSrc
        ? <img className="w-full h-full object-contain" id="preview" src={imagePreviewSrc} alt="your image" />
        : <label className="block w-full h-full flex justify-center items-center cursor-pointer" htmlFor="image-upload">
          <input type="file" id="image-upload" accept="image/*" style={{ display: "none" }} onChange={onInputChange} ref={inputRef} />
          <div className="w-[6rem] fill-white">
            <svg className="icon" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="8180" width="100%" height="100%">
              <path
                d="M518.3 459c-3.2-4.1-9.4-4.1-12.6 0l-112 141.7c-4.1 5.2-0.4 12.9 6.3 12.9h73.9V856c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V613.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 459z"
                p-id="8181"></path>
              <path
                d="M811.4 366.7C765.6 245.9 648.9 160 512.2 160S258.8 245.8 213 366.6C127.3 389.1 64 467.2 64 560c0 110.5 89.5 200 199.9 200H304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8h-40.1c-33.7 0-65.4-13.4-89-37.7-23.5-24.2-36-56.8-34.9-90.6 0.9-26.4 9.9-51.2 26.2-72.1 16.7-21.3 40.1-36.8 66.1-43.7l37.9-9.9 13.9-36.6c8.6-22.8 20.6-44.1 35.7-63.4 14.9-19.2 32.6-35.9 52.4-49.9 41.1-28.9 89.5-44.2 140-44.2s98.9 15.3 140 44.2c19.9 14 37.5 30.8 52.4 49.9 15.1 19.3 27.1 40.7 35.7 63.4l13.8 36.5 37.8 10C846.1 454.5 884 503.8 884 560c0 33.1-12.9 64.3-36.3 87.7-23.4 23.4-54.5 36.3-87.6 36.3H720c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h40.1C870.5 760 960 670.5 960 560c0-92.7-63.1-170.7-148.6-193.3z"
                p-id="8182"></path>
            </svg>
          </div>
        </label>
      }
    </div>
  )
}

type ButtonAreaProps = {
  onReset: () => void
  onSearch: () => void
}
export const ButtonArea: FC<ButtonAreaProps> = ({ onReset, onSearch }) => {
  return (
    <div className="my-4 flex justify-center items-center">
      <button className="px-8 py-2 mx-2 text-white bg-transparent border-2 border-white rounded-full" onClick={onReset}>重置图片</button>
      <button className="px-8 py-2 mx-2 text-orange-500 bg-white border-2 border-white rounded-full" onClick={onSearch}>搜索出处</button>
    </div>
  )
}

type ResultProps = {
  isOpen: boolean
  onClose: () => void
}

export const Result: FC<ResultProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full h-full flex flex-col justify-center items-center" >
        <div className="w-11/12 h-5/6 max-w-screen-md max-h-screen-sm bg-white shadow-md rounded-xl">
          <div className="w-full h-full flex flex-col items-center divide-y-2">
            <div className="w-full flex justify-between items-center">
              <h2 className="p-4 font-bold">
                搜索结果
              </h2>
              {/* <button className="w-14 h-14 flex justify-center items-center focus:outline-none" onClick={onClose} onKeyDown={onClose}><MdClose size={24}/></button>  */}
            </div>
            <div className="p-4 overflow-y-scroll">
            </div>
            <div className="w-full flex justify-center items-center">
              <div className="w-full max-w-sm p-4 flex justify-around items-center">
                <button className="w-36 mx-2 py-2 px-4 text-center bg-fuchsia-700 text-fuchsia-100 rounded-full border border-fuchsia-700 focus:outline-none" onClick={onClose}>
                  完成
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export const App: FC = () => {
  const [file, setFile] = useState<File | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setFile(files[0])
    }
  }

  const imagePreviewSrc = useMemo(() => file ? URL.createObjectURL(file) : null, [file])

  const [isResultOpen, setIsResultOpen] = useState(false)
  const handleResultClose = () => setIsResultOpen(false)
  const handleReset = () => {
    const input = inputRef.current
    if (input) {
      input.value = ""
    }
    setFile(null)
  }
  const handleSearch = () => {
    if (file) {
      const data = new FormData();
      data.append("file", file)
      setIsResultOpen(true)
    } else {
      alert("请选择图片！")
    }
  }

  return <>
    <Container>
      <ImageUploadArea onInputChange={handleInputChange} imagePreviewSrc={imagePreviewSrc} inputRef={inputRef} />
      <ButtonArea onReset={handleReset} onSearch={handleSearch} />
      <Result isOpen={isResultOpen} onClose={handleResultClose} />
    </Container>
  </>
}