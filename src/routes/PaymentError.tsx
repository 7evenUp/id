import { Link } from "react-router-dom"

import Text0 from "@/shared/typography/Text0"
import Subheading from "@/shared/typography/Subheading"

const PaymentError = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <Subheading className="text-xl text-error dark:text-error">
        Платёж отменён или выполнен с ошибкой
      </Subheading>
      <Text0>
        Пожалуйста, повторите позже или перепроверьте ведённые Вами данные
      </Text0>
      <Link to={"/"} className="underline underline-offset-4 hover:opacity-80">
        Вернуться на главную
      </Link>
    </div>
  )
}

export default PaymentError
