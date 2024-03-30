import "./StockInventory.css";
import css from "./Home.module.css";
import {
  WalletIcon,
  RupeesIcon,
  DocumentIcon,
  UpArrowIcon2,
  ArrowUpFilledIcon,
  ArrowDownFilledIcon,
  CloseToggleIcon,
  OpenToggleIcon,
} from "../../assets/Icons/ReactIcons";

import { useState } from "react";

const Home = () => {
  const [privacyToggle, setPrivacyToggle] = useState(false);
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
                <DocumentIcon className={css.SaleHeadingNotes} />
                <h4>Sale</h4>
              </aside>
              <aside className={css.SaleHeadingAside2}>
                <div className={css.SaleMonthDiv}>
                  <button>This Month</button>
                  {isMonthModelOpenForSale ? (
                    <ArrowUpFilledIcon />
                  ) : (
                    <ArrowDownFilledIcon />
                  )}
                </div>
              </aside>
            </section>
            <section className={css.SaleContent}>
              <aside className={css.SaleContentAside1}>
                <div>
                  <div className={css.SaleAmountDiv}>
                    <RupeesIcon />
                    <h3>00</h3>
                    <span>.00</span>
                  </div>
                  <p className={css.SaleAmountText}>Total Sale (Feb)</p>
                </div>
                <div className={css.SaleGrowthData}>
                  <div>
                    <UpArrowIcon2 className={css.SaleTopArrowIcon} />
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
                  <WalletIcon className={css.expensesHeadingNotes} />
                  <h4>Expenses</h4>
                </div>

                <div className={css.expensesAmountDiv}>
                  <RupeesIcon />
                  <h3>00</h3>
                  <span>.00</span>
                </div>
                <aside className={css.expensesHeadingAside2}>
                  <div className={css.expensesMonthDiv}>
                    <button>
                      This Month{" "}
                      {ismonthmodelopenForExpenses ? (
                        <ArrowUpFilledIcon />
                      ) : (
                        <ArrowDownFilledIcon />
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

        {/* Bottomitems.jsx */}
        <div className={css.homeContainerDiv2}>
          {bottomcarditems.map((item, index) => (
            <div key={index} className={css.bottomItemContainer}>
              <div>
                <div className={css.bottomItemDiv2}>
                  <div>{item.Icon}</div>
                  <h3>{item.heading}</h3>
                </div>
                <div className={css.bottomAmountDiv}>
                  <div className={css.bottomAmountDiv}>
                    <RupeesIcon />
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
                  <DocumentIcon className={css.purchaseHeadingNotes} />
                  <h4>Purchase</h4>
                </div>
                <div className={css.purchaseAmountDiv}>
                  <RupeesIcon />
                  <h3>00</h3>
                  <span>.00</span>
                </div>
              </aside>
              <aside className={css.purchaseHeadingAside2}>
                <div className={css.purchaseMonthDiv}>
                  <button>This Month</button>
                  {isMonthModelOpenForPurchase ? (
                    <ArrowUpFilledIcon />
                  ) : (
                    <ArrowDownFilledIcon />
                  )}
                </div>
              </aside>
            </section>
            <section className={css.purchaseContent}>
              <aside className={css.purchaseContentAside2}>
                <div className={css.purchaseLine}></div>
                <p className={css.purchaseReport}>Report: From 01 to 29 Feb</p>
              </aside>
            </section>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className={css.appRightSidebar}>
        <div className={css.privacyDiv}>
          <h3>Privacy</h3>
          {privacyToggle ? (
            <CloseToggleIcon
              onClick={() => setPrivacyToggle(false)}
              id={css.closedToggleIconCss}
            />
          ) : (
            <OpenToggleIcon
              onClick={() => setPrivacyToggle(true)}
              id={css.openToggleIconCss}
            />
          )}
        </div>

        <div className={css.stockInvDivOuter}>
          <h3>Stock Inventory</h3>
        </div>
        <div className="stock-privacy-container">
          <div style={{ maxHeight: "70vh", overflow: "auto" }}>
            <section className="stock-stock-value-section">
              <h4>Stock Value</h4>
              <div className="purchase-amount-div">
                <RupeesIcon />
                <h3>00</h3>
                <span>.00</span>
              </div>
            </section>
            <section className="low-stocks-section">
              <h4>Low Stcoks</h4>
              <p>None of your stocks has low value</p>
            </section>
            <section className="cash-bank-section">
              <h4 className="stock-headers">Cash & Banks</h4>
              {["Bank Accounts", "Loan Amounts"].map((items, ind) => (
                <div className="cash-bank-card" key={ind}>
                  <h4>{items}</h4>
                  <div className="purchase-amount-div">
                    <RupeesIcon />
                    <h3>00</h3>
                    <span>.00</span>
                  </div>
                </div>
              ))}
            </section>
            <section className="stock-sale-section">
              <h4>Sale</h4>
              {["Sale Orders", "Delivery Challan"].map((item, ind) => (
                <div className="stock-sale-card" key={ind}>
                  <h4>{item}</h4>
                  <div>
                    <p>No. of Open Orders</p>
                    <p>0</p>
                  </div>
                  <div>
                    <p>Open sale Order Amount</p>
                    <p>0</p>
                  </div>
                </div>
              ))}
            </section>
            <div className="purchanse-stokc-orders">
              <h4 className="stock-headers">Purchase</h4>
              <section className="stock-purchase-orders-card">
                <h4>Purchase Orders</h4>
                <div>
                  <p>No. of purchase Orders</p>
                  <p>0</p>
                </div>
                <div>
                  <p>Purchase Orders Amount</p>
                  <p>0</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

const bottomcarditems = [
  {
    Icon: <ArrowDownFilledIcon />,
    heading: "You'll Receive",
    paragraph: "You don't have any pending amount to be received",
  },
  {
    Icon: <ArrowUpFilledIcon />,
    heading: "You'll Pay",
    paragraph: "You don't have to pay any amount",
  },
];
