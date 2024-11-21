import React, { useState, useEffect } from "react";
import axios from "axios";
// import { dogs } from "../data/data";

function Dogs() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const svgFigures = [
    "/images/card_figure_yellow.svg",
    "/images/card_figure_red.svg",
    "/images/card_figure_green.svg",
  ];


  const getSvgForCard = (index) => {
    const rowIndex = Math.floor(index / 3);
    const columnIndex = index % 3; 
  
    return svgFigures[(rowIndex + columnIndex) % svgFigures.length];
  };

useEffect(() => {
  const fetchDogs = async () => {
    try {
      const response = await axios.get("http://localhost:1337/api/pets");
      setDogs(response.data); 
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false); 
    }
  };

  fetchDogs();
}, []);

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-[#FAFAF5] min-h-screen flex flex-col justify-between">
      <div className="px-8 sm:px-8 xl:px-[200px] lg:px-8 md:px-8 py-10"> 
      <div className="flex justify-between items-center mb-14">
          <h1 className="text-left text-[35px] font-black">
            WHICH ONE IS YOUR BEST FRIEND?
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-[16px] font-normal text-dark">Filter</p>
            <div className="w-14 h-14 flex items-center justify-center rounded-full border border-dark 
            group hover:bg-dark transition">
              <img
                src="/images/filter.svg" 
                alt="Filter"
                className="w-10 h-10 transition group-hover:invert"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {dogs.map((dog, index) => (
            <div
              key={dog.id}
              className="w-[330px] relative rounded-[36px] shadow-lg overflow-hidden bg-white flex flex-col 
                         transform transition-transform duration-300 hover:scale-105 hover:rotate-2"
            >
              <div className="relative w-full bg-[#FFFFFF] rounded-t-[36px] h-[400px] overflow-hidden">
              
                <img
  src={dog.pictures && dog.pictures[0]} 
  alt={dog.breed} 
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
  {dog.name}, {dog.age} {dog.age > 1 ? 'years' : 'year'}
</h2>
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/location.svg"
                        alt="Location"
                        className="w-7 h-7"
                      />
                      <p className="text-[16px] font-normal text-dark">
  {dog.location}
</p>
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dogs;
