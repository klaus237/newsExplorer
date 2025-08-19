import React from "react";
import "./Footer.css";
import githubIcon from "../../assets/github-icon.svg";
import facebookIcon from "../../assets/facebook-icon.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; 2024 Supersite. Powered by News API
      </p>
      <nav className="footer__nav">
        <a href="#" className="footer__link">
          Home
        </a>
        <a href="#" className="footer__link">
          TripleTen
        </a>
        <div className="footer__social">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__socialIcon"
          >
            <img src={githubIcon} alt="GitHub" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__socialIcon"
          >
            <img src={facebookIcon} alt="Facebook" />
          </a>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
