import { cn } from "@/lib/classNames"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md 3xl:rounded-[0.391vw] bg-gray-5 dark:bg-gray-1",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
