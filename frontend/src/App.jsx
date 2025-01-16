/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from './components/shared/navbar'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import AvailableScholarships from './components/ui/AvailableScholarships'; 

import ContactUs from './components/ui/contactus'
import AboutUs from './components/ui/aboutus'

import Chatbot from './components/chatbot'
import Scholarship from './components/ui/scholarship'
const appRouter =createBrowserRouter([
  {
    path:'/',
    // eslint-disable-next-line react/jsx-no-undef
    element:<Home/>
  },
  {
    path:'/aboutus',
    // eslint-disable-next-line react/jsx-no-undef
    element:<AboutUs/>
  },
  {
    path:'/login',
     //eslint-disable-next-line react/jsx-no-undef
    element:<Login/>
  },
  {
    path:'/signup',
    // eslint-disable-next-line react/jsx-no-undef
    element:<Signup/>
  },
  {
    path:'/contactus',
     //eslint-disable-next-line react/jsx-no-undef
    element:<ContactUs/>
  },
  {
    path:'/Chatbot',
     //eslint-disable-next-line react/jsx-no-undef
    element:<Chatbot/>
  },
  {
    path: '/availablescholarships', // Add this route
    element: <AvailableScholarships />,
  },
 
  {
    path:'/scholarship',
    // eslint-disable-next-line react/jsx-no-undef
    element:<Scholarship/>
  },
])

function App() {
  return (
    <>
    <RouterProvider router = {appRouter}/>
    </>
  )
}
export default App