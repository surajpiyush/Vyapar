import css from "./Setting.module.css";
import General from "./General";
import Default from "./Default";
import TaxAndGst from "./TaxAndGst";

import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FaSearch as SearchIcon } from "react-icons/fa";

function Setting({ setToggleSetting }) {
  const navigate = useNavigate();
  const [activeSidebar, setActiveSidebar] = useState("");

  //   Sidebar click handler
  const handleSidebarClick = (clickedSidebar) => {
    setActiveSidebar(clickedSidebar);
  };

  return (
    <div className={css.Outer}>
      {/* Sidebar */}
      <section id={css.menu}>
        <div className={css.logo}>
          <h2>Settings</h2>
          <SearchIcon />
        </div>
        <div className="items">
          {SidebarOptions?.map((itemSidebar, indSidebar) => (
            <NavLink
              onClick={() => handleSidebarClick(itemSidebar?.name)}
              // to={itemSidebar?.to}
              className={css.navLink}
              activeClassName={css.active}
              key={indSidebar + itemSidebar?.name}
            >
              {itemSidebar?.name}
            </NavLink>
          ))}
        </div>
      </section>

      {/* Content Div */}
      <div className={css.contentOuterDiv}>
        <div style={{ textAlign: "end", padding: "5px", marginRight: "55px" }}>
          <i
            className="fa fa-close"
            style={{ padding: "15px", fontSize: "1.75rem" }}
            onClick={() => setToggleSetting(false)}
          ></i>
        </div>

        {/* Sections */}
        {activeSidebar == "" && <Default />}
        {activeSidebar == "GENERAL" && <General />}
        {activeSidebar == "TRANSACTION" && (
          <div>TRANSACTION Under Development</div>
        )}
        {activeSidebar == "PRINT" && <div>PRINT Under Development</div>}
        {activeSidebar == "TAXES & GST" && <TaxAndGst />}
        {activeSidebar == "USER MANAGEMENT" && (
          <div>USER MANAGEMENT Under Development</div>
        )}
        {activeSidebar == "TRANSACTION MESSAGE" && (
          <div>TRANSACTION MESSAGE Under Development</div>
        )}
        {activeSidebar == "PARTY" && <div>PARTY Under Development</div>}
        {activeSidebar == "ITEM" && <div>ITEM Under Development</div>}
      </div>
    </div>
  );
}

export default Setting;

// Sidebar Options Array
const SidebarOptions = [
  {
    name: "GENERAL",
    to: "/general ",
  },
  {
    name: "TRANSACTION",
    to: "/setting",
  },
  {
    name: "PRINT",
    to: "/print",
  },
  {
    name: "TAXES & GST",
    to: "/taxesgst",
  },
  {
    name: "USER MANAGEMENT",
    to: "/transaction-message",
  },
  {
    name: "TRANSACTION MESSAGE",
    to: "/transaction-message",
  },
  {
    name: "PARTY",
    to: "/party",
  },
  {
    name: "ITEM",
    to: "/item",
  },
];
