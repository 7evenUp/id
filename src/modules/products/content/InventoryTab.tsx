import { useTranslation } from "react-i18next"
import { toast } from "sonner"

import CopyIcon from "@/assets/icons/copy.svg?react"

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
      <Subheading className="mt-5 3xl:mt-[1.302vw]">
        {t("inventory")}
      </Subheading>
      <div className="mt-4 flex flex-wrap gap-3">
        {isLoading && <Text0 className="mt-2">Загрузка...</Text0>}

        {inventory &&
          inventory.items.length > 0 &&
          inventory.items.map((prize) => <Prize key={prize.id} {...prize} />)}

        {inventory && inventory.items.length === 0 && <Empty />}

        {isError && <Text0 className="mt-2">Ошибка загрузки инвентаря</Text0>}
      </div>
    </>
  )
}

const Prize = ({ title, image, type, userData, isUsed }: InventoryItem) => {
  return (
    <div className="flex flex-col gap-2 w-60 p-2 bg-white dark:bg-gray-1 rounded-md">
      <Text0 className="mt-auto">{title}</Text0>
      <img src={image!} className="w-full aspect-square" />
      {isUsed ? (
        <Text0 className="text-center">Приз активирован</Text0>
      ) : (
        <>
          <Button>Как активировать</Button>
          {type === "nft" ? (
            <Button>Активировать</Button>
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
