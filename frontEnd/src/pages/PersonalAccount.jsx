import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { FavoritesProvider } from "../contexts/FavoritesContext";
import AccountMyFavorites from "../components/AccountMyFavorites";
import AccountSidebar from "../components/AccountSidebar"; 
import AccountMyRecommendations from "../components/AccountMyRecommendations"; 
import AccountMyApplications from "../components/AccountMyApplications";

export default function PersonalAccount() {
  const location = useLocation();

  const validPaths = [
    "/account",
    "/account/favorites",
    "/account/recommendations",
    "/account/applications",
  ];
  const isValidPath = validPaths.some((path) => location.pathname.startsWith(path));

  if (!isValidPath) {
    return <Navigate to="/account/applications" />;
  }

  return (
    <FavoritesProvider> 
      <div className="bg-[#FAFAF5] min-h-screen flex flex-col justify-between">
        <div className="flex flex-col h-[650px] px-[200px] mt-20">
          <div className="flex flex-1">
            <AccountSidebar />
            <Routes>
              <Route path="favorites" element={<AccountMyFavorites />} />
              <Route path="recommendations" element={<AccountMyRecommendations />} />
              <Route path="applications" element={<AccountMyApplications />} />
            </Routes>
          </div>
        </div>
      </div>
    </FavoritesProvider>
  );
}
