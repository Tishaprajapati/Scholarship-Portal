import { Button } from "@/components/ui/button";
import { Search, Sparkles, GraduationCap, Award } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white py-20 sm:py-32">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex flex-col gap-6 my-10">
            <span className="inline-flex items-center mx-auto px-4 py-2 rounded-full bg-purple-100 text-[#F83002] font-medium text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Empowering Your Education Journey
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              Explore, Apply & Achieve <br className="hidden sm:inline" /> Your{" "}
              <span className="text-[#6A38C2]">Scholarship Goals</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Welcome to AspireScholar, your gateway to numerous opportunities.
              Browse through a wide range of scholarships, tailored to your
              academic goals, eligibility, and location.
            </p>
            <div className="flex w-full max-w-2xl shadow-lg border border-gray-200 rounded-full items-center gap-4 mx-auto bg-white">
              {/* <Search className="h-5 w-5 ml-4 text-gray-400" />
              <input
                type="text"
                placeholder="Find your dream scholarship"
                className="outline-none border-none w-full py-3 px-2"
              /> */}
              {/* <Button className="rounded-full bg-[#6A38C2] hover:bg-[#5b2fa8] px-6 py-2 m-1">
                Search
              </Button> */}
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link to={"/login"}>
                <Button className="rounded-full bg-[#F83002] hover:bg-[#d62a02] px-6 py-2">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Explore Scholarships
                </Button>
              </Link>
              <Button
                variant="outline"
                className="rounded-full px-6 py-2 border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white"
              >
                <Award className="w-5 h-5 mr-2" />
                <Link to={"/manual"}>
                 How It Works
                 </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <svg
          className="w-full h-auto"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 112C120 104 240 88 360 80C480 72 600 72 720 76C840 80 960 88 1080 92C1200 96 1320 96 1380 96L1440 96V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#6A38C2"
            fillOpacity="0.1"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
