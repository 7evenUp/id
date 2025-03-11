import { useState, Dispatch, SetStateAction, useEffect } from "react"
import { DialogClose } from "@radix-ui/react-dialog"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

import CryptonIcon from "@/assets/icons/crypton-logo.svg?react"
import PercentageIcon from "@/assets/icons/percentage.svg?react"
import NftIcon from "@/assets/icons/nft.svg?react"

import { Skeleton } from "@/shared/ui/Skeleton"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"
import {
  SelectNew,
  SelectContentNew,
  SelectItemNew,
  SelectTriggerNew,
} from "@/shared/ui/SelectNew"
// import { SegmentedButton, SegmentedRoot } from "@/shared/ui/SegmentedButtons"

import Subheading from "@/shared/typography/Subheading"
import TextAccent from "@/shared/typography/TextAccent"
import Text2 from "@/shared/typography/Text2"
// import Text1 from "@/shared/typography/Text1"
import Text0 from "@/shared/typography/Text0"

import { useBuyPrizeMutation } from "@/redux/api/points"
import { useUserProfileQuery } from "@/redux/api/profile"
import { useGetPrizesQuery } from "@/redux/api/points"
import { useAppSelector } from "@/redux/hooks"

import { PointsPrize } from "@/types/points"

import { cn } from "@/lib/classNames"

