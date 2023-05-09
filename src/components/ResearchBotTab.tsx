import { HiOutlineArrowNarrowRight } from "react-icons/hi"

import ProjectsSettings from "./ProjectsSettings"
import RowItem from "./RowItem"
import TabHeader from "./TabHeader"

import Subheading from "./typography/Subheading"

import Button from "./ui/Button"
import Switch from "./ui/Switch"

const ResearchBotTab = () => {
  return (
    <>
      <TabHeader>
        <div className="flex gap-5">
          <Subheading>Research Bot</Subheading>
          <a
            className="typography-btn-big dark:text-gray-5 flex items-center gap-2 hover:text-gray-3 dark:hover:text-gray-3"
            href="#"
          >
            <HiOutlineArrowNarrowRight />
            на сайт
          </a>
        </div>
        <Button className="sm:ml-auto w-fit">сохранить изменения</Button>
      </TabHeader>
      <RowItem className="flex-col sm:flex-row items-start sm:items-center gap-2">
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
      </RowItem>
      <RowItem className="flex-col sm:flex-row items-start sm:items-center gap-2">
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
      </RowItem>
      <RowItem className="flex-col sm:flex-row lg:flex-col xlg:flex-row gap-3 items-baseline">
        <span>Автопереводчик</span>
        <div className="flex flex-col gap-[5px] sm:self-end">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 dark:text-gray-4">
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
      </RowItem>
      <RowItem className="flex-col sm:flex-row items-start sm:items-center gap-2">
        <span>Размер текста в новостях</span>
        <span className="text-xs text-gray-2">заглушка для слайдера</span>
      </RowItem>
      <RowItem className="flex-col sm:flex-row items-start sm:items-center gap-2">
        <span>Выбор фона</span>
        <span className="text-xs text-gray-2">заглушка для картинок</span>
      </RowItem>
      <div className="flex flex-col gap-1.5 py-2 dark:text-gray-4">
        <span>Настройки проектов</span>
        <ProjectsSettings />
      </div>
    </>
  )
}

export default ResearchBotTab
