import { useState } from "react";
import placeholderImage from "../../assets/placeholder.png";

import notSaved from "../../assets/save-icon.svg";
import saved from "../../assets/save-icon-saved.svg";
import trashIcon from "../../assets/trash-icon.svg";
import hovered from "../../assets/save-icon-hover.svg";
import "./NewsCard.css";

function NewsCard({
  article,
  isLoggedIn = false,
  isSaved = false,
  onSaveArticle,
  isSavedPage = false,
  keyword,
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!article) {
    console.error("NewsCard was rendered with an undefined article prop.");
    return null;
  }

  const formatDate = (isoDate) => {
    if (!isoDate) {
      return "Date non disponible";
    }
    const date = new Date(isoDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const articleDate = formatDate(article.date);
  const articleImage = article.image || placeholderImage;

  const getTooltipText = () => {
    if (isSavedPage) {
      return "Remove from saved";
    }

    if (isSaved) {
      return "Remove from saved";
    }
    if (!isLoggedIn) {
      return "Sign in to save articles";
    }
    return "Save article";
  };

  const handleBannerClick = () => {
    if (onSaveArticle) {
      onSaveArticle(article);
    }
  };

  let icon = notSaved;
  if (isSavedPage) {
    icon = trashIcon;
  } else if (isSaved) {
    icon = saved;
  } else if (isHovered) {
    icon = hovered;
  }

  return (
    <div className="news-card">
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        <img
          src={articleImage}
          alt={article.title}
          className="news-card__image"
        />
      </a>

      {isSavedPage && keyword && (
        <div className="news-card__tag">{keyword}</div>
      )}

      <div
        className={`news-card__banner ${
          isSavedPage ? "news-card__banner--saved-page" : ""
        }`}
        onMouseEnter={() => {
          setShowTooltip(true);
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setShowTooltip(false);
          setIsHovered(false);
        }}
        onClick={handleBannerClick}
      >
        <span
          className={`news-card__tooltip ${
            showTooltip && "news-card__tooltip--visible"
          }`}
        >
          {getTooltipText()}
        </span>
        <img
          src={icon}
          alt={isSavedPage ? "Remove article" : "Save article"}
          className={`news-card__save-icon ${
            isSavedPage ? "news-card__save-icon--trash" : ""
          } ${
            !isLoggedIn && !isSavedPage ? "news-card__save-icon--disabled" : ""
          } ${isSaved && !isSavedPage ? "news-card__save-icon--saved" : ""}`}
        />
      </div>

      <div className="news-card__content">
        <p className="news-card__date">{articleDate}</p>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__text">{article.text}</p>
      </div>
      <p className="news-card__source">{article.source}</p>
    </div>
  );
}

export default NewsCard;
