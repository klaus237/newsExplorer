import React, { useState } from "react";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import NotFound from "../NotFound/NotFound";
import "./Main.css";

function Main({
  isLoading,
  newsArticles,
  isNotFound,
  hasSearched,
  isLoggedIn,
  savedArticleIds,
  onSaveArticle,
  apiError,
}) {
  const [cardsToShow, setCardsToShow] = useState(3);

  const handleShowMore = () => {
    setCardsToShow((prevCount) => prevCount + 3);
  };

  const renderContent = () => {
    if (apiError) {
      return (
        <section className="main__newsResults">
          <p className="main__errorMessage">{apiError}</p>
        </section>
      );
    }

    if (isLoading) {
      return <Preloader />;
    }

    if (isNotFound) {
      return <NotFound />;
    }

    if (hasSearched && newsArticles.length > 0) {
      const displayedArticles = newsArticles.slice(0, cardsToShow);
      const hasMoreArticles = newsArticles.length > cardsToShow;

      return (
        <section className="main__newsResults">
          <h2 className="main__newsTitle">Search results</h2>
          <NewsCardList
            articles={displayedArticles}
            isLoggedIn={isLoggedIn}
            savedArticleIds={savedArticleIds}
            onSaveArticle={onSaveArticle}
          />
          {hasMoreArticles && (
            <button className="main__showMoreButton" onClick={handleShowMore}>
              Show more
            </button>
          )}
        </section>
      );
    }

    if (!hasSearched) {
      return null;
    }

    return null;
  };

  return (
    <main className="main">
      {renderContent()}
      <About />
    </main>
  );
}

export default Main;
