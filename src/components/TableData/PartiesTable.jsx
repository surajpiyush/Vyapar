import css from "../../Page/Parties/Parties.module.css";
import { GetCurrentPartyData } from "../../Redux/parties/actions";

import { useState } from "react";
import { CiFilter as FilterIcon } from "react-icons/ci";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";
import { IoSearchCircleSharp as SearchIcon } from "react-icons/io5";
import { PiDotsThreeVerticalBold as VerticalDots } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import EditPartyForm from "../../Page/Parties/EditPartyForm";

export default function PartiesTable({ func }) {
  const dispatch = useDispatch();
  const isLoadingParties = useSelector(
    (state) => state.PartiesReducer.isLoading
  );
  const loadingGetCurrentPartyData = useSelector(
    (state) => state.PartiesReducer.loadingGetCurrentPartyData
  );
  const partiesData = useSelector((state) => state.PartiesReducer.partiesData);
  const partyTransaction = useSelector(
    (state) => state.PartiesReducer.currentPartyTansection
  );
  const currentParty = useSelector(
    (state) => state.PartiesReducer.currentPartyTansection.party
  );
  const [showEditForm, setShowEditForm] = useState(false);
  const [editPartyData, setEditPartyData] = useState({});

  const openForm = () => {
    func(true);
  };

  return (
    <div className={css.OuterDiv}>
      {showEditForm && (
        <EditPartyForm CloseForm={setShowEditForm} partyData={editPartyData} />
      )}

      <div className={css.flexBoxDivCont}>
        {/* Left Side Content */}
        <div className={css.partiesLeftSideDiv}>
          <div className={css.addBtnDivOuter}>
            <SearchIcon />
            <button className={css.addBtnCss} onClick={openForm}>
              + Add Party
            </button>
          </div>

          {/* Left Side Parties Table */}
          <div>
            <table className={css.leftSideTableCss}>
              <thead>
                <tr>
                  <th>PARTY</th>
                  <th>AMOUNT</th>
                </tr>
              </thead>
              {!isLoadingParties && (
                <tbody>
                  {partiesData.map((item, ind) => (
                    <tr
                      key={ind + item._id}
                      onClick={() => {
                        if (!loadingGetCurrentPartyData) {
                          dispatch(GetCurrentPartyData(item._id));
                        }
                      }}
                    >
                      <td>{item.partyName}</td>
                      <td>
                        <span>
                          {Number(item.openingBalance).toFixed(2)}
                          <VerticalDots
                            onClick={() => {
                              // console.log("party item", item);
                              setEditPartyData(item);
                              setShowEditForm(true);
                            }}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            {isLoadingParties && (
              <BasicSpinner className={css.miniSpinnerCss} />
            )}
          </div>
        </div>

        {/* Right Side Content */}
        <div className={css.partiesRightSideDiv}>
          {currentParty && (
            <div className={css.PartyDetailsOuter}>
              <div>
                <h5>{currentParty[0]?.partyName || "Party Name"}</h5>
                <p>PhoneNo : {currentParty[0]?.phoneNumber || ""}</p>
                <p>Address : {currentParty[0]?.billingAddress || ""}</p>
              </div>
              <div>
                <p>Email : {currentParty[0]?.email || ""}</p>
                <p>GSTIN : {currentParty[0]?.gstNo || ""}</p>
              </div>
            </div>
          )}

          <div className={css.transactionHeadingContDiv}>
            <h3>Transactions</h3>
            {/* <input type="text" placeholder="Search" /> */}
          </div>

          <div className={css.tableContDiv}>
            <table className={css.transactionTableCss}>
              <thead>
                <tr>
                  <th>
                    <div>
                      Type <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      Number <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      Date <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      Total <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      Balance <FilterIcon />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loadingGetCurrentPartyData &&
                partyTransaction &&
                partyTransaction.allData ? (
                  Object.keys(partyTransaction.allData).map((key, index) =>
                    partyTransaction.allData[key].map((e, innerIndex) => (
                      <tr key={innerIndex}>
                        <td>{e.type}</td>
                        <td>{e.invoiceOrRefNo || e.number}</td>
                        <td>{new Date(e.date).toLocaleDateString("en-GB")}</td>
                        <td>{e.total}</td>
                        <td>{e.balance}</td>
                      </tr>
                    ))
                  )
                ) : (
                  <tr id={css.noDataCell}>
                    {!loadingGetCurrentPartyData && (
                      <td colSpan="5">No Transaction Data Available</td>
                    )}
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {loadingGetCurrentPartyData && (
            <BasicSpinner className={css.rightSideTableSpinnerCss} />
          )}
        </div>
      </div>
    </div>
  );
}
