import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import Text0 from "@/shared/typography/Text0"
import Subheading from "@/shared/typography/Subheading"

const PaymentSuccess = () => {
  const {t} = useTranslation()
  
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <Subheading className="text-xl text-success dark:text-success">
        {t("payment-success-heading")}
      </Subheading>
      <Text0>{t("payment-success-details")}</Text0>
      <Link to={"/"} className="underline underline-offset-4 hover:opacity-80">
        {t("payment-page-go-to-main")}
      </Link>
    </div>
  )
}

export default PaymentSuccess
