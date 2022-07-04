import { NavLink, useLocation } from "react-router-dom";

function NavBar({ onLogOut, userEmail, onBurgerClick, burgerMenuActive }) {
  let location = useLocation();


  return (
    <>
      <NavLink
        to='/signin'
        className={`header__link ${location.pathname === '/signin' || location.pathname === '/' ? 'not-displayed' : ''}`}>
        Войти
      </NavLink>

      <NavLink
        to='/signup'
        className={`header__link ${location.pathname === '/signup' || location.pathname === '/'  ? 'not-displayed' : ''}`}>
        Регистрация
      </NavLink>

      <nav className={`header__menu ${burgerMenuActive ? 'displayed' : ''} ${location.pathname === '/signup' || location.pathname === '/signin' ?
        'not-displayed' : ''}`}>
        <p className={`header__text ${location.pathname === '/signup' || location.pathname === '/signin' ?
          'not-displayed' : ''}`}>{userEmail}</p>
        <button
          type='button'
          onClick={onLogOut}
          className={`${location.pathname === '/signup' || location.pathname === '/signin' ?
            'not-displayed' : ''} header__exit-btn`}>
          Выйти
        </button>
      </nav>

      <button type='button'
              id="burger"
              onClick={onBurgerClick}
              className={`header__burger-menu ${burgerMenuActive ? 'open' : ''}
                         ${location.pathname === '/signup' || location.pathname === '/signin' ? 'not-displayed' : ''}`}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </>
  )
}

export default NavBar;
