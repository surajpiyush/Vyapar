import css from "./Home.module.css";
import Loader4 from "../../Component/Loaders/Loader4";
import { API_URL, USER_DETAILS } from "../../Redux/store";
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

import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../../Redux/business/action";

const Home = () => {
  const navigate = useNavigate();
  const [privacyToggle, setPrivacyToggle] = useState(false);
  const [isMonthModelOpenForSale, setIsMonthModelOpenForSale] = useState(false);
  const [isMonthModelOpenForPurchase, setIsMonthModelOpenForPurchase] =
    useState(false);
  const [isMonthModelOpenForBottomItems, setIsMonthModelOpenBottomItems] =
    useState(false);
  const [ismonthmodelopenForExpenses, setIsmonthmodelopenForExpenses] =
    useState(false);
  const [homeStates, setHomeStates] = useState({
    isLoading: false,
    isError: false,
    data: {},
  });

  // Fetch Home Data
  const FetchHomeData = async () => {
    setHomeStates((prev) => {
      return { ...prev, isLoading: true, isError: false };
    });
    const token = localStorage.getItem("token");
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWM1Y2ZjNTA5YjM0Y2E4YTAxODc0OTciLCJpYXQiOjE3MTI3NDE2NTAsImV4cCI6MTcxMjgyODA1MH0.ez_9ADGx3uKF1ivIFnKn7E2tm1zC9f0oixDtaT-jv-o";

    const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

    try {
      const response = await axios.get(`${API_URL}/${FirmId}/home-page`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // console.log("Fetch Home Data Response:", response);
      setHomeStates((prev) => {
        return { ...prev, isLoading: false, data: response?.data || {} };
      });
    } catch (error) {
      console.log("Error Fetching Home Data:", error);
      setHomeStates((prev) => {
        return { ...prev, isLoading: false, isError: true };
      });
      toast.dismiss();
      if (error?.response?.data?.tokenExpired) {
        LOGOUT(navigate, true)
        return toast.info("Session expired. Please log in again.");
      }
    }
  };

  useEffect(() => {
    FetchHomeData();
  }, []);

  return (
    <div className={css.homeOuter}>
      {homeStates?.isLoading && <Loader4 />}

      {/* Home.jsx */}
      <div className={css.leftSideOuter}>
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
                  <h3 className={css.bigAmountText}>
                    ₹ 00<span>.00</span>
                  </h3>
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

                <h3 className={css.mediumAmountText}>
                  ₹ 00<span>.00</span>
                </h3>
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
                  <h3 className={css.mediumAmountText}>
                    ₹ 00<span>.00</span>
                  </h3>
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
                <h3 className={css.mediumAmountText}>
                  ₹ 00<span>.00</span>
                </h3>
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
      <div className={css.rightSideOuter}>
        <div className={css.privacyDiv}>
          <h3>Privacy</h3>
          {privacyToggle ? (
            <CloseToggleIcon onClick={() => setPrivacyToggle(false)} />
          ) : (
            <OpenToggleIcon onClick={() => setPrivacyToggle(true)} />
          )}
        </div>
        <div className={css.stockInvItemContDiv}>
          <div className={css.stockInvDivOuter}>
            <h3>Stock Inventory</h3>
          </div>
          <div className={css.stockItemCardsOuterDiv}>
            <h4>Stock Value</h4>
            <h3>
              ₹ 00<span>.00</span>
            </h3>
          </div>
          <div className={css.stockItemCardsOuterDiv}>
            <h4>Low Stocks</h4>
            <p>None of your stocks has low value.</p>
          </div>
          <div className={css.stockInvDivOuter}>
            <h3>Cash & Banks</h3>
          </div>
          {["Bank Accounts", "Loan Amounts"].map((items, ind) => (
            <div className={css.stockItemCardsOuterDiv} key={ind + items}>
              <h4>{items}</h4>
              <h3>
                ₹ 00<span>.00</span>
              </h3>
            </div>
          ))}
          <div className={css.stockInvDivOuter}>
            <h3>Sale</h3>
          </div>
          {["Sale Orders", "Delivery Challan"].map((item, ind) => (
            <div className={css.stockItemCardsOuterDiv} key={ind + item}>
              <h4>{item}</h4>
              <div>
                <span>No. of Open Orders</span>
                <span>0</span>
              </div>
              <div>
                <span>Open sale Order Amount</span>
                <span>0</span>
              </div>
            </div>
          ))}
          <div className={css.stockInvDivOuter}>
            <h3>Purchase</h3>
          </div>
          <div className={css.stockItemCardsOuterDiv}>
            <h4>Purchase Orders</h4>
            <div>
              <span>No. of purchase Orders</span>
              <span>0</span>
            </div>
            <div>
              <span>Purchase Orders Amount</span>
              <span>0</span>
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
