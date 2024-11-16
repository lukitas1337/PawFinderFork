function ChoseSection() {
  return (
    <section className="my-[25rem]">
      <div className="flex flex-col justify-between items-center gap-[5rem]">
        <h2 className="text-dark text-[2.4rem]  uppercase font-black">
          who would you like to choose?
        </h2>
        <div className="flex gap-[5rem] ">
          <figure className="w-[50rem]">
            <img src="/images/Cat_button.png" alt="kitty" />
          </figure>
          <figure className="w-[50rem]">
            <img src="/images/Dogg_button.png" alt="Doggy" />
          </figure>
        </div>
      </div>
    </section>
  );
}

export default ChoseSection;
