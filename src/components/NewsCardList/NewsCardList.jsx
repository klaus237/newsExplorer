import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({
  articles,
  isLoggedIn,
  savedArticleIds,
  onSaveArticle,
  isSavedPage,
}) {
  // Receive isSavedPage
  return (
    <div className="newsCardList">
      {articles.map((article) => (
        <NewsCard
          key={article.id}
          image={article.image}
          date={article.date}
          title={article.title}
          text={article.text}
          source={article.source}
          isLoggedIn={isLoggedIn}
          isSaved={savedArticleIds.has(article.id)}
          // Pass the whole article object to onSaveArticle so the handler knows what to save/remove
          onSaveClick={() => onSaveArticle(article)}
          isSavedPage={isSavedPage} // Pass isSavedPage to NewsCard
          keyword={article.keyword} // Pass the keyword (relevant for saved articles)
        />
      ))}
    </div>
  );
}

export default NewsCardList;
