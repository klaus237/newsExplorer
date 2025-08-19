import React, { useState } from "react";
import "./NewsCard.css";
import placeholderImage from "../../assets/placeholder.png";

// Import all icons
import saveIcon from "../../assets/save-icon.svg";
import saveIconActive from "../../assets/save-icon-saved.svg";
import saveIconSaved from "../../assets/save-icon-saved.svg";
import trashIcon from "../../assets/trash-icon.svg";

function NewsCard({
  image = placeholderImage,
  date = "November 4, 2018",
  title = "Everyone Needs a Special 'Sit Spot' in Nature",
  text = "Ever since I read Richard Louv’s influential book, “Last Child in the Woods,” the idea of having a special “sit spot” has stuck with me. This on-the-go world in which everyone — both adults and children — spends so much time on their phone, it’s not surprising.",
  source = "TREEHUGGER",
  isLoggedIn = false,
  isSaved = false, // This prop indicates if the article is saved (on main page)
  onSaveClick, // This function is used for both save and delete
  isSavedPage = false, // True if rendered on the Saved Articles page
  keyword, // The keyword for the article (used on saved page)
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // For specific icon hover state

  // Determine which icon to display based on page and save status
  const getBannerIcon = () => {
    if (isSavedPage) {
      return trashIcon; // On saved page, always show trash icon
    }
    if (isSaved) {
      return saveIconSaved; // On main page, if article is already saved
    }
    if (isLoggedIn && isHovered) {
      // On main page, if logged in and hovered
      return saveIconActive;
    }
    return saveIcon; // Default save icon for main page
  };

  // Determine tooltip text based on page and login status
  const getTooltipText = () => {
    if (isSavedPage) {
      return "Remove from saved";
    }
    if (!isLoggedIn) {
      return "Sign in to save articles";
    }
    if (isSaved) {
      return "Remove from saved"; // Or "Article saved" if preferred
    }
    return "Save article";
  };

  const handleBannerClick = () => {
    // onSaveClick here acts as a generic "action" handler for the banner
    // Its specific effect (save/remove) depends on how it's used by the parent (Main/SavedNews)
    if (onSaveClick) {
      onSaveClick();
    }
  };

  return (
    <div className="newsCard">
      <img src={image} alt={title} className="newsCard__image" />

      {/* Keyword tag for saved articles */}
      {isSavedPage && keyword && <div className="newsCard__tag">{keyword}</div>}

      {/* Banner Section (Save/Delete Button + Tooltip) */}
      <div
        className={`newsCard__banner ${
          isSavedPage ? "newsCard__banner--saved-page" : ""
        }`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={handleBannerClick}
      >
        {/* Tooltip */}
        <span
          className={`newsCard__tooltip ${
            showTooltip ? "newsCard__tooltip--visible" : ""
          }`}
        >
          {getTooltipText()}
        </span>
        {/* Save/Remove Icon */}
        <img
          src={getBannerIcon()}
          alt={
            isSavedPage
              ? "Remove article"
              : isSaved
              ? "Article saved"
              : "Save article"
          }
          className={`newsCard__saveIcon ${
            isSavedPage ? "newsCard__saveIcon--trash" : ""
          } ${
            !isLoggedIn && !isSavedPage ? "newsCard__saveIcon--disabled" : ""
          } ${isSaved && !isSavedPage ? "newsCard__saveIcon--saved" : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </div>

      <div className="newsCard__content">
        <p className="newsCard__date">{date}</p>
        <h3 className="newsCard__title">{title}</h3>
        <p className="newsCard__text">{text}</p>
      </div>
      <p className="newsCard__source">{source}</p>
    </div>
  );
}

export default NewsCard;
