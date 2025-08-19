import React from "react";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notFound">
      <div className="notFound__icon">😔</div>
      <h2 className="notFound__title">Nothing found</h2>
      <p className="notFound__text">
        Sorry, but nothing matched your search queries.
      </p>
    </div>
  );
}

export default NotFound;
