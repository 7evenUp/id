import { useTranslation } from "react-i18next"
import { toast } from "sonner"

import CopyIcon from "@/assets/icons/copy.svg?react"
import HelpCircle from "@/assets/icons/help-circle.svg?react"

import TabHeader from "../components/TabHeader"
import TabTitle from "../components/TabTitle"

import Subheading from "@/shared/typography/Subheading"
import Text0 from "@/shared/typography/Text0"
import Button from "@/shared/ui/Button"

import { cn } from "@/lib/classNames"

import { useAppSelector } from "@/redux/hooks"
import { useUserProfileQuery } from "@/redux/api/profile"
import { useInventoryQuery } from "@/redux/api/inventory"
import ExternalLink from "@/shared/ui/ExternalLink"
import { InventoryItem } from "@/types/ny-inventory"
import TextAccent from "@/shared/typography/TextAccent"
import Text2 from "@/shared/typography/Text2"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/Dialog"

const InventoryTab = () => {
  const { t } = useTranslation("products")

  const scale = useAppSelector((state) => state.scale.value)

  const { data } = useUserProfileQuery()
  const { data: inventory, isLoading, isError } = useInventoryQuery()

  const {
    referralInfo: { refCode },
  } = data!

  const onRefLinkClick = () => {
    navigator.clipboard.writeText(
      "https://web3xms.com/quest/phase-1?ref=" + refCode
    )

    toast(t("ref_copied_title"), {
      description: t("ref_copied_desc"),
    })
  }

  return (
    <>
      <TabHeader>
        <TabTitle title="WEB 3 XMS" link="https://web3xms.com/" />
      </TabHeader>
      <Button
        onClick={onRefLinkClick}
        className="flex items-center gap-1.5 mt-2"
      >
        {t("ref_link")}
        <CopyIcon
          className={cn(
            "w-3.5 h-3.5",
            scale && "3xl:w-[0.911vw] 3xl:h-[0.911vw]"
          )}
        />
      </Button>
      <Subheading className={cn("mt-5", scale && "3xl:mt-[1.302vw]")}>
        {t("inventory")}
      </Subheading>
      <div
        className={cn(
          "mt-4 flex flex-wrap gap-5",
          scale && "mt-[1.041vw] gap-[1.302vw]"
        )}
      >
        {isLoading && <Text0 className="mt-2">Загрузка...</Text0>}

        {inventory &&
          inventory.items.length > 0 &&
          inventory.items.map((prize) => <Prize key={prize.id} {...prize} />)}

        {inventory && inventory.items.length === 0 && <Empty />}

        {isError && (
          <Text0 className={cn("mt-2", scale && "mt-[0.52vw]")}>
            Ошибка загрузки инвентаря
          </Text0>
        )}
      </div>
    </>
  )
}

const Prize = ({
  title,
  image,
  type,
  userData,
  isUsed,
  description,
}: InventoryItem) => {
  const scale = useAppSelector((state) => state.scale.value)

  return (
    <div
      className={cn(
        "flex flex-col gap-2 w-52 p-1 pb-2 bg-white dark:bg-gray-1 rounded-2xl shadow-sm",
        scale &&
          "gap-[0.52vw] w-[13.541vw] p-[0.26vw] pb-[0.52vw] rounded-[1.041vw]"
      )}
    >
      <img
        src={image!}
        className={cn(
          "w-full aspect-square rounded-xl",
          scale && "rounded-[0.781vw]"
        )}
      />
      <TextAccent className="text-center">{title}</TextAccent>
      {isUsed ? (
        <Text0 className="text-center">Приз активирован</Text0>
      ) : (
        <>
          <Dialog>
            <DialogTrigger
              className={cn(
                "flex items-center justify-center gap-2 mb-2 hover:text-gray-3 dark:hover:text-gray-3",
                scale && "gap-[0.52vw] mb-[0.52vw]"
              )}
            >
              <Text2 className="underline underline-offset-4">
                Как активировать?
              </Text2>
              <HelpCircle
                className={cn(
                  "w-[18px] h-[18px]",
                  scale && "w-[1.171vw] h-[1.171vw]"
                )}
              />
            </DialogTrigger>
            <DialogContent
              className={cn("sm:w-[500px]", scale && "3xl:w-[32.552vw]")}
            >
              <DialogTitle>Как активировать приз?</DialogTitle>
              <Text0>{description}</Text0>
            </DialogContent>
          </Dialog>
          {type === "nft" ? (
            <Button className={cn("mx-1", scale && "mx-[0.26vw]")}>
              активировать
            </Button>
          ) : type === "crypton_promo_code" ? (
            <Button>Промокод</Button>
          ) : (
            type === "sponsor_promo_code" &&
            userData && <Text0 className="text-center">{userData}</Text0>
          )}
        </>
      )}
    </div>
  )
}

const Empty = () => (
  <div className="flex flex-col gap-4">
    <Text0 className="mt-2">
      В вашем инвентаре пусто.
      <br />
      Перейдите на сайт Новогоднего Ивента и откройте парочку боксов
    </Text0>
    <ExternalLink href="https://web3xms.com/quest/phase-3" className="w-fit">
      открыть боксы
    </ExternalLink>
  </div>
)

export default InventoryTab
