import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form className="searchForm" onSubmit={handleSubmit}>
      <div className="searchForm__container">
        <input
          type="text"
          className="searchForm__input"
          placeholder="Enter topic"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="searchForm__button">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
