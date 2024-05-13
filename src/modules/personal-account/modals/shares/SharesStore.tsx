import { Dispatch, SetStateAction, useState } from "react"
import { toast } from "sonner"
import { DialogClose } from "@radix-ui/react-dialog"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"
import { Skeleton } from "@/shared/ui/Skeleton"

import Text0 from "@/shared/typography/Text0"
import TextAccent from "@/shared/typography/TextAccent"
import Text1 from "@/shared/typography/Text1"

import { useClaimSharesMutation, useGetSharesQuery } from "@/redux/api/points"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useUserProfileQuery } from "@/redux/api/profile"
import { change } from "@/redux/tabs/slice"

import { PointsPrize } from "@/types/points"

import { cn } from "@/lib/classNames"

const SharesStore = () => {
  const scale = useAppSelector((state) => state.scale.value)

  const { data: profileData } = useUserProfileQuery()
  const { data: prizes } = useGetSharesQuery()

  const { investFundBalance } = profileData!

  return (
    <DialogContent
      className={cn(
        "sm:max-w-[550px] md:max-w-[680px] 2xl:max-w-[800px]",
        scale && "3xl:w-[44.27vw]"
      )}
    >
      <DialogHeader className="gap-1 mobile:gap-0 mobile:items-center flex-col mobile:flex-row">
        <DialogTitle>Конвертация Shares в NFT</DialogTitle>
        <Text0 className="relative mr-4 sm:m-0 w-fit">
          Ваши shares:{" "}
          <TextAccent className="dark:text-gray-5">
            {investFundBalance}
          </TextAccent>
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
          Какой-нибудь текст-пояснение. Мол типо после конвертации Ваша NFT
          попадёт в секцию <TextAccent>Инвентарь</TextAccent>. Покупайте
          уникальные призы / предметы / бонусы и пользуйтесь на здоровье.
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

export default SharesStore

const Prize = (prize: PointsPrize) => {
  const { image, photos, description, title, price } = prize

  const [open, setOpen] = useState(false)

  const scale = useAppSelector((state) => state.scale.value)

  const { data: profileData } = useUserProfileQuery()

  const { points } = profileData!

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
            "absolute left-1 bottom-1 flex items-center justify-center w-7 h-7 rounded-lg bg-gray-6 dark:bg-gray-1 shadow-sm shadow-black/50",
            scale &&
              "3xl:left-[0.26vw] 3xl:bottom-[0.26vw] 3xl:w-[1.822vw] 3xl:h-[1.822vw] 3xl:rounded-[0.52vw]"
          )}
        >
          <TextAccent className="text-black dark:text-gray-6 tabular-nums">
            {price}
          </TextAccent>
        </div>
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mt-auto" disabled={points < price}>
            конвертация
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
  description,
  title,
  photos,
  setOpen,
}: PointsPrize & { setOpen: Dispatch<SetStateAction<boolean>> }) => {
  const scale = useAppSelector((state) => state.scale.value)
  const dispatch = useAppDispatch()

  const [claim, { isLoading }] = useClaimSharesMutation()
  const { data: profileData } = useUserProfileQuery()

  const { investFundBalance } = profileData!

  const claimShares = async (prizeId: number) => {
    if (isLoading) return

    try {
      await claim({ prizeId }).unwrap()
      dispatch(change("inventory"))
      toast.success("Shares успешно конвертированы в NFT")
    } catch (error) {
      // @ts-expect-error RTKQ no error types
      if (error.status === 400) {
        // @ts-expect-error RTKQ no error types
        switch (error.data.code) {
          case "insufficient_balance":
            toast.error("На Вашем аккаунте недостаточно Shares для конвертации")
            break

          case "user_ton_address_not_set":
            toast.error("Для конвертации необходимо привязать TON кашелёк")
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
        toast.error("При конвертации произошла неизвестная ошибка")
      }
    } finally {
      setOpen(false)
    }
  }

  return (
    <DialogContent className={cn("sm:p-4", scale && "3xl:p-[1.041vw]")}>
      <DialogHeader>
        <DialogTitle>Подтверждение конвертации</DialogTitle>
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
          </div>
        </div>

        <Text0>
          После покупки у Вас останется{" "}
          <TextAccent className="dark:text-gray-5">
            {(investFundBalance - price).toFixed(2)}
          </TextAccent>{" "}
          shares
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
            onClick={() => claimShares(id)}
            isLoading={isLoading}
          >
            подтвердить
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}
