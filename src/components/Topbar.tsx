import { AiOutlineQuestionCircle } from "react-icons/ai"

import type { FC, MouseEventHandler } from "react"

export const TopbarLeft: FC = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}

export const TopbarRight: FC = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}

type TopbarBrandProps = {
  logo: string
  title: string
}

export const TopbarBrand: FC<TopbarBrandProps> = ({ logo, title }) => {
  return (
    <div className="flex justify-center items-baseline">
      <img src={logo} alt="" />
      <span className="ml-1 text-white text-xl tracking-wider relative bottom-0.5">{title}</span>
    </div>
  )
}

type TopbarQuestionButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>
}
export const TopbarQuestionButton: FC<TopbarQuestionButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="m-4 text-white">
      <AiOutlineQuestionCircle className="inline" size={24} />
    </button>
  )
}

export const Topbar: FC = ({ children }) => {
  return (
    <div className="w-screen h-16 px-4 fixed inset-0 flex justify-between items-center z-10">
      {children}
    </div>
  )
}