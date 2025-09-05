import NewsCardList from "../NewsCardList/NewsCardList";
import "./SavedNews.css";

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
    <section className="saved-news">
      <header className="saved-news__header">
        <h1 className="saved-news__title">Saved articles</h1>
        <p className="saved-news__count">
          {username}, you have {savedArticles.length} saved articles
        </p>
        <p className="saved-news__keywords">
          By keywords: <strong>{formatKeywords()}</strong>
        </p>
      </header>

      {savedArticles.length > 0 ? (
        <ul className="saved-news__articles">
          <NewsCardList
            articles={savedArticles}
            isLoggedIn={isLoggedIn}
            isSavedPage={true}
            onSaveArticle={onSaveArticle}
            savedArticleIds={savedArticleIds}
          />
        </ul>
      ) : (
        <div className="saved-news__empty-state">
          <p>You haven&apos;t saved any articles yet.</p>
          <p>Go to the Home page to find news and save them!</p>
        </div>
      )}
    </section>
  );
}

export default SavedNews;
