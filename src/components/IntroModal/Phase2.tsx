import IntroModalHeader from "./IntroModalHeader"
import IntroModalFooter from "./IntroModalFooter"

import ModalTrigger from "@/modules/personal-account/components/ModalTrigger"
import UpdateTelegram from "@/modules/personal-account/modals/UpdateTelegram"

import { Dialog, DialogContent } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"

import Text0 from "@/shared/typography/Text0"
import TextAccent from "@/shared/typography/TextAccent"

import { useAppSelector } from "@/redux/hooks"
import { useUserProfileQuery } from "@/redux/api/profile"

import { cn } from "@/lib/classNames"

const Phase2 = ({
  open,
  onOpenChange,
  openFirstPhase,
  openThirdPhase,
  close,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  openFirstPhase: () => void
  openThirdPhase: () => void
  close: (forever?: boolean) => void
}) => {
  const scale = useAppSelector((state) => state.scale.value)

  const { data: userProfile } = useUserProfileQuery()

  const { telegramUsername } = userProfile!

  const onPrevClick = () => {
    openFirstPhase()
  }

  const onNextClick = () => {
    openThirdPhase()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "sm:max-w-[500px] md:max-w-[500px] 2xl:max-w-[600px] sm:p-6",
          scale && "3xl:w-[39.06vw] 3xl:p-[1.5625vw]"
        )}
      >
        <IntroModalHeader phase="Этап 2/4" />

        {telegramUsername ? (
          <>
            <Text0>
              Личный кабинет синхронизирован с вашим телеграм аккаунтом{" "}
              <TextAccent>@{telegramUsername}</TextAccent>. Можете переходить к
              следующему этапу.
            </Text0>
          </>
        ) : (
          <>
            <div>
              <Text0 className={cn("mb-1", scale && "3xl:mb-[0.26vw]")}>
                Теперь вам предстоит синхронизировать свой телеграм аккаунт с
                личным кабинетом ID:
              </Text0>

              <ModalTrigger content={<UpdateTelegram />}>
                <Button className="w-fit">синхронизировать</Button>
              </ModalTrigger>
            </div>
          </>
        )}

        <div
          className={cn(
            "flex gap-2 mt-6",
            scale && "3xl:gap-[0.52vw] 3xl:mt-[1.5625vw]"
          )}
        >
          <Button onClick={onPrevClick}>Назад</Button>
          <Button onClick={onNextClick}>Далее</Button>
        </div>

        <IntroModalFooter close={close} />
      </DialogContent>
    </Dialog>
  )
}

export default Phase2
