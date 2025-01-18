/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import Chatbot from './chatbot'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
const Home = () => {
  return (
    <div>
          <Navbar/>
          <HeroSection/>
          <CategoryCarousel/>
          <LatestJobs/> 
          <Footer/>
          <Chatbot/>
    </div>
  )
}
export default Home