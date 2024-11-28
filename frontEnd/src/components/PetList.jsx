import React from "react";
import PetCard from "./PetCard";

const PetList = ({ pets, getSvgForCard, userFavorites = [], gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" }) => {
  return (
    <div className={`grid ${gridCols} gap-6 mb-20`}>
      {pets.map((pet, index) => (
        <PetCard
        key={pet._id}
        pet={pet}
        index={index}
        getSvgForCard={getSvgForCard}
        context="Pets"
        isFavorite={userFavorites.includes(pet._id)}
      />
      
      ))}
    </div>
  );
};

export default PetList;