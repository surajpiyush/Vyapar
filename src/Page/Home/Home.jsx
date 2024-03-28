import css from "./Home.module.css";
import Stockinventory from "../../Component/Stockinventory/Stockinventory";

import { useState } from "react";
import { TbNotes } from "react-icons/tb";
import { IoWallet } from "react-icons/io5";
import { BiUpArrowAlt } from "react-icons/bi";
import { IoStatsChart } from "react-icons/io5";
import { FaCaretDown, FaCaretUp, FaRupeeSign } from "react-icons/fa";

const Home = () => {
  const [isMonthModelOpenForSale, setIsMonthModelOpenForSale] = useState(false);
  const [isMonthModelOpenForPurchase, setIsMonthModelOpenForPurchase] =
    useState(false);
  const [isMonthModelOpenForBottomItems, setIsMonthModelOpenBottomItems] =
    useState(false);
  const [ismonthmodelopenForExpenses, setIsmonthmodelopenForExpenses] =
    useState(false);

  return (
    <div className={css.homeOuter}>
      {/* Home.jsx */}
      <div className={css.homeContainer}>
        <div className={css.homeContainerDiv1}>
          {/* Sale.jsx */}
          <div className={css.SaleContainer}>
            <section className={css.SaleHeading}>
              <aside className={css.SaleHeadingAside1}>
                <TbNotes className={css.SaleHeadingNotes} />
                <h4>Sale</h4>
              </aside>
              <aside className={css.SaleHeadingAside2}>
                <div className={css.SaleMonthDiv}>
                  <button>This Month</button>
                  {isMonthModelOpenForSale ? <FaCaretUp /> : <FaCaretDown />}
                </div>
              </aside>
            </section>
            <section className={css.SaleContent}>
              <aside className={css.SaleContentAside1}>
                <div>
                  <div className={css.SaleAmountDiv}>
                    <FaRupeeSign />
                    <h3>00</h3>
                    <span>.00</span>
                  </div>
                  <p className={css.SaleAmountText}>Total Sale (Feb)</p>
                </div>
                <div className={css.SaleGrowthData}>
                  <div>
                    <BiUpArrowAlt className={css.SaleTopArrowIcon} />
                    <p className={css.SaleGrowthDataPercent}>0 %</p>
                  </div>
                  <p className={css.SaleGrowthText}>This Month Growth</p>
                </div>
              </aside>
              <aside className={css.SaleContentAside2}>
                <div className={css.SaleLine}></div>
                <p className={css.SaleReport}>Report: From 01 to 29 Feb</p>
              </aside>
            </section>
          </div>

          {/* Expenses.jsx */}
          <div className={css.expensesContainer}>
            <section className={css.expensesHeading}>
              <aside className={css.expensesHeadingAside1}>
                <div>
                  <IoWallet className={css.expensesHeadingNotes} />
                  <h4>Expenses</h4>
                </div>

                <div className={css.expensesAmountDiv}>
                  <FaRupeeSign />
                  <h3>00</h3>
                  <span>.00</span>
                </div>
                <aside className={css.expensesHeadingAside2}>
                  <div className={css.expensesMonthDiv}>
                    <button>
                      This Month{" "}
                      {ismonthmodelopenForExpenses ? (
                        <FaCaretUp />
                      ) : (
                        <FaCaretDown />
                      )}
                    </button>
                  </div>
                </aside>
              </aside>
            </section>
            <section className={css.expensesContent}>
              <aside className={css.expensesContentAside2}>
                <div className={css.expensesLine}></div>
                <p className={css.expensesReport}>Report: From 01 to 29 Feb</p>
              </aside>
            </section>
          </div>
        </div>

        <div className={css.homeContainerDiv2}>
          {/* Bottomitems.jsx */}
          <div className={css.bottomItemsContainer}>
            {bottomcarditems.map((item, index) => (
              <div key={index} className={css.bottomItemContainer}>
                <div>
                  <div className={css.bottomItemDiv2}>
                    <div>{item.Icon}</div>
                    <h3>{item.heading}</h3>
                  </div>
                  <div className={css.bottomAmountDiv}>
                    <div className={css.bottomAmountDiv}>
                      <FaRupeeSign />
                      <h3>00</h3>
                      <span>.00</span>
                    </div>
                  </div>
                </div>
                <div className={css.bottomItemDiv4}>
                  <p>{item.paragraph}</p>
                </div>
              </div>
            ))}

            {/* Purchase.jsx */}
            <div className={css.purchaseContainer}>
              <section className={css.purchaseHeading}>
                <aside className={css.purchaseHeadingAside1}>
                  <div>
                    <TbNotes className={css.purchaseHeadingNotes} />
                    <h4>Purchase</h4>
                  </div>
                  <div className={css.purchaseAmountDiv}>
                    <FaRupeeSign />
                    <h3>00</h3>
                    <span>.00</span>
                  </div>
                </aside>
                <aside className={css.purchaseHeadingAside2}>
                  <div className={css.purchaseMonthDiv}>
                    <button>This Month</button>
                    {isMonthModelOpenForPurchase ? (
                      <FaCaretUp />
                    ) : (
                      <FaCaretDown />
                    )}
                  </div>
                </aside>
              </section>
              <section className={css.purchaseContent}>
                <aside className={css.purchaseContentAside2}>
                  <div className={css.purchaseLine}></div>
                  <p className={css.purchaseReport}>
                    Report: From 01 to 29 Feb
                  </p>
                </aside>
              </section>
            </div>
          </div>
        </div>
      </div>

      <div className={css.appRightSidebar}>
        <Stockinventory />
      </div>
    </div>
  );
};

export default Home;

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
];
