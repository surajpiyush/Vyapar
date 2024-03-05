import React, { useState } from "react";
import { TbNotes } from "react-icons/tb";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { BiUpArrowAlt } from "react-icons/bi";
import styles from "./Purchase.module.css";

const Purchase = () => {
   const [isMonthModelOpen, setIsMonthModelOpen] = useState(false);

   return (
      <div className={styles.purchaseContainer}>
         <section className={styles.purchaseHeading}>
            <aside className={styles.purchaseHeadingAside1}>
               <div>
                  <TbNotes className={styles.purchaseHeadingNotes} />
                  <h4>Sale</h4>
               </div>
               <div className={styles.purchaseAmountDiv}>
                  <FaRupeeSign />
                  <h3>00</h3>
                  <span>.00</span>
               </div>
            </aside>
            <aside className={styles.purchaseHeadingAside2}>
               <div className={styles.purchaseMonthDiv}>
                  <button>This Month</button>
                  {isMonthModelOpen ? <FaCaretUp /> : <FaCaretDown />}
               </div>
            </aside>
         </section>
         <section className={styles.purchaseContent}>
            <aside className={styles.purchaseContentAside2}>
               <div className={styles.purchaseLine}></div>
               <p className={styles.purchaseReport}>
                  Report: From 01 to 29 Feb
               </p>
            </aside>
         </section>
      </div>
   );
};

export default Purchase;
