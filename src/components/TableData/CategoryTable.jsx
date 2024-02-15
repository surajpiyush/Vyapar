import React from "react";
import "../../styles/parties.css";

export default function CategoryTable(Props) {

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
                + Add Category <i className="fa fa-angle-down"></i>
              </button>
            </div>
          </div>
          <div className="" style={{ marginTop: "20px" }}>
            <table>
              <tr>
                <th style={{ width: "100px" }}>CATEGORY</th>
                <th style={{ width: "100px" }}>ITEM</th>
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
                    <p>ITEMS NOT IN ANY CATEGORY</p>
                    <button className="party-button">Move to this Category</button>
                </div>
                <div className="d-between">
                    <p>0.00</p>
                </div>
            </div>
          </div>
          <div className="grp-cont2b">
            <div className="d-between">
                <h3>Items</h3>
                <input type="text" placeholder="Search" className="search-party" style={{width : "200px"}} />
            </div>
            <div className="">
                <table>
                    <tr>
                        <th >Name <i className="fa fa-filter"></i></th>
                        
                        <th >Quantity <i className="fa fa-filter"></i></th>
                        <th >Stock Value <i className="fa fa-filter"></i></th>
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
