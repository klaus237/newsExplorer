import "./About.css";

import authorImage from "../../assets/klaus.jpg";

function About() {
  return (
    <section className="about">
      <div className="about__image-container">
        <img
          src={authorImage}
          alt="About the author"
          className="about__image"
        />
      </div>
      <div className="about__content">
        <h6 className="about__title">About the author</h6>
        <p className="about__text">
          My name is Klaus Lagom, and I am a Full Stack Developer with expertise
          in Angular, React, PHP, Node.js, HTML5, JavaScript, and other modern
          web technologies. I enjoy creating efficient and scalable web
          applications that provide seamless user experiences
        </p>
        <p className="about__text">
          During my time at TripleTen, I gained valuable experience working on
          diverse projects, where I learned to implement best practices in
          front-end and back-end development, and optimize applications for
          performance and maintainability. This experience has strengthened my
          skills and enables me to deliver high-quality solutions that meet
          client needs and drive project success
        </p>
      </div>
    </section>
  );
}

export default About;
