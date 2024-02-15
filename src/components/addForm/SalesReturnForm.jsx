import React, { useState } from "react";
import "../../styles/sales.css";

export default function SalesReturnForm(Props) {
  const closeForm = () => {
    Props.func();
  };

  const [paymentCount, setPaymentCount] = useState([]);

  const addPaymentType = () => {
    setPaymentCount(prevCount => [...prevCount, 1]);
  };

  const deletePaymentRow = (ind) => {
    const arr = paymentCount.filter((item,index)=>{
      return index !== ind
    })
    setPaymentCount(arr);
  }
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
      <div className="d-around" style={{ marginTop: "50px",textAlign : "start" }}>
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
                style={{ color: "blue", marginTop: "10px",cursor : "pointer" }}
                onClick={addPaymentType}
              >
                + Add Payment Type
              </p>
              {paymentCount?.map((item,index) => {
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
                    <i className="fa fa-trash" onClick={()=>{deletePaymentRow(index)}}></i>
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
        <button className="sales-btn2">Save</button>
      </div>
    </div>
  );
}
