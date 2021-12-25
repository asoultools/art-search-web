import { useCallback, useState } from "react"
import type { UploadFileResponse } from "~/interfaces/api"
import { compressImage, uploadImage } from "./helpers"

export const useUpload = () => {
  const [res, setRes] = useState<UploadFileResponse | null>(null)

  const handleSuccess = useCallback((res: UploadFileResponse) => {
    setRes(res)
  }, [])

  const handleError = useCallback((err: unknown) => {
    setRes({
      code: -1,
      message: "服务器遇到了一些错误",
    })
    console.warn(err)
  }, [])

  const handleFinally = useCallback(
    (file: File) => {
      if (!gtag || !res) {
        return
      }
      if (res.code === 0) {
        const matchpics = res.data
          .map(item => `${item.detail.dynamic_id}_${item.detail.dynamic_index}`)
          .join(",")
        gtag("event", "search_pic_success", {
          filename: file.name,
          matchpics,
        })
      } else {
        gtag("event", "search_pic_error", {
          filename: file.name,
          message: res.message,
        })
      }
    },
    [res],
  )

  const upload = useCallback(
    (file: File) => {
      compressImage(file, 0.6)
        .then(file => uploadImage(file))
        .then(res => handleSuccess(res))
        .catch(err => handleError(err))
        .finally(() => handleFinally(file))
    },
    [handleError, handleFinally, handleSuccess],
  )

  const reset = () => {
    setRes(null)
  }
  return [res, upload, reset] as const
}
