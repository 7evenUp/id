import { cn } from "@/lib/classNames"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-3", className)}
      {...props}
    />
  )
}

export { Skeleton }
