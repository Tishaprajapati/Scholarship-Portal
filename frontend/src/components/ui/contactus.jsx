/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-white px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
        <div className="flex flex-row items-center gap-2">
         <Link to="/" ><img src="/logo.png" className="h-20 w-20 " /></Link>
          <div className="font-bold text-2xl">
            Aspire<span className="text-red-600">Scholar</span>
          </div>
        </div>
        </div>

        <nav className="flex gap-6">
         <a href="/" className="text-[#F83002] font-semibold hover:text-purple-700">
            Home
          </a>
         <a href="/aboutus" className="text-[#F83002] font-semibold hover:text-purple-700">
            About Us
          </a>
        </nav>
      </header>

      {/* Contact Us Section */}
      <div className="bg-gray-100 py-6">
        <div className="bg-[#5a30a4] py-3">
          <h2 className="text-gray-300 text-center text-2xl font-bold">Contact Us</h2>
        </div>

        <div className="p-6 max-w-4xl mx-auto">
          <h3 className="text-black text-xl font-bold mb-2">FutureFund Technologies Limited</h3>
          <p className="text-gray-600 text-base mb-6">
            (CIN: U72900MH1995PLC095642)
          </p>

          <h4 className="text-[#5a30a4] text-lg font-bold mb-2">Head Office</h4>
          <p className="text-gray-600 text-base">
            Vadodara<br />
            Address - C-23, First Floar,Silver Staddle, opposite Yash Complax,Sainath Society, Ganga Nagar, Gotri Road,Vadodara, Guajarat - 390021.<br />
            Helpline Number - (022) 4090 4484<br />
            Fax - (022) 2491 5217<br />
            Email ID: futurefund@triotech.in<br />
            (Working Hours: Monday to Friday - 9:30 am to 6 pm)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
