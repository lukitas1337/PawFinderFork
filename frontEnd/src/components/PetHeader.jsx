import React from "react";

function PetHeader({ toggleFilters }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-left text-[35px] font-black">
        WHICH ONE IS YOUR BEST FRIEND?
      </h1>
      <div className="flex items-center gap-4">
        <p className="text-[16px] font-normal text-dark">Filter</p>
        <div
          className="w-14 h-14 flex items-center justify-center rounded-full border border-dark group hover:bg-dark transition cursor-pointer"
          onClick={toggleFilters}
        >
          <img
            src="/images/filter.svg"
            alt="Filter"
            className="w-10 h-10 transition group-hover:invert"
          />
        </div>
      </div>
    </div>
  );
}

export default PetHeader;
