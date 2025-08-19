import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  // Recevoir onSearch comme prop
  const [query, setQuery] = useState(""); // État pour la valeur de l'input

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    if (query.trim()) {
      // S'assurer que la requête n'est pas vide
      onSearch(query); // Appelle la fonction de recherche passée en prop
    }
  };

  return (
    <form className="searchForm" onSubmit={handleSubmit}>
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
    </form>
  );
}

export default SearchForm;
