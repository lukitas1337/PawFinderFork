import React from "react";
import { Outlet } from "react-router-dom"; 
import AccountSidebar from "../components/AccountSidebar"; 

export default function PersonalAccount() {
  return (
    <div className="bg-[#FAFAF5] min-h-screen flex flex-col justify-between">
      <div className="flex flex-col h-[650px] px-[200px] mt-20">
        <div className="flex flex-1">
          <AccountSidebar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
