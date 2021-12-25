import { useMemo } from "react"

import type { FC } from "react"

type ImagePreviewProps = {
  src: string
}

export const ImagePreview: FC<ImagePreviewProps> = ({ src }) => {
  return (
    <div className="w-full h-full absolute inset-0">
      <img
        className="w-full h-full object-contain"
        id="preview"
        src={src}
        alt="preview"
      />
    </div>
  )
}
