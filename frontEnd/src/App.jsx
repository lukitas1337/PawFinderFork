import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Pets from "./pages/Pets";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Adoption from "./pages/Adoption";
import PersonalAccount from "./pages/PersonalAccount";
import AppLayout from "./components/AppLayout";
import Pet from "./pages/Pet";
// import Cat from "./pages/Cat";
import Registration from "./pages/Registration";
import { UserAuthProvider } from "./contexts/UserAuthContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";

function App() {
  return (
    <UserAuthProvider>
      <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/pets/:id" element={<Pet />} />
            {/* <Route path="/cats/:id" element={<Cat />} /> */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/adoption" element={<Adoption />} />
            <Route path="/account/*" element={<PersonalAccount />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </FavoritesProvider>
    </UserAuthProvider>
  );
}

export default App;
