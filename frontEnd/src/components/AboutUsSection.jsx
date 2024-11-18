const AboutUsSection = () => (
    <section className="container mx-auto px-[40px] lg:px-[120px] flex 
    flex-col md:flex-row items-center mt-20 sm:mt-20 lg:mt-40 md:mt-40 xl:mt-40 mb-16 md:mb-40 lg:mb-40 
    xl:mb-40 sm:mb-16 gap-8">
   
      <div className="flex-1 order-1 md:order-none text-center md:text-left">
        <h1 className="text-dark font-black font-poppins leading-[30px] sm:leading-[30px] md:leading-[50px] 
        lg:leading-[60px] xl:leading-[60px] text-[30px] sm:text-[30px] md:text-[40px] lg:text-[50px] xl:text-[50px] mb-4">
          PAWFINDER - <br /> A PLACE TO FIND <br /> YOUR PET
        </h1>
        <p className="text-dark text-[14px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[18px] 
        mb-2 sm:mb-2 md:mb-6 lg:mb-6 xl:mb-6">
          Lorem ipsum dolor sit amet, cons <br /> adipiscing elit, sed do eiusmod tempor
        </p>
      </div>
  
      <div className="flex-1 flex justify-center order-2 md:order-none">
        <img
          src="/images/dog_pic_about_us.png"
          alt="Dog"
          className="w-[300px] md:w-[400px] h-auto transform rotate-0 md:rotate-6 lg:rotate-6 xl:rotate-6 xl:-mr-48"
        />
      </div>
    </section>
  );
  
  export default AboutUsSection;
  