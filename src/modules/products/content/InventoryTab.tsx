import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

import HelpCircle from "@/assets/icons/help-circle.svg?react"

import TabHeader from "../components/TabHeader"
import TabTitle from "../components/TabTitle"

import TextAccent from "@/shared/typography/TextAccent"
import Text0 from "@/shared/typography/Text0"
import Text2 from "@/shared/typography/Text2"

import Button from "@/shared/ui/Button"

import { useAppSelector } from "@/redux/hooks"
import { useClaimMutation, useInventoryQuery } from "@/redux/api/inventory"

import ExternalLink from "@/shared/ui/ExternalLink"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/Dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/shared/ui/Select"

import { Inventory, InventoryItem } from "@/types/ny-inventory"

// import { inventory } from "./inventoryData"

import { cn } from "@/lib/classNames"

const InventoryTab = () => {
  const { t } = useTranslation("products")

  const [filterType, setFilterType] = useState<"all" | "new" | "activated">(
    "new"
  )
  const [filteredData, setFilteredData] = useState<null | Inventory>(null)

  const scale = useAppSelector((state) => state.scale.value)

  const { data: inventory, isLoading, isError } = useInventoryQuery()

  useEffect(() => {
    if (!inventory) return

    if (filterType === "all") {
      setFilteredData(inventory)
    } else if (filterType === "new") {
      setFilteredData({
        itemsCount: inventory.itemsCount,
        items: inventory.items.filter((el) => el.isUsed === false),
      })
    } else if (filterType === "activated") {
      setFilteredData({
        itemsCount: inventory.itemsCount,
        items: inventory.items.filter((el) => el.isUsed === true),
      })
    }
  }, [filterType, inventory])

  return (
    <>
      <TabHeader>
        <TabTitle title={t("inventory.title")} link={null} />
      </TabHeader>

      <Select
        value={filterType}
        onValueChange={(value) =>
          setFilterType(value as "all" | "new" | "activated")
        }
      >
        <SelectTrigger
          className={cn(
            "w-32 2xl:w-36 shrink-0 mt-2",
            scale && "3xl:w-[8.35vw]"
          )}
        />
        <SelectContent
          className={cn("z-[999] w-32 2xl:w-36", scale && "3xl:w-[8.35vw]")}
        >
          <SelectItem value="all">{t("inventory.all")}</SelectItem>
          <SelectItem value="new">{t("inventory.new")}</SelectItem>
          <SelectItem value="activated">{t("inventory.activated")}</SelectItem>
        </SelectContent>
      </Select>

      <div
        className={cn(
          "mt-4 flex flex-wrap gap-5",
          scale && "3xl:mt-[1.041vw] 3xl:gap-[1.302vw]"
        )}
      >
        {isLoading && (
          <Text0 className={cn("mt-2", scale && "3xl:mt-[0.52vw]")}>
            {t("inventory.loading")}
          </Text0>
        )}

        {filteredData &&
          filteredData.items.length > 0 &&
          filteredData.items.map((prize) => (
            <Prize key={prize.id} {...prize} />
          ))}

        {inventory && inventory.items.length === 0 && <Empty />}

        {isError && (
          <Text0 className={cn("mt-2", scale && "3xl:mt-[0.52vw]")}>
            {t("inventory.error")}
          </Text0>
        )}
      </div>
    </>
  )
}

const Prize = ({
  id,
  title,
  image,
  type,
  userData,
  isUsed,
  instruction,
}: InventoryItem) => {
  const { t } = useTranslation("products")

  const scale = useAppSelector((state) => state.scale.value)

  const [claim, { isLoading }] = useClaimMutation()

  const onSubmit = async () => {
    try {
      await claim({ inventoryPrizeId: id }).unwrap()
      toast.success(t("inventory.activation-success"))
    } catch (error) {
      // @ts-expect-error no-rtkq-error-types
      if (error.data.code === "not_accepted") {
        toast.error(t("inventory.calendar-not-ready"))
      } else {
        toast.error(t("inventory.activation-error"))
      }
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-2 w-full mobile-sm:w-[80%] mobile:w-52 p-1 pb-2 bg-white dark:bg-gray-1 rounded-2xl shadow-sm",
        scale &&
          "3xl:gap-[0.52vw] 3xl:w-[13.541vw] 3xl:p-[0.26vw] 3xl:pb-[0.52vw] 3xl:rounded-[1.041vw]"
      )}
    >
      <img
        src={image!}
        className={cn(
          "w-full aspect-square rounded-xl",
          scale && "3xl:rounded-[0.781vw]"
        )}
      />
      <TextAccent className="text-center">{title}</TextAccent>
      {isUsed ? (
        type === "nft" ? (
          <Text0 className="text-center mt-auto">
            {t("inventory.prize-activated")}
          </Text0>
        ) : (
          type === "crypton_promo_code" && (
            <Text0 className="text-center mt-auto">{userData}</Text0>
          )
        )
      ) : (
        <>
          <Dialog>
            <DialogTrigger
              className={cn(
                "flex items-center justify-center gap-2 mb-2 hover:text-gray-3 dark:hover:text-gray-3",
                scale && "3xl:gap-[0.52vw] 3xl:mb-[0.52vw]"
              )}
            >
              <Text2 className="underline underline-offset-4">
                {t("inventory.how-to-activate")}
              </Text2>
              <HelpCircle
                className={cn(
                  "w-[18px] h-[18px]",
                  scale && "3xl:w-[1.171vw] 3xl:h-[1.171vw]"
                )}
              />
            </DialogTrigger>
            <DialogContent
              className={cn("sm:w-[500px]", scale && "3xl:w-[32.552vw]")}
            >
              <DialogTitle>{t("inventory.how-to-activate-prize")}</DialogTitle>
              <Text0 className="h-[400px] md:h-auto overflow-auto break-words">
                {instruction}
              </Text0>
            </DialogContent>
          </Dialog>
          {type === "nft" ? (
            <ExternalLink
              href="https://web3xms.com/quest/inventory"
              className={cn("mx-1 mt-auto", scale && "3xl:mx-[0.26vw]")}
            >
              {t("inventory.activate-btn")}
            </ExternalLink>
          ) : type === "crypton_promo_code" ? (
            <Button
              isLoading={isLoading}
              onClick={onSubmit}
              className={cn("mx-1 mt-auto", scale && "3xl:mx-[0.26vw]")}
            >
              {t("inventory.activate-btn")}
            </Button>
          ) : (
            type === "sponsor_promo_code" &&
            userData && (
              <TextAccent className="text-center mt-auto">
                {userData}
              </TextAccent>
            )
          )}
        </>
      )}
    </div>
  )
}

const Empty = () => {
  const { t } = useTranslation("products")

  return (
    <div className="flex flex-col gap-4">
      <Text0 className="mt-2">{t("inventory.empty")}</Text0>
    </div>
  )
}

export default InventoryTab
