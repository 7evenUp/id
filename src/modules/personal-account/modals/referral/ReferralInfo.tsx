import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import ExternalLink from "@/shared/ui/ExternalLink"

import { useUserProfileQuery } from "@/redux/api/core"

const ReferralInfo = () => {
  const { data: profileData } = useUserProfileQuery()

  if (!profileData) return null

  const {
    referralInfo: { refProgramLevel, toNextLevelRemained, refCashBack },
  } = profileData

  return (
    <DialogContent className="sm:max-w-[550px] md:max-w-[680px]">
      <DialogHeader>
        <DialogTitle>Как работает реферальная система?</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col md:flex-row justify-between items-center mobile:items-start md:items-stretch h-[400px] md:h-auto overflow-auto pr-2 gap-6">
        <div className="flex flex-col gap-6 basis-1/2">
          <p className="typography-text-0">
            Приглашайте новых пользователей в Prime и получайте до 20% с их
            каждого платежа на постоянной основе. Ваши рефералы получают скидку
            $5 на первую покупку.
          </p>
          <p className="typography-text-0">
            Чем больше пользователей приглашено, тем выше процент от каждого
            платежа реферала!
          </p>
          <div className="flex flex-col gap-1 bg-gray-6 dark:bg-gray-2 px-6 py-3 rounded-xl mt-auto typography-text-1 w-fit">
            <span>Ваш уровень реферальной программы: {refProgramLevel}</span>
            <span>
              Пользователей до следующего уровня: {toNextLevelRemained}
            </span>
            <span>Процент с платежей рефералов: {refCashBack}%</span>
          </div>
        </div>
        <div className="w-full mobile:w-[210px] flex flex-col gap-5">
          <h2 className="typography-balance">Таблица вознаграждений</h2>
          <LevelsTable />
          <p className="typography-tip">
            После достижения 10 уровня Вы можете получать до 30% от каждой
            покупки реферала. Для этого свяжитесь с Наставником.
          </p>
          <ExternalLink
            withTgIcon
            href="https://t.me/crypton_support"
            className="w-fit"
          >
            наставник
          </ExternalLink>
        </div>
      </div>
    </DialogContent>
  )
}

const LevelsTable = () => (
  <table>
    <thead className="text-gray-3 typography-tip">
      <tr>
        <th className="text-left pb-3">уровень</th>
        <th className="pb-3">число рефералов</th>
        <th className="text-right pb-3">доход</th>
      </tr>
    </thead>
    <tbody className="typography-text-2 divide-y divide-gray-4 dark:divide-gray-2">
      <tr>
        <td className="text-left py-1">0</td>
        <td className="text-center">0</td>
        <td className="text-right">10%</td>
      </tr>
      <tr>
        <td className="text-left py-1">1</td>
        <td className="text-center">5</td>
        <td className="text-right">11%</td>
      </tr>
      <tr>
        <td className="text-left py-1">2</td>
        <td className="text-center">8</td>
        <td className="text-right">12%</td>
      </tr>
      <tr>
        <td className="text-left py-1">3</td>
        <td className="text-center">10</td>
        <td className="text-right">13%</td>
      </tr>
      <tr>
        <td className="text-left py-1">4</td>
        <td className="text-center">17</td>
        <td className="text-right">14%</td>
      </tr>
      <tr>
        <td className="text-left py-1">5</td>
        <td className="text-center">25</td>
        <td className="text-right">15%</td>
      </tr>
      <tr>
        <td className="text-left py-1">6</td>
        <td className="text-center">30</td>
        <td className="text-right">16%</td>
      </tr>
      <tr>
        <td className="text-left py-1">7</td>
        <td className="text-center">35</td>
        <td className="text-right">17%</td>
      </tr>
      <tr>
        <td className="text-left py-1">8</td>
        <td className="text-center">40</td>
        <td className="text-right">18%</td>
      </tr>
      <tr>
        <td className="text-left py-1">9</td>
        <td className="text-center">45</td>
        <td className="text-right">19%</td>
      </tr>
      <tr>
        <td className="text-left py-1">10</td>
        <td className="text-center">50</td>
        <td className="text-right">20%</td>
      </tr>
    </tbody>
  </table>
)

export default ReferralInfo
