import ProjectsSettings from "./ProjectsSettings"

const ResearchBotTab = () => {
  return (
    <>
      <div className="flex gap-5 border-b border-gray-4 pb-4">
        <h2>Research Bot</h2>
        <a href="#">на сайт</a>
        <button className="ml-auto">сохранить изменения</button>
      </div>
      <div className="flex justify-between items-center py-2 border-b border-gray-4">
        <span>Уведомления в браузере</span>
        <div className="flex gap-10 items-center px-4 py-[6px] bg-white rounded-xl">
          <span>Research</span>
          <span>Агрегатор</span>
        </div>
      </div>
      <div className="flex justify-between items-center py-2 border-b border-gray-4">
        <span>Отображение режимов</span>
        <div className="flex gap-10 items-center px-4 py-[6px] bg-white rounded-xl">
          <span>Research</span>
          <span>Агрегатор</span>
        </div>
      </div>
      <div className="flex justify-between py-2 border-b border-gray-4">
        <span>Автопереводчик</span>
        <div className="flex flex-col gap-[5px]">
          <div className="flex items-center justify-between gap-2">
            <span>Research</span>
            <div className="flex gap-10 items-center px-4 py-[6px] bg-white rounded-xl">
              <span>Русский</span>
              <span>Английский</span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span>Агрегатор</span>
            <div className="flex gap-10 items-center px-4 py-[6px] bg-white rounded-xl">
              <span>Русский</span>
              <span>Английский</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center py-2 border-b border-gray-4">
        <span>Размер текста в новостях</span>
        <span className="text-xs text-gray-2">заглушка для слайдера</span>
      </div>
      <div className="flex justify-between items-center py-2 border-b border-gray-4">
        <span>Выбор фона</span>
        <span className="text-xs text-gray-2">заглушка для картинок</span>
      </div>
      <div className="flex flex-col gap-[6px] py-2">
        <span>Настройки проектов</span>
        <ProjectsSettings />
      </div>
    </>
  )
}

export default ResearchBotTab
