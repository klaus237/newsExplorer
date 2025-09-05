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
    <ul className="news-card-list">
      {filteredArticles.map((article) => (
        <li key={article._id} className="news-card-list__item">
          <NewsCard
            isSaved={savedArticleIds.has(article._id)}
            article={article}
            isLoggedIn={isLoggedIn}
            onSaveArticle={onSaveArticle}
            isSavedPage={isSavedPage}
            keyword={article.keyword}
          />
        </li>
      ))}
    </ul>
  );
}

export default NewsCardList;
