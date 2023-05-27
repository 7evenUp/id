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
- react-hook-form (HTML forms)
- zod / @hookform/resolvers (type & schema HTML form validation)

### Folders structure
Работа над проектом ведётся внутри папки `src`:

- `assets` - Фоточки, SVGшки и прочее
- `components` - Общие компоненты приложения
- `hooks` - Кастомные хуки приложения
- `lib` - Вспомогательные функции для корректной работы стороних библиотек
- `modules` - Модули приложения со своими компонентами
  - `auth` - Всё, что относится к авторизации
  - `header` - Всё, что относится к хедеру
  - `personal-accout` - Всё, что относится к профилю (левой части макета)
  - `products` - Всё, что относится к настройкам проектов (правая часть макета) 
- `redux` - Redux функционал
  - `api` - Все API запросы к серверу
  - `tabs` - Стейт выбранного продукта (таба) - для изменения цвета цифровых значений в Профиле
- `shared` - Переиспользуемые фрагменты приложения
  - `components` - Переиспользуемые компоненты
  - `typography` - Переиспользуемые текстовые блоки
  - `ui` - Переиспользуемые компоненты (Button, Switch и т.д.)
- `types` - Typescript типы и интерфейсы
- `utils` - функции-хелперы

## How to start developing

- Загрузи репозиторий
- Зайди в папку, куда установил репу
- Установи зависимости через `yarn` или `npm install`
- Запусти dev-сервер через `yarn dev` или `npm run dev`
- Открой в браузере `https://localhost:5173/`
