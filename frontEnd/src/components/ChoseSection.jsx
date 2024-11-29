import { Link } from 'react-router-dom'; 

function ChoseSection() {
  return (
    <section className="mt-[25rem]">
      <div className="flex flex-col justify-between items-center gap-[5rem]">
        <h2 className="text-dark text-[1.8rem] md:text-[2.4rem]  uppercase font-black">
          who would you like to choose?
        </h2>
        <div className="flex flex-col lg:flex-row gap-[5rem] ">
        <Link to="/pets?type=cat">
          <figure className="w-[30rem] md:w-[50rem]">
            <img src="/images/Cat_button.png" alt="kitty" />
          </figure>
          </Link>
          <Link to="/pets?type=dog">
          <figure className="w-[30rem] md:w-[50rem]">
            <img src="/images/Dogg_button.png" alt="Doggy" />
          </figure>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ChoseSection;
