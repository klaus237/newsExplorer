import React, { useState, useCallback, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SavedNews from "../SavedNews/SavedNews";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SuccessRegisterModal from "../SuccessRegisterModal/SuccessRegisterModal";
import "./App.css";

import { getNews } from "../../utils/NewsApi";
import { authorize, checkToken } from "../../utils/auth";
import { getSavedArticles, saveArticle, deleteArticle } from "../../utils/api";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("Elise");
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isSuccessRegisterModalOpen, setIsSuccessRegisterModalOpen] =
    useState(false);
  const [apiError, setApiError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((res) => {
          if (res.data) {
            setIsLoggedIn(true);
            setUsername(res.data.name);
            return getSavedArticles();
          } else {
            setIsLoggedIn(false);
            setUsername("");
            localStorage.removeItem("jwt");
            return Promise.reject("Invalid token or no user data.");
          }
        })
        .then((articles) => {
          setSavedArticles(articles);
        })
        .catch((err) => {
          console.error("Token validation failed:", err);
        });
    }
  }, []);

  const savedArticleIds = React.useMemo(() => {
    console.log(
      "Updating savedArticleIds. Current count:",
      savedArticles.length
    );
    return new Set(savedArticles.map((article) => article.url));
  }, [savedArticles]);

  const handleToggleSavedArticle = useCallback(
    (articleToToggle) => {
      if (!isLoggedIn) {
        console.log("User not logged in. Please sign in to save articles.");
        setIsLoginModalOpen(true);
        return;
      }

      const isCurrentlySaved = savedArticles.some(
        (article) => article.url === articleToToggle.url
      );

      if (isCurrentlySaved) {
        console.log(`Removing article: ${articleToToggle.title}`);
        const articleToDelete = savedArticles.find(
          (article) => article.url === articleToToggle.url
        );
        deleteArticle(articleToDelete._id)
          .then(() => {
            setSavedArticles((prevSavedArticles) =>
              prevSavedArticles.filter(
                (article) => article.url !== articleToToggle.url
              )
            );
          })
          .catch((err) => console.error("Error deleting article:", err));
      } else {
        console.log(`Saving article: ${articleToToggle.title}`);
        saveArticle(articleToToggle)
          .then((newArticle) => {
            setSavedArticles((prevSavedArticles) => [
              ...prevSavedArticles,
              newArticle,
            ]);
          })
          .catch((err) => console.error("Error saving article:", err));
      }
    },
    [isLoggedIn, savedArticles]
  );

  const handleSearch = useCallback(async (query) => {
    if (!query) {
      setApiError("Please enter a keyword");
      setNewsArticles([]);
      setHasSearched(true);
      return;
    }

    setHasSearched(true);
    setIsLoading(true);
    setNewsArticles([]);
    setIsNotFound(false);
    setApiError(null);

    try {
      const apiResponse = await getNews(query);

      if (apiResponse.status === "ok" && apiResponse.articles) {
        const validArticles = apiResponse.articles.filter(
          (article) =>
            article.title &&
            article.description &&
            article.url &&
            article.urlToImage &&
            article.publishedAt &&
            article.source &&
            article.source.name
        );

        const formattedArticles = validArticles.map((article) => ({
          _id: article.url,
          image: article.urlToImage,
          date: article.publishedAt,
          title: article.title,
          text: article.description,
          source: article.source.name,
          url: article.url,
          keyword: query,
        }));

        if (formattedArticles.length === 0) {
          setIsNotFound(true);
        } else {
          setNewsArticles(formattedArticles);
          setIsNotFound(false);
        }
      } else {
        const errorMessage =
          apiResponse.message || "An unexpected API response structure.";
        console.error("NewsAPI Error:", errorMessage);
        setApiError(errorMessage);
        setNewsArticles([]);
      }
    } catch (err) {
      console.error("Search error:", err);
      setApiError(
        "Sorry, something went wrong during the request. Please try again later."
      );
      setNewsArticles([]);
      setIsNotFound(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setUsername("");
    setSavedArticles([]);
    localStorage.removeItem("jwt");
    navigate("/");
    console.log("User logged out.");
  }, [navigate]);

  const handleOpenLoginModal = () => {
    setIsRegisterModalOpen(false);
    setIsSuccessRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLogin = (email, password) => {
    authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return checkToken(res.token);
        } else {
          return Promise.reject("No token received.");
        }
      })
      .then((userRes) => {
        if (userRes.data) {
          setIsLoggedIn(true);
          setUsername(userRes.data.name);
          return getSavedArticles();
        } else {
          return Promise.reject("No user data received.");
        }
      })
      .then((articles) => {
        setSavedArticles(articles);
        setIsLoginModalOpen(false);
        console.log("Login successful!");
      })
      .catch((err) => {
        console.error("Login failed:", err);
        setApiError("Login failed. Please check your credentials.");
      });
  };

  // const handleOpenRegisterModal = () => {
  //   setIsLoginModalOpen(false);
  //   setIsRegisterModalOpen(true);
  // };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleRegister = (email, password, username) => {
    console.log(
      `Attempting to register with: ${email} / ${password} / ${username}`
    );
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsRegisterModalOpen(false);
        setIsSuccessRegisterModalOpen(true);
        console.log("Registration successful!");
        resolve();
      }, 1000);
    });
  };

  const handleCloseSuccessRegisterModal = () => {
    setIsSuccessRegisterModalOpen(false);
  };

  const handleSwitchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsSuccessRegisterModalOpen(false);
    setIsRegisterModalOpen(true);
  };
  const handleSwitchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsSuccessRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <div className="app">
      <Header
        onSearch={handleSearch}
        isLoggedIn={isLoggedIn}
        username={username}
        onLogout={handleLogout}
        onSignInClick={handleOpenLoginModal}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Main
              isLoading={isLoading}
              newsArticles={newsArticles}
              isNotFound={isNotFound}
              hasSearched={hasSearched}
              isLoggedIn={isLoggedIn}
              savedArticleIds={savedArticleIds}
              onSaveArticle={handleToggleSavedArticle}
              apiError={apiError}
            />
          }
        />
        <Route
          path="/saved-news"
          element={
            <SavedNews
              savedArticles={savedArticles}
              username={username}
              onSaveArticle={handleToggleSavedArticle}
              isLoggedIn={isLoggedIn}
              savedArticleIds={savedArticleIds}
            />
          }
        />
      </Routes>

      <Footer />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        onLogin={handleLogin}
        onSwitchToRegister={handleSwitchToRegister}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseRegisterModal}
        onRegister={handleRegister}
        onSwitchToLogin={handleSwitchToLogin}
      />

      <SuccessRegisterModal
        isOpen={isSuccessRegisterModalOpen}
        onClose={handleCloseSuccessRegisterModal}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </div>
  );
}

export default App;
