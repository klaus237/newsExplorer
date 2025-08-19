import React from "react";
import NewsCardList from "../NewsCardList/NewsCardList";
import "./SavedNews.css";
//import trashIcon from '../../images/trash-icon.svg'; // Ensure path is correct

function SavedNews({
  savedArticles = [],
  username = "Elise",
  isLoggedIn,
  savedArticleIds,
  onSaveArticle,
}) {
  const allKeywords = savedArticles.map((article) => article.keyword);
  const uniqueKeywords = [...new Set(allKeywords)].filter(Boolean);

  const formatKeywords = () => {
    if (uniqueKeywords.length === 0) {
      return "No keywords yet.";
    }
    if (uniqueKeywords.length <= 3) {
      return uniqueKeywords.join(", ");
    }
    return `${uniqueKeywords[0]}, ${uniqueKeywords[1]}, and ${
      uniqueKeywords.length - 2
    } other`;
  };

  return (
    <section className="savedNews">
      <div className="savedNews__header">
        <h1 className="savedNews__title">Saved articles</h1>
        <p className="savedNews__count">
          {username}, you have {savedArticles.length} saved articles
        </p>
        <p className="savedNews__keywords">
          By keywords: <strong>{formatKeywords()}</strong>
        </p>
      </div>

      {savedArticles.length > 0 ? (
        <div className="savedNews__articles">
          <NewsCardList
            articles={savedArticles}
            isLoggedIn={isLoggedIn}
            isSavedPage={true} // <-- Set to true for this page
            onSaveArticle={onSaveArticle} // This will now trigger the remove functionality
            savedArticleIds={savedArticleIds}
          />
        </div>
      ) : (
        <div className="savedNews__empty-state">
          <p>You haven't saved any articles yet.</p>
          <p>Go to the Home page to find news and save them!</p>
        </div>
      )}
    </section>
  );
}

export default SavedNews;
