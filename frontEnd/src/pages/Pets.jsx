import React, { useState, useEffect } from "react";
import axios from "axios";
import PetHeader from "../components/PetHeader";
import PetFilter from "../components/PetFilter";
import PetList from "../components/PetList";

function Pets() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
  age: [],
  size: [],
  animalType: "",
  gender: [],
});

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

  const toggleFilters = () => setShowFilters((prev) => !prev);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    console.log("Filters applied:", filters);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-[#FAFAF5] min-h-screen flex flex-col justify-between">
      <div className="px-8 sm:px-8 xl:px-[200px] lg:px-8 md:px-8 py-10">
        <PetHeader toggleFilters={toggleFilters} />
        {showFilters && (
          <PetFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onApplyFilters={applyFilters}
          />
        )}
        <PetList pets={dogs} getSvgForCard={getSvgForCard} />
      </div>
    </div>
  );
}

export default Pets;
