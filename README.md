# Dev branch for Crypton Hub Front

### Packages

- vite (сборщик - аналог CRA, Creat React App)
- tailwindCSS (фреймворк для css стилей - аналог bootstrap, но поумнее)
- clsx (аналог classNames)
- class-variance-authority (для создания нескольких вариаций CSS стилей для компонентов)
- tailwind-merge (для избежания коллизий tailwind классов)
- @radix-ui (библиотека для построения доступных React компонентов)
- vite-plugin-svgr (для использования SVG в качестве готовых React компонентов)
- @reduxjs/toolkit / react-redux (state management)

### Folders structure
Работа над проектом ведётся внутри папки `src`:

- `assets` - Фоточки, SVGшки и прочее
- `components` - Компоненты приложения
  - `modals` - Контент модальных окон (так как в данном приложении их много, решил вынести в отдельную папку)
  - `profile` - Компоненты, имеющие отношение к профилю (отображение, редактирование)
  - `typography` - Переиспользуемые текстовые блоки
  - `ui` - Переиспользуемые компоненты (Button, Switch и т.д.)
- `redux` - Redux функционал
- `lib` - вспомогательные функции для корректной работы стороних библиотек
- `utils` - функции-хелперы

## How to start developing

- Загрузи репозиторий
- Зайди в папку, куда установил репу
- Установи зависимости через `yarn` или `npm install`
- Запусти dev-сервер через `yarn dev` или `npm run dev`
- Открой в браузере `http://localhost:5173/`
