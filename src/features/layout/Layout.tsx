import type { FC } from "react"

export const Layout: FC = ({ children }) => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500">
      {children}
    </div>
  )
}
