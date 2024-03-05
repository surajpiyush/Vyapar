import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./sidebar.module.css";
import { FaSearch } from "react-icons/fa";

function Sidebar() {
   return (
      <section id={styles.menu}>
         <div className={styles.logo}>
            <h2>Settings</h2>
            <FaSearch />
         </div>
         <div className="items">
            <NavLink
               to="/setting"
               className={styles.navLink}
               activeClassName={styles.active}
            >
               GENERAL
            </NavLink>

            <NavLink
               to="/setting"
               className={styles.navLink}
               activeClassName={styles.active}
            >
               TRANSACTION
            </NavLink>

            <NavLink
               to="/print"
               className={styles.navLink}
               activeClassName={styles.active}
            >
               PRINT
            </NavLink>

            <NavLink
               to="/taxesgst"
               className={styles.navLink}
               activeClassName={styles.active}
            >
               TAXES & GST
            </NavLink>

            <NavLink
               to="/transaction-message"
               className={styles.navLink}
               activeClassName={styles.active}
            >
               TRANSACTION MESSAGE
            </NavLink>

            <NavLink
               to="/party"
               className={styles.navLink}
               activeClassName={styles.active}
            >
               PARTY
            </NavLink>

            <NavLink
               to="/item"
               className={styles.navLink}
               activeClassName={styles.active}
            >
               ITEM
            </NavLink>
         </div>
      </section>
   );
}

export default Sidebar;
