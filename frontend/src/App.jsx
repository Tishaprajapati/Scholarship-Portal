/* eslint-disable no-unused-vars */
import React from "react";
//import Navbar from './components/shared/navbar'
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
// import Manual from "./components/ui/manual";
import ContactUs from "./components/ui/contactus";
import AboutUs from "./components/ui/aboutus";
import Chatbot from "./components/Chatbot";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import ScholarshipDescription from "./components/Scholarship/ScholarshipDescription";
import Scholarships from "./components/Scholarship/Scholarships";
import ApplicationPage from "./pages/ApplicationPage";
import ApplicationList from "./components/Scholarship/ApplicationList";
import ScholarshipSearch from "./components/ScholarshipSearch";
import ScholarshipManual from "./components/ui/manual";
import HeroSection from "./components/HeroSection";

const appRouter = createBrowserRouter([
  {
    path: "/",
    // eslint-disable-next-line react/jsx-no-undef
    element: <Home />,
  },
  {
    path: "/applications/:id",
    element: <ApplicationList />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/aboutus",
    // eslint-disable-next-line react/jsx-no-undef
    element: <AboutUs />,
  },
  {
    path : "/manual",
    element:<ScholarshipManual />,
  }
  ,
  {
    path: "/description/:id",
    //eslint-disable-next-line react/jsx-no-undef
    element: <ScholarshipDescription />,
  },
  
  {
    path: "/Scholarship",
    // eslint-disable-next-line react/jsx-no-undef
    element: <Scholarships />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/login",
    //eslint-disable-next-line react/jsx-no-undef
    element: <Login />,
  },
  {
    path: "/signup",
    // eslint-disable-next-line react/jsx-no-undef
    element: <Signup />,
  },
  {
    path: "/contactus",
    //eslint-disable-next-line react/jsx-no-undef
    element: <ContactUs />,
  },
  {
    path: "/Chatbot",
    //eslint-disable-next-line react/jsx-no-undef
    element: <Chatbot />,
  },
  {
    path: "/apply/:id",
    //eslint-disable-next-line react/jsx-no-undef
    element: <ApplicationPage />,
  },
  {
    path: "/scholarships/search",
    element: <ScholarshipSearch />,
  },
  {
    path : "/herosection",
    element:<HeroSection/>,
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}
export default App;
