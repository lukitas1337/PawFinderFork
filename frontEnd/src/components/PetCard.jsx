import React from "react";
import { useNavigate } from "react-router-dom";

function PetCard({ pet, index, getSvgForCard }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/pets/${pet.id}`);
  };

  return (
    <div
      className="w-[330px] relative rounded-[36px] shadow-lg overflow-hidden bg-white flex flex-col 
                transform transition-transform duration-300 hover:scale-105 hover:rotate-2 cursor-pointer"
      onClick={handleCardClick} 
    >
      <div className="relative w-full bg-[#FFFFFF] rounded-t-[36px] h-[400px] overflow-hidden">
        <img
          src={pet.pictures && pet.pictures[0]}
          alt={pet.breed}
          className="w-full h-[300px] object-cover"
        />
      </div>
      <div className="relative flex-grow bg-[#FFF] rounded-b-[36px]">
        <img
          src={getSvgForCard(index)}
          alt="decorative SVG"
          className="absolute bottom-0 left-0 w-full h-auto object-cover"
        />

        <div className="absolute bottom-6 left-0 right-0 px-10 py-4 text-left">
          <div className="mb-6">
            <h2 className="text-[18px] font-bold text-dark mb-2">
              {pet.name}, {pet.age} {pet.age > 1 ? "years" : "year"}
            </h2>
            <div className="flex items-center gap-2">
              <img
                src="/images/location.svg"
                alt="Location"
                className="w-7 h-7"
              />
              <p className="text-[16px] font-normal text-dark">{pet.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-dark text-white text-[14px] w-full max-w-[150px] py-4 
                    font-medium rounded-full hover:bg-[#8D9F19] transition">
              Adopt me
            </button>
            <div className="w-16 h-16 flex items-center justify-center rounded-full border 
                    border-dark group hover:bg-dark transition">
              <img
                src="/images/favorites.svg"
                alt="Favorite"
                className="w-8 h-8 transition group-hover:invert"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetCard;
