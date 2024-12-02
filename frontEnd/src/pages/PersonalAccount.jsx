import React from "react";
import { Outlet } from "react-router-dom";
import AccountSidebar from "../components/AccountSidebar";

export default function PersonalAccount() {
  return (
    <div className="flex flex-col items-center lg:flex-row lg:items-stretch">
      <AccountSidebar />
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
