const ToggleMode = ({
  isLoginMode,
  toggleMode,
}: {
  isLoginMode: boolean
  toggleMode: () => void
}) => {
  if (isLoginMode) {
    return (
      <button
        className="typography-text-0 font-medium w-fit text-res-bot-blue hover:underline underline-offset-2"
        onClick={toggleMode}
      >
        Создать аккаунт
      </button>
    )
  }
  return (
    <div className="typography-text-0">
      <span>Уже есть аккаунт?</span>
      <button
        className="typography-text-0 font-medium w-fit text-res-bot-blue hover:underline underline-offset-2 ml-2"
        onClick={toggleMode}
      >
        Войти
      </button>
    </div>
  )
}

export default ToggleMode
