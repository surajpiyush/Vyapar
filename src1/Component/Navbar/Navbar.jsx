import "./Navbar.css";
import Logo from "../../assets/Shop.svg";
import NavbarToggle from "./Navbartoggle";

import { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";

const Navbar = () => {
  const [toggleNav, setToggleNav] = useState(false);

  const handleCloseToogle = () => {
    if (toggleNav) {
      setToggleNav(false);
    }
  };

  useEffect(() => {
    const Auth = localStorage.getItem;
    console.log();
  }, []);

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
        <li className="nav-li">
          <IoMdRefresh />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
