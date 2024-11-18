import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative heroSection my-[5rem]">
      <div className="heroSection-text flex flex-col gap-[3rem] w-[10%] mx-auto justify-between items-center">
        <figure>
          <img
            src="/images/paw_icon_red_mainpage.png"
            className="w-[6rem]"
            alt="Cat Paw"
          />
        </figure>
        <h1 className="text-dark text-[9rem] font-black text-center uppercase leading-tight">
          Find Your Friend
        </h1>
        <Link className="btn bg-green text-white text-[1.8rem] px-[4rem] py-[1rem] w-[20rem] rounded-[5rem] hover:text-green hover:bg-dark text-center">
          Get Started
        </Link>
      </div>
      <div className="gifContainer gifContainer1"></div>
      <div className="gifContainer gifContainer2"></div>
      <div className="gifContainer gifContainer3"></div>
      <div className="gifContainer gifContainer4"></div>
      <div className="gifContainer gifContainer5"></div>
      <div className="gifContainer gifContainer6"></div>
    </section>
  );
}

export default Hero;
