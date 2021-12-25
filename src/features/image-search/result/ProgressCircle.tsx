import type { FC } from "react"

type ProgressCircle = {
  progress: number
}

export const ProgressCircle: FC<ProgressCircle> = ({ progress }) => {
  return (
    <div className="w-12 h-12 relative">
      <svg
        className="-rotate-90"
        width="100%"
        height="100%"
        viewBox="0 0 120 120"
      >
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="#e6e6e6"
          strokeWidth="12"
        />
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="#f77a52"
          strokeWidth="12"
          pathLength="100"
          strokeDasharray={100}
          strokeDashoffset={100 - progress}
        />
      </svg>
      <div className="w-full h-full absolute inset-0 flex justify-center items-center">
        <span className="text-orange-700 text-[12px]">{`${progress.toFixed(
          0,
        )}%`}</span>
      </div>
    </div>
  )
}
