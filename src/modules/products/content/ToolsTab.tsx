import TabHeader from "../components/TabHeader"
import TabTitle from "../components/TabTitle"

import Subheading from "@/shared/typography/Subheading"

const ToolsTab = () => {
  return (
    <>
      <TabHeader>
        <TabTitle title="Tools" link="https://tools.crypton.xyz/main" />
      </TabHeader>
      <Subheading className="mt-10 3xl:mt-[2.604vw]">Coming soon</Subheading>
    </>
  )
}

export default ToolsTab
