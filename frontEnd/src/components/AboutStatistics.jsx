import React, { useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const AboutStatistics = () => {
  const [startCounting, setStartCounting] = useState(false);
  const { ref } = useInView({
    triggerOnce: true,
    threshold: 0.5,
    onChange: (inView) => {
      if (inView) setStartCounting(true);
    },
  });

  return (
    <div className="container mx-auto px-[40px] lg:px-[120px]">
      <section
        ref={ref}
        className="bg-red text-white py-[70px] mb-20 md:mb-44 lg:mb-44 xl:mb-44 sm:mb-20 rounded-[30px] 
        text-center flex flex-col md:flex-row justify-around items-center gap-6 md:gap-0">
        {[
          { end: 350000, text: "Annual Shelter Intakes in Germany" },
          { end: 240000, text: "Adopted Animals Yearly in Germany" },
          { end: 34300000, text: "Animals living in German Households" },
        ].map((stat, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <span className="text-[50px] font-bold">
                {startCounting ? <CountUp start={0} end={stat.end} duration={2} /> : 0}
              </span>
              <p className="text-[12px] mt-2">{stat.text}</p>
            </div>
            {index < 2 && (
              <div className="block md:hidden w-full max-w-[200px] h-[2px] bg-white opacity-30 my-4 sm:my-6"></div>
            )}
            {index < 2 && (
              <div className="hidden md:block h-20 border-r-[2px] border-white opacity-30"></div>
            )}
          </React.Fragment>
        ))}
      </section>
    </div>
  );
};

export default AboutStatistics;
