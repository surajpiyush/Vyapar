import "../../styles/parties.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LuFilter as FilterIcon } from "react-icons/lu";
import { IoIosArrowRoundUp as UpArrowIcon } from "react-icons/io";
import { PiDotsThreeVerticalBold as VerticalDots } from "react-icons/pi";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";
import { getCurrentPartyData } from "../../Redux/parties/actions";
import { IoSearchCircleSharp } from "react-icons/io5";
import PartyEditForm from "../addForm/PartyEditForm";

export default function PartiesTable({ func }) {
  const dispatch = useDispatch();
  const isLoadingParties = useSelector(
    (state) => state.PartiesReducer.isLoading
  );
  const isLoadingTransactions = useSelector(
    (state) => state.PartiesReducer.isLoadingTransactions
  );
  const partiesData = useSelector((state) => state.PartiesReducer.partiesData);

  const partyTransaction = useSelector(
    (state) => state.PartiesReducer.currentPartyTansection
  );

  // console.log(partyTransaction);
  const currentParty = useSelector(
    (state) => state.PartiesReducer.currentPartyTansection.party
  );
  const [impParties, setImpParties] = useState(false);
  const [showEditFirm, setShowEditFirm] = useState(false);
  const [editParty, setEditParty] = useState([]);

  const openImportParties = () => {
    setImpParties(true);
  };

  const openForm = () => {
    func(true);
  };

  return (
    <div className="" style={{ width: "80vw" }}>
      {showEditFirm && (
        <PartyEditForm setShowEditFirm={setShowEditFirm} party={editParty} />
      )}

      {/* {impParties && (
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
                     style={{ width: "100%" }}
                  />
                  <span>Get contacts from your Gmail</span>
               </div>
               <div className="">
                  <button className="imp-party-btn">Get OTP</button>
               </div>
            </div>
         )} */}

      <div>
        <div className="d-flex">
          <div className="grp-cont1">
            {/* <div
              className="d-flex"
              style={{
                marginTop: "20px",
                borderBottom: "1px solid grey",
                padding: "10px",
                // background:"white",
                borderRadius: "15px",
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
            </div> */}
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                gap: "3.1rem",
              }}
            >
              <div style={{ fontSize: "3rem" }}>
                <IoSearchCircleSharp />
              </div>
              <button
                className="add-party-btn"
                style={{ textAlign: "end" }}
                onClick={openForm}
              >
                + Add Party <i className="fa fa-angle-down"></i>
              </button>
            </div>

            {/* Parties Table */}
            <table className="partiestable-outer" style={{ marginTop: "20px" }}>
              <thead>
                <tr>
                  <th>PARTY</th>
                  <th>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {isLoadingParties ? (
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      <BasicSpinner />
                    </td>
                  </tr>
                ) : (
                  partiesData.map((item, ind) => (
                    <tr
                      key={ind + item._id}
                      onClick={() => dispatch(getCurrentPartyData(item._id))}
                    >
                      <td>{item.partyName}</td>
                      <td>
                        <span>
                          {Number(item.openingBalance).toFixed(2)}
                          <VerticalDots
                            onClick={() => {
                              setEditParty(item);
                              setShowEditFirm(true);
                            }}
                          />
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="grp-cont2">
            {currentParty && (
              <div className="grp-cont2a">
                <div className="">
                  <h5>{currentParty[0]?.partyName || ""}</h5>
                  <div className="d-between">
                    <p>PhoneNo : {currentParty[0]?.phoneNumber || ""}</p>
                    <p>Address : {currentParty[0]?.billingAddress || ""}</p>
                  </div>
                  <div className="d-between">
                    <p>Email : {currentParty[0]?.email || ""}</p>
                    <p>GSTIN : {currentParty[0]?.gstNo || ""}</p>
                  </div>
                  <div className="">
                    <p>No Credit Limit Set: $ Set credit limit</p>
                  </div>
                </div>
              </div>
            )}
            {!currentParty && (
              <div className="grp-cont2a">
                <div className="">
                  <h5>PartyName - .........</h5>
                  <div className="d-between">
                    <p>PhoneNo :</p>
                    <p>Address : </p>
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
            )}
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
                <table className="transaction-table">
                  <thead>
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
                  </thead>
                  <tbody>
                    {isLoadingTransactions ? (
                      <tr className="spinner-cell">
                        <td colSpan="5">
                          <BasicSpinner />
                        </td>
                      </tr>
                    ) : partyTransaction && partyTransaction.allData ? (
                      Object.keys(partyTransaction.allData).map((key, index) =>
                        partyTransaction.allData[key].map((e, innerIndex) => (
                          <tr key={innerIndex}>
                            <td>{e.type}</td>
                            <td>{e.invoiceOrRefNo || e.number}</td>
                            <td>
                              {new Date(e.date).toLocaleDateString("en-GB")}
                            </td>
                            <td>{e.total}</td>
                            <td>{e.balance}</td>
                          </tr>
                        ))
                      )
                    ) : (
                      <tr className="no-data-cell">
                        <td colSpan="5">No transaction data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
