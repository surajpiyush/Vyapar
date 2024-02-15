import React, { useState } from "react";
import "../../Css/parties.css";

export default function PartiesTable(data) {
  // console.log(data.data.data[0])
  // const {partyName , openingBalance} =data.data.data[0]
  // console.log(partyName,openingBalance)
  const [impParties, setImpParties] = useState(false);

  const openImportParties = () => {
    console.log("Import Parties");
    setImpParties(true);
  }

  const openForm = () => {
    console.log("Working");
    data.func(true);
  }

  return (
    <div className="">
      {
        impParties && <div className="imp-party-form">
          <div className="d-between">
            <div className="">
              <h3>Import Parties</h3>
            </div>
            <div className="" onClick={() => { setImpParties(false) }}>
              <i className="fa fa-close"></i>
            </div>
          </div>
          <hr />
          <div className="" style={{ textAlign: "start" }}>
            <p>Use your Phone (must be Vyapar Mobile user) / Gmail to get contacts and create parties.</p>
            <input type="text" className="inp-field" placeholder="Enter Phone Number" style={{ width: "93%" }} />
            <span>Get contacts from your Gmail</span>
          </div>
          <div className="">
            <button className="imp-party-btn">Get OTP</button>
          </div>
        </div>
      }
      <div className="d-flex">
        <div className="grp-cont1">
          <div className="d-flex" style={{ marginTop: "20px", borderBottom: "1px solid grey", padding: "10px" }} onClick={openImportParties}>
            <div className="imp-icon-cont">
              <i className="fa fa-address-book-o" style={{ color: "orange" }}></i>
            </div>
            <div className="imp-content">
              <h4>Import Parties</h4>
              <p>Use contact from your Phone or Gmail to create parties.</p>
            </div>
          </div>
          <div className="" style={{ marginTop: "30px" }}>
            <div className="d-around">
              <input type="text" className="search-party" placeholder="Search" />
              <button className="add-party-btn" onClick={openForm}>
                + Add Party <i className="fa fa-angle-down"></i>
              </button>
            </div>
          </div>
          <div className="w" style={{ marginTop: "20px" }}>
            <table>
              <thead>
                <tr className="flex border justify-content-between">
                  <th >PARTY</th>
                  <th >AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td>dwd</td>
                    <td>00.00</td>
                  </tr>
                {/* <tr>
                  <td>{partyName} </td>
                  <td>{openingBalance} </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
        <div className="grp-cont2">
          <div className="grp-cont2a">
            {/* Details of the selected party */}
            {/* You can display the details based on the selected party */}
          </div>
          <div className="grp-cont2b">
            <div className="d-between">
              <h3>Transaction</h3>
              <input type="text" placeholder="Search" className="search-party" style={{ width: "200px" }} />
            </div>
            <div className="">
              <table>
                <thead>
                  <tr>
                    <th>Type <i className="fa fa-filter"></i></th>
                    <th>Number <i className="fa fa-filter"></i></th>
                    <th>Date <i className="fa fa-filter"></i></th>
                    <th>Total <i className="fa fa-filter"></i></th>
                    <th>Balance <i className="fa fa-filter"></i></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
