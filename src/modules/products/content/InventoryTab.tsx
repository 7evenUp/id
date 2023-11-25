import TabHeader from "../components/TabHeader"
import TabTitle from "../components/TabTitle"

import Subheading from "@/shared/typography/Subheading"

const InventoryTab = () => {
  return (
    <>
      <TabHeader>
        <TabTitle
          title="Инвентарь WEB 3 XMS"
          link="https://web3xms.com/"
        />
      </TabHeader>
      <Subheading className="mt-10 3xl:mt-[2.604vw]">Coming soon</Subheading>
    </>
  )
}

export default InventoryTab
