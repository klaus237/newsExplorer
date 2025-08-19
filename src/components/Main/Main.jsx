import React from "react";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import NotFound from "../NotFound/NotFound";
// REMOVE: import styles from "./Main.module.css";
// USE THIS:
import "./Main.css"; // Correct, as per your setup

function Main({
  isLoading,
  newsArticles,
  isNotFound,
  hasSearched,
  isLoggedIn,
  savedArticleIds,
  onSaveArticle,
}) {
  const renderContent = () => {
    if (isLoading) {
      return <Preloader />;
    } else if (isNotFound) {
      return <NotFound />;
    } else if (hasSearched && newsArticles.length === 0) {
      return null;
    } else if (newsArticles.length > 0) {
      return (
        <section className="main__newsResults">
          {" "}
          {/* Changed from styles.main__newsResults */}
          <h2 className="main__newsTitle">Search results</h2>{" "}
          {/* Changed from styles.main__newsTitle */}
          <NewsCardList
            articles={newsArticles}
            isLoggedIn={isLoggedIn}
            savedArticleIds={savedArticleIds}
            onSaveArticle={onSaveArticle}
          />
          <button className="main__showMoreButton">Show more</button>{" "}
          {/* Changed from styles.main__showMoreButton */}
        </section>
      );
    } else {
      return null;
    }
  };

  return (
    <main className="main">
      {" "}
      {/* Changed from styles.main */}
      {renderContent()}
      <About />
    </main>
  );
}

export default Main;
