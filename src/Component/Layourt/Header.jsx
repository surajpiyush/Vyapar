import styles from "./Header.module.css";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Setting from "../Setting/Setting";
import { useToast } from "@chakra-ui/react";

const Header = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const [searchInp, setSearchInp] = useState("");
   const [toggleSetting, setToggleSetting] = useState(false);
   const toast = useToast();
   return (
      <div className={styles.HeaderContainer}>
         {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

         <section className={styles.HeaderSearchSection}>
            <input
               onChange={(e) => setSearchInp(e.target.value)}
               type="text"
               name="searchbox"
               className={`${styles.HeaderSearchbar} ${styles.HeaderSearchbarFocus}`}
               placeholder="Enter Business Name"
            />
            <button
               className={`${styles.HeaderSearchBtn} ${styles.HeaderSearchBtnHide}`}
            >
               Save
            </button>
         </section>
         <section className={styles.HeaderButtonSection}>
            <aside className={styles.HeaderBtnAside}>
               {["Add Sale", "Add Purchase", "Add More"].map((items, index) => (
                  <div
                     className={`${styles.HeaderBtnDiv} ${
                        styles.HeaderAddBtn
                     } ${items === "Add Sale" && styles.HeaderAddSaleBtn} ${
                        items === "Add Purchase" && styles.HeaderAddPurchaseBtn
                     } ${items === "Add More" && styles.HeaderAddMoreBtn}`}
                     key={index}
                     onClick={() => {
                           if (items === "Add Sale") navigate("/invoices");
                           else if (items === "Add Purchase")
                              navigate("/purchasebill");
                           else if (items === "Add More")
                              toast({
                                 title: "Feature currently in development",
                                 status: "info",
                                 position: "top",
                              }); 
                        }}
                  >
                     <FaPlus
                        className={`${styles.HeaderPlusBtn} ${
                           items === "Add Sale" && styles.HeaderPlusBtnSale
                        } ${
                           items === "Add Purchase" &&
                           styles.HeaderPlusBtnPurchase
                        } ${items === "Add More" && styles.HeaderPlusBtnMore}`}
                      
                     />
                     <p style={{marginTop:"10px"}}>{items}</p>
                  </div>
               ))}
            </aside>
            <div className={styles.HeaderLine}></div>
            <MdSettings
               onClick={
                  () => setToggleSetting(true)
                  // navigate("/setting", {
                  //   state: { redirectTo: location.pathname },
                  //   replace: true,
                  // })
               }
               className={styles.HeadeSetting}
            />
         </section>
      </div>
   );
};

export default Header;
