import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import logoutIconLigth from "../../assets/logout.svg";
import logoutIconDark from "../../assets/logoutDark.svg";

import menuIcon from "../../assets/menu.svg";
import closeIcon from "../../assets/close.svg";
import lightMenuIcon from "../../assets/menu_dark.svg";
import lightCloseIcon from "../../assets/light_close.svg";

function Navigation({
  isLoggedIn,
  username,
  isMainPage,
  onLogout,
  onSignInClick,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logoutIcon =
    isMainPage && !isMenuOpen ? logoutIconLigth : logoutIconDark;

  return (
    <nav className={`navigation ${!isMainPage ? "navigation--dark-mode" : ""}`}>
      <h2
        className={`navigation__logo ${
          !isMainPage ? "navigation__logo--dark" : ""
        } ${isMenuOpen ? "navigation__logo--menu-open" : ""}`}
      >
        NewsExplorer
      </h2>

      <button className="navigation__hamburger-btn" onClick={toggleMenu}>
        <img
          src={
            isMenuOpen
              ? isMainPage
                ? closeIcon
                : lightCloseIcon
              : isMainPage
              ? menuIcon
              : lightMenuIcon
          }
          alt={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </button>

      <ul
        className={`navigation__links ${
          isMenuOpen ? "navigation__links--open" : ""
        }`}
      >
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navigation__link ${
                isActive && isMainPage ? "navigation__link--active" : ""
              } ${!isMainPage ? "navigation__link--dark" : ""}`
            }
          >
            Home
          </NavLink>
        </li>
        {isLoggedIn && (
          <li>
            <NavLink
              to="/saved-news"
              className={({ isActive }) =>
                `navigation__link ${
                  isActive && !isMainPage ? "navigation__link--active" : ""
                } ${!isMainPage ? "navigation__link--dark" : ""}`
              }
            >
              Saved articles
            </NavLink>
          </li>
        )}
        <li>
          {isLoggedIn ? (
            <button
              className={`navigation__button navigation__button--logged-in ${
                !isMainPage ? "navigation__button--dark" : ""
              }`}
              onClick={onLogout}
            >
              {username}{" "}
              <span className="navigation__logout-icon">
                <img src={logoutIcon} alt="logout icon" />
              </span>
            </button>
          ) : (
            <button
              className={`navigation__button ${
                !isMainPage ? "navigation__button--dark" : ""
              }`}
              onClick={onSignInClick}
            >
              Sign in
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
