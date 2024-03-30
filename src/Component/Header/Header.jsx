import css from "./Header.module.css";
import Setting from "../Setting/Setting";
import {
  CrossIcon,
  PlusIcon2,
  SearchIcon,
  SettingsIconFilled,
} from "../../assets/Icons/ReactIcons";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const toast = useToast();
  const navigate = useNavigate();
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
                  if (item === "Add Sale") navigate("/invoices");
                  else if (item === "Add Purchase") navigate("/purchasebill");
                  else if (item === "Add More")
                    toast({
                      title: "Feature currently in development",
                      status: "info",
                      position: "top",
                    });
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
