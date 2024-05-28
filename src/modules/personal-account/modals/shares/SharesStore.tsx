import { Dispatch, SetStateAction, useState } from "react"
import { toast } from "sonner"
import { DialogClose } from "@radix-ui/react-dialog"
import { useTranslation } from "react-i18next"

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
// import Text1 from "@/shared/typography/Text1"
import TextXs from "@/shared/typography/TextXs"

import { useClaimSharesMutation, useGetSharesQuery } from "@/redux/api/points"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useUserProfileQuery } from "@/redux/api/profile"
import { changeRootTab } from "@/redux/root-tabs/slice"

import { PointsPrize } from "@/types/points"

import { formatDate } from "@/lib/date-fns"
import { cn } from "@/lib/classNames"

const SharesStore = () => {
  const { t, i18n } = useTranslation("modals")

  const scale = useAppSelector((state) => state.scale.value)

  const { data: profileData } = useUserProfileQuery()
  const { data: prizes } = useGetSharesQuery()

  const { investFundBalance, investFundClosestBurnings } = profileData!

  return (
    <DialogContent
      className={cn(
        "sm:max-w-[550px] md:max-w-[680px] xl:max-w-[1200px]",
        scale && "3xl:w-[78.125vw]"
      )}
    >
      <DialogHeader className="gap-1 mobile:gap-0 mobile:items-center flex-col mobile:flex-row">
        <DialogTitle>{t("shares.convert.heading")}</DialogTitle>
        <Text0 className="w-fit">
          {t("shares.convert.my-shares")}:{" "}
          <TextAccent className="dark:text-gray-5">
            {investFundBalance}
          </TextAccent>
        </Text0>
      </DialogHeader>
      {investFundClosestBurnings.length > 0 && (
        <div
          className={cn(
            "ml-auto flex flex-col items-end gap-1 bg-gray-5/30 dark:bg-gray-2 w-fit p-3 rounded-md",
            scale && "3xl:p-[0.78125vw] 3xl:rounded-[0.39vw]"
          )}
        >
          {investFundClosestBurnings.map((el, i) => (
            <TextXs key={i}>
              <span className="font-semibold">{el.amount} Shares</span>{" "}
              {t("shares.convert.burn")}{" "}
              <span className="font-semibold">
                {formatDate(el.burningDate, i18n.language as "ru" | "en")}
              </span>
            </TextXs>
          ))}
        </div>
      )}
      <div
        className={cn(
          "flex flex-col gap-6 max-h-[440px] overflow-auto pr-2 pb-1",
          scale &&
            "3xl:gap-[1.5625vw] 3xl:max-h-[28.64vw] 3xl:pr-[0.521vw] 3xl:pb-[0.26vw]"
        )}
      >
        <Text0 className="max-w-prose">
          {t("shares.convert.description-1")}{" "}
          <TextAccent>{t("shares.convert.inventory")}</TextAccent>{" "}
          {t("shares.convert.description-2")}
        </Text0>
        {prizes && prizes.length > 0 && (
          <div
            className={cn(
              "grid grid-cols-1 mobile-sm:grid-cols-2 mobile:grid-cols-3 xl:grid-cols-5 gap-10 mobile-sm:gap-4 md:gap-8",
              scale && "3xl:gap-[2.08vw]"
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
  const { image, photos, title, price } = prize

  const { t } = useTranslation("modals")

  const [open, setOpen] = useState(false)

  const scale = useAppSelector((state) => state.scale.value)

  const { data: profileData } = useUserProfileQuery()

  const { investFundBalance } = profileData!

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
            <Text0>У Shares нет картинки</Text0>
          </Skeleton>
        )}
        {/* <div
          className={cn(
            "absolute left-1 bottom-1 flex items-center justify-center w-7 h-7 rounded-lg bg-gray-6 dark:bg-gray-1 shadow-sm shadow-black/50",
            scale &&
              "3xl:left-[0.26vw] 3xl:bottom-[0.26vw] 3xl:w-[1.822vw] 3xl:h-[1.822vw] 3xl:rounded-[0.52vw]"
          )}
        >
          <TextAccent className="text-black dark:text-gray-6 tabular-nums">
            {price}
          </TextAccent>
        </div> */}
      </div>

      <TextAccent
        className={cn(
          "mt-2 mb-3 dark:text-gray-5",
          scale && "3xl:mt-[0.52vw] 3xl:mb-[0.78125vw]"
        )}
      >
        {title}
      </TextAccent>
      {/* <Text1 className={cn("mb-3", scale && "3xl:mb-[0.78125vw]")}>
        {description}
      </Text1> */}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mt-auto" disabled={investFundBalance < price}>
            {t("shares.convert.convert")}
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
  title,
  photos,
  setOpen,
}: PointsPrize & { setOpen: Dispatch<SetStateAction<boolean>> }) => {
  const { t } = useTranslation("modals")
  const { t: tErrors } = useTranslation("reqResponses")

  const scale = useAppSelector((state) => state.scale.value)
  const dispatch = useAppDispatch()

  const [claim, { isLoading }] = useClaimSharesMutation()
  const { data: profileData } = useUserProfileQuery()

  const { investFundBalance } = profileData!

  const claimShares = async (prizeId: number) => {
    if (isLoading) return

    try {
      await claim({ prizeId }).unwrap()
      dispatch(changeRootTab("inventory"))
      toast.success("Shares успешно конвертированы в NFT")
    } catch (error) {
      // @ts-expect-error RTKQ no error types
      if (error.status === 400) {
        // @ts-expect-error RTKQ no error types
        switch (error.data.code) {
          case "limit_reached":
            toast.error(tErrors("shares-limit_reached"))
            break
          case "insufficient_balance":
            toast.error(tErrors("shares-insufficient_balance"))
            break

          case "user_ton_address_not_set":
            toast.error(tErrors("shares-user_ton_address_not_set"))
            break

          case "param_not_provided":
            toast.error(tErrors("shares-param_not_provided"))
            break

          case "user_not_found":
            toast.error(tErrors("user_not_found"))
            break

          case "prize_not_found":
            toast.error(tErrors("shares-prize_not_found"))
            break

          case "no_more_prizes":
            toast.error(tErrors("shares-no_more_prizes"))
            break

          default:
            toast.error(tErrors("shares-unknown_error"))
            break
        }
      } else {
        toast.error(tErrors("server-error"))
      }
    } finally {
      setOpen(false)
    }
  }

  return (
    <DialogContent className={cn("sm:p-4", scale && "3xl:p-[1.041vw]")}>
      <DialogHeader>
        <DialogTitle>{t("shares.confirm.heading")}</DialogTitle>
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
            <Text0
              className={cn("max-w-[200px]", scale && "3xl:max-w-[13.02vw]")}
            >
              {t("shares.confirm.after")}{" "}
              <TextAccent className="dark:text-gray-5">
                {(investFundBalance - price).toFixed(2)}
              </TextAccent>{" "}
              Shares
            </Text0>
          </div>
        </div>

        <div
          className={cn(
            "flex justify-end gap-3 mt-3",
            scale && "3xl:gap-[0.78125vw] 3xl:mt-[0.78125vw]"
          )}
        >
          <DialogClose>
            <Button className="w-fit">{t("shares.confirm.cancel")}</Button>
          </DialogClose>
          <Button
            className="w-fit"
            onClick={() => claimShares(id)}
            isLoading={isLoading}
          >
            {t("shares.confirm.submit")}
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}
