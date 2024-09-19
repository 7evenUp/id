import { useState, Dispatch, SetStateAction } from "react"
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

import Subheading from "@/shared/typography/Subheading"
import TextAccent from "@/shared/typography/TextAccent"
import Text2 from "@/shared/typography/Text2"
import Text1 from "@/shared/typography/Text1"
import Text0 from "@/shared/typography/Text0"

import { useBuyPrizeMutation } from "@/redux/api/points"
import { useUserProfileQuery } from "@/redux/api/profile"
import { useGetPrizesQuery } from "@/redux/api/points"
import { useAppSelector } from "@/redux/hooks"

import { PointsPrize } from "@/types/points"

import { cn } from "@/lib/classNames"

const PointStoreTab = () => {
  const { t } = useTranslation("products")

  const scale = useAppSelector((state) => state.scale.value)

  const { data: prizes } = useGetPrizesQuery()

  return (
    <div
      className={cn("typography-text-0", scale && "typography-text-0_large")}
    >
      <div className="border-b border-gray-4 dark:border-gray-1" />

      <div
        className={cn(
          "flex items-center gap-2 mt-5 pb-4",
          scale && "3xl:gap-[0.52vw] 3xl:mt-[1.302vw] 3xl:pb-[1.042vw]"
        )}
      >
        <Subheading>{t("points-store.title")}</Subheading>
        <CryptonIcon
          className={cn(
            "w-6 h-6",
            scale && "3xl:w-[1.5625vw] 3xl:h-[1.5625vw]"
          )}
        />
      </div>

      <div
        className={cn("flex flex-col gap-6", scale && "3xl:gap-[1.5625vwvw]")}
      >
        <div className="flex flex-col">
          <TextAccent
            className={cn(
              "mb-1 text-lg dark:text-gray-5",
              scale && "3xl:mb-[0.26vw] 3xl:text-[1.171875vw]/[1.822vw]"
            )}
          >
            Тип приза
          </TextAccent>
          <div
            className={cn(
              "flex items-center gap-2",
              scale && "3xl:gap-[0.52vw]"
            )}
          >
            <NftIcon
              className={cn(
                "w-4 h-4 shrink-0",
                scale && "3xl:w-[1.041vw] 3xl:h-[1.041vw]"
              )}
            />
            <TextAccent className="dark:text-gray-5">- NFT</TextAccent>
          </div>
          <Text0
            className={cn(
              "ml-6 mb-2 max-w-prose",
              scale && "3xl:ml-[1.5625vw] 3xl:mb-[0.52vw]"
            )}
          >
            Вы сможете использовать приз данного типа как захотите, ведь он
            будет храниться у Вас на кошельке
          </Text0>
          <div
            className={cn(
              "flex items-center gap-2",
              scale && "3xl:gap-[0.52vw]"
            )}
          >
            <PercentageIcon
              className={cn(
                "w-4 h-4 shrink-0",
                scale && "3xl:w-[1.041vw] 3xl:h-[1.041vw]"
              )}
            />
            <TextAccent className="dark:text-gray-5">- Промокод</TextAccent>
          </div>
          <Text0 className={cn("ml-6", scale && "3xl:ml-[1.5625vw]")}>
            С призом данного типа вы можете купить подписки Prime / Calendar по
            скидке
          </Text0>
        </div>

        {prizes && prizes.length > 0 && (
          <div
            className={cn("flex flex-wrap gap-5", scale && "3xl:gap-[1.302vw]")}
          >
            {prizes.map(({ id, ...rest }) => (
              <Prize key={id} id={id} {...rest} />
            ))}
          </div>
        )}
      </div>

      {/* <Text0 className={cn("py-2", scale && "3xl:py-[0.52vw]")}>
        {t("points-store.disabled")}
      </Text0> */}
    </div>
  )
}

export default PointStoreTab

