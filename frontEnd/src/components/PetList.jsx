import React from "react";
import PetCard from "./PetCard";

const PetList = ({ pets, getStyleForCard, userFavorites = []}) => {
  return (
    <div className={`grid mb-20 grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-[20px] mb-20"`}

      style={{
        gap: "20px",
      }}
    >
      {pets.map((pet, index) => (
        <PetCard
        key={pet._id}
        pet={pet}
        index={index}
        getStyleForCard={getStyleForCard}
        context="Pets"
        isFavorite={userFavorites.includes(pet._id)}
      />
      
      ))}
    </div>
  );
};

export default PetList;