// src/utils/NewsApi.js

// Définir la base URL en fonction de l'environnement
const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

const apiKey = "e357171d3a86496baf7e36900e21f353"; // Remplacez par votre clé API

/**
 * Calcule la date actuelle et la date d'il y a 7 jours.
 * @returns {Object} Un objet contenant les dates formatées en chaîne de caractères.
 */
function getDates() {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return {
    from: formatDate(sevenDaysAgo),
    to: formatDate(today),
  };
}

/**
 * Envoie une requête à l'API News pour rechercher des articles.
 * @param {string} keyword Le mot-clé de recherche entré par l'utilisateur.
 * @returns {Promise<Object>} Une promesse qui résout avec l'objet de réponse complet de l'API.
 */
export async function getNews(keyword) {
  // Obtenir les dates pour les paramètres de requête
  const { from, to } = getDates();

  // Construire l'URL de la requête avec les paramètres
  const url = `${newsApiBaseUrl}?q=${encodeURIComponent(
    keyword
  )}&apiKey=${apiKey}&from=${from}&to=${to}&pageSize=100`;

  try {
    const response = await fetch(url);

    // Gérer les erreurs HTTP
    if (!response.ok) {
      // Si la réponse n'est pas OK, lever une erreur avec un message détaillé
      const errorData = await response.json();
      throw new Error(`Erreur API: ${errorData.message}`);
    }

    // Convertir la réponse en JSON et retourner l'objet complet
    const data = await response.json();
    return data; // <-- LIGNE CORRIGÉE ICI
  } catch (error) {
    // Capturer et propager les erreurs de réseau ou d'API
    console.error("Erreur lors de la récupération des actualités:", error);
    throw error;
  }
}
