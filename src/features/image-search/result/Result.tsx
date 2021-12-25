import { ResultContent } from "./ResultContent"
import { ResultFallBack } from "./ResultFallBack"
import { ResultModal } from "./ResultModal"

import type { FC } from "react"
import type { UploadFileResponse } from "~/interfaces/api"

type ResultProps = {
  isOpen: boolean
  onClose: () => void
  res: UploadFileResponse | null
}

export const Result: FC<ResultProps> = ({ isOpen, onClose, res }) => {
  return (
    <ResultModal isOpen={isOpen} onClose={onClose}>
      {res ? <ResultContent res={res} /> : <ResultFallBack />}
    </ResultModal>
  )
}
