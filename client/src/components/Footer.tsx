
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="brand footer-logo">
            <span className="brand-symbol">L</span>

            <span className="brand-word">
              LIIBAAN
              <small>RESTAURANT</small>
            </span>
          </Link>

          <p className="footer-description">
            Bringing people together through delicious food,
            warm hospitality, and the simple joy of sharing
            a meal.
          </p>

          <span className="footer-motto">
            <span>✳</span> Made with care, served with heart.
          </span>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <Link to="/">Home</Link>
          <Link to="/foods">Our Menu</Link>
          <Link to="/cart">Your Cart</Link>
        </div>

        <div className="footer-column">
          <h3>Your Account</h3>
          <Link to="/login">Sign In</Link>
          <Link to="/admin/foods">Food Management</Link>
        </div>

        <div className="footer-note">
          <span className="footer-eyebrow">
            THE LIIBAAN EXPERIENCE
          </span>

          <h3>
            Good food.
            <br />
            <span>Good moments.</span>
          </h3>

          <p>
            Discover something delicious and make
            every meal a little more special.
          </p>

          <Link to="/foods" className="footer-menu-link">
            Discover Our Menu <span>↗</span>
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Liibaan Restaurant.
          All rights reserved.
        </p>

        <span className="footer-bottom-mark">
          GOOD FOOD, SHARED JOY.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
