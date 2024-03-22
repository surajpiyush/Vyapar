import css from "./Header.module.css";
import Setting from "../Setting/Setting";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { RxCross2 as CrossIcon } from "react-icons/rx";
import { IoIosSearch as SearchIcon } from "react-icons/io";
import { IoSettingsSharp as SettingIcon } from "react-icons/io5";
import { BsFillPlusCircleFill as PlusIcon } from "react-icons/bs";

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
                <PlusIcon /> {item}
              </button>
            </div>
          ))}
        </div>

        <div className={css.lastBtnDivOuter}>
          <SettingIcon onClick={() => setToggleSetting(true)} />
        </div>
      </div>
    </div>
  );
};

export default Header;
