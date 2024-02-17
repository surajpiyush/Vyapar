import React from "react";
import "../../styles/parties.css";
import "../../styles/sales.css";

export default function SalesEstimatesTable(Props) {
  const openForm = () => {
    console.log("Working");
    Props.func(true);
  };

  return (
    <div className="" style={{ width: "100vw" }}>
      <div className="d-flex">
        <div className="grp-cont2">
          <div className="grp-cont-invoice">
            <div className="">
              <div className="d-between" style={{alignItems : "center"}}>
                <div className="d-flex" style={{ gap: "10px"}}>
                  <div className="">
                    <select name="" id="" className="invoice-select">
                      <option value="">This Month</option>
                      <option value="">This Quarter</option>
                      <option value="">Last Month</option>
                      <option value="">This Year</option>
                      <option value="">Custom</option>
                    </select>
                  </div>
                  <div className="d-flex">
                    <p>Between</p>
                    <div
                      className="d-flex"
                      style={{ gap: "10px", marginLeft: "10px" }}
                    >
                      <input type="date" className="invoice-input" />
                      <span>To</span>
                      <input type="date" className="invoice-input" />
                    </div>
                  </div>
                  <div className="" style={{ marginLeft: "10px" }}>
                    <select name="" id="" className="invoice-select2">
                      <option value="">All Firms</option>
                      <option value="">My Company</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grp-cont2b">
            <div className="d-between">
              <h3>Transactions</h3>
              <button className="add-party-btn add-sale-btn" onClick={openForm}>
                + Add Estimates 
              </button>
            </div>
            <div style={{textAlign : "start"}}>
            <input
                type="text"
                placeholder="Search"
                className="search-party"
                style={{ width: "200px" }}
              />
            </div>
            <div className="" style={{marginTop : "30px"}}>
              <table>
                <tr>
                  <th>
                    Date <i className="fa fa-filter"></i>
                  </th>
                  <th>
                    Reference Number <i className="fa fa-filter"></i>
                  </th>
                  <th>
                     Name <i className="fa fa-filter"></i>
                  </th>
                  <th>
                    Total Amount <i className="fa fa-filter"></i>
                  </th>
                  <th>
                    Balance <i className="fa fa-filter"></i>
                  </th>
                  <th>
                    Status <i className="fa fa-filter"></i>
                  </th>
                  <th>
                    Action <i className="fa fa-filter"></i>
                  </th>
                </tr>
                <tr>
                  <td></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
