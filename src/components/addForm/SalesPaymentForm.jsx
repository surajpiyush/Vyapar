import "../../styles/sales.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostSalesPayment } from "../../Redux/sales/action";
import { FetchAllParties } from "../../Redux/parties/actions";

export default function SalesPaymentForm(Props) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const partiesLoading = useSelector((state) => state.PartiesReducer.isLoading);
  const partiesData = useSelector((state) => state.PartiesReducer.partiesData);

  const [paymentData, setPaymentData] = useState({
    type: "Payment-In",
    status: "Received",
    party: "Bhuvensh",
    receiptNo: 1,
    date: "2024-02-10",
    paymentType: [
      {
        cash: 5000,
        cheque: { refreanceNo: "123456", checkAmount: 3000 },
        bankDetail: {
          accountName: "XYZ Bank",
          openingBalance: 10000,
          asOfDate: "2023-12-31",
        },
      },
    ],
    addDescription: "Payment received for services",
    recived: 8000,
    total: 8000,
  });

  const [paymentCount, setPaymentCount] = useState([]);

  // for fetching all parties list on form mount
  useEffect(() => {
    FetchAllParties(dispatch);
  }, []);

  // Input Change Function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = () => {
    PostSalesPayment(dispatch, paymentData);
  };

  const closeForm = () => {
    Props.func();
  };

  const addPaymentType = () => {
    setPaymentCount((prevCount) => [...prevCount, 1]);
  };

  const deletePaymentRow = (ind) => {
    const arr = paymentCount.filter((item, index) => {
      return index !== ind;
    });
    setPaymentCount(arr);
  };

  return (
    <div className="payment-form-cont">
      <div className="payment-form">
        <div className="">
          <div className="d-between  head-cont">
            <div className="d-flex">
              <div className="">
                <h3 className="sales-form-head">Payment In</h3>
              </div>
            </div>
            <div className="d-flex" style={{ gap: "20px" }}>
              <div className="">
                <i class="fa fa-calculator" aria-hidden="true"></i>
              </div>
              <div className="">
                <i class="fa fa-cog" aria-hidden="true"></i>
              </div>
              <div className="" onClick={closeForm}>
                <i
                  className="fa fa-close"
                  style={{ marginRight: "10px", cursor: "pointer" }}
                ></i>
              </div>
            </div>
          </div>
        </div>
        <div className="d-between" style={{ gap: "20px" }}>
          <div className="d-flex" style={{ gap: "20px" }}>
            <select name="" id="" className="sale-select">
              <option value="">Custom</option>
            </select>
            <input
              type="text"
              placeholder="Phone Number *"
              className="invoice-input"
            />
          </div>
          <div className="">
            <div className="mt-10">
              <label htmlFor="">Party</label>
              <select
                name="party"
                value={paymentData.party}
                onChange={handleInputChange}
                style={{ width: "200px" }}
              >
                <option value="">
                  {partiesLoading ? "Loading Parties" : "Select Party"}
                </option>
                {partiesData?.map((item, ind) => (
                  <option value={item.partyName} key={ind + item._id}>
                    {item.partyName}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-10">
              <label htmlFor="">Reciept Number</label>
              <input type="text" style={{ width: "200px" }} />
            </div>
            <div className="mt-10">
              <label htmlFor="">Date</label>
              <input type="date" style={{ width: "200px" }} />
            </div>
          </div>
        </div>
        <div className="d-start" style={{ marginTop: "20px" }}>
          <div className="d-flex-col">
            <div className="mt-10">
              <label htmlFor="">Payment Type</label>
              <br />
              <select
                name=""
                id=""
                style={{ width: "200px" }}
                className="sale-select"
              >
                <option value="">None</option>
              </select>
              <br />
              <p
                style={{ color: "blue", marginTop: "10px", cursor: "pointer" }}
                onClick={addPaymentType}
              >
                + Add Payment Type
              </p>
              {paymentCount?.map((item, index) => {
                return (
                  <div className="d-flex" style={{ gap: "20px" }}>
                    <select name="" id="" className="sale-select">
                      <option value="">Payment Type</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Amount *"
                      className="invoice-input"
                    />
                    <i
                      className="fa fa-trash"
                      onClick={() => {
                        deletePaymentRow(index);
                      }}
                    ></i>
                  </div>
                );
              })}
            </div>
            <div className="" style={{ margin: "5px" }}>
              <label htmlFor="">Add Description</label>
              <br />
              <input type="file" accept="image/*" className="img-input" />
            </div>
            <div className="" style={{ margin: "5px" }}>
              <label htmlFor="">Add Image</label>
              <br />
              <input type="file" accept="image/*" className="img-input" />
            </div>
          </div>
        </div>
        <div className="d-end">
          <label htmlFor="">Recieved</label>
          <input type="text" style={{ width: "200px" }} />
        </div>
        <br />
        <hr />
        <div className="d-end" style={{ gap: "10px", marginTop: "20px" }}>
          <button className="sales-btn1">Share</button>
          <button className="sales-btn2" onClick={handleSubmit}>
            {isLoading ? "Saving" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
