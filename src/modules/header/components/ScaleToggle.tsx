import { useTranslation } from "react-i18next"

import { ReactComponent as ZoomIn } from "@/assets/icons/zoom-in.svg"
import { ReactComponent as ZoomOut } from "@/assets/icons/zoom-out.svg"

import Tooltip from "@/shared/ui/Tooltip"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { changeScale } from "@/redux/scaleScreen/slice"

const ScaleToggle = () => {
  const { t } = useTranslation()

  const scale = useAppSelector((state) => state.scale.value)
  const dispatch = useAppDispatch()

  const toggleScale = () => {
    dispatch(changeScale())
  }

  return (
    <Tooltip content={t("zoom-tooltip")}>
      <button className="hidden 3xl:block" onClick={toggleScale}>
        {scale ? (
          <ZoomOut className="w-6 h-6 3xl:w-[1.5625vw] 3xl:h-[1.5625vw]" />
        ) : (
          <ZoomIn className="w-6 h-6" />
        )}
      </button>
    </Tooltip>
  )
}

export default ScaleToggle
