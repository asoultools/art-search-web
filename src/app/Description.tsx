import { FC } from "react"

export const Description: FC = ({ }) => {
  return (
    <div className="w-full">
      <div className="p-4 m-4 rounded-xl bg-sky-200 shadow">
        <p className="mb-1">
          本网站用于搜索 A-SOUL B站相关Tag下的动态图片
        </p>
        <p className="mb-1">
          图片搜索算法为pHash，所以有时搜到的图会不太准确，望谅解！
        </p>
      </div>
      <div className="p-4 m-4 rounded-xl bg-indigo-200 shadow">
        <p className="mb-1">
          作者：<a href="https://space.bilibili.com/32957695" target="_blank" className="hover:underline">晓轩iMIKU</a>
        </p>
      </div>
      <div className="p-4 m-4 rounded-xl bg-green-200 shadow">
        <p className="mb-1">version: {import.meta.env.VITE_APP_VERSION}</p>
      </div>
    </div>
  )
}