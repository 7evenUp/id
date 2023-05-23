import TxHistoryTable from "../components/TxHistoryTable"
import TxHistoryMobile from "../components/TxHistoryMobile"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"

import { txHistory } from "@/utils/txHistory"

const TxHistory = () => {
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

export default TxHistory
