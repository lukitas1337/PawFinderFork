import React from "react";
import { Outlet } from "react-router-dom"; 
import AccountSidebar from "../components/AccountSidebar"; 

export default function PersonalAccount() {
  return (
    <div className="bg-[#FAFAF5] flex">
        <AccountSidebar />
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
