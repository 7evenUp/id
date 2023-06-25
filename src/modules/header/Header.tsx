import ThemeToggle from "./components/ThemeToggle"
import LanguageToggle from "./components/LanguageToggle"
import AvatarMobile from "./components/AvatarMobile"

const Header = () => {
  return (
    <header className="flex justify-end items-center mb-10 2xl:mb-[2.604vw]">
      <div className="hidden sm:flex items-center gap-3 2xl:gap-[0.781vw]">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      <div className="sm:hidden flex gap-6 2xl:gap-[1.563vw]">
        <div className="flex items-center gap-3 2xl:gap-[0.781vw]">
          <LanguageToggle />
          <ThemeToggle />
        </div>
        <AvatarMobile />
      </div>
    </header>
  )
}

export default Header
