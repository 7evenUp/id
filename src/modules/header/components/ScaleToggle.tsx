import { useTranslation } from "react-i18next"

import * as Switch from "@radix-ui/react-switch"

import ZoomIn from "@/assets/icons/zoom-in.svg?react"
import ZoomOut from "@/assets/icons/zoom-out.svg?react"

import Tooltip from "@/shared/ui/Tooltip"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { changeScale } from "@/redux/scale/slice"

import { cn } from "@/lib/classNames"

const ScaleToggle = () => {
  const { t } = useTranslation()

  const scale = useAppSelector((state) => state.scale.value)
  const dispatch = useAppDispatch()

  const toggleScale = () => {
    dispatch(changeScale())
  }

  return (
    <Tooltip content={t("zoom-tooltip")}>
      <Switch.Root
        checked={!scale}
        onCheckedChange={toggleScale}
        className={cn(
          "hidden 3xl:block w-[36px] h-[18px] bg-transparent rounded-full relative border border-gray-1 dark:border-gray-5 data-[state=checked]:bg-black outline-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          scale && "3xl:w-[2.34vw] 3xl:h-[1.17vw]"
        )}
      >
        <Switch.Thumb
          className={cn(
            "peer absolute left-0 top-[2px] block w-3 h-3 bg-gray-1 dark:bg-gray-5 rounded-full transition-transform duration-100 will-change-transform data-[state=unchecked]:translate-x-[2px] data-[state=checked]:translate-x-[20px]",
            scale &&
              "3xl:top-[0.13vw] 3xl:w-[0.78vw] 3xl:h-[0.78vw] 3xl:data-[state=unchecked]:translate-x-[0.13vw] 3xl:data-[state=checked]:translate-x-[1.3vw]"
          )}
        />
        <ZoomOut
          className={cn(
            "w-3 h-3 absolute top-[2px] right-[3px] rotate-0 scale-100 peer-data-[state=checked]:scale-0 peer-data-[state=checked]:rotate-180 will-change-transform transition-transform",
            scale &&
              "3xl:w-[0.78vw] 3xl:h-[0.78vw] 3xl:top-[0.13vw] 3xl:right-[0.195vw]"
          )}
        />
        <ZoomIn
          className={cn(
            "w-3 h-3 absolute top-[2px] left-[3px] -rotate-180 scale-0 peer-data-[state=checked]:scale-100 peer-data-[state=checked]:rotate-0 will-change-transform transition-transform",
            scale &&
              "3xl:w-[0.78vw] 3xl:h-[0.78vw] 3xl:top-[0.13vw] 3xl:left-[0.195vw]"
          )}
        />
      </Switch.Root>
    </Tooltip>
  )
}

export default ScaleToggle
