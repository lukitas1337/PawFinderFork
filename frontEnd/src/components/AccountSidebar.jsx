import React from "react";
import { useLocation } from "react-router-dom";

export default function AccountSidebar() {
  const location = useLocation();
  const menuItems = [
    { name: "My favorites", path: "favorites" },
    { name: "My recommendations", path: "recommendations" },
    { name: "My applications", path: "applications" },
  ];

  return (
    <aside className="w-[270px] bg-[#E7E7D6] text-[16px] font-medium p-8 py-20 rounded-[30px] flex flex-col justify-between">
      <ul>
        {menuItems.map((item) => (
          <li key={item.path}>
            <a
              href={`/account/${item.path}`}
              className={`block px-6 py-6 rounded-lg transition duration-300 ${
                location.pathname.endsWith(item.path)
                  ? "bg-[#FAFAF5] font-bold"
                  : "hover:bg-[#FAFAF5] text-dark"
              }`}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <button className="block px-6 py-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition">
          Log out
        </button>
      </div>
    </aside>
  );
}
