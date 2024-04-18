import TabHeader from "../components/TabHeader"
import TabTitle from "../components/TabTitle"

import Subheading from "@/shared/typography/Subheading"

const CalendarTab = () => {
  return (
    <>
      <TabHeader>
        <TabTitle
          title="Calendar"
          link="https://calendar.crypton.xyz/"
          // link="https://www.notion.so/6b17e625702f412f8ccda548b0f3fb0f?v=b82a825420e242fa98f47a9779dffdfe"
        />
      </TabHeader>
      <Subheading className="mt-10 3xl:mt-[2.604vw]">Coming soon</Subheading>
    </>
  )
}

export default CalendarTab
