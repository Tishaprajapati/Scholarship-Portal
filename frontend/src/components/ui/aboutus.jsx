/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="font-sans">
     {/* Header */}
     <header className="bg-white px-6 py-4 flex justify-between items-center">
     <div className="flex items-center">

         <div>
             <h1 className='text-2xl font-bold'>Scholarship<span className='text-[#F83002]'>Portal</span></h1>
         </div>
     </div>

     <nav className="flex gap-6">
         <a href="/" className="text-[#F83002] font-semibold hover:text-[#5a30a4]">
             Home
         </a>
        <Link to="/contactus"> <a href="/contactus" className="text-[#F83002] font-semibold hover:text-[#5a30a4]">
             Contact Us
         </a></Link>
     </nav>
 </header>

    <div className="p-6">
      <div className="bg-[#5a30a4] py-3 text-center">
        <h1 className="text-gray-200 text-3xl font-bold">About Us</h1>
      </div>
      <div className="mt-6 text-gray-700">
        <h2 className="text-xl font-semibold mb-4">About FutureFund</h2>
        <p className="mb-4">
          FutureFund is a technology-enabled platform that empowers underprivileged students by providing financial assistance through corporate-funded scholarships. Our goal is to bridge the gap in education finance in the country by offering an easy-to-use online platform where students can search and apply for scholarships they qualify for. Corporates and industries can also use the platform to design and manage education finance schemes, promoting skill development and merit-based opportunities.
        </p>
        <h2 className="text-xl font-semibold mb-4">FutureFund for Students</h2>
        <p className="mb-4">
          Many students in India face financial challenges due to the increasing cost of higher education. FutureFund helps students overcome these barriers by providing access to various scholarship opportunities. Students can explore and apply for scholarships tailored to their academic goals, eligibility, and financial needs, enabling them to achieve their educational dreams.
        </p>
        <h2 className="text-xl font-semibold mb-4">How FutureFund Works</h2>
        <p className="mb-4">
          FutureFund allows fund providers to create and manage their own education finance schemes through our platform. Fund providers can:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Create and manage scholarship schemes</li>
          <li>Oversee student applications</li>
          <li>Access student profiles for informed decision-making</li>
          <li>Set up and manage user roles</li>
        </ul>
        <h2 className="text-xl font-semibold mb-4">About Protean eGov Technologies Limited</h2>
        <p className="mb-4">
          Protean eGov Technologies Limited is a leading IT-enabled service provider that has been instrumental in developing innovative, large-scale digital public infrastructure in India. With over 25 years of experience, the company has implemented and managed numerous e-governance projects, enabling citizen-centric solutions and fostering financial inclusion through technology.
        </p>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
