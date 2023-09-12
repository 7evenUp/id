import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { changeScale } from "@/redux/scaleScreen/slice"

import { cn } from "@/lib/classNames"

const ScaleToggle = () => {
  const scale = useAppSelector((state) => state.scale.value)
  const dispatch = useAppDispatch()

  const toggleScale = () => {
    dispatch(changeScale())
  }

  return (
    <button
      className={cn("hidden 3xl:block text-xl", scale && "text-[1.0938vw]")}
      onClick={toggleScale}
    >
      scale
    </button>
  )
}

export default ScaleToggle
