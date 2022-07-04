import React from "react";
import headerLogo from '../images/logo.svg'
import NavBar from "./NavBar";

function Header({onLogout, userEmail, burgerMenuActive, handleBurgerClick}) {
  return (
    <header className={`header ${burgerMenuActive ? 'header_state_burger-active' : ''}`}>
      <img src={headerLogo} alt="место" className="header__logo"/>
      <NavBar
        onLogOut={onLogout}
        userEmail={userEmail}
        onBurgerClick={handleBurgerClick}
        burgerMenuActive={burgerMenuActive}
      />
    </header>
  );
}

export default Header;
