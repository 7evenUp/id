import { Link, useRouteError } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function ErrorPage() {
  const { t } = useTranslation()
  const error = useRouteError()

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <h1 className="text-xl">{t("error-page-ooops")}</h1>
      <div className="text-center">
        <p>{t("error-page-details")}</p>
        <p className="text-2xl font-bold">
          {/* @ts-expect-error No-Error-Types */}
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
      <Link to={"/"} className="underline underline-offset-4 hover:opacity-80">
        {t("Вернуться на главную")}
      </Link>
    </div>
  )
}
