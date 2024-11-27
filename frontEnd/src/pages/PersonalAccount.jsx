import React from "react";
import { Outlet } from "react-router-dom"; // Используем Outlet для рендеринга вложенных маршрутов
import AccountSidebar from "../components/AccountSidebar"; // Импортируем боковую панель

export default function PersonalAccount() {
  return (
    <div className="bg-[#FAFAF5] min-h-screen flex flex-col justify-between">
      <div className="flex flex-col h-[650px] px-[200px] mt-20">
        <div className="flex flex-1">
          <AccountSidebar />
          {/* Используем Outlet для рендеринга вложенных маршрутов */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
