import React, { useState } from 'react';
import styles from "./Sale.module.css";
import { TbNotes } from "react-icons/tb";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { BiUpArrowAlt } from "react-icons/bi";

const Sale = () => {
    const [isMonthModelOpen, setIsMonthModelOpen] = useState(false);

    return (
        <div className={styles.SaleContainer}>
            <section className={styles.SaleHeading}>
                <aside className={styles.SaleHeadingAside1}>
                    <TbNotes className={styles.SaleHeadingNotes}/>
                    <h4>Sale</h4>
                </aside>
                <aside className={styles.SaleHeadingAside2}>
                    <div className={styles.SaleMonthDiv}>
                        <button>This Month</button>
                        {isMonthModelOpen ? <FaCaretUp/> : <FaCaretDown/> }
                    </div>
                </aside>
            </section>
            <section className={styles.SaleContent}>
                <aside className={styles.SaleContentAside1}>
                    <div>
                        <div className={styles.SaleAmountDiv}>
                            <FaRupeeSign/>
                            <h3>00</h3>
                            <span>.00</span>
                        </div>
                        <p className={styles.SaleAmountText}>Total Sale (Feb)</p>
                    </div>
                    <div className={styles.SaleGrowthData}>
                        <div>
                            <BiUpArrowAlt className={styles.SaleTopArrowIcon}/>
                            <p className={styles.SaleGrowthDataPercent}>0 %</p>
                        </div>
                        <p className={styles.SaleGrowthText}>
                            This Month Growth
                        </p>
                    </div>
                </aside>
                <aside className={styles.SaleContentAside2}>
                    <div className={styles.SaleLine}></div>
                    <p className={styles.SaleReport}>Report: From 01 to 29 Feb</p>
                </aside>
            </section>
        </div>
    );
}

export default Sale;
