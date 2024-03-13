import css from "./Setting.module.css";
import Print from "./Print";
import General from "./General";
import Default from "./Default";
import TaxAndGst from "./TaxAndGst";
import { ignoreRoutes } from "../../App";

import { useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { FaSearch as SearchIcon } from "react-icons/fa";
import { IoMdCloseCircle as CloseIcon } from "react-icons/io";
import ItemSetting from "./ItemSetting";
import PartySetting from "./PartySetting";

function Setting({ setToggleSetting }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSidebar, setActiveSidebar] = useState("");

  //   Sidebar click handler
  const handleSidebarClick = (clickedSidebar) => {
    setActiveSidebar(clickedSidebar);
  };

  // !ignoreRoutes.includes(location.pathname)
  return (
    <div className={css.Outer}>
      {/* Sidebar */}
      <div
        style={{
          paddingTop: !ignoreRoutes.includes(location.pathname)
            ? "25px"
            : "0px",
        }}
        className={css.SidebarOuterDiv}
      >
        <div className={css.searchIconDiv}>
          <h3 onClick={() => handleSidebarClick("")}>Settings</h3>
          <SearchIcon />
        </div>
        <div className={css.OptionsContSidebarDiv}>
          {SidebarOptions?.map((itemSidebar, indSidebar) => (
            <div
              onClick={() => handleSidebarClick(itemSidebar?.name)}
              className={
                activeSidebar == itemSidebar?.name
                  ? css.activeSidebarSection
                  : css.inActiveSidebarSection
              }
              key={indSidebar + itemSidebar?.name}
            >
              {itemSidebar?.name}
            </div>
          ))}
        </div>
      </div>

      {/* Content Div */}
      <div
        style={{
          padding: !ignoreRoutes.includes(location.pathname)
            ? "25px 40px 40px"
            : "0px 40px 40px",
        }}
        className={css.contentOuterDiv}
      >
        <div className={css.navContentOuterDiv}>
          <CloseIcon onClick={() => setToggleSetting(false)} />
        </div>

        {/* Sections */}
        {activeSidebar == "" && <Default />}
        {activeSidebar == "GENERAL" && <General />}
        {activeSidebar == "TRANSACTION" && (
          <div>TRANSACTION Under Development</div>
        )}
        {activeSidebar == "PRINT" && <Print />}
        {activeSidebar == "TAXES & GST" && <TaxAndGst />}
        {activeSidebar == "USER MANAGEMENT" && (
          <div>USER MANAGEMENT Under Development</div>
        )}
        {activeSidebar == "TRANSACTION MESSAGE" && (
          <div>TRANSACTION MESSAGE Under Development</div>
        )}
        {activeSidebar == "PARTY" && <PartySetting />}
        {activeSidebar == "ITEM" && <ItemSetting /> }
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
