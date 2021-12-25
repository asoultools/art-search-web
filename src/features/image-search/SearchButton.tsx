import type { FC } from "react"

type SearchButtonProps = {
  onSearch: () => void
}
export const SearchButton: FC<SearchButtonProps> = ({ onSearch }) => {
  return (
    <div className="my-4 flex justify-center items-center">
      {/* <button className="px-8 py-2 mx-2 text-white bg-transparent border-2 border-white rounded-full" onClick={handleReset}>重置图片</button> */}
      <button
        className="px-8 py-2 mx-2 text-orange-600 bg-white border-2 border-white rounded-full"
        onClick={onSearch}
      >
        搜索出处
      </button>
    </div>
  )
}
