import css from "../../Page/Items/Items.module.css";
import UnitEditForm from "../addForm/UnitEditForm";
import { GetSelectedItemData, GetAllUnits } from "../../Redux/items/actions";
import {
  BasicSpinnerIcon,
  FilterIcon,
  SearchIconBlackBg,
  VerticalDotsIcon,
} from "../../assets/Icons/ReactIcons";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UnitsTable({ func }) {
  const dispatch = useDispatch();
  const units = useSelector((store) => store.ItemReducer.unit);
  const newUnitAddedToggle = useSelector(
    (store) => store.ItemReducer.newUnitAddedToggle
  );
  const isLoading = useSelector((store) => store.ItemReducer.isLoading);
  const loadingGetSelectedItemData = useSelector(
    (store) => store.ItemReducer.loadingGetSelectedItemData
  );
  const selectedItemData = useSelector(
    (store) => store.ItemReducer.selectedItemData
  );
  const selectedItemTransactionData = useSelector(
    (store) => store.ItemReducer.selectedItemTransactionData
  );
  const [editItem, setEditItem] = useState([]);
  const [showEditFirm, setShowEditFirm] = useState(false);
  const [currUnit, setCurrUnit] = useState({});

  // Item Click Handler
  const handleItemClick = (item) => {
    //  GetSelectedItemData(dispatch, item?._id);
  };

  const handleStatusToggle = (index) => {
    const updatedTableData = [...selectedItemTransactionData];
    updatedTableData[index].status = !updatedTableData[index].status;
  };

  const openForm = () => {
    func(true);
  };

  // to fetch all Units
  useEffect(() => {
    GetAllUnits(dispatch);
  }, [newUnitAddedToggle]);

  return (
    <div className={css.OuterDiv}>
      {showEditFirm && (
        <UnitEditForm setShowEditFirm={setShowEditFirm} unit={editItem} />
      )}

      <div className={css.flexBoxDivCont}>
        {/* Left Side Content */}
        <div className={css.itemsLeftSideDiv}>
          <div className={css.addBtnDivOuter}>
            <SearchIconBlackBg />
            <button className={css.addBtnCss} onClick={openForm}>
              + Add Unit
            </button>
          </div>

          {/* Left Side Items Table */}
          <div>
            <table className={css.leftSideTableCss}>
              <thead>
                <tr>
                  <th>
                    <div>FULLNAME</div>
                  </th>
                  <th>
                    <div>SHORTNAME</div>
                  </th>
                </tr>
              </thead>
              {!isLoading && (
                <tbody>
                  {units?.map((e, index) => (
                    <tr
                      key={index}
                      onClick={() => {
                        handleItemClick(e);
                        setCurrUnit(e);
                      }}
                    >
                      <td>{e?.unitName}</td>
                      <td>
                        <span>
                          {e?.shortName}
                          <VerticalDotsIcon
                            onClick={() => {
                              setEditItem(e);
                              setShowEditFirm(true);
                            }}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            {isLoading && <BasicSpinnerIcon className={css.miniSpinnerCss} />}
          </div>
        </div>

        {/* Right Side Content */}
        <div className={css.partiesRightSideDiv}>
          {currUnit?.unitName && (
            <div className={css.PartyDetailsOuter}>
              <div>
                <p>{currUnit?.unitName}</p>
              </div>
            </div>
          )}

          <div className={css.transactionHeadingContDiv}>
            <h3>UNITS</h3>
            <input type="text" placeholder="Search" />
          </div>

          <div className={css.tableContDiv}>
            <table className={css.transactionTableCss}>
              <thead>
                <tr>
                  <th>
                    <div style={{ minWidth: "30px", height: "31px" }}></div>
                  </th>
                  <th>
                    <div>
                      Conversion
                      <FilterIcon />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ textAlign: "center" }} colSpan="3">
                    No Rows To Show
                  </td>
                </tr>
                {/* {!loadingGetSelectedItemData &&
                selectedItemTransactionData?.purchaseBill ? (
                  Object.keys(selectedItemTransactionData).map((key, index) =>
                    selectedItemTransactionData[key].map((e, innerIndex) => (
                      <tr key={index}>
                        <td>{e.type}</td>
                        <td>{e.invoiceOrRefNo}</td>
                        <td>{e.name}</td>
                        <td>{new Date(e.date).toLocaleDateString()}</td>
                        <td>{e.quantity}</td>
                        <td>
                          <button
                            style={{ border: "none" }}
                            onClick={() => handleStatusToggle(index)}
                          >
                            {e.status ? "Paid" : "Unpaid"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )
                ) : (
                  <tr id={css.noDataCell}>
                    {!loadingGetSelectedItemData && (
                      <td colSpan="7">No Item Data Available</td>
                    )}
                  </tr>
                )} */}
              </tbody>
            </table>
          </div>

          {loadingGetSelectedItemData && (
            <BasicSpinnerIcon className={css.rightSideTableSpinnerCss} />
          )}
        </div>
      </div>
    </div>
  );
}
