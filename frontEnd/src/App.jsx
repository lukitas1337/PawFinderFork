import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";

import Pets from "./pages/Pets";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Adoption from "./pages/Adoption";
import PersonalAccount from "./pages/PersonalAccount";
import AppLayout from "./components/AppLayout";
import Pet from "./pages/Pet";
import Registration from "./pages/Registration";
import { UserAuthProvider } from "./contexts/UserAuthContext";
import AccountMyFavorites from "./components/AccountMyFavorites";
import AccountMyRecommendations from "./components/AccountMyRecommendations";
import AccountMyApplications from "./components/AccountMyApplications";

function App() {
  return (
    <UserAuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/pets/:id" element={<Pet />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/adoption" element={<Adoption />} />
            <Route path="/account" element={<PersonalAccount />}>
              <Route index element={<Navigate to="favorites" />} />
                <Route path="favorites" element={<AccountMyFavorites />} />
                <Route path="recommendations" element={<AccountMyRecommendations />} />
                <Route path="applications" element={<AccountMyApplications />} />
              </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserAuthProvider>
  );
}

export default App;
