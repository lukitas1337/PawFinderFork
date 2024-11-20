import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const menuItems = [
    { name: "My favorites", path: "favorites" },
    { name: "My recommendations", path: "recommendations" },
    { name: "My applications", path: "applications" },
    { name: "My adds", path: "adds" },
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


function PageContent({ title, children }) {
  return (
    <main className="flex-1 p-14 -mt-16">
      <h1 className="text-[30px] font-black">{title}</h1>
      {children}
    </main>
  );
}

function Favorites() {
  return <PageContent title="MY FAVORITES"><p>Here are your favorite pets.</p></PageContent>;
}

function Recommendations() {
  return <PageContent title="MY RECOMMENDATIONS"><p>Recommendations for you.</p></PageContent>;
}

function Applications() {
  return (
    <PageContent title="MY APPLICATIONS">
      <p>You don’t have any new applications yet.</p>
      <button className="mt-10 bg-dark text-white text-[14px] w-full max-w-[200px] py-4 font-medium rounded-full hover:bg-[#8D9F19] transition">
        Choose a pet
      </button>
    </PageContent>
  );
}

function Adds() {
  return <PageContent title="MY ADDS"><p>You don’t have any active adds yet.</p></PageContent>;
}


export default function PersonalAccount() {
  const location = useLocation();

  
  const validPaths = ["/account", "/account/favorites", "/account/recommendations", "/account/applications", "/account/adds"];
  const isValidPath = validPaths.some((path) => location.pathname.startsWith(path));

  
  if (!isValidPath) {
    return <Navigate to="/account/applications" />;
  }

  return (
    <div className="bg-[#FAFAF5] min-h-screen flex flex-col justify-between">
      <div className="flex flex-col h-[650px] px-[200px] mt-20">
        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar />
        
          <Routes>
            <Route path="/" element={<Applications />} /> 
            <Route path="favorites" element={<Favorites />} />
            <Route path="recommendations" element={<Recommendations />} />
            <Route path="applications" element={<Applications />} />
            <Route path="adds" element={<Adds />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
