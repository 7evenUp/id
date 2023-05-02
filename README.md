# Dev branch for Crypton Hub Front

### Packages

- vite (сборщик - аналог CRA, Creat React App)
- tailwindCSS (фреймворк для css стилей - аналог bootstrap, но поумнее)

### Folders structure
Работа над проектом ведётся внутри папки `src`:

- `components` - Компоненты приложения
  - `ui` - Переиспользуемые компоненты (Button, Switch и т.д.)
- `routes` - Руты приложения (react-router-dom)
- `redux` - Redux функционал
- `lib` - вспомогательные функции для корректной работы стороних библиотек
- `utils` - функции-хелперы

## How to start developing

- Загрузи репозиторий
- Зайди в папку, куда установил репу
- Установи зависимости через `yarn` или `npm install`
- Запусти dev-сервер через `yarn dev` или `npm run dev`
- Открой в браузере `http://localhost:5173/`
