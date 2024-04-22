import IntroModalHeader from "./IntroModalHeader"
import IntroModalFooter from "./IntroModalFooter"

import { Dialog, DialogContent } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"
import ExternalLink from "@/shared/ui/ExternalLink"

import Text0 from "@/shared/typography/Text0"

import { useAppSelector } from "@/redux/hooks"
import { useLinksQuery } from "@/redux/api/channels"
import { useUserProfileQuery } from "@/redux/api/profile"

import { cn } from "@/lib/classNames"

const Phase3 = ({
  open,
  onOpenChange,
  openSecondPhase,
  openForthPhase,
  close,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  openSecondPhase: () => void
  openForthPhase: () => void
  close: (forever?: boolean) => void
}) => {
  const scale = useAppSelector((state) => state.scale.value)
  const language = useAppSelector((state) => state.language.value)

  const { data: userLinks } = useLinksQuery({})
  const { data: userProfile } = useUserProfileQuery()

  const { telegramUsername } = userProfile!

  const filteredLinks = userLinks?.filter(
    (link) => link.link.channel.lang === language
  )

  const onPrevClick = () => {
    openSecondPhase()
  }

  const onNextClick = () => {
    openForthPhase()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "sm:max-w-[500px] md:max-w-[500px] 2xl:max-w-[600px] sm:p-6",
          scale && "3xl:w-[39.06vw] 3xl:p-[1.5625vw]"
        )}
      >
        <IntroModalHeader phase="Этап 3/4" />

        <div>
          {telegramUsername ? (
            <Text0 className={cn("mb-2", scale && "3xl:mb-[0.52vw]")}>
              Отлично, когда ваш телеграм аккаунт успешно синхронизирован с
              личным кабинетом, вы можете воспользоваться этими ссылками на
              приватные каналы:
            </Text0>
          ) : (
            <Text0 className={cn("mb-2", scale && "3xl:mb-[0.52vw]")}>
              Кажется, вы не синхронизировали свой телеграм аккаунт с личным
              кабинетом. Чтобы ссылки на приватные каналы стали доступны, вам
              следует вернуться на прошлый этап и привязать свой телеграм.
            </Text0>
          )}

          <div
            className={cn(
              "flex flex-wrap gap-3 max-h-[200px] overflow-auto pr-2 pb-px",
              scale && "3xl:gap-[0.781vw] 3xl:max-h-[13.02vw]"
            )}
          >
            {filteredLinks &&
              filteredLinks.length > 0 &&
              filteredLinks.map((link) => (
                <ExternalLink
                  key={link.id}
                  href={link.link.url}
                  withTgIcon
                  className="shrink"
                >
                  {link.link.channel.name}
                </ExternalLink>
              ))}
          </div>
        </div>

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

export default Phase3