const Prize = (prize: PointsPrize) => {
  const { image, photos, description, title, type, price, availableQuantity } =
    prize

  const [open, setOpen] = useState(false)

  const scale = useAppSelector((state) => state.scale.value)

  const { data: profileData } = useUserProfileQuery()

  const { points } = profileData!

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={cn(
            "group relative flex flex-col gap-2 w-full mobile-sm:w-[80%] mobile:w-52 p-1 pb-2 bg-white dark:bg-gray-1 rounded-2xl shadow-sm overflow-hidden",
            scale &&
              "3xl:gap-[0.52vw] 3xl:w-[13.541vw] 3xl:p-[0.26vw] 3xl:pb-[0.52vw] 3xl:rounded-[1.041vw]"
          )}
          disabled={points < price}
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
                <Text0>У приза нет картинки</Text0>
              </Skeleton>
            )}
            <div
              className={cn(
                "absolute left-1 bottom-1 p-1.5 rounded-lg bg-gray-6 dark:bg-gray-1 shadow-sm shadow-black/50",
                scale &&
                  "3xl:left-[0.26vw] 3xl:bottom-[0.26vw] 3xl:p-[0.39vw] 3xl:rounded-[0.52vw]"
              )}
            >
              <Text2>Осталось: {availableQuantity}</Text2>
            </div>
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

          <div className={cn("flex flex-col px-2", scale && "3xl:px-[0.52vw]")}>
            <div
              className={cn(
                "flex items-center gap-1.5 mb-1",
                scale && "3xl:gap-[0.39vw] 3xl:mb-[0.26vw]"
              )}
            >
              <TextAccent className="text-black dark:text-gray-6 tabular-nums">
                {price}
              </TextAccent>
              <CryptonIcon
                className={cn(
                  "w-5 h-5",
                  scale && "3xl:w-[1.3vw] 3xl:h-[1.3vw]"
                )}
              />
            </div>
            <TextAccent
              className={cn(
                "text-left mb-1 dark:text-gray-5",
                scale && "3xl:mt-[0.52vw] 3xl:mb-[0.26vw]"
              )}
            >
              {title}
            </TextAccent>
            <Text1 className="text-left">{description}</Text1>
          </div>

          <div
            className={cn(
              "flex items-center justify-center absolute bg-gray-1/60 dark:bg-gray-2/70 h-full w-full left-0 bottom-0 translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 rounded-2xl transition-all duration-300",
              scale && "3xl:rounded-[1.041vw]"
            )}
          >
            <Subheading className="text-white">
              {points < price ? "Недостаточно средств" : "Приобрести"}
            </Subheading>
          </div>
        </button>
      </DialogTrigger>
      <ConfirmDialog {...prize} setOpen={setOpen} />
    </Dialog>
  )
}

const ConfirmDialog = ({
  id,
  price,
  image,
  description,
  title,
  type,
  photos,
  setOpen,
}: PointsPrize & { setOpen: Dispatch<SetStateAction<boolean>> }) => {
  const scale = useAppSelector((state) => state.scale.value)

  const [buy, { isLoading }] = useBuyPrizeMutation()
  const { data: profileData } = useUserProfileQuery()

  const { points } = profileData!

  const buyPrize = async (prizeId: number) => {
    if (isLoading) return

    try {
      await buy({ prizeId }).unwrap()
      toast.success("Приз был успешно куплен")
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
            toast.error("Приз с этим ID не был найден")
            break

          case "no_more_prizes":
            toast.error("Данный товар закончился")
            break

          case "excepted_soon":
            toast.error("Активация станет доступна, когда сервис будет запущен")
            break

          default:
            break
        }
      } else {
        toast.error("При покупке приза произошла неизвестная ошибка")
      }
    } finally {
      setOpen(false)
    }
  }

  return (
    <DialogContent className={cn("sm:p-4", scale && "3xl:p-[1.041vw]")}>
      <DialogHeader>
        <DialogTitle>Подтверждение покупки</DialogTitle>
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
              <Text0>У приза нет картинки</Text0>
            </Skeleton>
          )}
          <div
            className={cn("flex flex-col gap-2", scale && "3xl:gap-[0.52vw]")}
          >
            <TextAccent className="dark:text-gray-5">{title}</TextAccent>
            <Text0>{description}</Text0>
            <Text0>Тип приза: {type === "nft" ? "NFT" : "Промокод"}</Text0>
          </div>
        </div>

        <Text0>
          После покупки у Вас останется{" "}
          <TextAccent className="dark:text-gray-5">
            {(points - price).toFixed(2)}
          </TextAccent>{" "}
          бонусов
        </Text0>
        <div
          className={cn(
            "flex justify-end gap-3 mt-3",
            scale && "3xl:gap-[0.78125vw] 3xl:mt-[0.78125vw]"
          )}
        >
          <DialogClose>
            <Button className="w-fit">отмена</Button>
          </DialogClose>
          <Button
            className="w-fit"
            onClick={() => buyPrize(id)}
            isLoading={isLoading}
          >
            подтвердить
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}
