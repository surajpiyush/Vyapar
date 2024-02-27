import React from "react";
import "../../styles/parties.css";
import "../../styles/sales.css";

export default function SalesPaymentTable({ func }) {
  const openForm = () => {
    func(true);
  };

  return (
    <div className="">
      <div className="d-flex">
        <div className="">
          <div className="grp-cont-invoice">
            <div className="">
              <div className="d-between" style={{ alignItems: "center" }}>
                <div className="d-flex" style={{ gap: "10px" }}>
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
                <div className="d-flex" style={{ gap: "20px" }}>
                  <div className="d-flex-col">
                    <i class="fa fa-bar-chart" aria-hidden="true"></i>
                    <span>Excel Report</span>
                  </div>
                  <div className="d-flex-col">
                    <i class="fa fa-bar-chart" aria-hidden="true"></i>
                    <span>Print</span>
                  </div>
                </div>
              </div>
              <div
                className="d-flex"
                style={{ gap: "20px", marginTop: "20px" }}
              >
                <div className="" style={{ marginLeft: "10px" }}>
                  <select name="" id="" className="invoice-select2">
                    <option value="">Payment In</option>
                    <option value="">All Transactions</option>
                    <option value="">Sale</option>
                    <option value="">Purchase</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="grp-cont2b">
            <div className="d-between">
              <h3>Transactions</h3>
              <button className="add-party-btn add-sale-btn" onClick={openForm}>
                + Add Payment In
              </button>
            </div>
            <div style={{ textAlign: "start" }}>
              <input
                type="text"
                placeholder="Search"
                className="search-party"
                style={{ width: "200px" }}
              />
            </div>
            <div className="" style={{ marginTop: "30px" }}>
              <table>
                <tr>
                  <th>#</th>
                  <th>
                    Date <i className="fa fa-filter"></i>
                  </th>
                  <th>
                    Reference Number <i className="fa fa-filter"></i>
                  </th>
                  <th>
                    Party Name <i className="fa fa-filter"></i>
                  </th>
                  <th>
                    Transaction Type <i className="fa fa-filter"></i>
                  </th>
                  <th>
                    Category Name <i className="fa fa-filter"></i>
                  </th>
                  <th>
                    Type <i className="fa fa-filter"></i>
                  </th>
                  <th>
                    Total <i className="fa fa-filter"></i>
                  </th>
                  <th>
                    Recieved/Paid <i className="fa fa-filter"></i>
                  </th>
                  <th>
                    Balance <i className="fa fa-filter"></i>
                  </th>
                  <th>
                    Print/Share <i className="fa fa-filter"></i>
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
