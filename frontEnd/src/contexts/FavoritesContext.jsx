import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { useUserAuth } from "./UserAuthContext";

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

const initialState = {
  favorites: [],
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "setFavorites":
      return { ...state, favorites: action.payload, loading: false };
    case "addToFavorites":
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "removeFromFavorites":
      return {
        ...state,
        favorites: state.favorites.filter((pet) => pet._id !== action.payload),
      };
    case "setLoading":
      return { ...state, loading: true };
    case "setError":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticated } = useUserAuth();
  const { favorites, loading, error } = state;

  useEffect(() => {
    if (isAuthenticated && user?._id) {
      fetchFavorites();
    }
  }, [user, isAuthenticated]);

  const fetchFavorites = async () => {
    dispatch({ type: "setLoading" });
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user._id}`,
        { withCredentials: true }
      );
      dispatch({
        type: "setFavorites",
        payload: response.data.myFavorites || [],
      });
    } catch (err) {
      dispatch({ type: "setError", payload: "Error fetching favorites" });
      console.error("Error fetching favorites:", err);
    }
  };

  const addToFavorites = async (pet) => {
    console.log("isAuthenticated:", isAuthenticated);
    console.log("user:", user);
    
    if (!isAuthenticated || !user?._id) {
      console.error("User is not logged in");
      return;
    }
  
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user._id}/favorites`,
        { petId: pet._id },
        { withCredentials: true }
      );
      dispatch({ type: "addToFavorites", payload: pet });
    } catch (err) {
      console.error("Error adding to favorites:", err);
    }
  };

  const removeFromFavorites = async (petId) => {
    if (!isAuthenticated || !user?._id) {
      console.error("User is not logged in");
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user._id}/favorites`,
        { data: { petId }, withCredentials: true }
      );
      dispatch({ type: "removeFromFavorites", payload: petId });
    } catch (err) {
      console.error("Error removing from favorites:", err);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, loading, error }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
