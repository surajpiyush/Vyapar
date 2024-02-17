import "../../styles/sales.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostSalesOrder } from "../../Redux/sales/action";
import { FetchAllParties } from "../../Redux/parties/actions";

export default function SalesOrderForm({ func }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const partiesLoading = useSelector((state) => state.PartiesReducer.isLoading);
  const partiesData = useSelector((state) => state.PartiesReducer.partiesData);

  const [orderData, setOrderData] = useState({
    type: "Sale Order",
    status: "Pending",
    party: "testing",
    billingName: "John Doe",
    phoneNumber: 1234567890,
    billingAddress: "123 Main St",
    orderNo: "SO001",
    orderDate: "2024-02-10",
    time: "10:00 AM",
    dueDate: "2024-02-15",
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
        qty: 1,
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
        cash: 0,
      },
    ],
    addDescription: "Additional description",
    discount: { discountPersent: 5, discountAmount: 50 },
    tax: { tax: "10%", taxamount: 100 },
    roundOff: 0,
    total: 1000,
    advancedAmount: 0,
    balance: 1000,
  });

  const [paymentCount, setPaymentCount] = useState([]);

  // for fetching all parties list on form mount
  useEffect(() => {
    FetchAllParties(dispatch);
  }, []);

  // Input Change Function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = () => {
    PostSalesOrder(dispatch, orderData);
  };

  const closeForm = () => {
    func();
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
              <h3 className="sales-form-head">Sale Order</h3>
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
            <option value="">Search By Name/Phone Number</option>
            <option value="">This Quarter</option>
            <option value="">Last Month</option>
            <option value="">This Year</option>
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
              value={orderData.party}
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
            <label htmlFor="">Order Number</label>
            <input type="text" style={{ width: "200px" }} />
          </div>
          <div className="mt-10">
            <label htmlFor="">Order Date</label>
            <input type="date" style={{ width: "200px" }} />
          </div>
          <div className="mt-10">
            <label htmlFor="">Due Date</label>
            <input type="date" style={{ width: "200px" }} />
          </div>
          <div className="mt-10">
            <label htmlFor="">State of supply</label>
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
      <div className="d-around" style={{ marginTop: "50px" }}>
        <div className="d-flex-col">
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
        <div className="d-flex" style={{ gap: "20px" }}>
          <div className="">
            <input type="checkbox" />
            <label htmlFor="">Round Off</label>
            <input type="text" style={{ width: "100px", marginLeft: "10px" }} />
          </div>
          <div className="">
            <label htmlFor="">Total</label>
            <input
              type="text"
              style={{ width: "100px", marginLeft: "10px", height: "" }}
            />
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
