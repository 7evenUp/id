import { useTranslation } from "react-i18next"

import TabHeader from "../components/TabHeader"
import TabTitle from "../components/TabTitle"

import Subheading from "@/shared/typography/Subheading"

const InventoryTab = () => {
  const { t } = useTranslation("products")

  return (
    <>
      <TabHeader>
        <TabTitle title={t("inventory-heading")} link="https://web3xms.com/" />
      </TabHeader>
      <Subheading className="mt-10 3xl:mt-[2.604vw]">Coming soon</Subheading>
    </>
  )
}

export default InventoryTab
