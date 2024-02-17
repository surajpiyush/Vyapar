import "../../styles/sales.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostSalesInvoice } from "../../Redux/sales/action";
import { FetchAllParties } from "../../Redux/parties/actions";

export default function SalesInvoiceForm(Props) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const partiesLoading = useSelector((state) => state.PartiesReducer.isLoading);
  const partiesData = useSelector((state) => state.PartiesReducer.partiesData);

  const [invoiceData, setInvoiceData] = useState({
    type: "Sale Credit",
    status: "Pending",
    customerName: "Bhuvensh",
    billingName: "John Doe",
    billingAddress: "123 Main St, City, Country",
    phoneNumber: 1234567890,
    eWayBill: "ABC123456",
    poNo: "PO123",
    poDate: "2024-02-09",
    invoiceNumber: "INV123",
    invoiceDate: "2024-02-09",
    time: "10:00 AM",
    paymentTerm: "Net 30",
    dueDate: "2024-03-10",
    stateOfSupply: "Some State",
    priceUnitWithTax: true,
    sale: [
      {
        category: "Category A",
        itemName: "mobile",
        itemCode: "ABC123",
        hsnCode: "HSN123",
        serialNo: "S123",
        description: "Description of item 1",
        batchNo: 1,
        modelNo: 123,
        expDate: "2025-02-09",
        mfgDate: "2023-01-01",
        customField: "Custom Field Value",
        size: "Size A",
        qty: 2,
        unit: "Nos",
        priceUnit: 100,
        discountpersant: 5,
        discountAmount: 10,
        taxPersant: "5%",
        taxAmount: 5,
        amount: 195,
      },
    ],
    paymentType: [
      {
        cash: 150,
        cheque: {
          refreanceNo: "CHK123",
          checkAmount: 200,
        },
        bankDetail: {
          accountName: "Account Name",
          openingBalance: 1000,
          asOfDate: "2024-02-09",
        },
      },
    ],
    addDescription: "Additional Description",
    discount: {
      discountPersent: 10,
      discountAmount: 20,
    },
    tax: {
      tax: "5%",
      taxamount: 5,
    },
    roundOff: 0,
    total: 195,
    recived: 350,
    balance: -155,
    firmId: "609c17662c40e244bc6ebd4a",
    userId: "609c17662c40e244bc6ebd4b",
  });

  // for fetching all parties list on form mount
  useEffect(() => {
    FetchAllParties(dispatch);
  }, []);

  // Input Change Function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = () => {
    PostSalesInvoice(dispatch, invoiceData);
  };

  const closeForm = () => {
    Props.func();
  };

  return (
    <div className="sales-form">
      <div className="">
        <div className="d-between  head-cont">
          <div className="d-flex">
            <div className="">
              <h3 className="sales-form-head">Sales</h3>
            </div>
            <div className="">
              <span>Credit</span> / <span>Cash</span>
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
            <option value="">This Month</option>
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
              name="customerName"
              value={invoiceData.customerName}
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
            <label htmlFor="">Invoice Number</label>
            <input type="text" style={{ width: "200px" }} />
          </div>
          <div className="mt-10">
            <label htmlFor="">Invoice Date</label>
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
