import { useAuthContext } from "./AuthContext"

const translations: Record<string, string> = {
  Регистрация: "Sign Up",
  "Продолжить с Wallet": "Continue with Wallet",
  "Продолжить с Google": "Continue with Google",
  "Продолжить с Apple": "Continue with Apple",
  "Ссылка для входа отправлена вам на почту":
    "The login link has been sent to your email",
  "Выбрать другой способ входа": "Choose another auth method",
  "Вход в Crypton": "Sign in to Crypton",
  или: "or",
  "Создание аккаунта с почтой": "Creating account with email",
  "Создание аккаунта с кошельком": "Creating account with wallet",
  "Подписаться на новости и скидки": "Subscribe to news and discounts",
  "Подтверждаю, что ознакомлен и согласен с":
    "I confirm that I have read and agree to the",
  "Условиями и Положениями": "Terms and Conditions",
  и: "and the",
  "Политикой Конфиденциальности": "Privacy Policy",
  "Поле должно быть выбрано": "Field is required",
  Зарегистрироваться: "Sign Up",
  Продолжить: "Continue",
  "Введите вашу почту": "Enter your email",
  "Введите имя пользователя": "Enter your username",
  "Поле обязательно для заполнения": "The field is required",
  "Неверный формат": "Invalid mail format",
  "Замечено много попыток авторизации. Пожалуйста, повторите позже":
    "Too many requests. Please try again later",
  "Повторное получение письма на почту будет доступно через ":
    "A repeat email will be available in ",
  " мин": " min",
  "На стороне сервера произошла ошибка":
    "An error has occurred on the server side",
  "Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже":
    "An unexpected error has occurred. Please try again later.",
  "Аккаунт с таким email уже существует":
    "An account with this email already exists",
  "Код введён успешно": "The code was entered successfully",
  "Введённый код неверный": "The entered code is incorrect",
  "Введите код, который пришёл на почту":
    "Enter the code that has been sent to your email.",
}

export const useTranslate = () => {
  const { lang } = useAuthContext()

  return (key: string) => {
    if (lang === "ru") return key

    if (Object.hasOwn(translations, key)) return translations[key]

    return key
  }
}
