import { Dispatch, useEffect } from "react"

const validFileExtensions = [".jpg", ".jpeg", ".png", "webp"]

export const useValidImage = (file: File | null, setFile: Dispatch<File | null>, onNotValid: (msg: string) => void) => {

  useEffect(() => {
    if (file) {
      const isImage = file.type.startsWith("image/")
      const isValidExt = validFileExtensions.some(ext => file.name.endsWith(ext))
      const isTooBig = file.size > 1024 * 1024 * 10

      if (!(isImage && isValidExt)) {
        // todo: order
        onNotValid("不支持的图片类型")
        setFile(null)
      }
      if (isTooBig) {
        onNotValid("不支持大于10MB的图片")
        setFile(null)
      }
    }
  }, [file, setFile, onNotValid])
}




