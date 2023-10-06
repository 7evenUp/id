import { Toaster } from "sonner"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const AppToaster = () => {
  const theme = useAppSelector((state) => state.theme.value)
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <Toaster
      richColors
      position="top-right"
      theme={theme === "dark" ? "dark" : "light"}
      className={cn(scale && "AppToaster")}
      toastOptions={{
        className: cn(scale && "Toast"),
      }}
    />
  )
}

export default AppToaster
