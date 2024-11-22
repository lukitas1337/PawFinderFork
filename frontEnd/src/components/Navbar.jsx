import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <header className="header flex justify-between  px-[4rem] py-10 items-center">
      <figure className="logo w-[16rem]">
        <Link to="/">
          <img src="/images/LogoBlack.png" alt="logo" />
        </Link>
      </figure>
      <nav className="relative navbar text-[1.6rem] font-semibold">
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            <RxHamburgerMenu />
          </button>
        </div>
        <ul className="navbar-list hidden lg:flex justify-between  gap-[3.5rem]">
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="/pets">Find a pet</Link>
          </li>
          <li>
            <Link to="">Get involved</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        {isMenuOpen && (
          <ul className="navbar-list flex flex-col lg:hidden justify-between  gap-[1rem] absolute left-0 w-[12rem]">
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="">Find a pet</Link>
            </li>
            <li>
              <Link to="">Get involved</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        )}
      </nav>
      <div className="flex justify-between gap-[3.5rem] text-[1.6rem] font-semibold items-center">
        <Link to="/login" className="login">
          Login
        </Link>
        <Link
          to="/register"
          className="btn signup bg-dark px-[3rem] py-[5px] text-white rounded-[2.5rem]"
        >
          Sign up
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
