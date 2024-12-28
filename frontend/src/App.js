// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WasnaPalace from "./components/WasnaPalace";
import Restaurant from "./components/Restaurant";
import RestaurantAdd from "./components/AddRestaurant";
import Checkout from "./components/CheckoutPage";
import EventComplex from "./components/EventComplex";
import Login from "./components/Login";

const App = () => {
  return (
    <Router>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="wasna-palace" element={<WasnaPalace />} />
          <Route path="restaurant" element={<Restaurant />} />
          <Route path="add-restaurant" element={<RestaurantAdd />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="event-complex" element={<EventComplex />} />
          <Route path="signup&login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
