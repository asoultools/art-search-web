import { useMemo } from "react"

export const useImagePreviewUrl = (file: File | null) => {
  return useMemo(() => file ? URL.createObjectURL(file) : "#", [file])
}
