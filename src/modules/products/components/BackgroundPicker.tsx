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
    <div className="flex flex-col mobile:flex-row mobile:items-center  gap-6">
      <RadioGroup value={mode} onValueChange={(val) => setMode(val as Modes)}>
        <RadioGroupItem value={"research"} id="research">
          Research
        </RadioGroupItem>
        <RadioGroupItem value={"aggregator"} id="aggregator">
          {t("res-bot.aggregator")}
        </RadioGroupItem>
      </RadioGroup>
      <div className="relative flex items-center gap-2 py-[5px] px-1.5 bg-white dark:bg-gray-1 rounded-xl">
        {/* Research photo active indicator */}
        <div
          className="absolute left-[11px] -top-2 w-8 h-1 bg-res-bot-blue rounded-full will-change-transform transition-transform"
          style={{
            transform: `translateX(${activeResearchPhoto * 50}px)`,
          }}
        />
        {/* Aggregator photo active indicator */}
        <div
          className="absolute left-[11px] -bottom-2 w-8 h-1 bg-res-bot-blue rounded-full will-change-transform transition-transform"
          style={{
            transform: `translateX(${activeAggregatorPhoto * 50}px)`,
          }}
        />
        {new Array(5).fill(null).map((_, i) => (
          <button
            key={i}
            className="w-[42px] h-[42px] rounded-lg bg-gray-3"
            onClick={() => changeActivePhoto(mode, i)}
          />
        ))}
      </div>
    </div>
  )
}

export default BackgroundPicker
