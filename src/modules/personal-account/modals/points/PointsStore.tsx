import { toast } from "sonner"
import { isDesktop } from "react-device-detect"
import { DialogClose } from "@radix-ui/react-dialog"

import ModalTrigger from "../../components/ModalTrigger"

import CryptonIcon from "@/assets/icons/crypton-logo.svg?react"
import PercentageIcon from "@/assets/icons/percentage.svg?react"
import NftIcon from "@/assets/icons/nft.svg?react"

import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"
import { Skeleton } from "@/shared/ui/Skeleton"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/ui/HoverCard"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover"

import Text0 from "@/shared/typography/Text0"
import TextAccent from "@/shared/typography/TextAccent"
import Text1 from "@/shared/typography/Text1"

import { useBuyPrizeMutation, useGetPrizesQuery } from "@/redux/api/points"
import { useAppSelector } from "@/redux/hooks"
import { useUserProfileQuery } from "@/redux/api/profile"

import { PointsPrize } from "@/types/points"

import { cn } from "@/lib/classNames"

const PointsStore = () => {
  const scale = useAppSelector((state) => state.scale.value)

  const { data: profileData } = useUserProfileQuery()
  const { data: prizes } = useGetPrizesQuery()

  const { points } = profileData!

  return (
    <DialogContent
      className={cn(
        "sm:max-w-[550px] md:max-w-[680px] 2xl:max-w-[800px]",
        scale && "3xl:w-[44.27vw]"
      )}
    >
      <DialogHeader className="gap-1 mobile:gap-0 mobile:items-center flex-col mobile:flex-row">
        <DialogTitle>Магазин Crypton Points</DialogTitle>
        <Text0 className="relative mr-4 sm:m-0 w-fit">
          Ваш баланс:{" "}
          <TextAccent className="dark:text-gray-5">{points}</TextAccent>
          <CryptonIcon
            className={cn(
              "absolute w-4 h-4 -top-1 -right-4",
              scale &&
                "3xl:w-[1.041vw] 3xl:h-[1.041vw] 3xl:-top-[0.26vw] 3xl:-right-[1.041vw]"
            )}
          />
        </Text0>
      </DialogHeader>
      <div
        className={cn(
          "flex flex-col gap-6 max-h-[440px] overflow-auto pr-2 pb-1",
          scale &&
            "3xl:gap-[1.5625vwvw] 3xl:max-h-[28.64vw] 3xl:pr-[0.521vw] 3xl:pb-[0.26vw]"
        )}
      >
        <Text0>
          Какой-нибудь текст-пояснение. Мол типо после покупки Ваш приз попадёт
          в секцию <TextAccent>Инвентарь</TextAccent>. Покупайте уникальные
          призы / предметы / бонусы и пользуйтесь на здоровье.
        </Text0>
        {prizes && prizes.length > 0 && (
          <div
            className={cn(
              "grid grid-cols-1 mobile-sm:grid-cols-2 mobile:grid-cols-3 gap-10 mobile-sm:gap-6 md:gap-10",
              scale && "3xl:gap-[2.6vw]"
            )}
          >
            {prizes.map(({ id, ...rest }) => (
              <Prize key={id} id={id} {...rest} />
            ))}
          </div>
        )}
      </div>
    </DialogContent>
  )
}

export default PointsStore

const Prize = (prize: PointsPrize) => {
  const { image, photos, description, title, type, price } = prize

  const scale = useAppSelector((state) => state.scale.value)

  return (
    <div className="flex flex-col">
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
            "absolute left-1 bottom-1 flex items-center gap-1.5 p-1 rounded-lg bg-gray-6 dark:bg-gray-1 shadow-sm shadow-black/50",
            scale &&
              "3xl:left-[0.26vw] 3xl:bottom-[0.26vw] 3xl:gap-[0.39vw] 3xl:p-[0.26vw] 3xl:rounded-[0.52vw]"
          )}
        >
          <TextAccent className="text-black dark:text-gray-6 tabular-nums">
            {price}
          </TextAccent>
          <CryptonIcon
            className={cn("w-5 h-5", scale && "3xl:w-[1.3vw] 3xl:h-[1.3vw]")}
          />
        </div>
        <PrizeTypeIcon type={type} />
      </div>

      <TextAccent
        className={cn(
          "mt-2 mb-1 dark:text-gray-5",
          scale && "3xl:mt-[0.52vw] 3xl:mb-[0.26vw]"
        )}
      >
        {title}
      </TextAccent>
      <Text1 className={cn("mb-3", scale && "3xl:mb-[0.78125vw]")}>
        {description}
      </Text1>

      <ModalTrigger content={<ConfirmDialog {...prize} />}>
        <Button className="mt-auto">приобрести</Button>
      </ModalTrigger>
    </div>
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
}: PointsPrize) => {
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

          default:
            break
        }
      } else {
        toast.error("При покупке приза произошла неизвестная ошибка")
      }
    }
  }

  return (
    <DialogContent>
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

const PrizeTypeIcon = ({ type }: { type: "nft" | "crypton_promo_code" }) => {
  const scale = useAppSelector((state) => state.scale.value)

  if (isDesktop)
    return (
      <HoverCard openDelay={150}>
        <HoverCardTrigger
          className={cn(
            "absolute right-1 top-1 grid place-content-center rounded-full w-6 h-6 bg-white hover:bg-gray-5 dark:bg-gray-1 shadow-sm shadow-black/50 dark:hover:bg-gray-2 transition-colors cursor-pointer",
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
        </HoverCardTrigger>
        <HoverCardContent className="flex flex-col">
          <TextAccent
            className={cn(
              "mb-4 text-lg dark:text-gray-5",
              scale && "3xl:mb-[1.041vw] 3xl:text-[1.171875vw]/[1.822vw]"
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
              "ml-6 mb-2",
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
        </HoverCardContent>
      </HoverCard>
    )

  return (
    <Popover>
      <PopoverTrigger className="absolute right-1 top-1 grid place-content-center rounded-full w-6 h-6 bg-white dark:bg-gray-1 border border-gray-1 dark:border-gray-2 dark:hover:bg-gray-2 transition-colors cursor-pointer">
        {type === "nft" ? (
          <NftIcon className="w-4 h-4" />
        ) : (
          <PercentageIcon className="w-4 h-4" />
        )}
      </PopoverTrigger>
      <PopoverContent className="flex flex-col dark:text-gray-4 min-w-[280px]">
        <TextAccent className="mb-4 text-lg dark:text-gray-5">
          Тип приза
        </TextAccent>
        <div className="flex items-center gap-2">
          <NftIcon className="w-4 h-4 shrink-0" />
          <TextAccent>- NFT</TextAccent>
        </div>
        <Text0 className="ml-6 mb-2">
          Вы сможете использовать приз данного типа как захотите, ведь он будет
          храниться у Вас на кошельке
        </Text0>
        <div className="flex items-center gap-2">
          <PercentageIcon className="w-4 h-4 shrink-0" />
          <TextAccent>- Промокод</TextAccent>
        </div>
        <Text0 className="ml-6">
          С призом данного типа вы можете купить подписки Prime / Calendar по
          скидке
        </Text0>
      </PopoverContent>
    </Popover>
  )
}
