import { Link } from "react-router-dom";

const AboutUsSection = () => (
  <section
    className="container mx-auto px-[40px] lg:px-[120px] flex 
    flex-col md:flex-row items-center mt-20 sm:mt-20 lg:mt-40 md:mt-40 xl:mt-40 mb-16 md:mb-40 lg:mb-40 
    xl:mb-40 sm:mb-16 gap-8"
  >
    <div className="flex-1 order-1 md:order-none text-center md:text-left xl:max-w-[450px] 2xl:max-w-[600px]">
      <h1
        className="text-dark font-black font-poppins uppercase leading-[20px] sm:leading-[20px] md:leading-[40px] 
        lg:leading-[50px] xl:leading-[50px] 2xl:leading-[60px] text-[3rem] sm:text-[30px] md:text-[40px] lg:text-[40px] xl:text-[40px] 2xl:text-[50px] mb-8"
      >
        PawFinder - <br /> Your Pet Awaits
      </h1>
      <p
        className="text-dark text-[12px] sm:text-[12px] md:text-[14px] lg:text-[18px] xl:text-[18px] 
        mb-2 sm:mb-2 md:mb-6 lg:mb-6 xl:mb-6 text-justify"
      >
        Your trusted platform for finding pets across shelters in Germany.
        Browse animals from various shelters, explore detailed profiles, and let
        our AI match you with the perfect companion. With PawFinder, you can
        easily apply for adoption and connect with shelters to give a pet a
        loving home!
      </p>
    </div>

    <div className="flex-1 flex justify-center order-2 md:order-none">
      <Link to="/pets?type=dog">
      <img
        src="/images/dog_pic_about_us.png"
        alt="Dog"
        className="w-[400px] md:w-[400px] lg:w-[400px] xl:w-[400px] 2xl:w-[450px] h-auto transform rotate-0 md:rotate-6 lg:rotate-6 xl:rotate-6 ml-56"
      />
      </Link>
    </div>
  </section>
);

export default AboutUsSection;