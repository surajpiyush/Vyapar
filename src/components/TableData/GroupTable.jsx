import React from "react";
import "../../styles/parties.css";

export default function GroupTable(Props) {

  const openForm = () => {
    console.log("Working")
    Props.func(true);
  }

  return (
    <div className="" style={{ width: "100vw" }}>
      <div className="d-flex">
        <div className="grp-cont1">
          {/* <div className="d-flex" style={{marginTop : "20px"}}>
            <div className="imp-icon-cont">
              <i className="fa fa-address-book-o" style={{color : "orange"}}></i>
            </div>
            <div className="imp-content">
              <h4>Import Parties</h4>
              <p>Use contact from your Phone or Gmail to create parties.</p>
            </div>
          </div> */}
          <div className=""  style={{marginTop : "20px"}}>
            <div className="d-around">
              <input type="text" className="search-party" placeholder="Search"/>
              <button className="add-party-btn" onClick={openForm}>
                + Add Party <i className="fa fa-angle-down"></i>
              </button>
            </div>
          </div>
          <div className="" style={{ marginTop: "20px" }}>
            <table>
              <tr>
                <th style={{ width: "100px" }}>GROUP</th>
                <th style={{ width: "100px" }}>PARTY</th>
              </tr>
              <tr>
                <td>dwd</td>
                <td>00.0</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="grp-cont2">
          <div className="grp-cont2a">
            <div className="">
                
                <div className="d-between">
                    <p>PhoneNo : 8923434546</p>
                    <button className="party-button">Move to this group</button>
                </div>
                <div className="d-between">
                    <p>Parties (1) $0.00</p>
                </div>
                <div className="">
                <p>No Credit Limit Set: $ Set credit limit</p>
                </div>
            </div>
          </div>
          <div className="grp-cont2b">
            <div className="d-between">
                <h3>Parties</h3>
                <input type="text" placeholder="Search" className="search-party" style={{width : "200px"}} />
            </div>
            <div className="">
                <table>
                    <tr>
                        <th >Type <i className="fa fa-filter"></i></th>
                        
                        <th >Amount <i className="fa fa-filter"></i></th>
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
