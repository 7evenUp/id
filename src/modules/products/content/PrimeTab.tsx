import { useTranslation } from "react-i18next"

import CalendarLinks from "../components/prime/CalendarLinks"
import ChatAndChannels from "../components/prime/ChatAndChannels"
import ServicesAndNavigation from "../components/prime/ServicesAndNavigation"

import TabHeader from "../components/TabHeader"
import TabTitle from "../components/TabTitle"

import RowItem from "@/shared/components/RowItem"

import Text1 from "@/shared/typography/Text1"

import ExternalLink from "@/shared/ui/ExternalLink"
import useSendEvent from "@/shared/hooks/useSendEvent"

import { useUserProfileQuery } from "@/redux/api/profile"

const PrimeTab = () => {
  const { t } = useTranslation("products")

  const { sendEvent } = useSendEvent()

  const { data: userProfile } = useUserProfileQuery()

  const { subscriptionInfo } = userProfile!

  return (
    <>
      <TabHeader>
        <TabTitle title="Prime" link="https://in-prime.crypton.xyz/" />
      </TabHeader>

      {subscriptionInfo.status === "ACTIVE" &&
      subscriptionInfo.subscriptionType === "Start" ? (
        <CalendarLinks />
      ) : (
        <ChatAndChannels />
      )}

      <ServicesAndNavigation />

      <RowItem className="flex-col items-stretch gap-3 3xl:gap-[0.781vw]">
        <div className="flex justify-between items-center">
          <span>{t("prime.help")}</span>
        </div>
        <div className="flex flex-col gap-6 sm:gap-4 3xl:gap-[1.042vw]">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0">
            <Text1 className="max-w-prose w-auto sm:w-[62%] xl:w-auto">
              {t("prime.help-text-1")}
            </Text1>
            <ExternalLink
              withTgIcon
              href="https://t.me/crypton_support"
              className="w-fit"
              onClick={() => {
                sendEvent({ name: "support_link_click" })
              }}
            >
              {t("prime.mentor")}
            </ExternalLink>
          </div>
        </div>
      </RowItem>
      <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row justify-between gap-3 py-2 3xl:gap-[0.781vw] 3xl:py-[0.521vw] dark:text-gray-4">
        <span>{t("prime.feedback")}</span>
        <div className="flex gap-2.5 3xl:gap-[0.651vw] flex-col sm:flex-row">
          <ExternalLink
            href="https://t.me/reviews_prime"
            className="w-fit sm:w-auto"
            onClick={() => {
              sendEvent({ name: "leave_review_click" })
            }}
          >
            {t("prime.leave-review")}
          </ExternalLink>
          <ExternalLink
            href="https://t.me/crypton_support"
            className="w-fit sm:w-auto"
            onClick={() => {
              sendEvent({ name: "leave_feedback_click" })
            }}
          >
            {t("prime.leave-feedback")}
          </ExternalLink>
        </div>
      </div>
    </>
  )
}

export default PrimeTab
