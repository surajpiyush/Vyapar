import "./Transactions.css";
import party from "../../../assets/Images/party.jpg";
import FirstTimeFormToggle from "../../FirmTimeForm/FirstTimeFormToggle";
import {
  deletePurchaseBill,
  getPurchaseBill,
  updatePurchaseBill,
} from "../../../Redux/purchase/action";
import {
  DotsIcon,
  FilterIcon,
  PrinterIcon,
  ShareIcon,
  DeleteIcon,
} from "../../utils/reactIcons";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";

const transactionFilterItems = [
  {
    name: "DATE",
    Icon: <FilterIcon />,
    //   nestedItems
  },
];

const Transactions = ({ func, date }) => {
  const openForm = () => {
    func(true);
  };
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.PurchaseReducer.isLoading);
  const showAllPurchaseBills = useSelector((store)=>store.PurchaseReducer.purchaseBillData);
  console.log(showAllPurchaseBills);

  //console.log(date);
  useEffect(() => {
    dispatch(getPurchaseBill({ date }));
  }, [date, dispatch]);

  // delete 
  const handleDelete = (id) => {
    dispatch(deletePurchaseBill(id));
  };


  const handelupadte = (e, data) => {
    data.billDate = "2024-02-29T00:00:00.000Z";
    // console.log(e);
    const id = e;
    // openForm()
    dispatch(updatePurchaseBill({ id, data }));
  };

  // console.log(showAllPurchaseBills);
  return (
    <>
      {!isLoading && !showAllPurchaseBills.length ? (
        <FirstTimeFormToggle
          img={party}
          onClick={() => openForm()}
          BtnText="Add Your First Purchase Invoice"
          MiddleText="Make Purchase invoices & Print or share with your customers directly via WhatsApp or Email."
        />
      ) : (
        <div className="transactions-container">
          <div className="transactions-buttons">
            <button onClick={() => openForm()}>
              <span>+</span> Add Purchase
            </button>
          </div>
          <section className="transaction-tables">
            <div className="transaction-table">
              <p>DATE</p>
              <FilterIcon />
            </div>
            <div className="transaction-table">
              <p>INVOICE NO.</p>
              <FilterIcon />
            </div>
            <div className="transaction-table">
              <p>PARTY NAME</p>
              <FilterIcon />
            </div>
            <div className="transaction-table">
              <p>PAYMENT TYPE</p>
              <FilterIcon />
            </div>
            <div className="transaction-table">
              <p>AMOUNT</p>
              <FilterIcon />
            </div>
            <div className="transaction-table">
              <p>BALANCE DUE</p>
              <FilterIcon />
            </div>
            <div className="transaction-table">
              <p>STATUS</p>
              <FilterIcon />
            </div>
            <div className="transaction-table">
              <p></p>
              <FilterIcon />
            </div>
            <div className="transaction-table">
              <p></p>
              <FilterIcon />
            </div>
          </section>

          {!isLoading && showAllPurchaseBills.length ? (
            showAllPurchaseBills?.map((e) => {
              return (
                <section className="transaction-tables">
                  <div className="transaction-table">
                    <p className="transaction-table ">
                      {" "}
                      {new Date(e.billDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="transaction-table">
                    <p className="transaction-table ">{e.invoice}</p>

                    {/* <p></p> */}
                  </div>
                  <div className="transaction-table">
                    <p className="transaction-table">
                      {e?.partyData?.partyName}
                    </p>
                  </div>
                  <div className="transaction-table">
                    <p className="transaction-table">Cash</p>
                  </div>
                  <div className="transaction-table">
                    <p className="transaction-table">{e.amount}</p>
                  </div>
                  <div className="transaction-table">
                    <p className="transaction-table">
                      {e.status == "Paid" ? 0 : e.amount}
                    </p>
                  </div>
                  <div className="transaction-table">
                    <p className="transaction-table">{e.status}</p>
                  </div>
                  <div className="transaction-table">
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <PrinterIcon onClick={() => window.print()} />{" "}
                      <ShareIcon />
                    </p>
                    {/* <FilterIcon/> */}
                  </div>
                  <div
                    className="transaction-table"
                    style={{ alignItem: "center" }}
                  >
                    <DeleteIcon onClick={() => handleDelete(e._id)} />
                    <DotsIcon
                      onClick={() => {
                        handelupadte(e._id, e);
                      }}
                    />
                  </div>
                </section>
              );
            })
          ) : (
            <BasicSpinner
              style={{
                width: "100%",
                margin: "60px auto",
                fontSize: "30px",
              }}
            />
          )}
        </div>
      )}{" "}
    </>
  );
};

export default Transactions;
