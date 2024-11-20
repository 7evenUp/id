import { ContainerPrize, Prize } from "@/types/crypton-events"

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
  winItem: Prize,
  prizes: ContainerPrize[]
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
            className="relative w-[136px] h-[136px] bg-gray-2 rounded-xl flex items-center justify-center text-sm text-center"
            key={el}
          >
            {el === 40 ? (
              <img
                src={winItem.image}
                className="w-full h-full rounded-xl object-cover"
              />
            ) : prizes[generatedId].prize.image ? (
              <img
                src={prizes[generatedId].prize.image}
                className="w-full h-full rounded-xl object-cover"
              />
            ) : (
              <span>{prizes[generatedId].prize.title}</span>
            )}
          </div>
        )
      })}
    </>
  )
}
