import { useTranslation } from "react-i18next"

const ToggleMode = ({
  isLoginMode,
  toggleMode,
}: {
  isLoginMode: boolean
  toggleMode: () => void
}) => {
  const { t } = useTranslation("auth")

  if (isLoginMode) {
    return (
      <button
        className="typography-text-0 font-medium w-fit text-res-bot-blue hover:underline underline-offset-2"
        onClick={toggleMode}
      >
        {t("login.switch-mode-btn")}
      </button>
    )
  }

  return (
    <div className="typography-text-0">
      <span>{t("register.switch-mode-text")}</span>
      <button
        className="typography-text-0 font-medium w-fit text-res-bot-blue hover:underline underline-offset-2 ml-2"
        onClick={toggleMode}
      >
        {t("register.switch-mode-btn")}
      </button>
    </div>
  )
}

export default ToggleMode
