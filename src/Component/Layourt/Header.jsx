import css from "./Header.module.css";
import Setting from "../Setting/Setting";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { MdSettings } from "react-icons/md";

const Header = () => {
  const navigate = useNavigate();
  const [searchInp, setSearchInp] = useState("");
  const [toggleSetting, setToggleSetting] = useState(false);
  const toast = useToast();
  return (
    <div className={css.HeaderContainer}>
      {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

      <section className={css.HeaderSearchSection}>
        <input
          onChange={(e) => setSearchInp(e.target.value)}
          type="text"
          name="searchbox"
          className={`${css.HeaderSearchbar} ${css.HeaderSearchbarFocus}`}
          placeholder="Enter Business Name"
        />
        <button className={`${css.HeaderSearchBtn} ${css.HeaderSearchBtnHide}`}>
          Save
        </button>
      </section>
      <section className={css.HeaderButtonSection}>
        <aside className={css.HeaderBtnAside}>
          {["Add Sale", "Add Purchase", "Add More"].map((items, index) => (
            <div
              className={`${css.HeaderBtnDiv} ${css.HeaderAddBtn} ${
                items === "Add Sale" && css.HeaderAddSaleBtn
              } ${items === "Add Purchase" && css.HeaderAddPurchaseBtn} ${
                items === "Add More" && css.HeaderAddMoreBtn
              }`}
              key={index}
              onClick={() => {
                if (items === "Add Sale") navigate("/invoices");
                else if (items === "Add Purchase") navigate("/purchasebill");
                else if (items === "Add More")
                  toast({
                    title: "Feature currently in development",
                    status: "info",
                    position: "top",
                  });
              }}
            >
              <FaPlus
                className={`${css.HeaderPlusBtn} ${
                  items === "Add Sale" && css.HeaderPlusBtnSale
                } ${items === "Add Purchase" && css.HeaderPlusBtnPurchase} ${
                  items === "Add More" && css.HeaderPlusBtnMore
                }`}
              />
              <p style={{ marginTop: "10px" }}>{items}</p>
            </div>
          ))}
        </aside>
        <div className={css.HeaderLine}></div>
        <MdSettings
          onClick={() => setToggleSetting(true)}
          className={css.HeadeSetting}
        />
      </section>
    </div>
  );
};

export default Header;
