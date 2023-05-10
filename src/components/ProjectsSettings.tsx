import Switch from "./ui/Switch"
import SwitchWithText from "./ui/SwitchWithText"

const ProjectsSettings = () => {
  return (
    <table className="w-full block px-4 py-3 rounded-xl bg-white dark:bg-gray-1 typography-text-1">
      <thead className="mb-6 block">
        <tr className="flex items-baseline gap-6 text-left">
          <th className="w-[60px] sm:w-[100px] xlg:w-[130px]">
            <input
              className="w-full xlg:w-auto outline-none bg-transparent border-b border-gray-1 dark:border-gray-4 py-1 dark:placeholder:text-gray-3"
              placeholder="поиск"
            />
          </th>
          <th className="w-[65px] typography-text-1 text-gray-3 sm:hidden">
            проекты/подписки
          </th>
          <th className="w-[65px] typography-text-1 text-gray-3 hidden sm:block">
            проекты
          </th>
          <th className="w-[90px] typography-text-1 text-gray-3 hidden sm:block">
            подписки
          </th>
          <th className="flex-grow-[2] typography-text-1 text-gray-3">
            соцсети
          </th>
        </tr>
      </thead>
      <tbody className="flex flex-col divide-y divide-gray-4 dark:divide-gray-2">
        <tr className="py-3 flex gap-6">
          <td className="w-[60px] sm:w-[100px] xlg:w-[130px] flex-shrink-0">
            AirNFTs
          </td>
          <td className="w-[65px] flex flex-col gap-1 sm:hidden">
            <Switch />
            <span>все</span>
          </td>
          <td className="w-[65px] flex-shrink-0 hidden sm:block">
            <Switch />
          </td>
          <td className="w-[90px] flex-shrink-0 hidden sm:block">все</td>
          <td className="flex-grow-[2] flex gap-2.5 flex-wrap">
            <SwitchWithText>medium</SwitchWithText>
            <SwitchWithText>twitter</SwitchWithText>
            <SwitchWithText>discord</SwitchWithText>
            <SwitchWithText>telegram</SwitchWithText>
          </td>
        </tr>
        <tr className="py-3 flex gap-6">
          <td className="w-[60px] sm:w-[100px] xlg:w-[130px] flex-shrink-0">
            Binance
          </td>
          <td className="w-[65px] flex flex-col gap-1 sm:hidden">
            <Switch />
            <span>важные</span>
          </td>
          <td className="w-[65px] flex-shrink-0 hidden sm:block">
            <Switch />
          </td>
          <td className="w-[90px] flex-shrink-0 hidden sm:block">важные</td>
          <td className="flex-grow-[2] flex-shrink flex gap-2.5 flex-wrap">
            <SwitchWithText>medium</SwitchWithText>
            <SwitchWithText>twitter</SwitchWithText>
            <SwitchWithText>discord</SwitchWithText>
            <SwitchWithText>telegram</SwitchWithText>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default ProjectsSettings
