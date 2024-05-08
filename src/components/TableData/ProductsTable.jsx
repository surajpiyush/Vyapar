import css from "../../Page/Items/Items.module.css";
import AddItemForm from "../../Page/Items/AddItemForm";
import { GetSelectedItemData } from "../../Redux/items/actions";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FilterIcon,
  BasicSpinnerIcon,
  SearchIconBlackBg,
  VerticalDotsIcon,
} from "../../assets/Icons/ReactIcons";

export default function ProductsTable({ showAddForm }) {
  const dispatch = useDispatch();
  const selectedItemData = useSelector(
    (store) => store.ItemReducer.selectedItemData
  );
  const selectedItemTransactionData = useSelector(
    (store) => store.ItemReducer.selectedItemTransactionData
  );
  // ItemsList
  const itemsList = useSelector((store) => store.ItemReducer.items);
  console.log("this is ItemList",itemsList)
  // Get All Items Loading
  const getAllItemsLoading = useSelector(
    (store) => store.ItemReducer.getAllItemsLoading
  );
  // Get Selected Items Loading
  const loadingGetSelectedItemData = useSelector(
    (store) => store.ItemReducer.loadingGetSelectedItemData
  );
  const [filteredItem,setFilteredItem]=useState(itemsList)
  const [showEditItemForm, setShowEditItemForm] = useState(false);
  const [clickedItemData, setClickedItemData] = useState({});

  const handleStatusToggle = (index) => {
    const updatedTableData = [...selectedItemTransactionData];
    updatedTableData[index].status = !updatedTableData[index].status;
  };

  useEffect(()=>{},[])

  const handleSearch=(e)=>{
  const query= e.target.value
if(query===''){
  setFilteredItem(itemsList)
}else{
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const regex = new RegExp(escapedQuery, 'i');
const filtered = itemsList.filter(item => regex.test(item.itemName));
setFilteredItem(filtered)
}

  }

  return (
    <div className={css.ContentOuter}>
      {/* Edit Item Form */}
      {showEditItemForm && (
        <AddItemForm
          clickedItemData={clickedItemData}
          usedAsEditForm={true}
          CloseForm={setShowEditItemForm}
        />
      )}

      {/* Left Side Content */}
      <div className={css.partiesLeftSideDiv}>
        
          
          <button
            onClick={() => {
              showAddForm(true);
            }}
            className={css.addBtnCss}
          >
            + Add Item
          </button>
        <input style={{marginTop:'10px'}} onChange={handleSearch} placeholder="Search items.." />

        {/* Left Side Parties Table */}
        <div className={css.leftSideTableCss}>
          <table>
            <thead>
              <tr>
                <th>
                  <div style={{ paddingRight: "110px" }}>ITEM</div>
                </th>
                <th>
                  <div style={{ paddingLeft: "1px" }}>QUANTITY</div>
                </th>
              </tr>
            </thead>
            {!getAllItemsLoading && (
              <tbody>
                {filteredItem?.map((e, index) => (
                  <tr
                    key={e?._id + index}
                    onClick={() => {
                      setClickedItemData(e);
                      if (!loadingGetSelectedItemData) {
                        GetSelectedItemData(dispatch, e?._id);
                      }
                    }}
                  >
                    <td>{e?.itemName}</td>
                    <td>
                      <span>
                        {e?.stock?.openingQuantity || 0}
                        <VerticalDotsIcon
                          onClick={() => {
                            setShowEditItemForm(true);
                          }}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>

      {/* Right Side Content */}
      <div className={css.RightSideDivOuter}>
        {!loadingGetSelectedItemData && selectedItemData?.itemName && (
          <div className={css.PartyDetailsOuter}>
            <div>
              <h5>
                {selectedItemData?.itemName ? selectedItemData?.itemName : ""}
              </h5>
              <p>
                {selectedItemData?.salePrice?.price &&
                  `Sales Price: ₹${selectedItemData?.salePrice?.price}`}
              </p>
              <p>
                Stock Quantity:{" "}
                {selectedItemData?.stock?.openingQuantity ||
                  selectedItemData?.ReservedQuantity ||
                  1}
              </p>
            </div>
            <div>
              <p>
                {selectedItemData?.purchasePrice?.price &&
                  `Purchase Price: ₹${selectedItemData?.purchasePrice?.price}`}
              </p>
              <p>
                {selectedItemData?.StockValue &&
                  `Stock Value: ₹${selectedItemData?.StockValue}`}
              </p>
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
                <th>
                  <div>
                    Type <FilterIcon />
                  </div>
                </th>
                <th>
                  <div>
                    Invoice/Ref <FilterIcon />
                  </div>
                </th>
                <th>
                  <div>
                    Name <FilterIcon />
                  </div>
                </th>
                <th>
                  <div>
                    Date <FilterIcon />
                  </div>
                </th>
                <th>
                  <div>
                    Quantity <FilterIcon />
                  </div>
                </th>
                {/* <th>
                <div>
                  Price/Unit <FilterIcon />
                </div>
              </th> */}
                <th>
                  <div>
                    Status <FilterIcon />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {!loadingGetSelectedItemData &&
              selectedItemTransactionData?.purchaseBill ? (
                Object.keys(selectedItemTransactionData).map((key, index) =>
                  selectedItemTransactionData[key].map((e, innerIndex) => (
                    <tr key={index + e?.type + innerIndex}>
                      <td>{e.type}</td>
                      <td>{e.invoiceOrRefNo}</td>
                      <td>{e.name}</td>
                      <td>{new Date(e.date).toLocaleDateString()}</td>
                      <td>{e.quantity}</td>
                      {/* <td>-</td> */}
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
                    <td colSpan="6">No Transaction Data Available</td>
                  )}
                </tr>
              )}
            </tbody>
          </table>
          {loadingGetSelectedItemData && (
            <div className={css.rightSideTableSpinnerCss}>
              <BasicSpinnerIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
