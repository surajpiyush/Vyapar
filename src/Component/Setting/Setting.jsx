import css from "./Setting.module.css";
import General from "./General";
import Print from "./Print/Print";
import TaxAndGst from "./TaxAndGst";
import Transaction from "./Transaction";
import ItemSetting from "./ItemSetting";
import PartySetting from "./PartySetting";
import { ignoreRoutes } from "../../App";
import { CloseIcon2, SearchIcon2 } from "../../assets/Icons/ReactIcons";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Setting({ setToggleSetting }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSidebar, setActiveSidebar] = useState("GENERAL");

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
          <h3 >Settings</h3>
          <SearchIcon2 />
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
          <CloseIcon2 onClick={() => setToggleSetting(false)} />
        </div>

        {/* Sections */}
        {activeSidebar == "GENERAL" && <General />}
        {activeSidebar == "TRANSACTION" && <Transaction />}
        {activeSidebar == "PRINT" && <Print />}
        {activeSidebar == "TAXES & GST" && <TaxAndGst />}
        {activeSidebar == "USER MANAGEMENT" && (
          <div>USER MANAGEMENT Under Development</div>
        )}
        {/* {activeSidebar == "TRANSACTION MESSAGE" && (
          <div>TRANSACTION MESSAGE Under Development</div>
        )} */}
        {activeSidebar == "PARTY" && <PartySetting />}
        {activeSidebar == "ITEM" && <ItemSetting />}
      </div>
    </div>
  );
}

export default Setting;

// Sidebar Options Array
const SidebarOptions = [
  {
    name: "GENERAL",
  },
  {
    name: "TRANSACTION",
  },
  {
    name: "PRINT",
  },
  {
    name: "TAXES & GST",
  },
  {
    name: "USER MANAGEMENT",
  },
  // {
  //   name: "TRANSACTION MESSAGE",
  // },
  {
    name: "PARTY",
  },
  {
    name: "ITEM",
  },
];
