import "./Paymentouts.css";
import party from "../../../assets/Images/party.jpg";
import FirstTimeFormToggle from "../../FirmTimeForm/FirstTimeFormToggle";
import { getPaymentOutBill } from "../../../Redux/purchase/action";
import {
  DotsIcon,
  FilterIcon,
  PrinterIcon,
  ShareIcon,
} from "../../utils/reactIcons";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";

const Paymentouts = ({ func, date }) => {
  const dispatch = useDispatch();

  const store = useSelector((store) => store.PurchaseReducer);
  const data = store.paymentOutData;
  // console.log(store);
  //  console.log(date)
  // console.log(store);
  useEffect(() => {
    dispatch(getPaymentOutBill({ date }));
  }, [date]);
  // console.log(data)

  const openForm = () => {
    func(true);
  };
  return (
    <>
      {!store.isLoading && !data.length ? (
        <FirstTimeFormToggle
          img={party}
          onClick={() => {
            openForm();
          }}
          BtnText="Make Your First Payment-Out Order "
          MiddleText="No data is available for Payment-Out.
               Please try again after making relevant changes."
        />
      ) : (
        <div className="payment-out-container">
          <div className="transactions-buttons">
            {/* <input type="text" /> */}
            <button
              onClick={() => {
                openForm();
              }}
            >
              <span>+</span> Add Payment-out
            </button>
          </div>

          <table className="table">
            <thead className="table-head">
              <tr className="tabel-row">
                <th className="table-h">
                  <div className="table-items">#</div>
                  <div></div>
                </th>
                <th className="table-h">
                  <div className="table-items">Date</div>
                  <FilterIcon />
                </th>
                <th className="table-h">
                  <div className="table-items">Ref No.</div>
                  <FilterIcon />
                </th>
                <th className="table-h">
                  <div className="table-items">PartyName</div>
                  <FilterIcon />
                </th>
                <th className="table-h">
                  <div className="table-items">CategoryName</div>
                  <FilterIcon />
                </th>
                <th className="table-h">
                  <div className="table-items">Type</div>
                  <FilterIcon />
                </th>
                <th className="table-h">
                  <div className="table-items">Total</div>
                  <FilterIcon />
                </th>
                <th className="table-h">
                  <div className="table-items">Recevied</div>
                  <FilterIcon />
                </th>
                <th className="table-h">
                  <div className="table-items">Balance</div>
                  <FilterIcon />
                </th>
                <th className="table-h">
                  <div className="table-items">Print</div>
                  <FilterIcon />
                </th>
              </tr>
            </thead>
            {store.isLoading ? (
              <BasicSpinner
                style={{
                  width: "100%",
                  margin: "60px auto",
                  fontSize: "30px",
                }}
              />
            ) : (
              <tbody>
                {data?.map((e, i) => (
                  <tr className="tabel-row tale-data">
                    <th className="table-h">
                      <div className="table-items">{i + 1}</div>
                      <div></div>
                    </th>
                    <th className="table-h">
                      <div className="table-items">
                        {new Date(e.date).toLocaleDateString()}
                      </div>
                    </th>
                    <th className="table-h">
                      <div className="table-items">{e.refNo}</div>
                    </th>
                    <th className="table-h">
                      <div className="table-items">
                        {e?.partyData?.partyName}
                      </div>
                    </th>
                    <th className="table-h">
                      <div className="table-items">
                        {e.categotyName ? e.categotyName : "-"}
                      </div>
                    </th>
                    <th className="table-h">
                      <div className="table-items">{e.type}</div>
                    </th>
                    <th className="table-h">
                      <div className="table-items">₹{e.total}</div>
                    </th>
                    <th className="table-h">
                      <div className="table-items">₹{e.paid}</div>
                    </th>
                    <th className="table-h">
                      <div className="table-items">₹{e.balance}</div>
                    </th>
                    <th className="table-h">
                      <div className="table-items">
                        <PrinterIcon onClick={() => window.print()} />
                        <ShareIcon />
                        <DotsIcon />
                      </div>
                    </th>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          <div className="payment-outs-footer">
            <p>
              Total Amount: <span>₹ 0.00</span>
            </p>
            <p>Balance: ₹0.00</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Paymentouts;