const PointStoreTab = () => {
  const { t } = useTranslation("products")

  // const [filterType, setFilterType] = useState<"all" | "nft" | "promo">("all")
  const [sortedData, setSortedData] = useState<null | PointsPrize[]>(null)
  const [sortPrice, setSortPrice] = useState<"asc" | "desc">("asc")

  const scale = useAppSelector((state) => state.scale.value)

  const { data: prizes, isLoading } = useGetPrizesQuery({ orderBy: "price" })

  useEffect(() => {
    if (!prizes) return

    if (sortPrice === "asc") {
      setSortedData(prizes)
    } else if (sortPrice === "desc") {
      setSortedData([...prizes].sort((a, b) => b.price - a.price))
    }

    // if (filterType === "all") {
    //   setFilteredData(prizes)
    // } else if (filterType === "nft") {
    //   setFilteredData(prizes.filter((prize) => prize.type === "nft"))
    // } else if (filterType === "promo") {
    //   setFilteredData(
    //     prizes.filter((prize) => prize.type === "crypton_promo_code")
    //   )
    // }
  }, [sortPrice, prizes])

  return (
    <div
      className={cn("typography-text-0", scale && "typography-text-0_large")}
    >
      <div className="border-b border-gray-4 dark:border-gray-1" />

      <div
        className={cn(
          "flex items-center gap-2 mt-5 pb-6",
          scale && "3xl:gap-[0.52vw] 3xl:mt-[1.302vw] 3xl:pb-[1.5625vw]"
        )}
      >
        <Subheading>{t("points-store.title")}</Subheading>
        <CryptonIcon
          className={cn(
            "shrink-0 w-6 h-6",
            scale && "3xl:w-[1.5625vw] 3xl:h-[1.5625vw]"
          )}
        />
      </div>

      <div className={cn("flex flex-col gap-4", scale && "3xl:gap-[1.041vw]")}>
        <div className="flex flex-col">
          <TextAccent
            className={cn(
              "mb-2 text-lg dark:text-gray-5",
              scale && "3xl:mb-[0.52vw] 3xl:text-[1.171875vw]/[1.822vw]"
            )}
          >
            {t("points-store.Тип товара")}
          </TextAccent>
          <div
            className={cn(
              "flex items-start gap-1 mb-2 flex-wrap",
              scale && "3xl:gap-[0.26vw] 3xl:mb-[0.52vw]"
            )}
          >
            <NftIcon
              className={cn(
                "w-4 h-4 shrink-0 mt-0.5",
                scale && "3xl:w-[1.041vw] 3xl:h-[1.041vw] 3xl:mt-[0.13vw]"
              )}
            />
            <TextAccent className="dark:text-gray-5 shrink-0">NFT</TextAccent>
            <Text0 className="w-full">
              {t(
                "points-store.Вы сможете получить NFT на ваш TON кошелек после активации товара в инвентаре ID"
              )}
            </Text0>
          </div>

          <div
            className={cn(
              "flex items-start gap-1 flex-wrap",
              scale && "3xl:gap-[0.26vw]"
            )}
          >
            <PercentageIcon
              className={cn(
                "w-4 h-4 shrink-0 mt-0.5",
                scale && "3xl:w-[1.041vw] 3xl:h-[1.041vw] 3xl:mt-[0.13vw]"
              )}
            />
            <TextAccent className="dark:text-gray-5 shrink-0">
              {t("points-store.Промокод")}
            </TextAccent>
            <Text0 className="w-full">
              {t(
                "points-store.Товары данного типа содержат в себе различные промокоды. Это могут быть скидки на подписки Prime/Calendar или партнерские сервисы."
              )}
            </Text0>
          </div>
        </div>

        <div className="flex gap-10">
          {/* <SegmentedRoot
            type="single"
            className={cn("w-full sm:w-[520px]", scale && "3xl:w-[33.854vw]")}
            value={filterType}
            onValueChange={(value) =>
              setFilterType(value as "all" | "nft" | "promo")
            }
          >
            <SegmentedButton value="all">{t("inventory.all")}</SegmentedButton>
            <SegmentedButton value="nft">NFT</SegmentedButton>
            <SegmentedButton value="promo">
              {t("points-store.Промокод")}
            </SegmentedButton>
          </SegmentedRoot> */}
          {/* <Popover>
            <PopoverTrigger className="h-10 w-10 rounded-xl bg-gray-5/25 dark:bg-gray-1 flex items-center justify-center hover:bg-gray-5/50 dark:hover:bg-gray-2/70 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M7 12h10" />
                <path d="M10 18h4" />
              </svg>
            </PopoverTrigger>
            <PopoverContent align="start" className="dark:text-gray-5 w-60">
              <div
                className={cn(
                  "flex items-center gap-2 mb-2",
                  scale && "3xl:gap-[0.521vw] 3xl:mb-[0.26vw]"
                )}
              >
                <Checkbox id="nft" />
                <CheckboxLabel htmlFor="nft">NFT</CheckboxLabel>
              </div>
              <div
                className={cn(
                  "flex items-center gap-2 mb-2",
                  scale && "3xl:gap-[0.521vw] 3xl:mb-[0.26vw]"
                )}
              >
                <Checkbox id="crypton_promocode" />
                <CheckboxLabel htmlFor="crypton_promocode">Crypton Promocode</CheckboxLabel>
              </div>
              <div
                className={cn(
                  "flex items-center gap-2",
                  scale && "3xl:gap-[0.521vw]"
                )}
              >
                <Checkbox id="sponsor_promocode" />
                <CheckboxLabel htmlFor="sponsor_promocode">Sponsor Promocode</CheckboxLabel>
              </div>
            </PopoverContent>
          </Popover> */}

          <SelectNew
            value={sortPrice}
            onValueChange={(value) => setSortPrice(value as "asc" | "desc")}
          >
            <SelectTriggerNew placeholder="Сортировать по:" />
            <SelectContentNew>
              <SelectItemNew value="asc">
                {t("points-store.От наименьшего к большему")}
              </SelectItemNew>
              <SelectItemNew value="desc">
                {t("points-store.От наибольшего к меньшему")}
              </SelectItemNew>
            </SelectContentNew>
          </SelectNew>
        </div>

        {isLoading ? (
          <div
            className={cn(
              "flex flex-wrap gap-3 md:gap-5",
              scale && "3xl:gap-[1.302vw]"
            )}
          >
            <Skeleton
              className={cn(
                "max-mobile-sm:max-w-[100%] max-mobile:min-w-[162px] max-mobile:flex-1 max-mobile:max-w-[50%] mobile:w-48 sm:w-52 h-[300px] sm:h-[320px] rounded-2xl",
                scale &&
                  "3xl:w-[13.541vw] 3xl:h-[20.833vw] 3xl:rounded-[1.041vw]"
              )}
            />
            <Skeleton
              className={cn(
                "max-mobile-sm:max-w-[100%] max-mobile:min-w-[162px] max-mobile:flex-1 max-mobile:max-w-[50%] mobile:w-48 sm:w-52 h-[300px] sm:h-[320px] rounded-2xl",
                scale &&
                  "3xl:w-[13.541vw] 3xl:h-[20.833vw] 3xl:rounded-[1.041vw]"
              )}
            />
            <Skeleton
              className={cn(
                "max-mobile-sm:max-w-[100%] max-mobile:min-w-[162px] max-mobile:flex-1 max-mobile:max-w-[50%] mobile:w-48 sm:w-52 h-[300px] sm:h-[320px] rounded-2xl",
                scale &&
                  "3xl:w-[13.541vw] 3xl:h-[20.833vw] 3xl:rounded-[1.041vw]"
              )}
            />
            <Skeleton
              className={cn(
                "max-mobile-sm:max-w-[100%] max-mobile:min-w-[162px] max-mobile:flex-1 max-mobile:max-w-[50%] mobile:w-48 sm:w-52 h-[300px] sm:h-[320px] rounded-2xl",
                scale &&
                  "3xl:w-[13.541vw] 3xl:h-[20.833vw] 3xl:rounded-[1.041vw]"
              )}
            />
          </div>
        ) : (
          sortedData &&
          sortedData.length > 0 && (
            <div
              className={cn(
                "flex flex-col items-center mobile-sm:items-stretch mobile-sm:flex-row mobile-sm:flex-wrap gap-3 md:gap-5",
                scale && "3xl:gap-[1.302vw]"
              )}
            >
              {sortedData.map(({ id, ...rest }) => (
                <Prize key={id} id={id} {...rest} />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default PointStoreTab

const Prize = (prize: PointsPrize) => {
  const { t } = useTranslation("products")

  const { image, photos, title, type, price, availableQuantity } = prize

  const scale = useAppSelector((state) => state.scale.value)

  const [open, setOpen] = useState(false)

  const { data: profileData } = useUserProfileQuery()

  const { points } = profileData!

  return (
    <div
      className={cn(
        "group relative flex flex-col gap-2 max-mobile-sm:max-w-[80%] max-mobile:min-w-[162px] max-mobile:flex-1 max-mobile:max-w-[50%] mobile:w-48 sm:w-52 p-1 bg-white dark:bg-gray-1 rounded-2xl shadow-sm overflow-hidden",
        scale &&
          "3xl:gap-[0.52vw] 3xl:w-[13.541vw] 3xl:p-[0.26vw] 3xl:pb-[0.26vw] 3xl:rounded-[1.041vw]"
      )}
    >
      <div className="relative">
        {image ? (
          <img
            src={image}
            className={cn(
              "rounded-xl object-cover aspect-square",
              scale && "3xl:rounded-[0.78125vw]"
            )}
          />
        ) : photos.length > 0 ? (
          <img
            src={photos[0].file}
            className={cn(
              "rounded-xl object-cover aspect-square",
              scale && "3xl:rounded-[0.78125vw]"
            )}
          />
        ) : (
          <Skeleton
            className={cn(
              "rounded-xl aspect-square flex items-center justify-center",
              scale && "3xl:rounded-[0.78125vw]"
            )}
          >
            <Text0>У товара нет картинки</Text0>
          </Skeleton>
        )}
        <div
          className={cn(
            "absolute right-1 top-1 grid place-content-center rounded-full w-6 h-6 bg-white dark:bg-gray-1 shadow-sm shadow-black/50",
            scale &&
              "3xl:right-[0.26vw] 3xl:top-[0.26vw] 3xl:w-[1.5625vw] 3xl:h-[1.5625vw]"
          )}
        >
          {type === "nft" ? (
            <NftIcon
              className={cn(
                "w-4 h-4",
                scale && "3xl:w-[1.041vw] 3xl:h-[1.041vw]"
              )}
            />
          ) : (
            <PercentageIcon
              className={cn(
                "w-4 h-4",
                scale && "3xl:w-[1.041vw] 3xl:h-[1.041vw]"
              )}
            />
          )}
        </div>
      </div>

      <div
        className={cn(
          "flex flex-col px-0.5 mobile:px-2",
          scale && "3xl:px-[0.52vw]"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between w-full mb-2",
            scale && "3xl:mb-[0.52vw]"
          )}
        >
          <div
            className={cn(
              "flex items-center gap-1.5",
              scale && "3xl:gap-[0.39vw]"
            )}
          >
            <TextAccent className="text-black dark:text-gray-6 tabular-nums">
              {price}
            </TextAccent>
            <CryptonIcon
              className={cn("w-5 h-5", scale && "3xl:w-[1.3vw] 3xl:h-[1.3vw]")}
            />
          </div>

          <div
            className={cn(
              "px-1.5 py-1 rounded-lg bg-gray-6 dark:bg-gray-2/20 shadow-sm shadow-black/20",
              scale && "3xl:px-[0.39vw] 3xl:py-[0.26vw] 3xl:rounded-[0.52vw]"
            )}
          >
            <Text2>
              {t("points-store.Осталось")}: {availableQuantity}
            </Text2>
          </div>
        </div>
        <TextAccent
          className={cn(
            "text-left mb-1 dark:text-gray-5",
            scale && "3xl:mt-[0.52vw] 3xl:mb-[0.26vw]"
          )}
        >
          {title}
        </TextAccent>
        {/* <Text1 className="text-left">{description}</Text1> */}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mt-auto max-sm:py-1.5" disabled={points < price}>
            {t("points-store.приобрести")}
          </Button>
        </DialogTrigger>
        <ConfirmDialog {...prize} setOpen={setOpen} />
      </Dialog>
    </div>
  )
}

const ConfirmDialog = ({
  id,
  price,
  image,
  // description,
  title,
  type,
  photos,
  setOpen,
}: PointsPrize & { setOpen: Dispatch<SetStateAction<boolean>> }) => {
  const { t } = useTranslation("products")

  const scale = useAppSelector((state) => state.scale.value)

  const [buy, { isLoading }] = useBuyPrizeMutation()
  const { data: profileData } = useUserProfileQuery()

  const { points } = profileData!

  const buyPrize = async (prizeId: number) => {
    if (isLoading) return

    try {
      await buy({ prizeId }).unwrap()
      toast.success(t("points-store.Товар был успешно куплен"))
    } catch (error) {
      // @ts-expect-error RTKQ no error types
      if (error.status === 400) {
        // @ts-expect-error RTKQ no error types
        switch (error.data.code) {
          case "insufficient_balance":
            toast.error(
              "На Вашем аккаунте недостаточно Crypton Points для покупки"
            )
            break

          case "user_ton_address_not_set":
            toast.error("Для покупки необходимо привязать TON кашелёк")
            break

          case "param_not_provided":
            toast.error("Параметр не был передан для запроса на покупку")
            break

          case "user_not_found":
            toast.error("Пользователь не был найден")
            break

          case "prize_not_found":
            toast.error("Товар с этим ID не был найден")
            break

          case "no_more_prizes":
            toast.error("Данный товар закончился")
            break

          case "excepted_soon":
            toast.error("Активация станет доступна, когда сервис будет запущен")
            break

          case "inventory_prize_not_found":
            toast.error("Произошла ошибка inventory_prize_not_found")
            break

          case "sponsor_prize_is_unclaimed":
            toast.error("Произошла ошибка sponsor_prize_is_unclaimed")
            break

          case "inventory_prize_already_used":
            toast.error("Произошла ошибка inventory_prize_already_used")
            break

          case "mint_error":
            toast.error("Произошла ошибка mint_error")
            break

          case "crypton_service_not_configured":
            toast.error("Произошла ошибка crypton_service_not_configured")
            break

          case "prize_activation_freeze":
            toast.error(
              "Активация приза заморожена. Пожалуйста, попробуйте позже"
            )
            break

          default:
            break
        }
      } else {
        toast.error("При покупке товара произошла неизвестная ошибка")
      }
    } finally {
      setOpen(false)
    }
  }

  return (
    <DialogContent className={cn("sm:p-4", scale && "3xl:p-[1.041vw]")}>
      <DialogHeader>
        <DialogTitle>{t("points-store.Подтверждение покупки")}</DialogTitle>
      </DialogHeader>
      <div className={cn("flex flex-col gap-2", scale && "3xl:gap-[0.52vw]")}>
        <div
          className={cn(
            "flex gap-4 my-4",
            scale && "3xl:gap-[1.041vw] 3xl:my-[1.041vw]"
          )}
        >
          {image ? (
            <img
              src={image}
              className={cn(
                "rounded-xl object-cover aspect-square w-32",
                scale && "3xl:rounded-[0.78125vw] 3xl:w-[8.33vw]"
              )}
            />
          ) : photos.length > 0 ? (
            <img
              src={photos[0].file}
              className={cn(
                "rounded-xl object-cover aspect-square w-32",
                scale && "3xl:rounded-[0.78125vw] 3xl:w-[8.33vw]"
              )}
            />
          ) : (
            <Skeleton
              className={cn(
                "rounded-xl aspect-square flex items-center justify-center w-32",
                scale && "3xl:rounded-[0.78125vw] 3xl:w-[8.33vw]"
              )}
            >
              <Text0>У товара нет картинки</Text0>
            </Skeleton>
          )}
          <div
            className={cn("flex flex-col gap-2", scale && "3xl:gap-[0.52vw]")}
          >
            <TextAccent className="dark:text-gray-5">{title}</TextAccent>
            {/* <Text0>{description}</Text0> */}
            <Text0>
              {t("points-store.Тип товара")}:{" "}
              {type === "nft" ? "NFT" : "Промокод"}
            </Text0>
          </div>
        </div>

        <Text0>
          {t("points-store.После покупки у Вас останется")}{" "}
          <TextAccent className="dark:text-gray-5">
            {(points - price).toFixed(2)}
          </TextAccent>{" "}
          {t("points-store.бонусов")}
        </Text0>
        <div
          className={cn(
            "flex justify-end gap-3 mt-3",
            scale && "3xl:gap-[0.78125vw] 3xl:mt-[0.78125vw]"
          )}
        >
          <DialogClose>
            <Button className="w-fit">{t("points-store.отмена")}</Button>
          </DialogClose>
          <Button
            className="w-fit"
            onClick={() => buyPrize(id)}
            isLoading={isLoading}
          >
            {t("points-store.подтвердить")}
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}
