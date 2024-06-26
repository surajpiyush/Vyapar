import css from "../../styles/SalesStyles/SalesForms.module.css";
import ItemsForm from "../../components/addForm/ItemsForm";

import {
  CalculateFinalAmount,
  PostSalesInvoice,
} from "../../Redux/sales/action";
import { GetAllItems } from "../../Redux/items/actions";
import { FetchAllParties } from "../../Redux/parties/actions";

import {
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown as ArrowDown } from "react-icons/io";
import { FiPlusCircle as PlusIcon } from "react-icons/fi";
import { AiFillFileAdd as AddDecriptionIcon } from "react-icons/ai";
import { HiMiniDocumentText as AddDocumentIcon } from "react-icons/hi2";
import { BiSolidCameraPlus as AddCameraIcon } from "react-icons/bi";
import { ImCheckboxUnchecked as EmptyCheckedBox } from "react-icons/im";
import { BiSolidCheckboxChecked as CheckedBox } from "react-icons/bi";
import ItemsTableBody from "../../pages/sales/salesInvoice/ItemsTableBody";

const PurchaseForm = ({ setOpenForm }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const partiesLoading = useSelector((state) => state.PartiesReducer.isLoading);
  const togglePartiesData = useSelector(
    (state) => state.PartiesReducer.togglePartiesData
  );
  const partiesData = useSelector((state) => state.PartiesReducer.partiesData);
  const toggleItems = useSelector((state) => state.ItemReducer.toggleItems);
  const getAllItemsLoading = useSelector(
    (state) => state.ItemReducer.getAllItemsLoading
  );
  const invoicesList = useSelector((state) => state.SalesReducer.invoicesList);
  const items = useSelector((state) => state.ItemReducer.items);

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
  const [receiveAmount, setReceiveAmount] = useState("");
  const [balanceAmount, setBalanceAmount] = useState("");

  const [invoiceItems, setInvoiceItems] = useState([
    {
      itemName: "",
      qty: "",
      unit: "",
      priceUnit: "",
      discountpersant: "",
      discountAmount: "",
      taxPersant: "",
      taxAmount: "",
      amount: "",
    },
  ]);
  const [invoiceData, setInvoiceData] = useState({
    type: "Credit",
    status: "Pending",
    customerName: "",
    billingAddress: "",
    billingName: "",
    phoneNumber: "",
    invoiceNumber: invoicesList.length + 1 || "",
    invoiceDate: new Date().toISOString().split("T")[0],
    stateOfSupply: "",
    priceUnitWithTax: "false",
    addDescription: "",
    total: "",
    recived: "",
    balance: "",
  });

  // Update total footer values
  useEffect(() => {
    let footerObj = {
      totalQty: 0,
      totalDiscountAmount: 0,
      totalTaxAmount: 0,
      totalAmount: 0,
    };
    invoiceItems?.forEach((item) => {
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
      }
    });
    footerObj.totalDiscountAmount = footerObj.totalDiscountAmount.toFixed(2);
    footerObj.totalTaxAmount = footerObj.totalTaxAmount.toFixed(2);
    footerObj.totalAmount = footerObj.totalAmount.toFixed(2);
    setRowFooterData(footerObj);
  }, [
    invoiceItems[indexSaleItem]?.qty,
    invoiceItems[indexSaleItem]?.priceUnit,
    invoiceItems[indexSaleItem]?.discountpersant,
    invoiceItems[indexSaleItem]?.discountAmount,
    invoiceItems[indexSaleItem]?.taxPersant,
    invoiceItems[indexSaleItem]?.taxAmount,
    invoiceItems[indexSaleItem]?.amount,
  ]);

  // Submit Request Function
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...invoiceData,
      priceUnitWithTax: invoiceData?.priceUnitWithTax == "true",
      sale: invoiceItems,
      balance:
        balanceAmount || toggleRoundOff
          ? Math.round(rowFooterData?.totalAmount)
          : rowFooterData?.totalAmount,
      total: toggleRoundOff
        ? Math.round(rowFooterData?.totalAmount)
        : rowFooterData?.totalAmount,
      // paymentType: [
      //   { type: paymentTypeSelectTag, amount: 0 },
      //   { type: "Cheque", amount: 0, refreanceNo: "Test" },
      //   {
      //     type: "XYZ",
      //     accountName: "ABC",
      //     openingBalance: 100,
      //     asOfDate: "2024-02-01",
      //   },
      // ],
      // paymentType: [
      //   {
      //     cash: 150,
      //     cheque: {
      //       refreanceNo: "CHK123",
      //       checkAmount: 200,
      //     },
      //     bankDetail: {
      //       accountName: "Account Name",
      //       openingBalance: 1000,
      //       asOfDate: "2024-02-09",
      //     },
      //   },
      // ],
    };
    //  console.log("data", data);

    // PostSalesInvoice(dispatch, toast, data, setOpenForm);
  };

  // for fetching all parties list on form mount
  useEffect(() => {
    FetchAllParties(dispatch);
  }, [togglePartiesData]);

  // for fetching all items list on form mount
  useEffect(() => {
    dispatch(GetAllItems());
  }, [toggleItems]);

  // for changing current firm data
  useEffect(() => {
    let obj = {
      customerName: currentCustomerData?.partyName || "",
      billingName: currentCustomerData?.partyName || "",
      phoneNumber: currentCustomerData?.phoneNumber || "",
      billingAddress: currentCustomerData?.billingAddress || "",
      openingBalance: currentCustomerData?.openingBalance || "",
    };
    setInvoiceData((prev) => {
      return { ...prev, ...obj };
    });
  }, [currentCustomerData]);

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
    const { name, value } = e.target;
    setInvoiceData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // Found items list click handler
  const handleMenuItemClick = (index, itemDetail) => {
    let currSaleItem = {
      ...invoiceItems[index],
      itemId: itemDetail?._id,
      itemName: itemDetail?.itemName,
      taxPersant: itemDetail?.taxRate.split("%")[0] || "",
    };
    let newSaleData = invoiceItems.map((ite, ind) =>
      ind == index ? currSaleItem : ite
    );
    setInvoiceItems(newSaleData);
  };

  // for changing balance amount
  useEffect(() => {
    let initAmount = toggleRoundOff
      ? Math.round(rowFooterData?.totalAmount)
      : rowFooterData?.totalAmount;
    let recieved = invoiceData?.recived || 0;
    let bal = initAmount - recieved;
    setBalanceAmount(
      bal.toFixed(2) ? bal.toFixed(2) : rowFooterData?.totalAmount
    );
  }, [invoiceData?.recived, toggleRoundOff, rowFooterData?.totalAmount]);

  // Add Row Function
  const handleAddRow = (e) => {
    e.stopPropagation();
    let newRowData = {
      itemName: "",
      qty: "",
      unit: "",
      priceUnit: "",
      discountpersant: "",
      discountAmount: "",
      taxPersant: "",
      taxAmount: "",
      amount: "",
    };
    setInvoiceItems((prev) => [...prev, newRowData]);
  };
  // Delete Row Function
  const handleDeleteRow = (e, index) => {
    e.stopPropagation();
    const deletedRowdata = invoiceItems.filter((_, ind) => ind != index);
    setInvoiceItems(deletedRowdata);
  };
  return (
    <form onSubmit={handleSubmit} className={css.formOuter}>
      <div className={css.topheader}>
        <p>Sale</p>
        <div>
          <h4
            style={{
              color: invoiceData.type == "Credit" ? "var(--blueA)" : "black",
            }}
          >
            Credit
          </h4>
          <div className={css.checkbox_wrapper_14}>
            <input
              id="s1-14"
              type="checkbox"
              className={css.switch}
              checked={invoiceData.type == "Cash"}
              onChange={(e) =>
                setInvoiceData((prev) => {
                  return {
                    ...prev,
                    type: e.target.checked ? "Cash" : "Credit",
                  };
                })
              }
            />
          </div>
          <h4
            style={{
              color: invoiceData.type == "Cash" ? "var(--blueA)" : "black",
            }}
          >
            Cash
          </h4>
        </div>
      </div>

      <div className={css.ContentContainerDiv}>
        {showItemForm && <ItemsForm closeForm={setShowItemForm} />}

        {/* Middle  */}
        <div className={css.middleOuter}>
          <div className={css.leftSideCont}>
            <div className={css.selectOuter}>
              <select
                name="customerName"
                value={currentCustomerData?._id}
                onChange={(e) => {
                  e.stopPropagation();
                  const currentPartyData = partiesData.filter(
                    (item) => item._id == e.target.value
                  );
                  if (currentPartyData.length > 0) {
                    setCurrentCustomerData(currentPartyData[0]);
                  }
                }}
                className={css.selectTag}
                required
              >
                <option value="">
                  {invoiceData.type == "Credit"
                    ? "Search by Name/Phone"
                    : "Billing Name (Optional)"}
                </option>
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
            <div className={css.inputDiv}>
              <input
                type="number"
                value={invoiceData.phoneNumber}
                name="phoneNumber"
                onChange={handleInputChange}
                className={css.input}
                required
              />
              <label
                htmlFor=""
                className={
                  invoiceData.phoneNumber ? css.activeLabel : css.inactiveLabel
                }
              >
                Phone No.
              </label>
            </div>
            <div className={css.inputDiv}>
              <textarea
                value={invoiceData.billingAddress}
                name="billingAddress"
                onChange={handleInputChange}
                className={css.input}
                style={{ height: "110px", width: "230px" }}
                required
              />
              <label
                htmlFor=""
                className={
                  invoiceData.billingAddress
                    ? css.activeLabel
                    : css.inactiveLabel
                }
              >
                Billing Address
              </label>
            </div>
          </div>

          <div className={css.rightSideCont}>
            <div>
              <p>Invoice Number</p>
              <input
                type="text"
                placeholder="1"
                name="invoiceNumber"
                value={invoiceData?.invoiceNumber}
                onChange={handleInputChange}
                className={css.invoiceNumInp}
                required
              />
            </div>
            <div>
              <p>Invoice Date</p>
              <input
                type="date"
                placeholder="Invoice Date"
                name="invoiceDate"
                value={invoiceData?.invoiceDate}
                onChange={handleInputChange}
                className={css.invoiceDateSelectInp}
              />
            </div>
            <div>
              <p>State of supply</p>
              <select
                name="stateOfSupply"
                value={invoiceData?.stateOfSupply}
                onChange={handleInputChange}
                className={css.invoiceDateSelectInp}
                required
              >
                <option value="">State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Andaman and Nicobar Islands">
                  Andaman and Nicobar Islands
                </option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Dadra and Nagar Haveli">
                  Dadra and Nagar Haveli
                </option>
                <option value="Daman and Diu">Daman and Diu</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Delhi">Delhi</option>
                <option value="Puducherry">Puducherry</option>
              </select>
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className={css.ItemsOuter}>
          <table>
            <thead>
              <tr>
                <th className={css.serialNumberHead}>#</th>
                <th className={css.itemNameHead}>ITEM</th>
                <th className={css.qtyHead}>QTY</th>
                <th className={css.unitHead}>UNIT</th>
                <th className={css.priceUnitHead}>
                  <p>PRICE/UNIT</p>
                  <select
                    name="priceUnitWithTax"
                    value={invoiceData.priceUnitWithTax}
                    onChange={handleInputChange}
                  >
                    <option value="false">Without Tax</option>
                    <option value="true">With Tax</option>
                  </select>
                </th>
                <th className={css.discountHead}>
                  <p>Discount</p>
                  <div>
                    <p className={css.precentageIconHead}>%</p>
                    <p className={css.amountHead}>AMOUNT</p>
                  </div>
                </th>
                <th className={css.taxHead}>
                  <p>TAX</p>
                  <div>
                    <p className={css.precentageIconHead}>%</p>
                    <p className={css.amountHead}>AMOUNT</p>
                  </div>
                </th>
                <th className={css.amountHead}>
                  <div>
                    <p>Amount</p>
                    <PlusIcon />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems?.map((item, ind) => {
                return (
                  <ItemsTableBody
                    ind={ind}
                    item={item}
                    invoiceItems={invoiceItems}
                    setInvoiceItems={setInvoiceItems}
                    handleDeleteRow={handleDeleteRow}
                    handleMenuItemClick={handleMenuItemClick}
                    setShowItemsListMenu={setShowItemsListMenu}
                    setShowItemForm={setShowItemForm}
                    setIndexSaleItem={setIndexSaleItem}
                    items={items}
                    getAllItemsLoading={getAllItemsLoading}
                    showItemsListMenu={showItemsListMenu}
                    indexSaleItem={indexSaleItem}
                    key={ind}
                  />
                );
              })}
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
                <td className={css.addRowChildTd}>{rowFooterData?.totalQty}</td>
                <td></td>
                <td></td>
                <td className={css.addRowChildTd}>
                  {rowFooterData?.totalDiscountAmount}
                </td>
                <td className={css.addRowChildTd}>
                  {rowFooterData?.totalTaxAmount}
                </td>
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
              {rowFooterData?.totalAmount > 0 && (
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
                        onClick={() => setPaymentTypeSelectTag("Cash")}
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
                        onClick={() => setPaymentTypeSelectTag("Cheque")}
                        className={css.menuItemCss}
                      >
                        Cheque
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              )}
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
                    style={{ background: "var(--greyB)", zIndex: 600 }}
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
                  value={invoiceData.addDescription}
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
                    invoiceData.addDescription
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
            <div
              onClick={(e) => {
                e.stopPropagation();
                toast({
                  title: "Feature currently in development",
                  status: "info",
                  position: "top",
                });
              }}
              className={css.addDecriptionDiv}
              style={{ width: "150px" }}
            >
              <AddCameraIcon />
              <p>ADD IMAGE</p>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                toast({
                  title: "Feature currently in development",
                  status: "info",
                  position: "top",
                });
              }}
              className={css.addDecriptionDiv}
              style={{ width: "150px" }}
            >
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
            {rowFooterData?.totalAmount > 0 && (
              <div className={css.bottomRecievedOuterDiv}>
                <div className={css.totalBottomDiv}>
                  <p>Received</p>
                  <input
                    type="number"
                    placeholder="0"
                    disabled={!toggleReceived}
                    value={invoiceData?.recived}
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
            )}
            {rowFooterData?.totalAmount > 0 && (
              <div className={css.bottomBalanceOuterDiv}>
                <div>
                  <span></span>
                  <p>Balance</p>
                  <p>{balanceAmount}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={css.FooterOuter}>
        <button type="submit">{isLoading ? "Saving" : "Save"}</button>
        <div
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
        </div>
      </div>
    </form>
  );
};

export default PurchaseForm;
