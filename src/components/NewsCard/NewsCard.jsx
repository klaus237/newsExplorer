import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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
  if (!article) {
    console.error("NewsCard was rendered with an undefined article prop.");
    return null;
  }

  const location = useLocation();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
    <div className="newsCard">
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        <img
          src={articleImage}
          alt={article.title}
          className="newsCard__image"
        />
      </a>

      {isSavedPage && keyword && <div className="newsCard__tag">{keyword}</div>}

      <div
        className={`newsCard__banner ${
          isSavedPage ? "newsCard__banner--saved-page" : ""
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
          className={`newsCard__tooltip ${
            showTooltip && "newsCard__tooltip--visible"
          }`}
        >
          {getTooltipText()}
        </span>
        <img
          src={icon}
          alt={isSavedPage ? "Remove article" : "Save article"}
          className={`newsCard__saveIcon ${
            isSavedPage ? "newsCard__saveIcon--trash" : ""
          } ${
            !isLoggedIn && !isSavedPage ? "newsCard__saveIcon--disabled" : ""
          } ${isSaved && !isSavedPage ? "newsCard__saveIcon--saved" : ""}`}
        />
      </div>

      <div className="newsCard__content">
        <p className="newsCard__date">{articleDate}</p>
        <h3 className="newsCard__title">{article.title}</h3>
        <p className="newsCard__text">{article.text}</p>
      </div>
      <p className="newsCard__source">{article.source}</p>
    </div>
  );
}

export default NewsCard;
