import React, { useState, useEffect } from "react";
import AboutUsSection from "../components/AboutUsSection";
import AboutStatistics from "../components/AboutStatistics";
import AboutMatchingSection from "../components/AboutMatchingSection";

const About = () => {
  const [scale, setScale] = useState(1);// Resize the page
// Resize the page
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth > 1920) {
        setScale(1.5);
      } else if (screenWidth > 1440) {
        setScale(1.2);
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // Resize the page
    <div
      className="bg-[#FAFAF5] min-h-screen flex flex-col justify-between"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "center", 
        transition: "transform 0.3s ease-in-out", 
      }}
    >
      <main>
        <AboutUsSection />
        <AboutStatistics />
        <AboutMatchingSection />
      </main>
    </div>
  );
};

export default About;
