import React from "react";
import "../../styles/sales.css";

export default function SalesDeliveryForm(Props) {

  const closeForm = () => {
    Props.func();
  }

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
            <option value="">Custom</option>
          </select>
         
        </div>
        <div className="">
          <div className="mt-10">
            <label htmlFor="">Challan Number</label>
            <input type="text" style={{ width: "200px" }} />
          </div>
          <div className="mt-10">
            <label htmlFor="">Invoice Date</label>
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
            <tr style={{borderBottom : "1px solid grey"}}>
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
            <tr style={{textAlign :"center"}}>
                <td><button className="sales-row-btn">Add Row</button></td>
            </tr>
        </table>
      </div>
      <div className="d-around" style={{ marginTop: "50px" }}>
        <div className="d-flex-col">
          <div className="" style={{margin : "5px"}}>
            <label htmlFor="">Add Description</label><br />
            <input type="file" accept="image/*" className="img-input" />
          </div>
          <div className="" style={{margin : "5px"}}>
            <label htmlFor="">Add Image</label><br />
            <input type="file" accept="image/*" className="img-input" />
          </div>
        </div>
        <div className="d-flex" style={{gap : "20px"}}>
            <div className="">
                <input type="checkbox" />
                <label htmlFor="">Round Off</label>
                <input type="text" style={{width : "100px",marginLeft : "10px"}}/>
            </div>
            <div className="">
                <label htmlFor="">Total</label>
                <input type="text" style={{width : "100px",marginLeft : "10px"}}/>
            </div>
        </div>
     
      </div>
      <div className="d-end" style={{gap : "10px",marginTop : "20px"}}>
        <button className="sales-btn1">Share</button>
        <button className="sales-btn2">Save</button>
      </div>
    </div>
  );
}
