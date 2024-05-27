import { useTranslation } from "react-i18next"

import TabHeader from "../components/TabHeader"
import TabTitle from "../components/TabTitle"

import Subheading from "@/shared/typography/Subheading"

const CalendarTab = () => {
  const { t } = useTranslation("products")

  return (
    <>
      <TabHeader>
        <TabTitle title="Calendar" link="https://calendar.crypton.xyz/" />
      </TabHeader>
      <Subheading className="mt-10 3xl:mt-[2.604vw]">
        {t("calendar.heading")}
      </Subheading>
    </>
  )
}

export default CalendarTab
