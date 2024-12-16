import React from "react";
import { Helmet } from "react-helmet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/LandingPage.css";
import customPin from "../assets/pin.png";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";

const LandingPage = () => {
  const position = [33.565904425010615, 73.16505889682914];
  const customIcon = new Icon({
    iconUrl: customPin,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  return (
    <div className="landing-page">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Wasna Palace - Make Your Event Memorable</title>
        <meta
          name="description"
          content="Plan your next big event at Wasna Palace. Offering premium event management with world-class facilities."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <h1 className="hero-title">Wasna Palace</h1>
          <p className="hero-subtitle">Make Your Event Memorable</p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel sint commodi repudiandae consequatur
            voluptatum laborum numquam blanditiis harum quisquam.
          </p>
          <img src={img2} alt="Decorated Tent" className="content-image" />
        </div>
      </section>

      {/* Services */}
      <section className="services">
        <h2>Services</h2>
        <div className="content">
          <img src={img3} alt="Decorated Table" className="content-image" />
          <div className="services-details">
            <p>We provide exceptional event management services:</p>
            <ul>
              <li>Maxime</li>
              <li>Consequuntur</li>
              <li>Voluptatum</li>
              <li>Laborum</li>
            </ul>
            <button className="event-button">Event Management →</button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="features-grid">
          <div>2000+ Guest Capacity</div>
          <div>200+ Car Parking</div>
          <div>4 Halls Available</div>
          <div>20+ Dishes Menu</div>
        </div>
      </section>

      {/* Location */}
      <section className="location">
        <h2>Location</h2>
        <div className="map-container">
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "400px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            <Marker position={position} icon={customIcon}>
              <Popup>Wasna Palace - Event Location</Popup>
            </Marker>
          </MapContainer>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
