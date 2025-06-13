import { Dispatch, SetStateAction } from "react"
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

import { useSetAdvertisingConsentMutation } from "@/redux/api/profile"

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

  const [mutate] = useSetAdvertisingConsentMutation()

  const onChangeAdvertisingClick = (isAdvertisingOn: boolean) => {
    setConsentState(isAdvertisingOn)
    mutate({ advertising_consent: isAdvertisingOn })
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Подписка на рассылку</DrawerTitle>
            <DrawerDescription>
              Подписаться на рассылку, чтобы получать информацию об акциях и
              новостях экосистемы Crypton.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            Статус подписки: {consentState ? "Active" : "Disabled"}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button
                className="h-8"
                onClick={() => onChangeAdvertisingClick(!consentState)}
              >
                {consentState ? t("Отписаться") : t("Подписаться")}
              </Button>
            </DrawerClose>
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
