import { useTranslation } from "react-i18next"

import ArrowDown from "@/assets/icons/nav-arrow-down.svg?react"

import RowItem from "@/shared/components/RowItem"

import Text1 from "@/shared/typography/Text1"
import Text2 from "@/shared/typography/Text2"

import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover"

import { primeServices } from "@/utils/primeServices"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"
import useSendEvent from "@/shared/hooks/useSendEvent"

const ServicesAndNavigation = () => {
  const { t } = useTranslation("products")

  const { sendEvent } = useSendEvent()

  const scale = useAppSelector((state) => state.scale.value)

  return (
    <RowItem
      className={cn(
        "flex-col items-stretch gap-6",
        scale && "3xl:gap-[1.563vw]"
      )}
    >
      <div className="flex justify-between items-center gap-4">
        <span>{t("prime.services-and-nav")}</span>
      </div>
      <div
        className={cn(
          "flex flex-col md:flex-row lg:flex-col xl:flex-row xl:justify-between gap-5",
          scale && "3xl:gap-[1.302vw]"
        )}
      >
        <div
          className={cn(
            "flex flex-wrap w-full mobile:w-auto mobile:min-w-[340px] mobile:max-w-[340px] 2xl:max-w-[420px] py-3 px-4 bg-white dark:bg-gray-1 rounded-xl",
            scale &&
              "3xl:max-w-[25vw] 3xl:py-[0.781vw] 3xl:px-[1.041vw] 3xl:rounded-[0.781vw]"
          )}
        >
          {primeServices.map((service, i) =>
            service.isExpandable ? (
              <div className="basis-1/2" key={i}>
                <Popover>
                  <PopoverTrigger
                    className={cn(
                      "group h-7 flex items-center gap-2 text-gray-1 dark:text-gray-4 hover:text-prime-pink dark:hover:text-prime-pink text-left",
                      scale && "3xl:h-[1.822vw] 3xl:gap-[0.521vw]"
                    )}
                  >
                    <Text2>{service.name}</Text2>

                    <ArrowDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform will-change-transform group-data-[state=open]:rotate-180",
                        scale && "3xl:w-[0.911vw] 3xl:h-[0.911vw]"
                      )}
                    />
                  </PopoverTrigger>
                  <PopoverContent
                    className={cn(
                      "flex flex-col gap-1.5",
                      scale && "3xl:gap-[0.391vw]"
                    )}
                    sideOffset={-2}
                    align="start"
                  >
                    {service.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.href}
                        target="_blank"
                        className={cn(
                          "py-1 typography-text-2 text-gray-1 dark:text-gray-4 hover:text-prime-pink dark:hover:text-prime-pink",
                          scale && "typography-text-2_large 3xl:py-[0.26vw]"
                        )}
                        onClick={() =>
                          sendEvent({
                            name: "prime_service_click",
                            payload: {
                              serviceName: link.name,
                            },
                          })
                        }
                      >
                        {link.name}
                      </a>
                    ))}
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <div className="basis-1/2" key={i}>
                <a
                  href={service.href}
                  target="_blank"
                  className={cn(
                    "h-7 flex items-center w-fit typography-text-2 text-gray-1 dark:text-gray-4 hover:text-prime-pink dark:hover:text-prime-pink",
                    scale && "typography-text-2_large 3xl:h-[1.822vw]"
                  )}
                  onClick={() =>
                    sendEvent({
                      name: "prime_service_click",
                      payload: {
                        serviceName: service.name,
                      },
                    })
                  }
                >
                  {service.name}
                </a>
              </div>
            )
          )}
        </div>
        <div className="flex flex-col gap-3.5 py-3 px-4 3xl:gap-[0.911vw] 3xl:py-[0.781vw] 3xl:px-[1.041vw] bg-white dark:bg-gray-1 rounded-xl 3xl:rounded-[0.781vw] w-fit">
          <Text1 className="lg:max-w-prose">{t("prime.nav-text-1")}</Text1>
          <Text1 className="lg:max-w-prose">{t("prime.nav-text-2")}</Text1>
        </div>
      </div>
    </RowItem>
  )
}

export default ServicesAndNavigation
