import React, { useState, useCallback, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; // <-- Importez useNavigate

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SavedNews from "../SavedNews/SavedNews";
import "./App.css";

// Importez vos images ici
import image1 from "../../assets/image_04.png";
import image2 from "../../assets/image_07.png";
import image3 from "../../assets/image_08.png";
import image4 from "../../assets/image_08.png"; // Example for a saved article
import image5 from "../../assets/image_08.png";
import mainBgImage from "../../assets/background.png";
// import logoutIconDark from '../../images/logout-icon-dark.svg'; // Non nécessaire ici si l'icône est gérée via CSS

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("Elise");
  const [savedArticles, setSavedArticles] = useState([]);

  const navigate = useNavigate(); // <-- Initialisez useNavigate

  useEffect(() => {
    setSavedArticles([
      {
        id: "saved_article_1",
        image: image1,
        date: "November 4, 2020",
        title: "Everyone Needs a Special 'Sit Spot' in Nature",
        text: "Ever since I read Richard Louv’s influential book, “Last Child in the Woods,” the idea of having a special “sit spot” has stuck with me. This on-the-go world in which everyone — both adults and children — spends so much time on their phone, it’s not surprising.",
        source: "TREEHUGGER",
        keyword: "Nature",
      },
      {
        id: "saved_article_2",
        image: image2,
        date: "February 19, 2019",
        title: "Nature makes you better",
        text: "We all know how good nature can make us feel. The tranquil sound of birds chirping and the gentle, green shade of a forest, the way dappled sunlight dances through leaves, can all lower blood pressure and reduce stress.",
        source: "NATIONAL GEOGRAPHIC",
        keyword: "Nature",
      },
      {
        id: "saved_article_3",
        image: image3,
        date: "October 19, 2020",
        title: "Nostalgic Photos of Tourists In U.S. National Parks",
        text: "Uri Loveild Golman and Helle Lewelild Golman are the authors of the book “The Unfinished World: A project and book they call their love letter to...",
        source: "NATIONAL GEOGRAPHIC",
        keyword: "Yellowstone",
      },
      {
        id: "saved_article_4",
        image: image4,
        date: "November 4, 2020",
        title: "Grand Teton Renews Historic Crest Trail",
        text: "The linking together of the Cascade and Death Canyon Trails, Wyoming’s two most popular trails, will continue next summer, thanks to a grant from the National Park Service and the Wyoming Office of Outdoor Recreation.",
        source: "NATIONAL PARKS TRAVELER",
        keyword: "Parks",
      },
      {
        id: "saved_article_5",
        image: image5,
        date: "March 16, 2020",
        title: "Scientists Don't Know Why Polaris Is So Weird",
        text: "Humans have long relied on the starry sky to push into new frontiers, but to the very edge of the Milky Way and back, way from home, how Even animals look to the stars to guide them.",
        source: "TREEHUGGER",
        keyword: "Photography",
      },
    ]);
  }, []);

  const savedArticleIds = new Set(savedArticles.map((article) => article.id));

  const handleToggleSavedArticle = useCallback(
    (articleToToggle) => {
      if (isLoggedIn) {
        setSavedArticles((prevSavedArticles) => {
          const isCurrentlySaved = prevSavedArticles.some(
            (article) => article.id === articleToToggle.id
          );

          if (isCurrentlySaved) {
            console.log(`Removing article: ${articleToToggle.title}`);
            return prevSavedArticles.filter(
              (article) => article.id !== articleToToggle.id
            );
          } else {
            console.log(`Saving article: ${articleToToggle.title}`);
            const keywordToAdd = articleToToggle.keyword || "General";
            return [
              ...prevSavedArticles,
              { ...articleToToggle, keyword: keywordToAdd },
            ];
          }
        });
      } else {
        console.log("User not logged in. Please sign in to save articles.");
      }
    },
    [isLoggedIn]
  );

  const handleSearch = useCallback((query) => {
    setHasSearched(true);
    setIsLoading(true);
    setNewsArticles([]);
    setIsNotFound(false);

    setTimeout(() => {
      let fetchedArticles = [];
      if (
        query &&
        (query.toLowerCase() === "nature" ||
          query.toLowerCase() === "yellowstone")
      ) {
        fetchedArticles = [
          {
            id: "search_article_nature_1",
            image: image1,
            date: "November 4, 2018",
            title: "Everyone Needs a Special 'Sit Spot' in Nature",
            text: "Ever since I read Richard Louv’s influential book, “Last Child in the Woods,” the idea of having a special “sit spot” has stuck with me.",
            source: "TREEHUGGER",
            keyword: "Nature",
          },
          {
            id: "search_article_nature_2",
            image: image2,
            date: "February 19, 2019",
            title: "Nature makes you better",
            text: "We all know how good nature can make us feel. The tranquil sound of birds chirping and the gentle, green shade of a forest, the way dappled sunlight dances through leaves, can all lower blood pressure and reduce stress.",
            source: "NATIONAL GEOGRAPHIC",
            keyword: "Nature",
          },
          {
            id: "search_article_nature_3",
            image: image3,
            date: "October 19, 2019",
            title: "Grand Teton Renews Historic Crest Trail",
            text: "The linking together of the Cascade and Death Canyon Trails, Wyoming’s two most popular trails, will continue next summer, thanks to a grant from the National Park Service and the Wyoming Office of Outdoor Recreation.",
            source: "NATIONAL GEOGRAPHIC",
            keyword: "Parks",
          },
        ];
      }

      setNewsArticles(fetchedArticles);
      setIsLoading(false);

      if (fetchedArticles.length === 0) {
        setIsNotFound(true);
      } else {
        setIsNotFound(false);
      }
    }, 2000);
  }, []);

  // Fonction de déconnexion
  const handleLogout = useCallback(() => {
    setIsLoggedIn(false); // Change l'état de connexion à false
    setUsername(""); // Efface le nom d'utilisateur (ou le réinitialise à une valeur par défaut)
    setSavedArticles([]); // Efface les articles sauvegardés après déconnexion
    navigate("/"); // Redirige l'utilisateur vers la page d'accueil
    console.log("User logged out.");
  }, [navigate]);

  return (
    <div className="app">
      <Header
        onSearch={handleSearch}
        isLoggedIn={isLoggedIn}
        username={username}
        mainBgImage={mainBgImage}
        onLogout={handleLogout} // <-- Passez la fonction de déconnexion au Header
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
      {/* Boutons temporaires pour le test */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          backgroundColor: "white",
          padding: "10px",
          border: "1px solid gray",
          zIndex: 100,
        }}
      >
        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
          {isLoggedIn ? "Log Out (Test Button)" : "Log In (for testing save)"}
        </button>
        <button
          onClick={() => console.log("Current Saved Articles:", savedArticles)}
        >
          Log Saved Articles
        </button>
      </div>
    </div>
  );
}

export default App;
