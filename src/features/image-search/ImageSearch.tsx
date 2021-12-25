import { useState } from "react"

import { ResponsiveContainer } from "~/core/components/responsive-container"
import { useValidImage } from "./useValidImage"
import { Result } from "./result"
import { useUpload } from "./useUpload"
import { Input } from "./input"
import { SearchButton } from "./SearchButton"

import type { FC } from "react"

export const ImageSearch: FC = () => {
  const [file, setFile] = useState<File | null>(null)

  useValidImage(file, setFile, alert)

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
      <Input file={file} setFile={setFile}></Input>
      <SearchButton onSearch={handleSearch}></SearchButton>
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
