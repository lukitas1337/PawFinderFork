import React from "react";

const GetInTouchSection = () => {
  return (
    <div className="relative flex flex-col items-center md:flex-row md:justify-between w-full">
      <div className="text-center md:text-left md:w-1/2 pl-56">
        <h1 className="text-dark leading-[80px] text-4xl font-poppins font-black text-[70px] relative">
          GET IN <br />TOUCH
          <img
            src="/images/paw_icon_green_main page.png"
            alt="Overlay"
            className="absolute -top-14 left-80 w-[70px] h-auto pointer-events-none"
          />
        </h1>
      </div>
      <div className="md:w-1/2 flex justify-center pr-[140px] mt-8 md:mt-0">
        <img
          src="/images/Cat_contact_form.png"
          alt="Cat with mustache"
          className="w-[300px] h-auto"
        />
      </div>
    </div>
  );
};

export default GetInTouchSection;
