import { useState, useEffect } from "react";
import axios from "axios";
import { useUserAuth } from "../contexts/UserAuthContext";
import PetCard from "./PetCard";

function AccountMyFavorites() {
  const { user, isAuthenticated } = useUserAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFavorites = async () => {
    if (!isAuthenticated || !user?._id) {
      setError("You must be logged in to view favorites.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user._id}/favorites`,
        { withCredentials: true }
      );
      setFavorites(response.data);
    } catch (err) {
      setError("Failed to fetch favorites. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const removeFromFavorites = (petId) => {
    setFavorites((prev) => prev.filter((pet) => pet._id !== petId));
  };

  const getSvgForCard = (index) => {
    const svgFigures = [
      "/images/card_figure_yellow.svg",
      "/images/card_figure_red.svg",
      "/images/card_figure_green.svg",
    ];
    const rowIndex = Math.floor(index / 2); 
    const columnIndex = index % 2;
    return svgFigures[(rowIndex + columnIndex) % svgFigures.length];
  };

  if (loading) {
    return (
      <main className="flex-1 ml-4 p-14 -mt-16">
        <h1 className="text-[30px] font-black mb-6">MY FAVORITES</h1>
        <p className="text-[16px] text-dark">Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 ml-4 p-14 -mt-16">
        <h1 className="text-[30px] font-black mb-6">MY FAVORITES</h1>
        <p className="text-[16px] text-red-600">{error}</p>
      </main>
    );
  }

  if (favorites.length === 0) {
    return (
      <main className="flex-1 ml-4 p-14 -mt-16">
        <h1 className="text-[30px] font-black mb-6">MY FAVORITES</h1>
        <p className="text-[16px] text-dark">No favorites added yet.</p>
      </main>
    );
  }

  return (
    <main className="flex-1 p-14 -mt-16">
      <aside className="w-[700px] h-[550px] sticky top-0 p-4 bg-[#FAFAF5]">
      <h1 className="text-[30px] font-black -mt-4 mb-6">MY FAVORITES</h1>
      <div className="overflow-y-auto h-[70vh]">
      {favorites.length > 0 ? (
      <div 
      className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      style={{
        // padding: "10px",
        overflowX: "visible", 
      }}
    >
        {favorites.map((pet, index) => (
          <PetCard
          key={pet._id}
          pet={pet}
          index={index}
          getSvgForCard={getSvgForCard}
          context="favorites"
          onRemoveFromFavorites={removeFromFavorites}
          isFavorite={true}
          />
        ))}
      </div>
    ) : (
      <p>No favorites added yet.</p>
    )}
      </div>
      </aside>
    </main>
  );
}

export default AccountMyFavorites;
