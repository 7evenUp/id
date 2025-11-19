import { useAuthContext } from "./AuthContext"

const translations = {
  Регистрация: "Sign Up",
  "Продолжить с Wallet": "Continue with Wallet",
  "Продолжить с Google": "Continue with Google",
  "Продолжить с Apple": "Continue with Apple",
  "Продолжить с Telegram": "Continue with Telegram",
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
  "Введите код, который пришёл в": "Enter the code that has been sent to",
  "Минимальная длина - 5 символов": "The minimum length is 5 characters.",
  "Максимальная длина - 32 символа": "The maximum length is 32 characters.",
  "Формат допускает использование символов a-z, 0-9 и _":
    "The format allows the use of characters a-z, 0-9 and _",
  "Username не может начинаться с цифры или _":
    "Username cannot start with a digit or _",
  "Username не может заканчиваться символом _":
    "Username cannot end with a character _",
  "Мы не смогли найти аккаунт с таким Telegram Username":
    "We couldn't find an account with this Telegram Username.",
  "1. Перейдите и активируйте": "1. Go ahead and activate",
  "Таким образом вы создадите аккаунт в нашей системе":
    "This way you will create an account in our ecosystem",
  "2. Нажмите кнопку повторной отправки кода ниже":
    "2. Click the button below to resend the code",
  "Отправить код повторно": "Send the code again",
  "Введите ваш Telegram Username": "Enter your Telegram Username",
  Войти: "Login",
  "Вход через Telegram": "Login via Telegram",
} as const

export const useTranslate = () => {
  const { lang } = useAuthContext()

  return (key: keyof typeof translations) => {
    if (lang === "ru") return key

    if (Object.hasOwn(translations, key)) return translations[key]

    return key
  }
}
