import React from "react";
import { Helmet } from "react-helmet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import customPin from "../assets/pin.svg";
import "../styles/LandingPage.css";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";

const LandingPage = () => {
  const position = [33.565904425010615, 73.16505889682914];

  // Custom icon for the marker
  const customIcon = new Icon({
    iconUrl: customPin, // Your custom pin image path
    iconSize: [40, 40], // Set the size of the custom icon
    iconAnchor: [20, 40], // Set the anchor point for the marker
    popupAnchor: [0, -40], // Set the position of the popup relative to the icon
  });

  return (
    <div className="landing-page">
      {/* SEO and Font Links */}
      <Helmet>
        <title>Wasna Palace - Make Your Event Memorable</title>
        <meta
          name="description"
          content="Plan your next big event at Wasna Palace. Offering premium event management with world-class facilities."
        />
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      {/* Hero Section */}
      <section
        className="hero"
        id="home"
        style={{ backgroundImage: `url(${require("../assets/img1.jpg")})` }}
      >
        <div className="hero-overlay">
          <h1 className="hero-title">WASNA PALACE</h1>
          <p className="hero-subtitle">Make Your Event Memorable</p>
          <a href="wasna-palace" className="hero-button">
            Book Now
          </a>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us" id="why-choose-us">
        <div className="why-choose-us-container">
          <img
            src={img2}
            alt="Decorated Tent"
            className="no-enlarge-on-hover"
          />
          <div className="why-choose-us-content">
            <h2>WHY CHOOSE US?</h2>
            <p>
              At Wasna Palace, we blend tradition with modern elegance to create
              unforgettable events. Our state-of-the-art facilities, exceptional
              service, and stunning ambiance ensure that every moment is
              perfect. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Est commodi vitae dignissimos reprehenderit impedit nulla a in!
              Similique iure omnis reprehenderit sequi, illo eveniet dolor iusto
              delectus dolorem rem ad. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Minima quam voluptatem a nam fugiat. Provident
              laborum unde et praesentium aliquid nulla odio, non quas. Rerum
              minus iure accusamus enim dolorum!
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services" id="services">
        <div className="services-container">
          <div className="services-content">
            <h2>OUR SERVICES</h2>
            <div className="services-content-list">
              <p>Our comprehensive event management services include:</p>
              <ul>
                <li>Customized Event Planning</li>
                <li>Decor and Ambiance Design</li>
                <li>Catering and Menu Selection</li>
                <li>Entertainment and Music</li>
              </ul>
            </div>

            <a href="event-complex" className="event-management-button">
              Learn More →
            </a>
          </div>
          <img
            src={img3}
            alt="Decorated Table"
            className="no-enlarge-on-hover"
          />
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-icon">🎉</span>
            <span className="feature-text">2000+ Guest Capacity</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🚗</span>
            <span className="feature-text">200+ Car Parking</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🏛️</span>
            <span className="feature-text">4 Elegant Halls</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🍽️</span>
            <span className="feature-text">20+ Gourmet Menus</span>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="location" id="location">
        <h2>LOCATION</h2>
        <div className="map-wrapper">
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={customIcon}>
              <Popup>
                Wasna Palace <br /> Event Location
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
