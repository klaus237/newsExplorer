import React from "react";
import "./About.css";

import authorImage from "../../assets/author-image.png"; // Importez votre image de fond

function About() {
  return (
    <section className="about">
      <div className="about__imageContainer">
        <img
          src={authorImage}
          alt="About the author"
          className="about__image"
        />
      </div>
      <div className="about__content">
        <h6 className="about__title">About the author</h6>
        <p className="about__text">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
        </p>
        <p className="about__text">
          You can also talk about your experience with TripleTen, what you
          learned there, and how you can help potential customers.
        </p>
      </div>
    </section>
  );
}

export default About;
