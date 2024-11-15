import React, { useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";


const About = () => {
    const [startCounting, setStartCounting] = useState(false);
    const { ref, inView } = useInView({
      triggerOnce: true, 
      threshold: 0.5, 
      onChange: (inView) => {
        if (inView) setStartCounting(true);
      },
    });
  return (
    <div className="bg-[#FAFAF5] min-h-screen flex flex-col justify-between">
      <main className="container mx-auto px-28 mt-40">
        <section className="flex flex-col md:flex-row items-center mb-44">
          <div className="md:w-1/2">
            <h1 className="text-dark leading-[60px] font-black text-4xl font-poppins text-[50px]  mb-4">
            PAWFINDER - <br />A PLACE TO FIND <br />YOUR PET
            </h1>
            <p className="text-dark text-[18px] mb-6 ">
              Lorem ipsum dolor sit amet, cons <br /> adipiscing elit, sed do eiusmod tempor
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
             <img 
             src="/images/dog_pic_about_us.png" 
             alt="Dog" 
             className="w-[400px] h-auto"
             />
          </div>
        </section>

    <section
      ref={ref}
      className="bg-red text-white py-[70px] mb-44 rounded-[30px] text-center flex justify-around items-center"
    >
      <div className="flex flex-col items-center">
        <span className="text-[50px] font-bold">
          {startCounting ? <CountUp start={0} end={2000} duration={2} /> : 0}
        </span>
        <p className="text-[12px] mt-2">Lorem ipsum dolor sit amet</p>
      </div>
      <div className="hidden md:block h-20 border-r-[2px] border-white opacity-30"></div>
      <div className="flex flex-col items-center">
        <span className="text-[50px] font-bold">
          {startCounting ? <CountUp start={0} end={10000} duration={2} /> : 0}
        </span>
        <p className="text-[12px] mt-2">Lorem ipsum dolor sit amet</p>
      </div>
      <div className="hidden md:block h-20 border-r-[2px] border-white opacity-30"></div>
      <div className="flex flex-col items-center">
        <span className="text-[50px] font-bold">
          {startCounting ? <CountUp start={0} end={3000} duration={2} /> : 0}
        </span>
        <p className="text-[12px] mt-2">Lorem ipsum dolor sit amet</p>
      </div>
    </section>

        <section className="flex flex-col md:flex-row items-center mb-44">
          <div className="md:w-1/2 order-2 md:order-1 flex justify-center md:justify-start">
             <img 
             src="/images/cat_pic_about_us.png" 
             alt="Cat" 
             className="w-[400px] h-auto"/>
          </div>
          <div className="md:w-1/2 order-1 md:order-2 text-right">
            <h2 className="text-dark leading-[60px] font-black text-4xl font-poppins text-[50px]  mb-4">
              OUR MATCHING <br />SYSTEM QUICKLY <br />FINDS THE PET
            </h2>
            <p className="text-dark text-[18px] mb-6">
              Lorem ipsum dolor sit amet, cons <br />adipiscing elit, sed do eiusmod tempor
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
