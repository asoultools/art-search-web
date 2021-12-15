export type UploadFileResponse = UploadFileResponseSuccess | UploadFileResponseError

export type UploadFileResponseSuccess = {
  code: number
  message: string
  data: DataEntity[]
  last_time: number
}

export type UploadFileResponseError = {
  code: number
  message: string
}

export type DataEntity = {
  detail: Detail
  similarity: number
}

export type Detail = {
  oid: number
  dynamic_id: string
  dynamic_index: number
  content: string
  like: number
  author_id: string
  author_name: string
  src_url: string
  local_pth?: null
  pHash: string
  topics: string
  create_time: number
  is_recommend: number
  is_valid: number
  load_time: number
}
