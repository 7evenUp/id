import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const ResponseErrorText = ({
  children,
  className,
}: {
  className?: string
  children: React.ReactNode
}) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <span
      className={cn(
        "text-error text-xs font-medium tracking-wide",
        scale && "3xl:text-[0.781vw]/[1.042vw]",
        className
      )}
    >
      {children}
    </span>
  )
}

export default ResponseErrorText
