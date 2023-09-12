import { useState } from "react"
import { useTranslation } from "react-i18next"

import { RadioGroup, RadioGroupItem } from "@/shared/ui/RadioGroup"

type Modes = "research" | "aggregator"

const BackgroundPicker = () => {
  const { t } = useTranslation("products")

  const [mode, setMode] = useState<Modes>("research")
  const [activeResearchPhoto, setActiveResearchPhoto] = useState(0)
  const [activeAggregatorPhoto, setActiveAggregatorPhoto] = useState(0)

  const changeActivePhoto = (mode: Modes, position: number) => {
    mode === "research"
      ? setActiveResearchPhoto(position)
      : setActiveAggregatorPhoto(position)
  }

  return (
    <div className="flex flex-col mobile:flex-row mobile:items-center gap-6 3xl:gap-[1.563vw]">
      <RadioGroup value={mode} onValueChange={(val) => setMode(val as Modes)}>
        <RadioGroupItem value={"research"} id="research">
          Research
        </RadioGroupItem>
        <RadioGroupItem value={"aggregator"} id="aggregator">
          {t("res-bot.aggregator")}
        </RadioGroupItem>
      </RadioGroup>
      <div className="relative flex items-center gap-2 py-[5px] px-1.5 3xl:gap-[0.521vw] 3xl:py-[0.325vw] 3xl:px-[0.391vw] bg-white dark:bg-gray-1 rounded-xl 3xl:rounded-[0.781vw]">

        {/* Research photo active indicator */}
        <div
          className="absolute left-[11px] 3xl:left-[0.716vw] -top-2 3xl:-top-[0.521vw] w-8 h-1 3xl:w-[2.083vw] 3xl:h-[0.26vw] bg-res-bot-blue rounded-full will-change-transform transition-transform"
          style={{
            transform: `translateX(${activeResearchPhoto * 157}%)`,
          }}
        />

        {/* Aggregator photo active indicator */}
        <div
          className="absolute left-[11px] 3xl:left-[0.716vw] -bottom-2 3xl:-bottom-[0.521vw] w-8 h-1 3xl:w-[2.083vw] 3xl:h-[0.26vw] bg-res-bot-blue rounded-full will-change-transform transition-transform ease-in-out"
          style={{
            transform: `translateX(${activeAggregatorPhoto * 157}%)`,
          }}
        />

        {new Array(5).fill(null).map((_, i) => (
          <button
            key={i}
            className="w-[42px] h-[42px] 3xl:w-[2.734vw] 3xl:h-[2.734vw] rounded-lg 3xl:rounded-[0.521vw] bg-gray-3"
            onClick={() => changeActivePhoto(mode, i)}
          />
        ))}
      </div>
    </div>
  )
}

export default BackgroundPicker
