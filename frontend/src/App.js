// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookingPage from "./components/EventComplex";
import Restaurant from "./components/Restaurant";
import RestaurantAdd from "./components/AddRestaurant";
import Checkout from "./components/CheckoutPage";

const App = () => {
  return (
    <Router>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="event-complex" element={<BookingPage />} />
          <Route path="restaurant" element={<Restaurant />} />
          <Route path="add-restaurant" element={<RestaurantAdd />} />
          <Route path="checkout" element={<Checkout />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
