import { useEffect } from "react"

import type { RefObject, Dispatch, DragEvent, ChangeEvent } from "react"

export const useFileInput = (inputRef: RefObject<HTMLInputElement>, file: File | null, setFile: Dispatch<File | null>) => {
  const input = inputRef.current

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files
    if (inputFiles && inputFiles.length > 0) {
      setFile(inputFiles[0])
    }
  }

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setFile(e.dataTransfer.files[0])
  }

  useEffect(() => {
    if (input && !file) {
      input.value = ""
    }
  }, [input, file])

  return [handleInputChange, handleDragOver, handleDrop] as const
}