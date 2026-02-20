import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./HeroBanner.css";

const HeroBanner = () => {
  return (
    <section className="hero-banner">
      <motion.div
        className="hero-banner-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="hero-banner-kicker">New season, fresh edits</p>
        <h1>Shop the boldest drops with artisan polish.</h1>
        <p className="hero-banner-subtitle">
          Curated collections, smart filters, and an experience that feels made
          for you.
        </p>
        <div className="hero-banner-cta-row">
          <Link className="button" to="/products">
            Explore Products
          </Link>
          <Link className="button secondary" to="/wishlist">
            Build Wishlist
          </Link>
        </div>
      </motion.div>
      <motion.div
        className="hero-banner-art"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="hero-banner-orb" />
        <div className="hero-banner-card">
          <p>Free shipping over  ₹2000</p>
          <span>48-hour delivery in metro cities</span>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroBanner;
