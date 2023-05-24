import { HiOutlineArrowNarrowRight } from "react-icons/hi"

import { DialogFooter } from "@/shared/ui/Dialog"

const SubscriptionModalFooter = () => {
  return (
    <DialogFooter>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-1 mobile:gap-2">
        <span>Нужна помощь? Обратитесь к Наставнику Prime</span>
        <a
          href="https://t.me/crypton_support"
          className="typography-btn-big flex items-center gap-2"
        >
          написать наставнику
          <HiOutlineArrowNarrowRight className="w-4 h-4" />
        </a>
      </div>
    </DialogFooter>
  )
}

export default SubscriptionModalFooter
