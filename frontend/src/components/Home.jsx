/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import Chatbot from './chatbot'
// import CategoryCarousel from './CategoryCarousel'
// import LatestJobs from './LatestJobs'

const Home = () => {
  return (
    <div>
          <Navbar/>
          <HeroSection/>
          <Chatbot/>
          {/* <CategoryCarousel/> */}
          {/* <LatestJobs/> */}
          {/*
          <Footer/>*/}
    </div>
  )
}
export default Home