import { Skeleton } from "@/shared/ui/Skeleton"

const SkeletonLayout = () => {
  return (
    <>
      {/* Личный кабинет */}
      <div className="flex flex-col">
        <div className="flex justify-between">
          <Skeleton className="w-[238px] h-[22px] mb-10 3xl:w-[15.494vw] 3xl:h-[1.432vw] 3xl:mb-[2.604vw]" />
          <Skeleton className="hidden sm:block w-[87px] h-[87px] 3xl:w-[5.664vw] 3xl:h-[5.664vw] rounded-full 3xl:rounded-full" />
        </div>
        <div className="flex flex-col gap-10 3xl:gap-[2.604vw] w-full sm:px-12 lg:px-0 lg:w-[350px] xl:w-[433px] 3xl:w-[28.19vw]">
          {/* Профиль */}
          <div>
            <Skeleton className="w-[120px] h-[22px] mb-4 3xl:w-[7.812vw] 3xl:h-[1.432vw] 3xl:mb-[1.042vw]" />
            <Skeleton className="w-full h-[30px] mb-2 3xl:h-[1.953vw] 3xl:mb-[0.521vw]" />
            <Skeleton className="w-full h-[30px] mb-2 3xl:h-[1.953vw] 3xl:mb-[0.521vw]" />
            <Skeleton className="w-full h-[30px] mb-2 3xl:h-[1.953vw] 3xl:mb-[0.521vw]" />
            <div className="flex justify-between gap-10 3xl:gap-[2.604vw] w-full h-[30px] 3xl:h-[1.953vw]">
              <Skeleton className="w-full" />
              <Skeleton className="w-full" />
            </div>
          </div>
          {/* Подписка */}
          <div>
            <div className="flex justify-between mb-4">
              <Skeleton className="w-[140px] h-[22px] 3xl:w-[9.114vw] 3xl:h-[1.432vw]" />
              <Skeleton className="w-[22px] h-[22px] 3xl:w-[1.432vw] 3xl:h-[1.432vw] rounded-full" />
            </div>
            <Skeleton className="w-full h-[30px] mb-2 3xl:h-[1.953vw] 3xl:mb-[0.521vw]" />
            <Skeleton className="w-full h-[30px] 3xl:h-[1.953vw]" />
          </div>
          {/* Реферальная система */}
          <div>
            <div className="flex justify-between mb-4 3xl:mb-[1.042vw]">
              <Skeleton className="w-[160px] h-[22px] 3xl:w-[10.416vw] 3xl:h-[1.432vw]" />
              <Skeleton className="w-[22px] h-[22px] 3xl:w-[1.432vw] 3xl:h-[1.432vw] rounded-full" />
            </div>
            <Skeleton className="w-full h-[30px] mb-2 3xl:h-[1.953vw] 3xl:mb-[0.521vw]" />
            <Skeleton className="w-full h-[30px] mb-2 3xl:h-[1.953vw] 3xl:mb-[0.521vw]" />
            <Skeleton className="w-full h-[30px] 3xl:h-[1.953vw]" />
          </div>
        </div>
      </div>
      {/* Табы */}
      <div className="flex flex-col w-full">
        {/* Иконки продуктов */}
        <div className="flex gap-[72px] py-4 px-5 mb-9 3xl:gap-[4.687vw] 3xl:py-[1.042vw] 3xl:px-[1.302vw] 3xl:mb-[2.344vw]">
          <Skeleton className="w-[26px] h-[26px] 3xl:w-[1.693vw] 3xl:h-[1.693vw]" />
          <Skeleton className="w-[26px] h-[26px] 3xl:w-[1.693vw] 3xl:h-[1.693vw]" />
          <Skeleton className="w-[26px] h-[26px] 3xl:w-[1.693vw] 3xl:h-[1.693vw]" />
          <Skeleton className="w-[26px] h-[26px] 3xl:w-[1.693vw] 3xl:h-[1.693vw]" />
          <Skeleton className="w-[26px] h-[26px] 3xl:w-[1.693vw] 3xl:h-[1.693vw]" />
          <Skeleton className="w-[26px] h-[26px] 3xl:w-[1.693vw] 3xl:h-[1.693vw]" />
        </div>
        {/* Контент */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between pb-4 3xl:pb-[1.042vw]">
            <div className="flex items-center gap-5 3xl:gap-[1.302vw]">
              <Skeleton className="w-[160px] h-[22px] 3xl:w-[10.416vw] 3xl:h-[1.432vw]" />
              <Skeleton className="w-[75px] h-[18px] 3xl:w-[4.882vw] 3xl:h-[1.172vw]" />
            </div>
            <Skeleton className="w-[180px] h-[22px] 3xl:w-[11.718vw] 3xl:h-[1.432vw] rounded-full" />
          </div>
          <div className="py-2 3xl:py-[0.521vw] flex justify-between">
            <Skeleton className="w-[182px] h-[20px] 3xl:w-[11.848vw] 3xl:h-[1.302vw]" />
            <Skeleton className="w-[300px] h-[32px] 3xl:w-[19.531vw] 3xl:h-[2.083vw]" />
          </div>
          <div className="py-2 flex justify-between">
            <Skeleton className="w-[182px] h-[20px] 3xl:w-[11.848vw] 3xl:h-[1.302vw]" />
            <Skeleton className="w-[300px] h-[32px] 3xl:w-[19.531vw] 3xl:h-[2.083vw]" />
          </div>
          <div className="py-2 flex justify-between">
            <Skeleton className="w-[121px] h-[20px] 3xl:w-[7.877vw] 3xl:h-[1.302vw]" />
            <div className="flex flex-col gap-2 3xl:gap-[0.521vw] w-[300px] 3xl:w-[19.531vw]">
              <Skeleton className="w-full h-[32px] 3xl:h-[2.083vw]" />
              <Skeleton className="w-full h-[32px] 3xl:h-[2.083vw]" />
            </div>
          </div>
          <div className="py-2 flex justify-between">
            <Skeleton className="w-[180px] h-[20px] 3xl:w-[11.718vw] 3xl:h-[1.432vw]" />
            <Skeleton className="w-[300px] h-[64px] 3xl:w-[19.531vw] 3xl:h-[4.166vw]" />
          </div>
          <div className="py-2 flex justify-between">
            <Skeleton className="w-[90px] h-[20px] 3xl:w-[5.859vw] 3xl:h-[1.432vw]" />
            <Skeleton className="w-[300px] h-[64px] 3xl:w-[19.531vw] 3xl:h-[4.166vw]" />
          </div>
          <Skeleton className="w-[80px] h-[20px] mb-2 3xl:w-[5.208vw] 3xl:h-[1.432vw] 3xl:mb-[0.521vw]" />
          <Skeleton className="w-full h-[200px] 3xl:h-[13.02vw]" />
        </div>
      </div>
    </>
  )
}

export default SkeletonLayout
