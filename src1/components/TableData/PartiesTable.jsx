import "../../styles/parties.css";

import { useState } from "react";
import { useSelector } from "react-redux";
import { LuFilter as FilterIcon } from "react-icons/lu";
import { IoIosArrowRoundUp as UpArrowIcon } from "react-icons/io";
import { PiDotsThreeVerticalBold as VerticalDots } from "react-icons/pi";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";

export default function PartiesTable({ func }) {
  const isLoading = useSelector((state) => state.PartiesReducer.isLoading);
  const partiesData = useSelector((state) => state.PartiesReducer.partiesData);
  const [impParties, setImpParties] = useState();

  const openImportParties = () => {
    // console.log("Import Parties");
    setImpParties(true);
  };

  const openForm = () => {
    // console.log("Working");
    func(true);
  };

  return (
    <div className="" style={{ width: "100vw" }}>
      {impParties && (
        <div className="imp-party-form">
          <div className="d-between">
            <div className="">
              <h3>Import Parties</h3>
            </div>
            <div
              className=""
              onClick={() => {
                setImpParties(false);
              }}
            >
              <i className="fa fa-close"></i>
            </div>
          </div>
          <hr />
          <div className="" style={{ textAlign: "start" }}>
            <p>
              Use your Phone (must be Vyapar Mobile user) / Gmail to get
              contacts and create parties.
            </p>
            <input
              type="text"
              className="inp-field"
              placeholder="Enter Phone Number"
              style={{ width: "93%" }}
            />
            <span>Get contacts from your Gmail</span>
          </div>
          <div className="">
            <button className="imp-party-btn">Get OTP</button>
          </div>
        </div>
      )}
      <div className="d-flex">
        <div className="grp-cont1">
          <div
            className="d-flex"
            style={{
              marginTop: "20px",
              borderBottom: "1px solid grey",
              padding: "10px",
            }}
            onClick={openImportParties}
          >
            <div className="imp-icon-cont">
              <i
                className="fa fa-address-book-o"
                style={{ color: "orange" }}
              ></i>
            </div>
            <div className="imp-content">
              <h4>Import Parties</h4>
              <p>Use contact from your Phone or Gmail to create parties.</p>
            </div>
          </div>
          <div className="" style={{ marginTop: "30px" }}>
            <div className="d-around">
              <input
                type="text"
                className="search-party"
                placeholder="Search"
              />
              <button className="add-party-btn" onClick={openForm}>
                + Add Party <i className="fa fa-angle-down"></i>
              </button>
            </div>
          </div>

          {/* Parties Table */}
          <table className="partiestable-outer" style={{ marginTop: "20px" }}>
            <thead>
              <tr>
                <th id="partyhead">
                  <span>
                    <UpArrowIcon />
                    <p>PARTY</p>
                  </span>
                  <FilterIcon />
                </th>
                <th>AMOUNT</th>
              </tr>
            </thead>
            {isLoading ? (
              <BasicSpinner
                style={{
                  width: "200%",
                  margin: "60px auto",
                  fontSize: "30px",
                }}
              />
            ) : (
              <tbody>
                {partiesData.map((item, ind) => (
                  <tr key={ind + item._id}>
                    <td>{item.partyName}</td>
                    <td>
                      <span>
                        {Number(item.openingBalance).toFixed(2)}
                        <VerticalDots />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        <div className="grp-cont2">
          <div className="grp-cont2a">
            <div className="">
              <h5>NAme</h5>
              <div className="d-between">
                <p>PhoneNo : 8923434546</p>
                <p>Address : fendi dnw</p>
              </div>
              <div className="d-between">
                <p>Email : nishantsharma13903@gmail.com</p>
                <p>GSTIN : 09ALHPD4925B1ZG</p>
              </div>
              <div className="">
                <p>No Credit Limit Set: $ Set credit limit</p>
              </div>
            </div>
          </div>
          <div className="grp-cont2b">
            <div className="d-between">
              <h3>Transaction</h3>
              <input
                type="text"
                placeholder="Search"
                className="search-party"
                style={{ width: "200px" }}
              />
            </div>
            <div className="">
              <table>
                <tr>
                  <th>
                    Type <i className="fa fa-filter"></i>
                  </th>
                  <th>
                    Number <i className="fa fa-filter"></i>
                  </th>
                  <th>
                    Date <i className="fa fa-filter"></i>
                  </th>
                  <th>
                    Total <i className="fa fa-filter"></i>
                  </th>
                  <th>
                    Balance <i className="fa fa-filter"></i>
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
