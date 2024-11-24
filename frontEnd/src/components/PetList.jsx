import React from "react";
import PetCard from "./PetCard";

const PetList = ({ pets, getSvgForCard }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pets.map((pet, index) => (
        <PetCard
          key={pet.id || index}
          pet={pet}
          index={index}
          getSvgForCard={getSvgForCard}
          className={`transition-transform duration-500 delay-${index * 100}`}
        />
      ))}
    </div>
  );
};

export default PetList;
