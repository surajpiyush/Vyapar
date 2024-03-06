import party from "../../../assets/Images/party.jpg";
import FirstTimeFormToggle from "../../FirmTimeForm/FirstTimeFormToggle";
import { getPurchaseReturn } from "../../../Redux/purchase/action";
import {
  DotsIcon,
  FilterIcon,
  PrinterIcon,
  ShareIcon,
} from "../../utils/reactIcons";

import { useEffect } from "react";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";

const Purchasereturn = ({ func, date }) => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.PurchaseReducer);
  const data = store?.purchaseReturnData;

  // console.log(store)
  useEffect(() => {
    dispatch(getPurchaseReturn({ date }));
  }, [dispatch]);

  const openForm = () => {
    func(true);
  };
  console.log(data);
  return (
    <>
      {!store.isLoading && !data.length ? (
        <FirstTimeFormToggle
          img={party}
          onClick={() => {
            openForm();
          }}
          BtnText="Make Your First Purchase Return Order "
          MiddleText="No data is available for Debit-Note .
               Please try again after making relevant changes."
        />
      ) : (
        <div className="payment-out-container">
          <div className="transactions-buttons">
            <input type="text" />
            <button onClick={() => openForm()}>
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
                    </th>
                    <th className="table-h">
                      <div className="table-items">
                        {new Date(e.billDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </div>
                    </th>

                    <th className="table-h">
                      <div className="table-items">{e.returnNumber}</div>
                    </th>
                    <th className="table-h">
                      <div className="table-items">
                        {e?.partyData?.partyName}
                      </div>
                    </th>
                    <th className="table-h">
                      <div className="table-items">{e.categoryName}</div>
                    </th>
                    <th className="table-h">
                      <div className="table-items">{e.type}</div>
                    </th>
                    <th className="table-h">
                      <div className="table-items">
                        ₹{e.total ? e.total : e.balanceDue}
                      </div>
                    </th>
                    <th className="table-h">
                      <div className="table-items">₹{e.balanceDue}</div>
                    </th>
                    <th className="table-h">
                      <div className="table-items">₹{e.amount}</div>
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
        </div>
      )}
    </>
  );
};

export default Purchasereturn;
