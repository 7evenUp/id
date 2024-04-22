import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

import HelpCircle from "@/assets/icons/help-circle.svg?react"
import Copy from "@/assets/icons/copy.svg?react"
import Check from "@/assets/icons/check.svg?react"

import TabHeader from "../components/TabHeader"
import TabTitle from "../components/TabTitle"

import TextAccent from "@/shared/typography/TextAccent"
import Text0 from "@/shared/typography/Text0"
import Text2 from "@/shared/typography/Text2"

import Button from "@/shared/ui/Button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/Dialog"
import { SegmentedButton, SegmentedRoot } from "@/shared/ui/SegmentedButtons"

import { useAppSelector } from "@/redux/hooks"
import {
  useClaimMutation,
  useClaimNftMutation,
  useInventoryQuery,
} from "@/redux/api/inventory"

import { Inventory, InventoryItem } from "@/types/ny-inventory"

import { cn } from "@/lib/classNames"

const InventoryTab = () => {
  const { t } = useTranslation("products")

  const [filterType, setFilterType] = useState<"all" | "new" | "activated">(
    "all"
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

      <SegmentedRoot
        type="single"
        className={cn(
          "w-full sm:w-[520px] mt-2",
          scale && "3xl:w-[33.854vw] 3xl:mt-[0.52vw]"
        )}
        value={filterType}
        onValueChange={(value) =>
          setFilterType(value as "all" | "new" | "activated")
        }
      >
        <SegmentedButton value="all">{t("inventory.all")}</SegmentedButton>
        <SegmentedButton value="new">{t("inventory.new")}</SegmentedButton>
        <SegmentedButton value="activated">
          {t("inventory.activated")}
        </SegmentedButton>
      </SegmentedRoot>

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
  photos,
}: InventoryItem) => {
  const { t } = useTranslation("products")

  const [successDialogOpen, setSuccessDialogOpen] = useState(false)
  const [link, setLink] = useState("")
  const [isSponsorCopied, setIsSponsorCopied] = useState(false)

  const scale = useAppSelector((state) => state.scale.value)

  const [claim, { isLoading }] = useClaimMutation()
  const [claimNft, { isLoading: isNftLoading }] = useClaimNftMutation()

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

  const onNftSubmit = async () => {
    try {
      const response = await claimNft({ inventoryPrizeId: id }).unwrap()
      setSuccessDialogOpen(true)
      setLink(response.claimUrl ? response.claimUrl : "")
      // toast.success(t("inventory.activation-success"))
    } catch (error) {
      // @ts-expect-error no-rtkq-error-types
      if (error.data.code === "inventory_prize_not_found") {
        toast.error(t("inventory.error-inventory_prize_not_found"))
      }
      // @ts-expect-error no-rtkq-error-types
      else if (error.data.code === "sponsor_prize_is_unclaimed") {
        toast.error(t("inventory.error-sponsor_prize_is_unclaimed"))
      }
      // @ts-expect-error no-rtkq-error-types
      else if (error.data.code === "inventory_prize_already_used") {
        toast.error(t("inventory.error-inventory_prize_already_used"))
      }
      // @ts-expect-error no-rtkq-error-types
      else if (error.data.code === "user_ton_address_not_set") {
        toast.error(t("inventory.error-user_ton_address_not_set"))
      }
      // @ts-expect-error no-rtkq-error-types
      else if (error.data.code === "mint_error") {
        toast.error(t("inventory.error-mint_error"))
      }
      // @ts-expect-error no-rtkq-error-types
      else if (error.data.code === "excepted_soon") {
        toast.error(t("inventory.calendar-not-ready"))
      } else {
        toast.error(t("inventory.activation-error"))
      }
    }
  }

  const onSponsorCopy = () => {
    if (userData) {
      navigator.clipboard.writeText(userData)
      setIsSponsorCopied(true)
      setTimeout(() => {
        setIsSponsorCopied(false)
      }, 3000)
    }
  }

  return (
    <>
      <div
        className={cn(
          "flex flex-col gap-2 w-full mobile-sm:w-[80%] mobile:w-52 p-1 pb-2 bg-white dark:bg-gray-1 rounded-2xl shadow-sm",
          scale &&
            "3xl:gap-[0.52vw] 3xl:w-[13.541vw] 3xl:p-[0.26vw] 3xl:pb-[0.52vw] 3xl:rounded-[1.041vw]"
        )}
      >
        {image ? (
          <img
            src={image}
            className={cn(
              "w-full aspect-square rounded-xl object-cover",
              scale && "3xl:rounded-[0.781vw]"
            )}
          />
        ) : (
          photos.length > 0 && (
            <img
              src={photos[0].file}
              className={cn(
                "w-full aspect-square rounded-xl object-cover",
                scale && "3xl:rounded-[0.781vw]"
              )}
            />
          )
        )}
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
                <DialogTitle>
                  {t("inventory.how-to-activate-prize")}
                </DialogTitle>
                <Text0 className="h-[400px] md:h-auto overflow-auto break-words">
                  {instruction}
                </Text0>
              </DialogContent>
            </Dialog>

            {type === "nft" ? (
              <Button
                isLoading={isNftLoading}
                onClick={onNftSubmit}
                className={cn("mx-1 mt-auto", scale && "3xl:mx-[0.26vw]")}
              >
                {t("inventory.activate-btn")}
              </Button>
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
                <button
                  className={cn(
                    "flex items-center gap-2 mx-auto mt-auto",
                    scale && "3xl:gap-[0.52vw]"
                  )}
                  onClick={onSponsorCopy}
                >
                  <TextAccent className="text-center">
                    {userData.length > 12
                      ? `${userData.slice(0, 12)}...`
                      : userData}
                  </TextAccent>
                  {isSponsorCopied ? (
                    <Check
                      className={cn(
                        "animate-in fade-in-0 w-4 h-4",
                        scale && "3xl:w-[1.041vw] 3xl:h-[1.041vw]"
                      )}
                    />
                  ) : (
                    <Copy
                      className={cn(
                        "animate-in fade-in-0 w-4 h-4",
                        scale && "3xl:w-[1.041vw] 3xl:h-[1.041vw]"
                      )}
                    />
                  )}
                </button>
                // <TextAccent className="text-center mt-auto">
                //   {userData}
                // </TextAccent>
              )
            )}
          </>
        )}
      </div>

      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent
          className={cn("sm:w-[500px]", scale && "3xl:w-[32.552vw]")}
        >
          <DialogTitle>{t("inventory.activation-success")}</DialogTitle>
          <Text0>{t("inventory.success-dialog-text-1")}</Text0>
          <Text0>
            {t("inventory.success-dialog-text-2")}{" "}
            <a
              href={link}
              target="_blank"
              className="underline underline-offset-4"
            >
              {t("inventory.success-dialog-link")}
            </a>
            .
          </Text0>
        </DialogContent>
      </Dialog>
    </>
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
