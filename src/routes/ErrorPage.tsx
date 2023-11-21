import { Link, useRouteError } from "react-router-dom"

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <h1 className="text-xl">Уупс!</h1>
      <div className="text-center">
        <p>Извините, возникла неожиданная ошибка:</p>
        <p className="text-2xl font-bold">
          {/* @ts-expect-error No-Error-Types */}
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
      <Link to={"/"} className="underline underline-offset-4 hover:opacity-80">
        Вернуться на главную
      </Link>
    </div>
  )
}
