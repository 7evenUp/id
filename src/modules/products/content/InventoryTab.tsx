import { useTranslation } from "react-i18next"
import { toast } from "sonner"

import CopyIcon from "@/assets/icons/copy.svg?react"

import TabHeader from "../components/TabHeader"
import TabTitle from "../components/TabTitle"

import Subheading from "@/shared/typography/Subheading"
import Text0 from "@/shared/typography/Text0"
import Button from "@/shared/ui/Button"

import { cn } from "@/lib/classNames"

import { useAppSelector } from "@/redux/hooks"
import { useUserProfileQuery } from "@/redux/api/profile"

const InventoryTab = () => {
  const { t } = useTranslation("products")

  const scale = useAppSelector((state) => state.scale.value)

  const { data } = useUserProfileQuery()

  const {
    referralInfo: { refCode },
  } = data!

  const onRefLinkClick = () => {
    navigator.clipboard.writeText(
      "https://web3xms.com/quest/phase-1?ref=" + refCode
    )

    toast(t("ref_copied_title"), {
      description: t("ref_copied_desc"),
    })
  }

  return (
    <>
      <TabHeader>
        <TabTitle title="WEB 3 XMS" link="https://web3xms.com/" />
      </TabHeader>
      <Button
        onClick={onRefLinkClick}
        className="flex items-center gap-1.5 mt-2"
      >
        {t("ref_link")}
        <CopyIcon
          className={cn(
            "w-3.5 h-3.5",
            scale && "3xl:w-[0.911vw] 3xl:h-[0.911vw]"
          )}
        />
      </Button>
      <Subheading className="mt-5 3xl:mt-[1.302vw]">
        {t("inventory")}
      </Subheading>
      <Text0 className="mt-2">Coming soon</Text0>
    </>
  )
}

export default InventoryTab
