import { useEffect } from "react"

export const useListenIsResultOpen = (isResultOpen: boolean, file: File | null, onSuccess: (file: File) => void, onError: (msg: string) => void) => {
  useEffect(() => {
    if (isResultOpen) {
      if (file) {
        onSuccess(file)
      } else {
        onError("请选择图片！")
      }
    }
  }, [isResultOpen])
}