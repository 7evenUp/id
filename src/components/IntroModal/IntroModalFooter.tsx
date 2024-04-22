import { useRef } from "react"

import Button from "@/shared/ui/Button"
import { Checkbox, CheckboxLabel } from "@/shared/ui/Checkbox"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const IntroModalFooter = ({
  close,
}: {
  close: (forever?: boolean) => void
}) => {
  const checkboxRef = useRef<HTMLButtonElement>(null)

  const scale = useAppSelector((state) => state.scale.value)

  const onClose = () => {
    if (!checkboxRef.current) return

    checkboxRef.current.ariaChecked === "false" ? close() : close(true)
  }

  return (
    <footer
      className={cn(
        "flex items-center justify-end gap-2",
        scale && "3xl:gap-[0.52vw]"
      )}
    >
      <div
        className={cn("flex items-center gap-2", scale && "3xl:gap-[0.52vw]")}
      >
        <Checkbox id="doNotShowAgain" ref={checkboxRef} />
        <CheckboxLabel htmlFor="doNotShowAgain">
          Больше не показывать
        </CheckboxLabel>
      </div>
      <Button onClick={onClose}>закрыть</Button>
    </footer>
  )
}

export default IntroModalFooter
