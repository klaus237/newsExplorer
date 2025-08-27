// src/utils/api.js

const mockSavedArticles = [
  {
    _id: "saved_article_1",
    image: "https://placehold.co/600x400/222222/FFF?text=Nature",
    date: "2020-11-04T00:00:00.000Z",
    title: "Everyone Needs a Special 'Sit Spot' in Nature",
    text: "Ever since I read Richard Louv’s influential book, “Last Child in the Woods,” the idea of having a special “sit spot” has stuck with me. This on-the-go world in which everyone — both adults and children — spends so much time on their phone, it’s not surprising.",
    source: "TREEHUGGER",
    keyword: "Nature",
    url: "https://treehugger.com/everyone-needs-special-sit-spot-nature",
  },
  {
    _id: "saved_article_2",
    image: "https://placehold.co/600x400/536162/FFF?text=Wild+Life",
    date: "2019-02-19T00:00:00.000Z",
    title: "Nature makes you better",
    text: "We all know how good nature can make us feel. The tranquil sound of birds chirping and the gentle, green shade of a forest, the way dappled sunlight dances through leaves, can all lower blood pressure and reduce stress.",
    source: "NATIONAL GEOGRAPHIC",
    keyword: "Nature",
    url: "https://nationalgeographic.com/nature-makes-you-better",
  },
  {
    _id: "saved_article_3",
    image: "https://placehold.co/600x400/989E71/FFF?text=Park",
    date: "2020-10-19T00:00:00.000Z",
    title: "Nostalgic Photos of Tourists In U.S. National Parks",
    text: "Uri Loveild Golman and Helle Lewelild Golman are the authors of the book “The Unfinished World: A project and book they call their love letter to...",
    source: "NATIONAL GEOGRAPHIC",
    keyword: "Yellowstone",
    url: "https://nationalgeographic.com/nostalgic-photos-tourists-us-national-parks",
  },
  {
    _id: "saved_article_4",
    image: "https://placehold.co/600x400/C54B3C/FFF?text=Travel",
    date: "2020-11-04T00:00:00.000Z",
    title: "Grand Teton Renews Historic Crest Trail",
    text: "The linking together of the Cascade and Death Canyon Trails, Wyoming’s two most popular trails, will continue next summer, thanks to a grant from the National Park Service and the Wyoming Office of Outdoor Recreation.",
    source: "NATIONAL PARKS TRAVELER",
    keyword: "Parks",
    url: "https://nps.gov/grand-teton-renews-historic-crest-trail",
  },
  {
    _id: "saved_article_5",
    image: "https://placehold.co/600x400/E5625E/FFF?text=Science",
    date: "2020-03-16T00:00:00.000Z",
    title: "Scientists Don't Know Why Polaris Is So Weird",
    text: "Humans have long relied on the starry sky to push into new frontiers, but to the very edge of the Milky Way and back, way from home, how Even animals look to the stars to guide them.",
    source: "TREEHUGGER",
    keyword: "Photography",
    url: "https://treehugger.com/scientists-dont-know-why-polaris-so-weird",
  },
];

// Simule la récupération des articles sauvegardés d'un utilisateur.
// Pour l'instant, elle retourne une liste d'articles factices.
export const getSavedArticles = () => {
  return new Promise((resolve) => {
    console.log("Simulating fetching saved articles.");
    setTimeout(() => {
      resolve(mockSavedArticles);
    }, 500);
  });
};

// Simule la sauvegarde d'un nouvel article dans la base de données.
// Elle retourne un objet avec un nouvel _id généré.
export const saveArticle = (articleData) => {
  return new Promise((resolve) => {
    console.log("Simulating saving article:", articleData);
    // Simuler un ID généré par le serveur
    const newArticle = { ...articleData, _id: `mock_id_${Date.now()}` };
    mockSavedArticles.push(newArticle);
    setTimeout(() => {
      resolve(newArticle);
    }, 500);
  });
};

// Simule la suppression d'un article sauvegardé.
// Elle résout simplement la promesse pour indiquer le succès.
export const deleteArticle = (articleId) => {
  return new Promise((resolve) => {
    console.log("Simulating deleting article with ID:", articleId);
    const index = mockSavedArticles.findIndex((a) => a._id === articleId);
    if (index !== -1) {
      mockSavedArticles.splice(index, 1);
    }
    setTimeout(() => {
      resolve({ message: "Article deleted successfully" });
    }, 500);
  });
};
