import React from "react";
import { Helmet } from "react-helmet";

const LandingPage = () => {
  return (
    <>
      {/* SEO Optimization */}
      <Helmet>
        <title>Wasna Palace | Make Your Event Memorable</title>
        <meta
          name="description"
          content="Plan your events with Wasna Palace. We offer exceptional event management services, elegant halls, and delicious menu options."
        />
        <meta
          name="keywords"
          content="Wasna Palace, Event Management, Wedding, Parties"
        />
      </Helmet>

      {/* Navbar */}
      <header style={styles.navbar}>
        <div style={styles.logo}>Wasna Palace</div>
        <nav style={styles.navLinks}>
          <a href="#home">Home</a>
          <a href="#event-management">Event Management</a>
          <a href="#event-complex">Event Complex</a>
          <a href="#4d-restaurant">4D Restaurant</a>
          <a href="#about-us">About Us</a>
          <a href="#contact-us">Contact Us</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Wasna Palace</h1>
          <p style={styles.heroSubtitle}>Make Your Event Memorable</p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={styles.section} id="why-choose-us">
        <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
        <div style={styles.splitSection}>
          <div style={styles.textContent}>
            <p style={styles.text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestias quas vel sint commodi repudiandae consequuntur
              voluptatum laborum numquam blanditiis.
            </p>
          </div>
          <div>
            <img
              src="https://via.placeholder.com/500x300"
              alt="Tent decoration"
              style={styles.image}
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={styles.section} id="services">
        <h2 style={styles.sectionTitle}>Services</h2>
        <div style={styles.splitSection}>
          <div>
            <img
              src="https://via.placeholder.com/500x300"
              alt="Event hall setup"
              style={styles.image}
            />
          </div>
          <div style={styles.textContent}>
            <ul style={styles.list}>
              <li>Event Management</li>
              <li>Luxurious Decor</li>
              <li>Catering Services</li>
              <li>Ample Parking</li>
            </ul>
            <button style={styles.button}>Event Management →</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <div style={styles.featureItem}>
          <h3 style={styles.featureTitle}>2000+</h3>
          <p style={styles.featureSubtitle}>Guest Capacity</p>
        </div>
        <div style={styles.featureItem}>
          <h3 style={styles.featureTitle}>200+</h3>
          <p style={styles.featureSubtitle}>Car Parking</p>
        </div>
        <div style={styles.featureItem}>
          <h3 style={styles.featureTitle}>4</h3>
          <p style={styles.featureSubtitle}>Halls Available</p>
        </div>
        <div style={styles.featureItem}>
          <h3 style={styles.featureTitle}>20+</h3>
          <p style={styles.featureSubtitle}>Dishes Menu</p>
        </div>
      </section>

      {/* Location */}
      <section style={styles.section} id="location">
        <h2 style={styles.sectionTitle}>Location</h2>
        <div>
          <img
            src="https://via.placeholder.com/600x300"
            alt="Map location"
            style={styles.image}
          />
          <p style={styles.text}>
            Block E Jinnah Garden, Islamabad, ICT, 44000
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <p>&copy; 2024 Wasna Palace. All rights reserved.</p>
          <div>
            <a href="#privacy-policy" style={styles.footerLink}>
              Privacy Policy
            </a>
            <a href="#terms" style={styles.footerLink}>
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

// Styles
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 5%",
    backgroundColor: "#fff",
    borderBottom: "1px solid #ddd",
    fontFamily: "Arial, sans-serif",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#c59d5f",
  },
  navLinks: {
    display: "flex",
    gap: "1rem",
  },
  heroSection: {
    backgroundImage: "url('https://via.placeholder.com/1920x600')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    textAlign: "center",
    color: "#fff",
    height: "60vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  heroContent: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "1rem 2rem",
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
    padding: "3rem 5%",
    fontFamily: "Arial, sans-serif",
  },
  sectionTitle: {
    fontSize: "2rem",
    marginBottom: "1rem",
    color: "#c59d5f",
    textAlign: "center",
  },
  splitSection: {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
  },
  textContent: {
    flex: 1,
  },
  text: {
    fontSize: "1rem",
    color: "#555",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
  },
  list: {
    listStyleType: "circle",
    paddingLeft: "1.5rem",
  },
  button: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#c59d5f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  featuresSection: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "#f8f8f8",
    padding: "2rem 0",
    textAlign: "center",
  },
  featureItem: {
    flex: 1,
  },
  featureTitle: {
    fontSize: "1.5rem",
    color: "#c59d5f",
  },
  featureSubtitle: {
    fontSize: "1rem",
    color: "#333",
  },
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "1rem 0",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  footerLink: {
    color: "#c59d5f",
    marginLeft: "1rem",
    textDecoration: "none",
  },
};

export default LandingPage;
