import css from "../../pages/sales/SalesForms.module.css";
import AddItemForm from "../../Page/Items/AddItemForm";
import AddPurchaseForm from "../../Component/Purchase/AddPurchaseForm";
import { GetAllItems } from "../../Redux/items/actions";
import { FetchAllParties } from "../../Redux/parties/actions";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillFileAdd as AddDecriptionIcon } from "react-icons/ai";
import {
  BiSolidCameraPlus as AddCameraIcon,
  BiSolidCheckboxChecked as CheckedBox,
} from "react-icons/bi";
import { FiPlusCircle as PlusIcon } from "react-icons/fi";
import { HiMiniDocumentText as AddDocumentIcon } from "react-icons/hi2";
import { ImCheckboxUnchecked as EmptyCheckedBox } from "react-icons/im";
import { IoIosArrowDown as ArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { AddPurchaseBill, getPurchaseBill } from "../../Redux/purchase/action";
import {
  CloseToggleIcon,
  OpenToggleIcon,
  PlusIconThin,
} from "../../assets/Icons/ReactIcons";
import {
  AddExpense,
  GetAllExpenseCategories,
  GetAllExpenseItems,
} from "../../Redux/expenses/actions";
import WithGstItemRow from "./WithGstItemRow";
import CategoryForm from "./CategoryForm";
import ItemForm from "./ItemForm";
import WithOutGstItemRow from "./WithOutGstItemRow";

const AddExpenses = ({ setOpenForm }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ExpenseReducer.isLoading);
  const loadingAddExpense = useSelector(
    (state) => state.ExpenseReducer.loadingAddExpense
  );
  const toggleAddItemSuccess = useSelector(
    (state) => state.ExpenseReducer.toggleAddItemSuccess
  );
  const toggleAddCategorySuccess = useSelector(
    (state) => state.ExpenseReducer.toggleAddCategorySuccess
  );
  const categoryData = useSelector(
    (store) => store.ExpenseReducer.categoryData
  );
  const items = useSelector((state) => state.ExpenseReducer.itemsData);
  const partiesData = useSelector(
    (state) => state.PartiesReducer.partiesData || []
  );
  const partiesLoading = useSelector((state) => state.PartiesReducer.isLoading);
  const togglePartiesData = useSelector(
    (state) => state.PartiesReducer.togglePartiesData
  );
  const getAllItemsLoading = useSelector(
    (state) => state.ItemReducer.getAllItemsLoading
  );

  const [currentCustomerData, setCurrentCustomerData] = useState({});
  const [toggleDesc, setToggleDesc] = useState(false);
  const [toggleRoundOff, setToggleRoundOff] = useState(false);
  const [toggleReceived, setToggleReceived] = useState(false);
  const [toggleCheckReferenceInp, setToggleCheckReferenceInp] = useState(false);
  const [paymentTypeSelectTag, setPaymentTypeSelectTag] = useState("Cash");
  const [checkReferenceInpval, setCheckReferenceInpval] = useState("");
  const [topMarginAddDescInp, setTopMarginAddDescInp] = useState("");
  const [showItemsListMenu, setShowItemsListMenu] = useState(false);
  const [indexSaleItem, setIndexSaleItem] = useState(0);
  const [rowFooterData, setRowFooterData] = useState({});
  const [showItemForm, setShowItemForm] = useState(false);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [stateChanged, setStateChanged] = useState(false);
  const [showAddCateForm, setShowAddCateForm] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [currCategoryName, setCurrCategoryName] = useState("");

  // -------
  const [withGST, setWithGST] = useState(false);
  const [paymentArr, setPaymentArr] = useState([{ types: "Cash", amount: 0 }]);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [expenseItems, setExpenseItems] = useState([
    {
      // Without GST
      itemName: "",
      qty: "",
      priceUnit: 0,
      amount: "",

      // With GST
      hsnCode: "",
      quantity: "",
      discountPersent: "",
      discountAmount: "",
      taxRate: "",
      taxAmount: "",
      amount: "",
    },
  ]);

  const [expenseData, setExpenseData] = useState({
    // Without GST
    date: new Date().toISOString().split("T")[0],
    category: "",
    addDescription: "",
    total: 0,
    roundOff: 0,

    //
    // partyName: "",
    // billDate: new Date().toISOString().split("T")[0],
    // paymentTerms: "",
    // dueDate: new Date().toISOString().split("T")[0],
    // stateOfSupply: "",
    // sale: [],
    // discount: {
    //   discountPersent: 0,
    //   discountAmount: 0,
    // },
    // tax: {
    //   tax: "",
    //   taxamount: 0,
    // },
    // paid: 0,
    // balance: 0,
  });

  const sortedStates = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const handleAddCategoryClick = () => {
    setShowAddCategoryForm(true);
  };

  useEffect(() => {
    // console.log(currentCustomerData);
    let obj = {
      customerName: currentCustomerData?._id || "",
      stateOfSupply: currentCustomerData?.state || "",
    };
    setExpenseData((prev) => {
      return { ...prev, ...obj };
    });
  }, [currentCustomerData]);

  // Update total footer values
  useEffect(() => {
    let footerObj = {
      totalQty: 0,
      totalDiscountAmount: 0,
      totalTaxAmount: 0,
      totalAmount: 0,
    };
    expenseItems?.forEach((item) => {
      if (Number(item?.qty)) {
        footerObj.totalQty += Number(item?.qty);
      }
      if (Number(item?.discountAmount)) {
        footerObj.totalDiscountAmount += Number(item?.discountAmount);
      }
      if (Number(item?.taxAmount)) {
        footerObj.totalTaxAmount += Number(item?.taxAmount);
      }
      if (Number(item?.amount)) {
        footerObj.totalAmount += Number(item?.amount);
        expenseData.total = +footerObj.totalAmount;
      }
    });
    footerObj.totalDiscountAmount = footerObj.totalDiscountAmount.toFixed(2);
    footerObj.totalTaxAmount = footerObj.totalTaxAmount.toFixed(2);
    footerObj.totalAmount = footerObj.totalAmount.toFixed(2);
    setRowFooterData(footerObj);
  }, [
    expenseItems[indexSaleItem]?.qty,
    expenseItems[indexSaleItem]?.priceUnit,
    expenseItems[indexSaleItem]?.discountpersant,
    expenseItems[indexSaleItem]?.discountAmount,
    expenseItems[indexSaleItem]?.taxPersant,
    expenseItems[indexSaleItem]?.taxAmount,
    expenseItems[indexSaleItem]?.amount,
  ]);

  useEffect(() => {
    // GetAllExpenseCategories(dispatch);
    // GetAllExpenseItems(dispatch);
    FetchAllParties(dispatch);
  }, [toggleAddItemSuccess, toggleAddCategorySuccess]);
  // To Show Reference Input
  useEffect(() => {
    if (paymentTypeSelectTag == "Cheque") {
      setToggleCheckReferenceInp(true);
    } else {
      setToggleCheckReferenceInp(false);
    }
  }, [paymentTypeSelectTag]);

  // Input Change Function
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === "dueDate") {
      const selectedDate = new Date(value);
      const today = new Date();
      if (selectedDate < today) {
        toast({
          description: "Something Went Wrong!",
          title: "Selected date should not be before today",
          status: "error",
          position: "top",
        });
        // console.log("Selected date should not be after today");
        value = new Date().toISOString().split("T")[0];
      }
    }
    if (name === "stateOfSupply" && currentCustomerData?.state !== value) {
      setStateChanged(true);
    } else {
      setStateChanged(false);
    }
    setExpenseData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // Found items list click handler
  const handleMenuItemClick = (index, itemDetail) => {
    // console.log("itemDetail", itemDetail);
    let currSaleItem = {
      ...expenseItems[index],
      itemName: itemDetail?._id,
      priceUnit: itemDetail?.price || 0,
      hsnCode: itemDetail?.itemHsn || "",
      mainName: itemDetail?.itemName,
      // taxPersant: stateChanged
      //   ? `I${itemDetail?.taxRate.split("%")[0] || ""}`
      //   : itemDetail?.taxRate.split("%")[0] || "",
    };
    let newSaleData = expenseItems.map((ite, ind) =>
      ind == index ? currSaleItem : ite
    );
    setExpenseItems(newSaleData);
    setShowItemsListMenu(false);
  };

  // for changing balance amount
  useEffect(() => {
    let initAmount = toggleRoundOff
      ? Math.round(rowFooterData?.totalAmount)
      : rowFooterData?.totalAmount;
    let recieved = expenseData?.recived || 0;
    let bal = initAmount - recieved;
    setBalanceAmount(
      bal.toFixed(2) ? bal.toFixed(2) : rowFooterData?.totalAmount
    );
    // expenseData.balanceAmount = balanceAmount;
  }, [expenseData?.recived, toggleRoundOff, rowFooterData?.totalAmount]);

  // Add Row Function
  const handleAddRow = (e) => {
    e.stopPropagation();
    let newRowData = {
      itemName: "",
      qty: "",
      priceUnit: 0,
      amount: "",

      hsnCode: "",
      discountAmount: 0,
      discountpersant: 0,
      taxPersant: "",
    };
    setExpenseItems((prev) => [...prev, newRowData]);
  };
  // Delete Row Function
  const handleDeleteRow = (e, index) => {
    e.stopPropagation();
    const deletedRowdata = expenseItems.filter((_, ind) => ind != index);
    setExpenseItems(deletedRowdata);
  };

  // Submit Function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loadingAddExpense) {
      let formData = {
        ...expenseData,
        [withGST ? "expenseCategory" : "expCat"]: expenseData?.category,
        expItem: expenseItems,
        paymentType: paymentArr,
      };
      if (withGST) {
        return toast({
          title: "Adding Expense with GST is under developement!",
          status: "warning",
        });
      }
      AddExpense(dispatch, withGST, formData, setOpenForm, toast);
      console.log("expenseData", formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onClick={() => setShowCategoryMenu(false)}
      className={css.formOuter}
    >
      {showAddCategoryForm && (
        <CategoryForm setShowForm={setShowAddCategoryForm} />
      )}
      {showItemForm && <ItemForm setShowForm={setShowItemForm} />}

      <div className={css.topheader}>
        <p>Expense</p>
        {/* <div>
          <h4
            style={{
              color: withGST ? "var(--blueA)" : "black",
              marginLeft: "20px",
              marginRight: "-10px",
            }}
          >
            GST
          </h4>
          <div
            style={{ borderLeft: "none" }}
            className={css.checkbox_wrapper_14}
          >
            <input
              id="s1-14"
              type="checkbox"
              checked={withGST}
              onChange={(e) => setWithGST((prev) => !prev)}
              className={css.switch}
            />
          </div>
        </div> */}
      </div>

      <div className={css.ContentContainerDiv}>
        {/* Middle  */}
        <div className={css.middleOuter}>
          <div className={css.leftSideCont}>
            {withGST && (
              <div className={css.selectOuter}>
                <select
                  name="partyName"
                  value={currentCustomerData?._id}
                  onChange={(e) => {
                    e.stopPropagation();
                    const currentPartyData = partiesData.filter(
                      (item) => item._id == e.target.value
                    );
                    if (currentPartyData.length > 0) {
                      setCurrentCustomerData(currentPartyData[0]);
                    }
                    handleInputChange(e);
                  }}
                  className={css.selectTag}
                  required
                >
                  <option value="">"Search by Name/Phone"</option>
                  {partiesLoading ? (
                    <option value="">Loading Parties</option>
                  ) : (
                    partiesData?.map((item, ind) => (
                      <option value={item._id} key={ind + item._id}>
                        {item?.partyName}
                      </option>
                    ))
                  )}
                </select>
              </div>
            )}
            {/* Category */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setShowCategoryMenu(true);
              }}
              className={css.cateOuterCont}
            >
              <div className={css.inputDiv}>
                <div
                  onClick={() => setShowCategoryMenu(true)}
                  className={css.menuInpCss}
                >
                  <h3>{currCategoryName}</h3>
                </div>
                <label
                  className={
                    currCategoryName
                      ? css.activeMenuLabel
                      : css.inactiveMenuLabel
                  }
                >
                  Category
                </label>
              </div>
              {showCategoryMenu && (
                <div
                  onClick={() => setShowCategoryMenu(true)}
                  className={css.menuOuter}
                >
                  <div
                    onClick={() => setShowAddCategoryForm(true)}
                    className={css.topCateItemDiv}
                  >
                    <PlusIconThin />
                    <h3>Add Category</h3>
                  </div>
                  {isLoading ? (
                    <div className={css.topCateItemDiv}>
                      <h3 style={{ color: "var(--greyA)" }}>Loading...</h3>
                    </div>
                  ) : (
                    <div className={css.cateItemContDiv}>
                      {categoryData?.map((item, ind) => (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            if (expenseData?.category == item?._id) {
                              setExpenseData((prev) => {
                                return { ...prev, category: "" };
                              });
                              setCurrCategoryName("");
                              setShowCategoryMenu(false);
                            } else {
                              setExpenseData((prev) => {
                                return { ...prev, category: item?._id };
                              });
                              setCurrCategoryName(item?.expName);
                              setShowCategoryMenu(false);
                            }
                          }}
                          className={css.cateItemCss}
                          key={item?._id + ind}
                        >
                          <input
                            type="checkbox"
                            checked={expenseData?.category == item?._id}
                            onChange={() => ""}
                          />
                          <h3>{item?.expName}</h3>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className={css.rightSideCont}>
            <div>
              <p>{withGST ? "Bill Date" : "Date"}</p>
              <input
                type="date"
                value={expenseData.billDate}
                className={css.invoiceDateSelectInp}
                onChange={(e) => handleInputChange(e)}
                name="date"
                placeholder="Date"
                // defaultValue={new Date().toISOString().split("T")[0]}
                // readOnly
              />
            </div>
            {withGST && (
              <div>
                <p>Payment Terms</p>
                <select
                  required
                  name="paymentTerms"
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="">Due On Recipt</option>
                  <option value="net 15">Net 15</option>
                  <option value="net 30">Net 30</option>
                  <option value="net 45">Net 45</option>
                  <option value="net 60">Net 60</option>
                </select>
              </div>
            )}
            {withGST && (
              <div>
                <p>Due Date</p>
                <input
                  required
                  type="date"
                  placeholder="Due Date"
                  className={css.invoiceDateSelectInp}
                  onChange={(e) => handleInputChange(e)}
                  value={expenseData?.dueDate}
                  name="dueDate"
                />
              </div>
            )}
            {withGST && (
              <div>
                <p>State of supply</p>
                <select
                  name="stateOfSupply"
                  id=""
                  className={css.invoiceDateSelectInp}
                  onChange={(e) => handleInputChange(e)}
                  value={expenseData?.stateOfSupply}
                  required
                >
                  <option value="">State</option>
                  {sortedStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Items Section */}
        <div className={css.ItemsOuter}>
          <table>
            <thead>
              <tr>
                <th className={css.serialNumberHead}>#</th>
                <th className={css.itemNameHead}>ITEM</th>
                {withGST && <th className={css.unitHead}>HSN CODE</th>}
                <th className={css.qtyHead}>QTY</th>
                <th className={css.priceUnitHead}>
                  <p>PRICE/UNIT</p>
                </th>
                {withGST && (
                  <th className={css.discountHead}>
                    <p>Discount</p>
                    <div>
                      <p className={css.precentageIconHead}>%</p>
                      <p className={css.amountHead}>AMOUNT</p>
                    </div>
                  </th>
                )}
                {withGST && (
                  <th className={css.taxHead}>
                    <p>TAX</p>
                    <div>
                      <p className={css.precentageIconHead}>%</p>
                      <p className={css.amountHead}>AMOUNT</p>
                    </div>
                  </th>
                )}
                <th className={css.amountHead}>
                  <div>
                    <p>Amount</p>
                    {/* <PlusIcon /> */}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {expenseItems?.map((item, ind) =>
                withGST ? (
                  <WithGstItemRow
                    ind={ind}
                    item={item}
                    items={items}
                    expenseItems={expenseItems}
                    setExpenseItems={setExpenseItems}
                    showItemsListMenu={showItemsListMenu}
                    setShowItemsListMenu={setShowItemsListMenu}
                    indexSaleItem={indexSaleItem}
                    setIndexSaleItem={setIndexSaleItem}
                    setShowItemForm={setShowItemForm}
                    handleDeleteRow={handleDeleteRow}
                    handleMenuItemClick={handleMenuItemClick}
                    key={item?._id + ind}
                  />
                ) : (
                  <WithOutGstItemRow
                    ind={ind}
                    item={item}
                    expenseItems={expenseItems}
                    Expand
                    Down
                    setExpenseItems={setExpenseItems}
                    handleDeleteRow={handleDeleteRow}
                    handleMenuItemClick={handleMenuItemClick}
                    setShowItemsListMenu={setShowItemsListMenu}
                    setShowItemForm={setShowItemForm}
                    setIndexSaleItem={setIndexSaleItem}
                    items={items}
                    getAllItemsLoading={getAllItemsLoading}
                    showItemsListMenu={showItemsListMenu}
                    indexSaleItem={indexSaleItem}
                    stateChanged={stateChanged}
                    withGST={withGST}
                    key={ind + item?._id}
                  />
                )
              )}
              <tr className={css.addRowTr}>
                <td></td>
                <td>
                  <div className={css.actualAddRowTd}>
                    <button onClick={handleAddRow} type="button">
                      ADD ROW
                    </button>
                    <p>Total</p>
                  </div>
                </td>
                {withGST && <td></td>}
                <td className={css.addRowChildTd}>{rowFooterData?.totalQty}</td>
                <td></td>
                {withGST && (
                  <td className={css.addRowChildTd}>
                    {rowFooterData?.totalDiscountAmount}
                  </td>
                )}
                {withGST && (
                  <td className={css.addRowChildTd}>
                    {rowFooterData?.totalTaxAmount}
                  </td>
                )}
                <td className={css.addRowChildTd}>
                  {rowFooterData?.totalAmount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Bottom Section */}
        <div
          style={{
            marginTop: showItemsListMenu ? "100px" : "0px",
            transition: "margin-top 0.5s ease-in",
          }}
          className={css.bottomSectionOuter}
        >
          <div className={css.bottomLeftSideCont}>
            <div
              style={{
                display: "flex",
                alignItems: "Center",
                gap: "40px",
                zIndex: 600,
              }}
            >
              <div style={{ position: "relative", zIndex: 600 }}>
                <Menu
                  offset={[0, 0]}
                  onOpen={() => setTopMarginAddDescInp("110px")}
                  onClose={() => setTopMarginAddDescInp("0px")}
                >
                  <MenuButton
                    as={Button}
                    className={css.PartyTypeMenuBtn}
                    rightIcon={<ArrowDown />}
                    style={{ width: "150px" }}
                    type="button"
                  >
                    {paymentTypeSelectTag}
                  </MenuButton>
                  <p className={css.PartyTypelabel}>Payment Type</p>
                  <MenuList className={css.menuListCss}>
                    <MenuItem className={css.AddBankAccount}>
                      <PlusIcon />
                      Add Bank A/C
                    </MenuItem>
                    <MenuItem
                      style={{
                        color:
                          paymentTypeSelectTag == "Cash"
                            ? "var(--blueB)"
                            : "var(--greyA)",
                        background:
                          paymentTypeSelectTag == "Cash"
                            ? "var(--greyB)"
                            : "white",
                      }}
                      onClick={() => {
                        setPaymentArr([
                          {
                            types: "Cash",
                            amount: rowFooterData?.totalAmount,
                          },
                        ]);
                        setPaymentTypeSelectTag("Cash");
                      }}
                      className={css.menuItemCss}
                    >
                      Cash
                    </MenuItem>
                    <MenuItem
                      style={{
                        color:
                          paymentTypeSelectTag == "Cheque"
                            ? "var(--blueB)"
                            : "var(--greyA)",
                        background:
                          paymentTypeSelectTag == "Cheque"
                            ? "var(--greyB)"
                            : "white",
                      }}
                      onClick={() => {
                        setPaymentArr([
                          {
                            types: "Cheque",
                            amount: rowFooterData?.totalAmount,
                            refNo: checkReferenceInpval,
                          },
                        ]);
                        setPaymentTypeSelectTag("Cheque");
                      }}
                      className={css.menuItemCss}
                    >
                      Cheque
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>

              {toggleCheckReferenceInp && (
                <div className={css.inputDiv} style={{ zIndex: 600 }}>
                  <input
                    type="number"
                    value={checkReferenceInpval}
                    name="checkReferenceInpval"
                    onChange={(e) => setCheckReferenceInpval(e.target.value)}
                    className={css.BottomInput}
                    style={{ width: "150px", zIndex: 600 }}
                  />
                  <label
                    style={{
                      background: "var(--greyB)",
                      zIndex: 600,
                    }}
                    className={
                      checkReferenceInpval
                        ? css.BottomInpActiveLabel
                        : css.BottomInpInactiveLabel
                    }
                  >
                    Reference No.
                  </label>
                </div>
              )}
            </div>
            {toggleDesc ? (
              <div
                className={css.inputDiv}
                style={{ marginTop: topMarginAddDescInp }}
              >
                <textarea
                  value={expenseData.addDescription}
                  name="addDescription"
                  onChange={handleInputChange}
                  className={css.input}
                  style={{
                    height: "110px",
                    width: "230px",
                  }}
                  required
                />
                <label
                  htmlFor="addDescription"
                  className={
                    expenseData.addDescription
                      ? css.activeLabel
                      : css.inactiveLabel
                  }
                >
                  Description
                </label>
              </div>
            ) : (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setToggleDesc(true);
                }}
                className={css.addDecriptionDiv}
                style={{
                  width: "150px",
                }}
              >
                <AddDecriptionIcon />
                <p>ADD DESCRIPTION</p>
              </div>
            )}
            <div className={css.addDecriptionDiv} style={{ width: "150px" }}>
              <AddCameraIcon />
              <input type="file" />
              <p>ADD IMAGE</p>
            </div>
            <div className={css.addDecriptionDiv} style={{ width: "150px" }}>
              <input type="file" />
              <AddDocumentIcon />
              <p>ADD DOCUMENT</p>
            </div>
          </div>

          <div className={css.bottomRightSideCont}>
            <div className={css.rightSideUpperInputsDiv}>
              <div className={css.roundOffDiv}>
                {toggleRoundOff ? (
                  <CheckedBox
                    onClick={(e) => {
                      e.stopPropagation();
                      setToggleRoundOff((prev) => !prev);
                    }}
                    className={css.checkedInpRoundOff}
                  />
                ) : (
                  <EmptyCheckedBox
                    className={css.unCheckedInpRoundOff}
                    onClick={(e) => {
                      e.stopPropagation();
                      setToggleRoundOff((prev) => !prev);
                    }}
                  />
                )}
                <p>Round Off</p>
                <input
                  type="number"
                  placeholder="0"
                  value={
                    toggleRoundOff
                      ? rowFooterData.totalAmount -
                        Math.round(rowFooterData.totalAmount)
                      : ""
                  }
                  disabled
                  className={css.roundOffNumInp}
                />
              </div>
              <div className={css.totalBottomDiv}>
                <p>Total</p>
                <input
                  type="number"
                  name="total"
                  value={
                    toggleRoundOff
                      ? Math.round(rowFooterData?.totalAmount)
                      : rowFooterData?.totalAmount
                  }
                  onChange={handleInputChange}
                  readOnly
                  disabled
                />
              </div>
            </div>

            <div className={css.bottomRecievedOuterDiv}>
              <div className={css.totalBottomDiv}>
                <p>Received</p>
                <input
                  type="number"
                  placeholder="0"
                  disabled={!toggleReceived}
                  value={expenseData?.recived}
                  name="recived"
                  onChange={handleInputChange}
                />
              </div>
              {toggleReceived ? (
                <CheckedBox
                  onClick={(e) => {
                    e.stopPropagation();
                    setToggleReceived((prev) => !prev);
                  }}
                  className={css.checkedInpRoundOff}
                />
              ) : (
                <EmptyCheckedBox
                  className={css.unCheckedInpRoundOff}
                  onClick={(e) => {
                    e.stopPropagation();
                    setToggleReceived((prev) => !prev);
                  }}
                />
              )}
            </div>

            <div className={css.bottomBalanceOuterDiv}>
              <div>
                <span></span>
                <p>Balance</p>
                <p>{balanceAmount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={css.FooterOuter}>
        <button disabled={loadingAddExpense} type="submit">
          {loadingAddExpense ? "Saving" : "Save"}
        </button>
        {/* <div
          className={css.shareBtn}
          onClick={() =>
            toast({
              title: "Feature currently in development",
              status: "info",
              position: "top",
            })
          }
        >
          <p>Share</p>
          <ArrowDown />
        </div> */}
      </div>
    </form>
  );
};
export default AddExpenses;
