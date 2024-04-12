import css from "./Header.module.css";
import Setting from "../Setting/Setting";
import {
  CrossIcon,
  PlusIcon2,
  SearchIcon,
  SettingsIconFilled,
} from "../../assets/Icons/ReactIcons";

import { toast } from "react-toastify";
import { useState } from "react";
import { redirect } from "react-router-dom";

const Header = () => {
  const [searchInp, setSearchInp] = useState("");
  const [toggleSetting, setToggleSetting] = useState(false);

  return (
    <div className={css.HeaderContainer}>
      {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

      {/* Left Side Header Items */}
      <div className={css.leftSideCont}>
        <SearchIcon className={css.searchIconCss} />
        <input
          type="text"
          name="searchBox"
          value={searchInp}
          onChange={(e) => setSearchInp(e.target.value)}
          placeholder="Search Transactions"
          className={css.headerSearchInp}
        />
        {searchInp && (
          <CrossIcon
            onClick={() => setSearchInp("")}
            className={css.crossIconCss}
          />
        )}
      </div>

      {/* Right Side Header Items */}
      <div className={css.rightSideCont}>
        <div className={css.rightSideRouteBtnsDiv}>
          {["Add Sale", "Add Purchase", "Add More"]?.map((item) => (
            <div key={item}>
              <button
                type="button"
                onClick={() => {
                  if (item === "Add Sale") redirect("/invoices");
                  else if (item === "Add Purchase") redirect("/purchasebill");
                  else if (item === "Add More") {
                    toast.info("Feature currently in development", {
                      position: "top-center",
                    });
                  }
                }}
              >
                <PlusIcon2 /> {item}
              </button>
            </div>
          ))}
        </div>

        <div className={css.lastBtnDivOuter}>
          <SettingsIconFilled onClick={() => setToggleSetting(true)} />
        </div>
      </div>
    </div>
  );
};

export default Header;
