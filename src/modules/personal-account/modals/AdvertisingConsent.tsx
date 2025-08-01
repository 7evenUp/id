import { Dispatch, SetStateAction, useEffect } from "react"
import { useTranslation } from "react-i18next"

import Button from "@/shared/ui/Button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/ui/Drawer"
import Text0 from "@/shared/typography/Text0"
import Switch from "@/shared/ui/Switch"
import useSendEvent from "@/shared/hooks/useSendEvent"

import { useSetAdvertisingConsentMutation } from "@/redux/api/profile"

import {
  SEARCH_PARAM_KEYS,
  SEARCH_PARAM_VALUES,
} from "@/constants/searchParams"

const AdvertisingConsent = ({
  open,
  setOpen,
  consentState,
  setConsentState,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  consentState: boolean
  setConsentState: Dispatch<SetStateAction<boolean>>
}) => {
  const { t } = useTranslation()

  const { sendEvent } = useSendEvent()

  const [mutate, { isLoading: isMutateLoading }] =
    useSetAdvertisingConsentMutation()

  const onChangeAdvertisingClick = async (isAdvertisingOn: boolean) => {
    if (isMutateLoading) return

    sendEvent({
      name: "advertising_switch",
      payload: { currentValue: "" + isAdvertisingOn },
    })
    setConsentState(isAdvertisingOn)
    await mutate({ advertising_consent: isAdvertisingOn })
  }

  useEffect(() => {
    const url = new URL(location.href)
    const openModalParam = url.searchParams.get(SEARCH_PARAM_KEYS.open_modal)

    if (!openModalParam) return

    if (openModalParam === SEARCH_PARAM_VALUES.open_modal.newsletter) {
      setOpen(true)
    }
  }, [])

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{t("Подписка на рассылку")}</DrawerTitle>
            <DrawerDescription>
              {t(
                "Подписаться на рассылку, чтобы получать информацию об акциях и новостях экосистемы Crypton."
              )}
            </DrawerDescription>
          </DrawerHeader>
          <label className="p-4 pb-0 flex items-center justify-between mb-4">
            <Text0>
              {t("Статус подписки")}:{" "}
              {consentState ? t("Активна") : t("Выключена")}
            </Text0>
            <Switch
              checked={consentState}
              onCheckedChange={onChangeAdvertisingClick}
            />
          </label>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button className="h-8">
                <Text0>{t("Закрыть")}</Text0>
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default AdvertisingConsent
