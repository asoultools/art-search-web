import { ProgressCircle } from "./ProgressCircle"
import type { FC } from "react"

export const ResultFallBack: FC = ({}) => {
  return (
    <div className="w-full h-full">
      {[0, 1, 2].map(i => (
        <div
          className="animate-pulse m-4 bg-orange-200 rounded-xl overflow-hidden shadow flex"
          key={i}
        >
          <div className="flex-none w-24 h-24 bg-orange-100"></div>
          <div className="flex-auto flex">
            <div className="p-4 flex-auto flex flex-col justify-between">
              <div className="">
                <p className="h-2 my-2 bg-orange-300"></p>
                <p className="h-2 my-2 bg-orange-300"></p>
              </div>
              <div className="">
                <p className="w-12 h-2 my-2 bg-orange-300"></p>
              </div>
            </div>
            <div className="flex-none flex w-[4rem] h-24 justify-center items-center">
              <ProgressCircle progress={0} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
