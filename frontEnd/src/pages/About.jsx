import React from "react";
import AboutUsSection from "../components/AboutUsSection";
import AboutStatistics from "../components/AboutStatistics";
import AboutMatchingSection from "../components/AboutMatchingSection";

const About = () => (
  <div className="bg-[#FAFAF5] min-h-screen flex flex-col justify-between">
    <main>
      <AboutUsSection />
      <AboutStatistics />
      <AboutMatchingSection />
    </main>
  </div>
);
export default About;
