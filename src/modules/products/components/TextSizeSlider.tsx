import * as Slider from "@radix-ui/react-slider"

const TextSizeSlider = () => {
  return (
    <div className="flex items-center gap-2 rounded-xl py-2 px-4 2xl:gap-[0.521vw] 2xl:rounded-[0.781vw] 2xl:py-[0.521vw] 2xl:px-[1.042vw] bg-white dark:bg-gray-1 w-full sm:w-[320px] 2xl:w-[20.833vw]">
      <span className="text-[10px] 2xl:text-[0.651vw] leading-none font-semibold">a</span>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5 2xl:h-[1.302vw]"
        defaultValue={[3]}
        max={5}
        min={1}
        step={1}
        aria-label="Text size"
      >
        <Slider.Track className="bg-gray-2 dark:bg-black relative grow rounded-full h-px">
          <Slider.Range className="absolute bg-gray-2 dark:bg-black rounded-full h-full" />
          <div className="absolute left-0 top-0 w-full -translate-y-0.5 2xl:-translate-y-[0.13vw] flex items-center justify-between">
            <span className="w-[5px] h-[5px] 2xl:w-[0.325vw] 2xl:h-[0.325vw] bg-gray-1 dark:bg-gray-4 rounded-full cursor-pointer" />
            <span className="w-[5px] h-[5px] 2xl:w-[0.325vw] 2xl:h-[0.325vw] bg-gray-1 dark:bg-gray-4 rounded-full cursor-pointer" />
            <span className="w-[5px] h-[5px] 2xl:w-[0.325vw] 2xl:h-[0.325vw] bg-gray-1 dark:bg-gray-4 rounded-full cursor-pointer" />
            <span className="w-[5px] h-[5px] 2xl:w-[0.325vw] 2xl:h-[0.325vw] bg-gray-1 dark:bg-gray-4 rounded-full cursor-pointer" />
            <span className="w-[5px] h-[5px] 2xl:w-[0.325vw] 2xl:h-[0.325vw] bg-gray-1 dark:bg-gray-4 rounded-full cursor-pointer" />
          </div>
        </Slider.Track>
        <Slider.Thumb className="block w-3 h-3 2xl:w-[0.781vw] 2xl:h-[0.781vw] bg-res-bot-blue rounded-full focus:outline-none focus:shadow-[0_0_0_1px] focus:shadow-gray-2 cursor-pointer" />
      </Slider.Root>
      <span className="text-[22px]/5 2xl:text-[1.432vw]/[1.302vw] font-semibold">a</span>
    </div>
  )
}

export default TextSizeSlider
