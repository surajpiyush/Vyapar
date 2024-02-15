import React, { useState } from "react";
import "../../styles/sales.css";

export default function SalesPaymentForm(Props) {
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
          <button className="sales-btn2">Save</button>
        </div>
      </div>
    </div>
  );
}
