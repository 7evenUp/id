import { DialogHeader, DialogTitle } from "@/shared/ui/Dialog"

import Text1 from "@/shared/typography/Text1"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const IntroModalHeader = ({ phase }: { phase: string }) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <DialogHeader>
      <div className={cn("flex flex-col mb-4", scale && "3xl:mb-[1.042vw]")}>
        <Text1>{phase}</Text1>
        <DialogTitle>Как попасть в Prime?</DialogTitle>
      </div>
    </DialogHeader>
  )
}

export default IntroModalHeader
