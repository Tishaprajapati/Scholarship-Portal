/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import Chatbot from "./chatbot";
import CategoryCarousel from "./CategoryCarousel";
import LatestScholarships from "./Scholarship/LatestScholarships";
import Footer from "./shared/Footer";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestScholarships />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Home;
