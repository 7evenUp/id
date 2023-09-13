import { DialogClose } from "@radix-ui/react-dialog"
import { useTranslation } from "react-i18next"

import SubscriptionModalHeader from "../../components/SubscriptionModalHeader"
import SubscriptionModalFooter from "../../components/SubscriptionModalFooter"

import { Dialog, DialogContent } from "@/shared/ui/Dialog"
import ExternalLink from "@/shared/ui/ExternalLink"
import Button from "@/shared/ui/Button"

import { useAppSelector } from "@/redux/hooks"
import { useLinksQuery } from "@/redux/api/channels"

import { cn } from "@/lib/classNames"
import Text0 from "@/shared/typography/Text0"
import TextTip from "@/shared/typography/TextTip"

const ThirdStep = ({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  const { t } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)
  const language = useAppSelector((state) => state.language.value)

  const { data: userLinks } = useLinksQuery({})

  const filteredLinks = userLinks?.filter(
    (link) => link.link.channel.lang === language
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="pb-14 sm:pb-14 3xl:pb-[3.645vw] sm:max-w-[560px] md:max-w-[650px] xmd:max-w-[820px] lg:max-w-[90vw] 3xl:max-w-[90vw]">
        <SubscriptionModalHeader step={t("buy-subs.third-step.step")} />
        <div className="flex flex-col h-[400px] lg:h-auto overflow-auto pr-2 3xl:pr-[0.521vw] divide-y divide-gray-4 dark:divide-gray-2">
          <div className="flex flex-col-reverse md:flex-row justify-between gap-10 py-5 3xl:gap-[2.604vw] 3xl:py-[1.302vw]">
            <div className="md:w-[350px] lg:w-[522px] 3xl:w-[34vw]">
              <div className="flex flex-wrap gap-3 3xl:gap-[0.781vw]">
                {filteredLinks &&
                  filteredLinks.length > 0 &&
                  filteredLinks.map((link) => (
                    <ExternalLink key={link.id} href={link.link.url} withTgIcon>
                      {link.link.channel.name}
                    </ExternalLink>
                  ))}
              </div>
              <TextTip className="mt-5 3xl:mt-[1.302vw]">
                {t("buy-subs.third-step.find-links")}
              </TextTip>
            </div>
            <div className="md:w-[450px] lg:w-[614px] 3xl:w-[40vw]">
              <h3
                className={cn(
                  "typography-head text-transparent bg-gradient-to-r from-corral to-purple bg-clip-text mb-4",
                  scale && "typography-head_large 3xl:mb-[1.042vw]"
                )}
              >
                {t("buy-subs.third-step.part-1-heading")}
              </h3>
              <Text0 className={cn("mb-2", scale && "3xl:mb-[0.521vw]")}>
                {t("buy-subs.third-step.part-1-text-1")}
              </Text0>
              <Text0>{t("buy-subs.third-step.part-1-text-2")}</Text0>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-between gap-10 py-5 3xl:gap-[2.604vw] 3xl:py-[1.302vw]">
            <div className="md:w-[350px] lg:w-[522px] 3xl:w-[34vw]">
              <ExternalLink href="#" className="w-fit">
                Crypton Lobby
              </ExternalLink>
            </div>
            <div className="md:w-[450px] lg:w-[614px] 3xl:w-[40vw]">
              <h3
                className={cn(
                  "typography-head text-transparent bg-gradient-to-r from-corral to-purple bg-clip-text mb-4",
                  scale && "typography-head_large 3xl:mb-[1.042vw]"
                )}
              >
                {t("buy-subs.third-step.part-2-heading")}
              </h3>
              <Text0>{t("buy-subs.third-step.part-2-text")}</Text0>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-between gap-10 py-5 3xl:gap-[2.604vw] 3xl:py-[1.302vw]">
            <div className="md:w-[350px] lg:w-[522px] 3xl:w-[34vw]">
              <ExternalLink href="#" className="w-fit">
                Calendar
              </ExternalLink>
            </div>
            <div className="md:w-[450px] lg:w-[614px] 3xl:w-[40vw]">
              <h3
                className={cn(
                  "typography-head text-transparent bg-gradient-to-r from-corral to-purple bg-clip-text mb-4",
                  scale && "typography-head_large 3xl:mb-[1.042vw]"
                )}
              >
                {t("buy-subs.third-step.part-3-heading")}
              </h3>
              <Text0 className={cn("md:mb-6", scale && "3xl:mb-[1.563vw]")}>
                {t("buy-subs.third-step.part-3-text")}
              </Text0>
              <DialogClose asChild className="hidden md:flex">
                <Button>{t("buy-subs.third-step.okay-btn")}</Button>
              </DialogClose>
            </div>
          </div>
        </div>

        {/* Vissible on Mobile */}
        <div className="pb-2 text-right block md:hidden">
          <DialogClose asChild className="w-fit">
            <Button>{t("buy-subs.third-step.okay-btn")}</Button>
          </DialogClose>
        </div>

        <SubscriptionModalFooter />
      </DialogContent>
    </Dialog>
  )
}

export default ThirdStep
