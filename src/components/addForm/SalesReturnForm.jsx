import "../../styles/sales.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostSalesReturn } from "../../Redux/sales/action";
import { FetchAllParties } from "../../Redux/parties/actions";

export default function SalesReturnForm(Props) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const partiesLoading = useSelector((state) => state.PartiesReducer.isLoading);
  const partiesData = useSelector((state) => state.PartiesReducer.partiesData);

  const [returnsData, setReturnsData] = useState({
    type: "Credit Note",
    status: "Pending",
    party: "Bhuvensh",
    phoneNumber: 1234567890,
    billingAddress: "123 Main St",
    returnNo: "R001",
    invoiceNumber: "INV001",
    invoiceDate: "2024-02-05",
    date: "2024-02-10",
    time: "10:00 AM",
    stateOfSupply: "Some State",
    priceUnitWithTax: true,
    saleOrder: [
      {
        category: "Electronics",
        itemName: "mobile",
        itemCode: "LT1001",
        hsnCode: "1234",
        serialNo: "SN123",
        description: "Brand new laptop",
        batchNo: 123,
        modelNo: 456,
        expDate: "2025-12-31",
        mfgDate: "2024-01-01",
        customField: "Some custom field",
        size: "Large",
        qty: 2,
        unit: "pcs",
        priceUnit: 1000,
        discountpersant: 5,
        discountAmount: 50,
        taxPersant: "10%",
        taxAmount: 100,
        amount: 950,
      },
    ],
    paymentType: [
      {
        cash: 3000,
        cheque: { refreanceNo: "123456", checkAmount: 2000 },
        bankDetail: {
          accountName: "XYZ Bank",
          openingBalance: 10000,
          asOfDate: "2023-12-31",
        },
      },
    ],
    addDescription: "Return due to defective product",
    discount: { discountPersent: 5, discountAmount: 50 },
    tax: { tax: "10%", taxamount: 100 },
    roundOff: 0,
    total: 1000,
    paidAmount: 5000,
    balance: 5000,
    partyId: "606f1e7baf8e552e2c8da925", // ObjectId of the party
    firmId: "606f1e7baf8e552e2c8da926", // ObjectId of the firm
    userId: "606f1e7baf8e552e2c8da927", // ObjectId of the user
  });

  const [paymentCount, setPaymentCount] = useState([]);

  // for fetching all parties list on form mount
  useEffect(() => {
    FetchAllParties(dispatch);
  }, []);

  // Input Change Function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReturnsData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = () => {
    PostSalesReturn(dispatch, returnsData);
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
    <div className="sales-form">
      <div className="">
        <div className="d-between  head-cont">
          <div className="d-flex">
            <div className="">
              <h3 className="sales-form-head">Credit Note</h3>
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
      <div className="d-around" style={{ gap: "20px" }}>
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
              value={returnsData.party}
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
            <label htmlFor="">Return Number</label>
            <input type="text" style={{ width: "200px" }} />
          </div>
          <div className="mt-10">
            <label htmlFor="">Invoice Number</label>
            <input type="date" style={{ width: "200px" }} />
          </div>
          <div className="mt-10">
            <label htmlFor="">Invoice Date</label>
            <input type="date" style={{ width: "200px" }} />
          </div>
          <div className="mt-10">
            <label htmlFor="">Date</label>
            <input type="date" style={{ width: "200px" }} />
          </div>
          <div className="mt-10">
            <label htmlFor="">State of Supply</label>
            <select
              name=""
              id=""
              style={{ width: "200px" }}
              className="sale-select"
            >
              <option value="">None</option>
              <option value="">State</option>
            </select>
          </div>
        </div>
      </div>
      <div
        className=""
        style={{ width: "100%", marginTop: "50px", background: "white" }}
      >
        <table style={{ width: "100%" }}>
          <tr style={{ borderBottom: "1px solid grey" }}>
            <th>#</th>
            <th>Item</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>
              <span>Price / Unit</span>
              <br />
              <select name="" id="" className="sale-select">
                <option value="">Without Tax</option>
                <option value="">With Tax</option>
              </select>
            </th>
            <th>
              <span>Discount</span>
              <div className="d-flex">
                <span style={{ border: "1px solid grey", width: "50%" }}>
                  %
                </span>
                <span style={{ border: "1px solid grey", width: "50%" }}>
                  Amount
                </span>
              </div>
            </th>
            <th>
              <span>Tax</span>
              <div className="d-flex">
                <span style={{ border: "1px solid grey", width: "50%" }}>
                  %
                </span>
                <span style={{ border: "1px solid grey", width: "50%" }}>
                  Amount
                </span>
              </div>
            </th>
            <th>Amount</th>
          </tr>
          <tr style={{ textAlign: "center" }}>
            <td>
              <button className="sales-row-btn">Add Row</button>
            </td>
          </tr>
        </table>
      </div>
      <div
        className="d-around"
        style={{ marginTop: "50px", textAlign: "start" }}
      >
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
            <label htmlFor="">Add Image</label>
            <br />
            <input type="file" accept="image/*" className="img-input" />
          </div>
          <div className="" style={{ margin: "5px" }}>
            <label htmlFor="">Add Document</label>
            <br />
            <input type="file" accept="image/*" className="img-input" />
          </div>
        </div>
        <div className="d-flex" style={{ gap: "20px" }}>
          <div className="">
            <input type="checkbox" />
            <label htmlFor="">Round Off</label>
            <input type="text" style={{ width: "100px", marginLeft: "10px" }} />
          </div>
          <div className="">
            <label htmlFor="">Total</label>
            <input type="text" style={{ width: "100px", marginLeft: "10px" }} />
          </div>
        </div>
      </div>
      <div className="d-end" style={{ gap: "10px", marginTop: "20px" }}>
        <button className="sales-btn1">Share</button>
        <button className="sales-btn2" onClick={handleSubmit}>
          {isLoading ? "Saving" : "Save"}
        </button>
      </div>
    </div>
  );
}
