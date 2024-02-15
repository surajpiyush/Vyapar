import React, { useState } from "react";
import Logo from "../../assets/Shop.svg";
import { IoMdRefresh } from "react-icons/io";
import "./Navbar.css";
import NavbarToggle from "./Navbartoggle"

const Navbar = () => {

  const [toggleNav, setToggleNav] = useState(false);

  const handleCloseToogle = () => {
    if(toggleNav) {
      setToggleNav(false);
    }
  }

  return (
    <nav className="nav-nav" onClick={handleCloseToogle} >
      <ul className="nav-ul">
        <li className="nav-li">
          <img className="nav-li-img" src={Logo} alt="Logo" />
        </li>
        <li className="nav-li company-nav-item" onClick={() => setToggleNav(!toggleNav)} >
          <div>
          Company
          </div>
          {toggleNav && (
            <NavbarToggle closeTooglenav={handleCloseToogle} />
          )}
          </li>
        <li className="nav-li">Help</li>
        <li className="nav-li">Shotcuts</li>
        <li className="nav-li">
          <IoMdRefresh />
        </li>
      </ul>

    </nav>
  );
};

export default Navbar;
