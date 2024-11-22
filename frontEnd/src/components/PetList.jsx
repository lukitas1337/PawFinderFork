import React from "react";
import PetCard from "./PetCard";

function PetList({ pets, getSvgForCard }) {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {pets.map((pet, index) => (
        <PetCard
          key={pet.id}
          pet={pet}
          index={index}
          getSvgForCard={getSvgForCard}
        />
      ))}
    </div>
  );
}

export default PetList;
