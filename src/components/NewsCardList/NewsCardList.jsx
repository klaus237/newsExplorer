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
  const filteredArticles = articles
    ? articles.filter((article) => article != null)
    : [];

  if (filteredArticles.length === 0) {
    return null;
  }

  return (
    <div className="newsCardList">
      {filteredArticles.map((article) => (
        <NewsCard
          key={article._id}
          isSaved={savedArticleIds.has(article._id)}
          article={article}
          isLoggedIn={isLoggedIn}
          onSaveArticle={onSaveArticle}
          isSavedPage={isSavedPage}
          keyword={article.keyword}
        />
      ))}
    </div>
  );
}

export default NewsCardList;
