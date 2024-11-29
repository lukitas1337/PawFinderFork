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
    if (!isAuthenticated || !user?.userId) {
      setError("You must be logged in to view favorites.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.userId}/favorites`,
        { withCredentials: true }
      );

      // matchScore 
      const matchesResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/matching/user/${user.userId}/scores`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      const matchScores = matchesResponse.data.reduce((acc, match) => {
        acc[match.petId] = match.score;
        return acc;
      }, {});

      // matchScore 
      const favoritesWithScores = response.data.map((pet) => ({
        ...pet,
        matchScore: matchScores[pet._id] || null,
      }))
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

      setFavorites(favoritesWithScores);
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

  const styleConfig = [
    { svg: "/images/card_figure_yellow.svg", color: "#FEDB66" }, 
    { svg: "/images/card_figure_red.svg", color: "#FD7E6F" },    
    { svg: "/images/card_figure_green.svg", color: "#BFCF59" },  
  ];
  
  const getStyleForCard = (index) => {
    const rowIndex = Math.floor(index / 2); 
    const columnIndex = index % 2; 
    const styleIndex = (rowIndex + columnIndex) % styleConfig.length;
    return styleConfig[styleIndex];
  };

  if (loading) {
    return (
      <main className="flex-1 p-16 mt-2">
        <h1 className="text-[30px] font-black mb-6">MY FAVORITES</h1>
        <p className="text-[16px] text-dark">Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 p-16 mt-2">
        <h1 className="text-[30px] font-black mb-6">MY FAVORITES</h1>
        <p className="text-[16px] text-red-600">{error}</p>
      </main>
    );
  }

  if (favorites.length === 0) {
    return (
      <main className="flex-1 p-16 mt-2">
        <h1 className="text-[30px] font-black mb-6">MY FAVORITES</h1>
        <p className="text-[16px] text-dark">No favorites added yet.</p>
      </main>
    );
  }

  return (
    <main className="flex-1 p-16 mt-2">
      <aside className="w-[700px]">
        <h1 className="text-[30px] font-black mb-6">MY FAVORITES</h1>
        <div className="h-auto">
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {favorites.map((pet, index) => (
                <PetCard
                  key={pet._id}
                  pet={pet}
                  index={index}
                  getStyleForCard={getStyleForCard}
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
