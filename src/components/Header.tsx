const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <a className="typography-btn-big" href="#">
        Назад к сайту
      </a>
      <div className="flex items-center gap-3">
        <span>изменить язык</span>
        <span>изменить тему</span>
      </div>
    </header>
  )
}

export default Header
