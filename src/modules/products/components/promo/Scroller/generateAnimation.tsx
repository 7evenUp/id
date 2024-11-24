import { ContainerPrize, Prize } from "@/types/crypton-events"

import InfoDialog from "./InfoDialog"

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

        const image =
          el === 40 ? winItem.image : prizes[generatedId].prize.image
        const title =
          el === 40 ? winItem.title : prizes[generatedId].prize.title
        const description =
          el === 40
            ? winItem.description
            : prizes[generatedId].prize.description

        return (
          <InfoDialog
            key={el}
            image={image}
            title={title}
            description={description}
          >
            <div className="relative w-[136px] h-[136px] bg-gray-2 rounded-xl flex items-center justify-center text-sm text-center">
              <img
                src={image}
                className="w-full h-full rounded-xl object-cover"
              />
            </div>
          </InfoDialog>
        )
      })}
    </>
  )
}
