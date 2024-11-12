import { cn } from "@/lib/classNames"

const weightedSample = (items: Record<number, number>) => {
  const total = Object.values(items).reduce((sum, weight) => sum + weight, 0)

  const rnd = Math.random() * total
  let accumulator = 0

  for (const [item, weight] of Object.entries(items)) {
    accumulator += weight

    if (rnd < accumulator) {
      return item
    }
  }
}

export const generateAnimation = (
  length: number,
  winItem: { color: string; numberInContainer: number },
  prizes: Array<{ color: string; numberInContainer: number }>
) => {
  const samples: Record<number, number> = {}

  for (let i = 0; i < prizes.length; i++) {
    samples[i] = prizes[i].numberInContainer
  }

  return (
    <>
      {Array.from({ length }, (_, index) => index + 1).map((el) => {
        const generatedResult = weightedSample(samples)
        const generatedId =
          generatedResult === undefined ? 0 : parseInt(generatedResult)

        return (
          <div
            className={cn(
              "relative w-[136px] h-[136px] bg-gray-2 rounded-xl",
              prizes[generatedId].color === "red" && "bg-red-400",
              prizes[generatedId].color === "yellow" && "bg-yellow-400",
              prizes[generatedId].color === "blue" && "bg-blue-400",
              prizes[generatedId].color === "green" && "bg-green",
              el === 20 && winItem.color === "red" && "bg-red-400",
              el === 20 && winItem.color === "yellow" && "bg-yellow-400",
              el === 20 && winItem.color === "blue" && "bg-blue-400",
              el === 20 && winItem.color === "green" && "bg-green"
            )}
            key={el}
          ></div>
        )
      })}
    </>
  )
}
