import TxHistoryTable from "../TxHistoryTable"
import TxHistoryMobile from "../TxHistoryMobile"

import { DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog"
import Button from "../ui/Button"

import { txHistory } from "@/utils/txHistory"

const TxHistoryModal = () => {
  return (
    <DialogContent className="max-w-[800px] sm:px-6">
      <DialogHeader>
        <DialogTitle>История транзакций</DialogTitle>
        <Button>выгрузить в pdf</Button>
      </DialogHeader>
      <TxHistoryTable data={txHistory} />
      <TxHistoryMobile data={txHistory} />
    </DialogContent>
  )
}

export default TxHistoryModal
