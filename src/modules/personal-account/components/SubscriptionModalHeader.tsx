import { DialogHeader } from "@/shared/ui/Dialog"

const SubscriptionModalHeader = ({ label }: { label: string }) => {
  return (
    <DialogHeader className="typography-text-1">
      <span>{label}</span>
      <div className="flex flex-col items-end gap-1">
        <span className="flex items-center gap-1">
          Мой баланс: <span className="typography-balance">$22</span>
        </span>
        <span className="flex items-center gap-1">
          Текущий статус:{" "}
          <span className="typography-text-1 italic px-1.5 py-0.5 text-gray-6 rounded-full select-none bg-gradient-to-r from-corral to-purple">
            Prime
          </span>
        </span>
      </div>
    </DialogHeader>
  )
}

export default SubscriptionModalHeader
