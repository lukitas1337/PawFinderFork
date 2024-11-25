import React, { useState, useEffect } from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import PetList from "./PetList";

function AccountMyFavorites() {
  const { favorites } = useFavorites();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (favorites !== undefined) {
      setLoading(false);
    } else {
      setError("Failed to fetch favorites. Please try again later.");
    }
  }, [favorites]);

  if (loading) {
    return (
      <main className="flex-1 p-14 -mt-16">
        <h1 className="text-[30px] font-black mb-6">MY FAVORITES</h1>
        <p className="text-[16px] text-dark">Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 p-14 -mt-16">
        <h1 className="text-[30px] font-black mb-6">MY FAVORITES</h1>
        <p className="text-[16px] text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="flex-1 p-14 -mt-16">
      <h1 className="text-[30px] font-black mb-6">MY FAVORITES</h1>
      {favorites.length === 0 ? (
        <p className="text-[16px] text-dark">No favorites added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <PetList pets={favorites} />
        </div>
      )}
    </main>
  );
}

export default AccountMyFavorites;
