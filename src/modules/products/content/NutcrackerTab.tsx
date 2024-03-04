import { useTranslation } from "react-i18next"

import TabHeader from "../components/TabHeader"
import TabTitle from "../components/TabTitle"

import Subheading from "@/shared/typography/Subheading"

const NutcrackerTab = () => {
  const { t } = useTranslation("products")

  return (
    <>
      <TabHeader>
        <TabTitle
          title={t("nutcracker.title")}
          link="https://getgems.io/nutcrackers"
        />
      </TabHeader>

      <Subheading className="mt-10 3xl:mt-[2.604vw]">Coming soon</Subheading>
    </>
  )
}

export default NutcrackerTab
