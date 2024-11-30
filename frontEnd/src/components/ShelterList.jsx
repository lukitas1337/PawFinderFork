import { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function ShelterList({ shelters, handleClick, activeStateIndex }) {
  console.log(activeStateIndex);
  return (
    <div className="sheltersList flex flex-col w-[35%] gap-[2rem]">
      {shelters.map((shelter, i) => (
        <div
          key={shelter._id}
          className={`shelterInfo w-full p-[5rem] rounded-[2rem] ${
            activeStateIndex === i ? "active" : ""
          }`}
          onClick={() => handleClick(shelter, i)}
        >
          <h2 className="text-[1.8rem] mb-[1rem] font-bold">
            {shelter.companyName}
          </h2>
          <p className="flex items-baseline text-[1.2rem]">
            <span>
              <IoLocationOutline />
            </span>
            {shelter.address}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ShelterList;
