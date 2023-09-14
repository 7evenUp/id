import BackLink from "./components/BackLink"
import ThemeToggle from "./components/ThemeToggle"
import LanguageToggle from "./components/LanguageToggle"
import AvatarMobile from "./components/AvatarMobile"
import ScaleToggle from "./components/ScaleToggle"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const Header = () => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <header
      className={cn(
        "flex justify-end items-center mb-10",
        scale && "3xl:mb-[2.604vw]"
      )}
    >
      <BackLink />

      <div
        className={cn(
          "hidden sm:flex items-center gap-3",
          scale && "3xl:gap-[0.781vw]"
        )}
      >
        <LanguageToggle />
        <ThemeToggle />
        <ScaleToggle />
      </div>

      {/* Header on Mobile */}
      <div className="sm:hidden flex gap-6">
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />
        </div>
        <AvatarMobile />
      </div>
    </header>
  )
}

export default Header
