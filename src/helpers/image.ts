import Compressor from 'compressorjs'

import type { UploadFileResponse } from "../interface"

export const compressImage = (file: File, quality: number): Promise<File> => {
  return new Promise((resolve, reject) => {
    const success = (file: File) => resolve(file)
    const error = (err: Error) => reject(err)
    new Compressor(file, { quality, success, error })
  })
}

export const uploadImage = async (file: File): Promise<UploadFileResponse> => {
  const url = import.meta.env.VITE_APP_IMAGE_UPLOAD_URL
  const method = "POST"
  const body = new FormData()
  body.append("file", file)
  return fetch(url, { method, body })
    .then(res => res.json())
}
