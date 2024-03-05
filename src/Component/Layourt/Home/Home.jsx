import React from "react";
import styles from "./Home.module.css";
import Sale from "./Sale/Sale";
import Purchase from "./Purchase/Purchase";
import Bottomitems from "./Bottomitems/Bottomitems";

const Home = () => {
   return (
      <div className={styles.homeContainer}>
         <div className={styles.homeContainerDiv1}>
            <Sale />
            <Purchase />
         </div>
         <div className={styles.homeContainerDiv2}>
            <Bottomitems />
         </div>
      </div>
   );
};

export default Home;
