import type { FC } from "react"
import { AiOutlineLink } from "react-icons/ai"
import type { UploadFileResponse } from "~/interfaces/api"
import { ProgressCircle } from "./ProgressCircle"

type ResultContentProps = {
  res: UploadFileResponse
}

export const ResultContent: FC<ResultContentProps> = ({ res }) => {
  return (
    <div className="w-full h-full">
      {res.code === 0 ? (
        res.data.map(item => (
          <div
            className="m-4 bg-orange-200 rounded-xl overflow-hidden shadow flex"
            key={item.detail.dynamic_id}
          >
            <div className="flex-none w-24 h-24 relative">
              <img src={item.detail.src_url + "@96w_96h_1c_100q.webp"} alt="" />
            </div>
            <div className="p-2 flex-auto flex flex-col justify-between">
              <p className="mt-1 line-clamp-2 break-all text-sm text-orange-700 hover:underline underline-offset-2">
                <a
                  href={`https://t.bilibili.com/${item.detail.dynamic_id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="font-bold">
                    @{item.detail.author_name}:{" "}
                  </span>
                  <span className="">{item.detail.content}</span>
                </a>
              </p>

              <div className="flex justify-between items-center">
                <a
                  className="text-orange-700 text-sm"
                  href={item.detail.src_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiOutlineLink className="inline" size={18} />
                  <span className="relative top-[1px]">高清原图</span>
                </a>
              </div>
            </div>
            <div className="flex-none w-[4rem] h-24 relative flex justify-center items-center">
              <ProgressCircle progress={item.similarity * 100}></ProgressCircle>
            </div>
          </div>
        ))
      ) : (
        <div className="m-4 p-4 bg-red-200 rounded-xl text-red-500">
          {res.message}
        </div>
      )}
    </div>
  )
}
