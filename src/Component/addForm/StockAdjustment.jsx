import React from "react";

export default function StockAdjustment(Props) {

  const closeForm = () => {
    console.log("Working")
    Props.func(false);
  }

  return (
    <div>
      <div className="unit-form">
        <div className="d-between">
          <div className="">
            <h3>Stock Adjustment</h3>
          </div>
          <div
            className=""
            onClick={() => {
              
            }}
          >
            <i className="fa fa-close" onClick={closeForm}></i>
          </div>
        </div>
        <hr />
        <div className="d-between">
            <div className="">
                <p style={{margin: "0px"}}>Item Name</p>
                <p style={{margin: "0px"}}>Item</p>
            </div>
            <div className="">
                <input type="date" className="" placeholder="Adjustment Date"/>
            </div>
        </div>
        <div className="" style={{ textAlign: "start",marginTop : "10px" }}>
          <input
            type="text"
            className="inp-field"
            placeholder="Total Quantity"
            style={{ width: "93%" }}
          />
          <input
            type="text"
            className="inp-field"
            placeholder="At Price"
            style={{ width: "93%" }}
          />
          <input
            type="text"
            className="inp-field"
            placeholder="Details"
            style={{ width: "93%" }}
          />
        </div>
        <div className="">
          <button className="imp-party-btn">Save</button>
        </div>
      </div>
    </div>
  );
}
