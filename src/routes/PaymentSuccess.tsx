import { Link } from "react-router-dom"

import Text0 from "@/shared/typography/Text0"
import Subheading from "@/shared/typography/Subheading"

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <Subheading className="text-xl text-success dark:text-success">
        Платёж прошёл успешно
      </Subheading>
      <Text0>Благодарим вас за доверие!</Text0>
      <Link to={"/"} className="underline underline-offset-4 hover:opacity-80">
        Вернуться на главную
      </Link>
    </div>
  )
}

export default PaymentSuccess
