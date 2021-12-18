import { FC } from "react"

export const Container: FC = ({ children }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-5/6 h-full max-w-[48rem] max-h-[40rem] flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  )
}