import { Skeleton } from "@/shared/ui/Skeleton"

const SkeletonLayout = () => {
  return (
    <>
      {/* Личный кабинет */}
      <div className="flex flex-col">
        <div className="flex justify-between">
          <Skeleton className="w-[238px] h-[22px] mb-10" />
          <Skeleton className="hidden sm:block w-[87px] h-[87px] rounded-full" />
        </div>
        <div className="flex flex-col gap-10 w-full sm:px-12 lg:px-0 lg:w-[350px] xl:w-[433px]">
          {/* Профиль */}
          <div>
            <Skeleton className="w-[120px] h-[22px] mb-4" />
            <Skeleton className="w-full h-[30px] mb-2" />
            <Skeleton className="w-full h-[30px] mb-2" />
            <Skeleton className="w-full h-[30px] mb-2" />
            <div className="flex justify-between gap-10 w-full h-[30px]">
              <Skeleton className="w-full" />
              <Skeleton className="w-full" />
            </div>
          </div>
          {/* Подписка */}
          <div>
            <div className="flex justify-between mb-4">
              <Skeleton className="w-[140px] h-[22px]" />
              <Skeleton className="w-[22px] h-[22px] rounded-full" />
            </div>
            <Skeleton className="w-full h-[30px] mb-2" />
            <Skeleton className="w-full h-[30px]" />
          </div>
          {/* Реферальная система */}
          <div>
            <div className="flex justify-between mb-4">
              <Skeleton className="w-[160px] h-[22px]" />
              <Skeleton className="w-[22px] h-[22px] rounded-full" />
            </div>
            <Skeleton className="w-full h-[30px] mb-2" />
            <Skeleton className="w-full h-[30px] mb-2" />
            <Skeleton className="w-full h-[30px]" />
          </div>
        </div>
      </div>
      {/* Табы */}
      <div className="flex flex-col w-full">
        {/* Иконки продуктов */}
        <div className="flex gap-[72px] py-4 px-5 mb-9">
          <Skeleton className="w-[26px] h-[26px]" />
          <Skeleton className="w-[26px] h-[26px]" />
          <Skeleton className="w-[26px] h-[26px]" />
          <Skeleton className="w-[26px] h-[26px]" />
          <Skeleton className="w-[26px] h-[26px]" />
          <Skeleton className="w-[26px] h-[26px]" />
        </div>
        {/* Контент */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between pb-4">
            <div className="flex items-center gap-5">
              <Skeleton className="w-[160px] h-[22px]" />
              <Skeleton className="w-[75px] h-[18px]" />
            </div>
            <Skeleton className="w-[180px] h-[22px] rounded-full" />
          </div>
          <div className="py-2 flex justify-between">
            <Skeleton className="w-[182px] h-[20px]" />
            <Skeleton className="w-[300px] h-[32px]" />
          </div>
          <div className="py-2 flex justify-between">
            <Skeleton className="w-[182px] h-[20px]" />
            <Skeleton className="w-[300px] h-[32px]" />
          </div>
          <div className="py-2 flex justify-between">
            <Skeleton className="w-[121px] h-[20px]" />
            <div className="flex flex-col gap-2 w-[300px]">
              <Skeleton className="w-full h-[32px]" />
              <Skeleton className="w-full h-[32px]" />
            </div>
          </div>
          <div className="py-2 flex justify-between">
            <Skeleton className="w-[180px] h-[20px]" />
            <Skeleton className="w-[300px] h-[64px]" />
          </div>
          <div className="py-2 flex justify-between">
            <Skeleton className="w-[90px] h-[20px]" />
            <Skeleton className="w-[300px] h-[64px]" />
          </div>
          <Skeleton className="w-[80px] h-[20px] mb-2" />
          <Skeleton className="w-full h-[200px]" />
        </div>
      </div>
    </>
  )
}

export default SkeletonLayout
