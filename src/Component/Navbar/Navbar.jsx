import "./Navbar.css";
import Logo from "../../assets/Shop.svg";
import NavbarToggle from "./Navbartoggle";

import { useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { USER_DETAILS } from "../../Redux/business/actionTypes";

const Navbar = () => {
  const navigate = useNavigate();
  const [toggleNav, setToggleNav] = useState(false);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem(USER_DETAILS);
    alert("Logout Successfull");
    navigate("/auth");
  };

  const handleCloseToogle = () => {
    if (toggleNav) {
      setToggleNav(false);
    }
  };

  return (
    <nav className="nav-nav" onClick={handleCloseToogle}>
      <ul className="nav-ul">
        <li className="nav-li">
          <img className="nav-li-img" src={Logo} alt="Logo" />
        </li>
        <li
          className="nav-li company-nav-item"
          onClick={() => setToggleNav(!toggleNav)}
        >
          <div>Company</div>
          {toggleNav && <NavbarToggle closeTooglenav={handleCloseToogle} />}
        </li>
        <li className="nav-li">Help</li>
        <li className="nav-li">Shotcuts</li>
        <li className="nav-li" onClick={handleLogout}>
          Logout
        </li>
        <li className="nav-li">
          <IoMdRefresh />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
