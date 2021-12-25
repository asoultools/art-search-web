export type FetchOptions = {
  url: string
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE"
  headers?: HeadersInit
  body?: BodyInit
}

export const fetchJson = <R>({ url, method, headers, body }: FetchOptions) =>
  window
    .fetch(url, { method, headers, body })
    .then(res => res.json()) as Promise<R>

export const fetchText = ({ url, method, headers, body }: FetchOptions) =>
  window.fetch(url, { method, headers, body }).then(res => res.text())
