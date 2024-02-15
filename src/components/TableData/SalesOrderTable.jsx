import React from "react";
import "../../styles/parties.css";
import "../../styles/sales.css";

export default function SalesOrderTable(Props) {
  const openForm = () => {
    console.log("Working");
    Props.func(true);
  };

  return (
    <div className="" style={{ width: "100vw" }}>
      <div className="d-flex">
        <div className="grp-cont2">
          <div className="grp-cont2b">
            <div className="d-between">
              <h3>Transactions</h3>
              <button className="add-party-btn add-sale-btn" onClick={openForm}>
                + Add Sale Order 
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
                    Party <i className="fa fa-filter"></i>
                  </th>
                  <th>
                     Number <i className="fa fa-filter"></i>
                  </th>
                  <th>
                     Date <i className="fa fa-filter"></i>
                  </th>
                  <th>
                    Due Date <i className="fa fa-filter"></i>
                  </th>
                  <th>
                    Total Amount <i className="fa fa-filter"></i>
                  </th>
                  <th>
                    Balance <i className="fa fa-filter"></i>
                  </th>
                  <th>
                    Type <i className="fa fa-filter"></i>
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
