import React from "react";

const AboutMatchingSection = () => (
  <section className="container mx-auto px-[40px] lg:px-[120px] flex 
    flex-col md:flex-row items-center mt-20 md:mt-40 lg:mt-40 xl:mt-40 sm:mt-20 mb-20 sm:mb-20 md:mb-44 
    lg:mb-44 xl:mb-44 gap-8">

    <div className="flex-1 order-1 sm:order-1 md:order-2 text-center sm:text-center md:text-right">
      <h2 className="text-dark font-black font-poppins leading-[30px] sm:leading-[30px] 
        md:leading-[50px] lg:leading-[60px] xl:leading-[60px] 
        text-[30px] sm:text-[30px] md:text-[40px] lg:text-[50px] xl:text-[50px] mb-4">
        OUR MATCHING <br /> SYSTEM QUICKLY <br /> FINDS THE PET
      </h2>
      <p className="text-dark text-[14px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[18px] 
      mb-2 sm:mb-2 md:mb-6 lg:mb-6 xl:mb-6">
        Our advanced matching system ensures you find the ideal pet quickly and effortlessly. By analyzing your information and questionnaire responses, we use innovative technology to match you with pets whose needs and characteristics align perfectly with your preferences. With the detailed data provided by shelters, our system helps create meaningful connections, giving you and your future pet the best chance at a happy life together!
      </p>
    </div>

    <div className="flex-1 flex justify-center order-2 sm:order-2 md:order-1">
      <img
        src="/images/cat_pic_about_us.png"
        alt="Cat"
        className="w-[300px] md:w-[400px] h-auto transform rotate-0 md:-rotate-6 lg:-rotate-6 xl:-rotate-6 xl:-ml-48"
      />
    </div>
  </section>
);

export default AboutMatchingSection;
