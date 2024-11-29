import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserAuth } from "../contexts/UserAuthContext"; 

export default function AccountSidebar() {
  const location = useLocation();
  const { user } = useUserAuth(); 

  const menuItems = [
    { name: "My favorites", path: "favorites" },
    { name: "My recommendations", path: "recommendations" },
    { name: "My applications", path: "applications" },
  ];

  return (
    <aside className="ml-[200px] lg:px-10 mt-20 w-[300px] bg-[#E7E7D6] h-[470px] text-[16px] font-medium 
    p-8 py-20 rounded-[30px] flex flex-col justify-between sticky top-10 mb-10">
      <div className="bg-[#8D9F19] text-white p-8 rounded-[15px] -mt-11 flex justify-between 
      items-center mb-8">
        <div>
        <h4 className="text-[18px] font-semibold">
    Welcome, {user?.fullName?.split(" ")[0] || "User"}!</h4>
          <p className="text-[12px] font-light ">Lorem ipsum Lorem</p>
        </div>
        <img src="/images/paw_icon_green_main page.png" alt="Paw Icon" className="w-16 h-16" />
      </div>

      <ul>
        {menuItems.map((item) => (
          <li key={item.path} className="mb-1">
            <Link
              to={`/account/${item.path}`}
              className={`block px-6 py-6 rounded-[13px] flex justify-between items-center 
                transition duration-300 ${
                location.pathname.endsWith(item.path)
                  ? "bg-[#FAFAF5]"
                  : "hover:bg-[#FAFAF5] text-dark"
              }`}
            >
              <span>{item.name}</span>
              <img src="/images/Arrow.svg" alt="Arrow Icon" className="w-6 h-6" />
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <button className="block px-6 mt-40 py-4 text-[#FF6B6B] font-medium hover:underline transition">
          Log out
        </button>
      </div>
    </aside>
  );
}
