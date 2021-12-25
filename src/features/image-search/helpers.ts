import Compressor from "compressorjs"
import type { UploadFileResponse } from "~/interfaces/api"

export const compressImage = (file: File, quality: number): Promise<File> => {
  return new Promise((resolve, reject) => {
    const success = (file: File) => resolve(file)
    const error = (err: Error) => reject(err)
    new Compressor(file, { quality, success, error })
  })
}

export const uploadImage = async (file: File): Promise<UploadFileResponse> => {
  const url = `${import.meta.env.VITE_APP_API_BASE_URL}/api/uploadfile`
  const method = "POST"
  const body = new FormData()
  body.append("file", file)
  return fetch(url, {
    method,
    body,
  }).then(res => res.json()) as Promise<UploadFileResponse>
}
