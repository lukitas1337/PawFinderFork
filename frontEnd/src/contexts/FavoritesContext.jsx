import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider = ({ children, userId }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchFavorites(userId);
    }
  }, [userId]);

  const fetchFavorites = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:1337/api/users/${userId}`);
      setFavorites(response.data.myFavorites || []);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  };

  const saveFavorites = async (favoritesList, userId) => {
    try {
      await axios.put(`http://localhost:1337/api/users/${userId}`, { myFavorites: favoritesList });
    } catch (err) {
      console.error("Error saving favorites:", err);
    }
  };

  const addToFavorites = (pet) => {
    setFavorites((prev) => {
      if (!prev.find((item) => item.id === pet.id)) {
        const updatedFavorites = [...prev, pet];
        saveFavorites(updatedFavorites, userId); 
        return updatedFavorites;
      }
      return prev;
    });
  };

  const removeFromFavorites = (petId) => {
    setFavorites((prev) => {
      const updatedFavorites = prev.filter((item) => item.id !== petId);
      saveFavorites(updatedFavorites, userId); 
      return updatedFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
