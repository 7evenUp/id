import { HiOutlineArrowNarrowRight } from "react-icons/hi"

import TabHeader from "../components/TabHeader"

import Subheading from "@/shared/typography/Subheading"

const CalendarTab = () => {
  return (
    <>
      <TabHeader>
        <div className="flex gap-5">
          <Subheading>Calendar</Subheading>
          <a
            className="typography-btn-big dark:text-gray-5 flex items-center gap-2 hover:text-gray-3 dark:hover:text-gray-3"
            href="#"
          >
            <HiOutlineArrowNarrowRight />
            на сайт
          </a>
        </div>
      </TabHeader>
      <Subheading className="mt-10">Coming soon</Subheading>
    </>
  )
}

export default CalendarTab
