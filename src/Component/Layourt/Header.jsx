import styles from "./Header.module.css";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchInp, setSearchInp] = useState("");

  return (
    <div className={styles.HeaderContainer}>
      <section className={styles.HeaderSearchSection}>
        <input
          onChange={(e) => setSearchInp(e.target.value)}
          type="text"
          name="searchbox"
          className={`${styles.HeaderSearchbar} ${styles.HeaderSearchbarFocus}`}
          placeholder="Enter Business Name"
        />
        <button className={`${styles.HeaderSearchBtn} ${styles.HeaderSearchBtnHide}`}>
          Save
        </button>
      </section>
      <section className={styles.HeaderButtonSection}>
        <aside className={styles.HeaderBtnAside}>
          {["Add Sale", "Add Purchase", "Add More"].map((items, index) => (
            <div
              className={`${styles.HeaderBtnDiv} ${styles.HeaderAddBtn} ${
                items === "Add Sale" && styles.HeaderAddSaleBtn
              } ${items === "Add Purchase" && styles.HeaderAddPurchaseBtn} ${
                items === "Add More" && styles.HeaderAddMoreBtn
              }`}
              key={index}
            >
              <FaPlus
                className={`${styles.HeaderPlusBtn} ${
                  items === "Add Sale" && styles.HeaderPlusBtnSale
                } ${items === "Add Purchase" && styles.HeaderPlusBtnPurchase} ${
                  items === "Add More" && styles.HeaderPlusBtnMore
                }`}
              />
              <p>{items}</p>
            </div>
          ))}
        </aside>
        <div className={styles.HeaderLine}></div>
        <MdSettings
          onClick={() =>
            navigate("/setting", {
              state: { redirectTo: location.pathname },
              replace: true,
            })
          }
          className={styles.HeadeSetting}
        />
      </section>
    </div>
  );
};

export default Header;
