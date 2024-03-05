import React, { useState } from "react";
import styles from "./Bottomitems.module.css";
import { FaCaretDown, FaCaretUp, FaRupeeSign } from "react-icons/fa";
import { BiUpArrowAlt } from "react-icons/bi";
import { IoStatsChart } from "react-icons/io5";

const bottomcarditems = [
   {
      Icon: <FaCaretDown />,
      heading: "You'll Receive",
      paragraph: "You don't have any pending amount to be received",
   },
   {
      Icon: <FaCaretUp />,
      heading: "You'll Pay",
      paragraph: "You don't have to pay any amount",
   },
   {
      Icon: <IoStatsChart />,
      heading: "Purchase",
      paragraph: "You have no purchased items entered for selected items",
   },
];

const Bottomitems = () => {
   const [isMonthModelOpen, setIsMonthModelOpen] = useState(false);

   return (
      <div className={styles.bottomItemsContainer}>
         {bottomcarditems.map((item, index) => (
            <div
               key={index}
               className={styles.bottomItemContainer}
            >
               <div>
                  <div className={styles.bottomItemDiv2}>
                     <div>{item.Icon}</div>
                     <h3>{item.heading}</h3>
                  </div>
                  <div className={styles.bottomAmountDiv}>
                     <div className={styles.bottomAmountDiv}>
                        <FaRupeeSign />
                        <h3>00</h3>
                        <span>.00</span>
                     </div>
                  </div>
               </div>
               <div className={styles.bottomItemDiv4}>
                  <p>{item.paragraph}</p>
               </div>
            </div>
         ))}
      </div>
   );
};

export default Bottomitems;
