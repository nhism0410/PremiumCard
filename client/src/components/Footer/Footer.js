import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import '../Footer/footer.css'
import "remixicon/fonts/remixicon.css";
import logo from '../images/logo.png';


const Footer = (onViewChange) => {
  // Dummy URLs or use your actual URLs
  const socialLinks = {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    github: "https://github.com",
    discord: "https://discord.com"
  };

  return (
    <footer className="footer">
      <Container>
        <Row className="justify-content-between">
          <Col >
          <img src={logo} alt="Logo" style={{ height: '200px',}} />
            
          </Col>

          <Col lg="2" md="3" sm="6" className="footer-column">
            <h5>My Account</h5>
            <ul className="list-unstyled">
              <li><a href="/profile">Profile</a></li>
              <li><a href="/orders">Orders</a></li>
              <li><a href="/wishlist">Wishlist</a></li>
              <li><a href="/settings">Settings</a></li>
            </ul>
          </Col>

          <Col lg="2" md="3" sm="6" className="footer-column">
            <h5>Resources</h5>
            <ul className="list-unstyled">
              <li><a href="/help-center">Help Center</a></li>
              <li><a href="/faqs">FAQs</a></li>
              <li><a href="/documentation">Documentation</a></li>
              <li><a href="/api">API</a></li>
            </ul>
          </Col>

          <Col lg="2" md="3" sm="6" className="footer-column">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li><a href="/about-us">About Us</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/press">Press</a></li>
              <li><a href="/legal">Legal</a></li>
            </ul>
          </Col>

          <Col lg="3" md="6" sm="12" className="footer-newsletter">
            <h5>Subscribe to Our Newsletter</h5>
            <input
              type="email"
              className="newsletter-input"
              placeholder="Enter your email"
            />
            <div className="social-links d-flex gap-3 mt-3">
              <a href={socialLinks.facebook} className="social-link" aria-label="Facebook">
                <i className="ri-facebook-line"></i>
              </a>
              <a href={socialLinks.instagram} className="social-link" aria-label="Instagram">
                <i className="ri-instagram-line"></i>
              </a>
              <a href={socialLinks.youtube} className="social-link" aria-label="YouTube">
                <i className="ri-youtube-line"></i>
              </a>
              <a href={socialLinks.github} className="social-link" aria-label="GitHub">
                <i className="ri-github-line"></i>
              </a>
              <a href={socialLinks.discord} className="social-link" aria-label="Discord">
                <i className="ri-discord-line"></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
