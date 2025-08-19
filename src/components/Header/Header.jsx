import React from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

// Importez vos images de fond
import mainBgImage from "../../assets/background.png";
// import savedNewsBgImage from '../../images/saved-news-background-image.jpg'; // Si vous avez une image spécifique pour saved-news

function Header({ onSearch, isLoggedIn, username, onLogout }) {
  // <-- Ajoutez onLogout ici
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  const headerBackgroundImage = isMainPage ? `url(${mainBgImage})` : "none";

  return (
    <header
      className={`header ${!isMainPage ? "header--saved-news" : ""}`}
      style={{ backgroundImage: headerBackgroundImage }}
    >
      <Navigation
        isLoggedIn={isLoggedIn}
        username={username}
        isMainPage={isMainPage}
        onLogout={onLogout} // <-- Passez onLogout à Navigation
      />
      {isMainPage && (
        <div className="header__content">
          <h1 className="header__title">What's going on in the world?</h1>
          <p className="header__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm onSearch={onSearch} />
        </div>
      )}
    </header>
  );
}

export default Header;
