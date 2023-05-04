import ProjectsSettings from "./ProjectsSettings"
import Subheading from "./typography/Subheading"
import Button from "./ui/Button"
import { Switch } from "./ui/Switch"

const ResearchBotTab = () => {
  return (
    <>
      <div className="flex items-center gap-5 border-b border-gray-4 dark:border-gray-1 pb-4">
        <Subheading>Research Bot</Subheading>
        <a className="typography-btn-big dark:text-gray-5" href="#">
          на сайт
        </a>
        <Button className="ml-auto">сохранить изменения</Button>
      </div>
      <div className="flex justify-between items-center py-2 border-b border-gray-4 dark:border-gray-1 dark:text-gray-4">
        <span>Уведомления в браузере</span>
        <div className="flex gap-10 items-center px-4 py-[6px] bg-white dark:bg-gray-1 rounded-xl">
          <div className="flex items-center gap-2">
            <Switch id="resNotif" />
            <label htmlFor="resNotif">Research</label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="agrNotif" />
            <label htmlFor="agrNotif">Агрегатор</label>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center py-2 border-b border-gray-4 dark:border-gray-1 dark:text-gray-4">
        <span>Отображение режимов</span>
        <div className="flex gap-10 items-center px-4 py-[6px] bg-white dark:bg-gray-1 rounded-xl">
          <div className="flex items-center gap-2">
            <Switch id="resView" />
            <label htmlFor="resView">Research</label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="agrView" />
            <label htmlFor="agrView">Агрегатор</label>
          </div>
        </div>
      </div>
      <div className="flex justify-between py-2 border-b border-gray-4 dark:border-gray-1 dark:text-gray-4">
        <span>Автопереводчик</span>
        <div className="flex flex-col gap-[5px]">
          <div className="flex items-center justify-between gap-2">
            <span>Research</span>
            <div className="w-[318px] gap-3 flex items-center px-4 py-[6px] bg-white dark:bg-gray-1 rounded-xl">
              <div className="flex-1 flex items-center gap-2">
                <Switch id="resRu" />
                <label htmlFor="resRu">Русский</label>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <Switch id="resEn" />
                <label htmlFor="resEn">Английский</label>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 dark:text-gray-4">
            <span>Агрегатор</span>
            <div className="w-[318px] gap-3 flex items-center px-4 py-[6px] bg-white dark:bg-gray-1 rounded-xl">
              <div className="flex-1 flex items-center gap-2">
                <Switch id="agrEn" />
                <label htmlFor="agrEn">Английский</label>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <Switch id="agrEs" />
                <label htmlFor="agrEs">Испанский</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center py-2 border-b border-gray-4 dark:border-gray-1 dark:text-gray-4">
        <span>Размер текста в новостях</span>
        <span className="text-xs text-gray-2">заглушка для слайдера</span>
      </div>
      <div className="flex justify-between items-center py-2 border-b border-gray-4 dark:border-gray-1 dark:text-gray-4">
        <span>Выбор фона</span>
        <span className="text-xs text-gray-2">заглушка для картинок</span>
      </div>
      <div className="flex flex-col gap-[6px] py-2 dark:text-gray-4">
        <span>Настройки проектов</span>
        <ProjectsSettings />
      </div>
    </>
  )
}

export default ResearchBotTab
