function AdoptSection() {
  return (
    <section className="mt-[20rem]">
      <div className="flex flex-col items-center  gap-[1rem] lg:flex-row w-full lg:w-[80%] xl:w-[45%] mx-auto justify-between">
        <div className=" relative">
          <h2 className="text-[8rem] lg:text-[9rem] font-black uppercase leading-tight">
            How
            <br /> To
            <br /> Adopt
          </h2>
          <figure className="absolute  bottom-0 left-[30rem] xl:bottom-[5rem] xl:right-[-5rem] w-[9rem]">
            <img src="/images/paw_icon_green_main page.png" alt="Green Paw" />
          </figure>
        </div>
        <div className="w-[45rem] flex flex-col gap-[3rem]">
          <div className="bg-light py-[2rem] px-[2rem] flex items-center gap-[1rem] rounded-[1rem]">
            <figure className="w-[7rem]">
              <img src="/images/Check_circle_main page.png" alt="check" />
            </figure>
            <p className="text-[1.6rem]">
              Lorem ipsum dolor sit amet, cons adipiscing elit, sed do eiusmod
              tempor
            </p>
          </div>
          <div className="bg-light py-[2rem] px-[2rem] flex items-center gap-[1rem] rounded-[1rem]">
            <figure className="w-[7rem]">
              <img src="/images/Check_circle_main page.png" alt="check" />
            </figure>
            <p className="text-[1.6rem]">
              Lorem ipsum dolor sit amet, cons adipiscing elit, sed do eiusmod
              tempor
            </p>
          </div>
          <div className="bg-light py-[2rem] px-[2rem] flex items-center gap-[1rem] rounded-[1rem]">
            <figure className="w-[7rem]">
              <img src="/images/Check_circle_main page.png" alt="check" />
            </figure>
            <p className="text-[1.6rem]">
              Lorem ipsum dolor sit amet, cons adipiscing elit, sed do eiusmod
              tempor
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdoptSection;
