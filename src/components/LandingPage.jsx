import React from "react";
import { Helmet } from "react-helmet";

// Colors
const colors = {
  primary: "#d4a373",
  secondary: "#8d6e63",
  textDark: "#4e342e",
  textLight: "#ffffff",
  background: "#f5f5f5",
};

// Landing Page Component
const LandingPage = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Wasna Palace | Make Your Event Memorable</title>
        <meta
          name="description"
          content="Plan your events with Wasna Palace. We offer 2000+ guest capacity, 4 halls, ample parking, and a diverse menu."
        />
        <meta
          name="keywords"
          content="Wasna Palace, Event Management, Halls, Catering"
        />
      </Helmet>

      {/* Navbar */}
      <header style={styles.navbar}>
        <div style={styles.logo}>Wasna Palace</div>
        <nav style={styles.navLinks}>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact Us</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={styles.heroSection} id="home">
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Wasna Palace</h1>
          <p style={styles.heroSubtitle}>Make Your Event Memorable</p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={styles.section}>
        <div style={styles.split}>
          <div>
            <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
            <p style={styles.text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestias quas vel sint commodi repudiandae consequuntur
              voluptatum laborum.
            </p>
          </div>
          <img
            src="https://via.placeholder.com/500x300"
            alt="Event Decoration"
            style={styles.image}
          />
        </div>
      </section>

      {/* Services Section */}
      <section style={styles.section} id="services">
        <div style={styles.split}>
          <img
            src="https://via.placeholder.com/500x300"
            alt="Dining Setup"
            style={styles.image}
          />
          <div>
            <h2 style={styles.sectionTitle}>Services</h2>
            <ul style={styles.list}>
              <li>Event Management</li>
              <li>Halls with Luxurious Decor</li>
              <li>Catering with Diverse Menus</li>
              <li>Ample Car Parking</li>
            </ul>
            <button style={styles.button}>Explore More</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <div style={styles.featureItem}>
          <h3>2000+</h3>
          <p>Guest Capacity</p>
        </div>
        <div style={styles.featureItem}>
          <h3>200+</h3>
          <p>Car Parking</p>
        </div>
        <div style={styles.featureItem}>
          <h3>4</h3>
          <p>Halls Available</p>
        </div>
        <div style={styles.featureItem}>
          <h3>20+</h3>
          <p>Dishes Menu</p>
        </div>
      </section>

      {/* Location Section */}
      <section style={styles.section} id="location">
        <h2 style={styles.sectionTitle}>Location</h2>
        <img
          src="https://via.placeholder.com/600x300"
          alt="Map"
          style={styles.image}
        />
        <p style={styles.text}>Block E Jinnah Garden, Islamabad, ICT, 44000</p>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2024 Wasna Palace. All rights reserved.</p>
        <div>
          <a href="#privacy" style={styles.footerLink}>
            Privacy Policy
          </a>
          <a href="#terms" style={styles.footerLink}>
            Terms of Service
          </a>
        </div>
      </footer>
    </>
  );
};

// Inline Styles
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: "1rem 2rem",
    color: colors.textLight,
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  navLinks: {
    display: "flex",
    gap: "1rem",
  },
  heroSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url('https://via.placeholder.com/1500x600')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "50vh",
    color: colors.textLight,
  },
  heroContent: {
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "1rem",
    borderRadius: "10px",
  },
  heroTitle: {
    fontSize: "3rem",
    margin: "0",
  },
  heroSubtitle: {
    fontSize: "1.5rem",
  },
  section: {
    padding: "2rem 5%",
    backgroundColor: colors.background,
  },
  split: {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
  },
  sectionTitle: {
    fontSize: "2rem",
    color: colors.primary,
  },
  text: {
    fontSize: "1rem",
    color: colors.textDark,
  },
  list: {
    listStyleType: "circle",
    marginLeft: "1rem",
  },
  button: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: colors.primary,
    color: colors.textLight,
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  features: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: colors.primary,
    color: colors.textLight,
    padding: "2rem 0",
  },
  featureItem: {
    textAlign: "center",
  },
  footer: {
    textAlign: "center",
    backgroundColor: colors.secondary,
    color: colors.textLight,
    padding: "1rem",
  },
  footerLink: {
    margin: "0 0.5rem",
    color: colors.textLight,
    textDecoration: "none",
  },
};

export default LandingPage;
