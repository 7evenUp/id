import { toast } from "sonner"
import { useTranslation } from "react-i18next"

import CopyIcon from "@/assets/icons/copy.svg?react"

import TabHeader from "../components/TabHeader"
import TabTitle from "../components/TabTitle"

import Subheading from "@/shared/typography/Subheading"
import Button from "@/shared/ui/Button"

import { useAppSelector } from "@/redux/hooks"
import { useUserProfileQuery } from "@/redux/api/profile"

import { cn } from "@/lib/classNames"

const CalendarTab = () => {
  const { t } = useTranslation("products")

  const scale = useAppSelector((state) => state.scale.value)

  const { data: profileData } = useUserProfileQuery()

  const {
    referralInfo: { refCode },
  } = profileData!

  const onRefLinkClick = () => {
    navigator.clipboard.writeText(
      "https://calendar.crypton.xyz?ref_code=" + refCode
    )

    toast(t("calendar.toast-title"), {
      description: t("calendar.link-copied"),
    })
  }

  return (
    <>
      <TabHeader>
        <TabTitle title="Calendar" link="https://calendar.crypton.xyz/" />
        <Button onClick={onRefLinkClick} className="w-fit sm:ml-auto">
          {t("calendar.ref-link")}
          <CopyIcon
            className={cn(
              "w-3.5 h-3.5",
              scale && "3xl:w-[0.911vw] 3xl:h-[0.911vw]"
            )}
          />
        </Button>
      </TabHeader>
      <Subheading className="mt-10 3xl:mt-[2.604vw]">
        {t("calendar.heading")}
      </Subheading>
    </>
  )
}

export default CalendarTab
