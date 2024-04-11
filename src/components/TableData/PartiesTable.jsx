import css from "../../Page/Parties/Parties.module.css";
import AddPartyForm from "../../Page/Parties/AddPartyForm";
import { GetCurrentPartyData } from "../../Redux/parties/actions";
import {
  FilterIcon,
  BasicSpinnerIcon,
  SearchIconBlackBg,
  VerticalDotsIcon,
} from "../../assets/Icons/ReactIcons";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
    <div className={css.ContentOuter}>
      {/* Edit Party Form */}
      {showEditForm && (
        <AddPartyForm
          CloseForm={setShowEditForm}
          usedAsEditForm={true}
          editPartyData={editPartyData}
        />
      )}

      {/* Left Side Content */}
      <div className={css.partiesLeftSideDiv}>
        <div className={css.addBtnDivOuter}>
          <SearchIconBlackBg />
          <button className={css.addBtnCss} onClick={openForm}>
            + Add Party
          </button>
        </div>

        {/* Left Side Parties Table */}
        <div className={css.leftSideTableCss}>
          <table>
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
                      setEditPartyData(item);
                      if (!loadingGetCurrentPartyData) {
                        dispatch(GetCurrentPartyData(item._id));
                      }
                    }}
                  >
                    <td>{item.partyName}</td>
                    <td>
                      <span>
                        {Number(item.openingBalance).toFixed(2)}
                        <VerticalDotsIcon
                          onClick={() => {
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
            <BasicSpinnerIcon className={css.miniSpinnerCss} />
          )}
        </div>
      </div>

      {/* Right Side Content */}
      <div className={css.RightSideDivOuter}>
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
        </div>

        <div className={css.rightSideTableCss}>
          <table>
            <thead>
              <tr>
                {["Type", "Number", "Date", "Total", "Balance"].map(
                  (headItem, headInd) => (
                    <th key={headItem + headInd}>
                      <div>
                        {headItem} <FilterIcon />
                      </div>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {!loadingGetCurrentPartyData &&
              partyTransaction &&
              partyTransaction?.allData ? (
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
          {loadingGetCurrentPartyData && (
            <div className={css.rightSideTableSpinnerCss}>
              <BasicSpinnerIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
