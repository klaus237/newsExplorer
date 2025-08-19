import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import logoutIconDark from "../../assets/logout.svg";

function Navigation({ isLoggedIn, username, isMainPage, onLogout }) {
  return (
    <nav className="navigation">
      <h2
        className={`navigation__logo ${
          !isMainPage ? "navigation__logo--dark" : ""
        }`}
      >
        NewsExplorer
      </h2>
      <ul className="navigation__links">
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
                <img src={logoutIconDark} alt="logout icon" />
              </span>{" "}
              {/* <-- AJOUT ICI */}
            </button>
          ) : (
            <button
              className={`navigation__button ${
                !isMainPage ? "navigation__button--dark" : ""
              }`}
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
