import css from "../../../styles/SalesStyles/SalesForms.module.css";
import { PostSalesInvoice } from "../../../Redux/sales/action";
import { FetchAllParties } from "../../../Redux/parties/actions";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiPlusCircle as PlusIcon } from "react-icons/fi";
import { IoIosArrowDown as ArrowDown } from "react-icons/io";
import { MdDelete as DeleteIcon } from "react-icons/md";
import { TbArrowsMove as MoveIcon } from "react-icons/tb";
import { AiFillFileAdd as AddDecriptionIcon } from "react-icons/ai";
import { HiMiniDocumentText as AddDocumentIcon } from "react-icons/hi2";
import { BiSolidCameraPlus as AddCameraIcon } from "react-icons/bi";
import { ImCheckboxUnchecked as EmptyCheckedBox } from "react-icons/im";
import { BiSolidCheckboxChecked as CheckedBox } from "react-icons/bi";

const InvoiceForm = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const partiesLoading = useSelector((state) => state.PartiesReducer.isLoading);
  const partiesData = useSelector((state) => state.PartiesReducer.partiesData);

  const [toggleDesc, setToggleDesc] = useState(false);
  const [toggleRoundOff, setToggleRoundOff] = useState(false);
  const [toggleReceived, setToggleReceived] = useState(false);
  const [toggleCheckReferenceInp, setToggleCheckReferenceInp] = useState(false);
  const [paymentTypeSelectTag, setPaymentTypeSelectTag] = useState("Cash");
  const [checkReferenceInpval, setCheckReferenceInpval] = useState("");

  const [invoiceData, setInvoiceData] = useState({
    type: "Credit",
    status: "Pending",
    customerName: "",
    billingName: "John Doe",
    billingAddress: "",
    phoneNumber: "",
    eWayBill: "ABC123456",
    poNo: "PO123",
    poDate: "2024-02-09",
    invoiceNumber: "INV123",
    invoiceDate: "2024-02-09",
    time: "10:00 AM",
    paymentTerm: "Net 30",
    dueDate: "2024-03-10",
    stateOfSupply: "Some State",
    priceUnitWithTax: true,
    sale: [
      {
        category: "Category A",
        itemName: "mobile",
        itemCode: "ABC123",
        hsnCode: "HSN123",
        serialNo: "S123",
        description: "Description of item 1",
        batchNo: 1,
        modelNo: 123,
        expDate: "2025-02-09",
        mfgDate: "2023-01-01",
        customField: "Custom Field Value",
        size: "Size A",
        qty: 2,
        unit: "None",
        priceUnit: 100,
        discountpersant: 5,
        discountAmount: 10,
        taxPersant: "5%",
        taxAmount: 5,
        amount: 195,
      },
    ],
    paymentType: [
      {
        cash: 150,
        cheque: {
          refreanceNo: "CHK123",
          checkAmount: 200,
        },
        bankDetail: {
          accountName: "Account Name",
          openingBalance: 1000,
          asOfDate: "2024-02-09",
        },
      },
    ],
    addDescription: "",
    discount: {
      discountPersent: 10,
      discountAmount: 20,
    },
    tax: {
      tax: "5%",
      taxamount: 5,
    },
    roundOff: 0,
    total: 0,
    recived: 350,
    balance: -155,
    firmId: "609c17662c40e244bc6ebd4a",
    userId: "609c17662c40e244bc6ebd4b",
  });
  /* Payment Type
 paymentType: [
      {
        cash: 150,
        cheque: {
          refreanceNo: "CHK123",
          checkAmount: 200,
        },
        bankDetail: {
          accountName: "Account Name",
          openingBalance: 1000,
          asOfDate: "2024-02-09",
        },
      },
    ],
  */

  // for fetching all parties list on form mount
  useEffect(() => {
    FetchAllParties(dispatch);
  }, []);

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

  const handleSubmit = () => {
    const data = { type: invoiceData.type };
    console.log("data", data);

    // PostSalesInvoice(dispatch, invoiceData,toast,);
  };

  // Add Row Function
  const handleAddRow = (e) => {
    e.stopPropagation();
    setInvoiceData((prev) => {
      let newRowData = {
        category: "Category A",
        itemName: "mobile",
        itemCode: "ABC123",
        hsnCode: "HSN123",
        serialNo: "S123",
        description: "Description of item 1",
        batchNo: 1,
        modelNo: 123,
        expDate: "2025-02-09",
        mfgDate: "2023-01-01",
        customField: "Custom Field Value",
        size: "Size A",
        qty: 2,
        unit: "None",
        priceUnit: 100,
        discountpersant: 5,
        discountAmount: 10,
        taxPersant: "5%",
        taxAmount: 5,
        amount: 195,
      };
      let obj = { ...prev, sale: [...prev.sale, newRowData] };
      return obj;
    });
  };

  // Delete Row Function
  const handleDeleteRow = (e, index, item) => {
    e.stopPropagation();
    const deletedRowdata = invoiceData.sale.filter((ite, ind) => ind != index);
    setInvoiceData((prev) => {
      return { ...prev, sale: deletedRowdata };
    });
  };
  return (
    <div className={css.formOuter}>
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
        {/* Middle  */}
        <div className={css.middleOuter}>
          <div className={css.leftSideCont}>
            <div className={css.selectOuter}>
              <select
                name="customerName"
                value={invoiceData.customerName}
                onChange={handleInputChange}
                className={css.selectTag}
                placeholder="test"
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
                    <option value={item.partyName} key={ind + item._id}>
                      {item.partyName}
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
            {invoiceData.type == "Cash" && (
              <div className={css.inputDiv}>
                <textarea
                  value={invoiceData.billingAddress}
                  name="billingAddress"
                  onChange={handleInputChange}
                  className={css.input}
                  style={{ height: "110px", width: "230px" }}
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
            )}
          </div>

          <div className={css.rightSideCont}>
            <div>
              <p>Invoice Number</p>
              <input
                type="text"
                placeholder="1"
                className={css.invoiceNumInp}
              />
            </div>
            <div>
              <p>Invoice Date</p>
              <input
                type="date"
                placeholder="Invoice Date"
                className={css.invoiceDateSelectInp}
              />
            </div>
            <div>
              <p>State of supply</p>
              <select
                name="stateofsupply"
                id=""
                className={css.invoiceDateSelectInp}
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
                  <select name="" id="">
                    <option value="">Without Tax</option>
                    <option value="">With Tax</option>
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
              {invoiceData.sale?.map((item, ind) => (
                <tr
                  style={{
                    background:
                      ind % 2 == 0 ? "var(--greyishBlue)" : "var(--greyB)",
                  }}
                  key={ind + item?.itemName}
                >
                  <td className={css.serialNumberBody}>
                    <div>
                      <MoveIcon className={css.serialIconsBody} />
                      <p>{ind + 1}</p>
                      <DeleteIcon
                        onClick={(e) => handleDeleteRow(e, ind, item)}
                        className={css.serialIconsBody}
                      />
                    </div>
                  </td>
                  <td className={css.itemNameBody}>
                    <input
                      type="text"
                      value={item.itemName}
                      className={css.tableInputs}
                    />
                  </td>
                  <td className={css.qtyBody}>
                    <input
                      type="number"
                      value={item.qty}
                      className={css.tableInputs}
                    />
                  </td>
                  <td className={css.unitBody} placeholder="None">
                    <select name="" id="">
                      <option value="">None</option>
                      <option value="Bags">Bags</option>
                      <option value="Bottles">Bottles</option>
                      <option value="Box">Box</option>
                      <option value="Bundle">Bundle</option>
                      <option value="Can">Can</option>
                    </select>
                  </td>
                  <td className={css.qtyBody}>
                    <input
                      type="number"
                      value={item.priceUnit}
                      placeholder="0"
                      className={css.tableInputs}
                    />
                  </td>
                  <td className={css.DiscountBody}>
                    <input
                      type="number"
                      value={item.discountAmount}
                      placeholder="0"
                      className={css.tableInputs}
                    />
                    <input
                      type="number"
                      value={item.discountpersant}
                      placeholder="0"
                      className={css.tableInputs}
                    />
                  </td>
                  <td className={css.ItemTaxBody}>
                    <span>
                      <div>
                        <select name="" id="">
                          <option value="">None</option>
                          <option value="IGST@0%">IGST@0%</option>
                          <option value="GST@0%">GST@0%</option>
                          <option value="IGST@0.25%">IGST@0.25%</option>
                          <option value="GST@0.25%">GST@0.25%</option>
                          <option value="IGST@3%">IGST@3%</option>
                          <option value="GST@3%">GST@3%</option>
                          <option value="IGST@5%">IGST@5%</option>
                          <option value="GST@5%">GST@5%</option>
                          <option value="IGST@12%">IGST@12%</option>
                          <option value="GST@12%">GST@12%</option>
                          <option value="IGST@18%">IGST@18%</option>
                          <option value="GST@18%">GST@18%</option>
                          <option value="IGST@28%">IGST@28%</option>
                          <option value="GST@28%">GST@28%</option>
                        </select>
                      </div>
                      <div>
                        <input
                          type="number"
                          value={item.taxAmount}
                          placeholder="0"
                          className={css.tableInputs}
                        />
                      </div>
                    </span>
                  </td>
                  <td className={css.qtyBody} contentEditable>
                    {item.amount}
                  </td>
                </tr>
              ))}
              <tr className={css.addRowTr}>
                <td></td>
                <td>
                  <div className={css.actualAddRowTd}>
                    <button onClick={handleAddRow}>ADD ROW</button>
                    <p>Total</p>
                  </div>
                </td>
                <td className={css.addRowChildTd}>1</td>
                <td></td>
                <td></td>
                <td className={css.addRowChildTd}>0</td>
                <td className={css.addRowChildTd}>0</td>
                <td className={css.addRowChildTd}>10</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bottom Section */}
        <div className={css.bottomSectionOuter}>
          <div className={css.bottomLeftSideCont}>
            <div
              style={{
                display: "flex",
                alignItems: "Center",
                gap: "40px",
              }}
            >
              {invoiceData.total >= 1 && (
                <div style={{ position: "relative" }}>
                  <Menu>
                    <MenuButton
                      as={Button}
                      className={css.PartyTypeMenuBtn}
                      rightIcon={<ArrowDown />}
                      style={{ width: "150px" }}
                    >
                      {paymentTypeSelectTag}
                    </MenuButton>
                    <p className={css.PartyTypelabel}>Party Type</p>
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
                <div className={css.inputDiv}>
                  <input
                    type="number"
                    value={checkReferenceInpval}
                    name="checkReferenceInpval"
                    onChange={(e) => setCheckReferenceInpval(e.target.value)}
                    className={css.BottomInput}
                    style={{ width: "150px" }}
                  />
                  <label
                    htmlFor=""
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
              <div className={css.inputDiv}>
                <textarea
                  value={invoiceData.addDescription}
                  name="addDescription"
                  onChange={handleInputChange}
                  className={css.input}
                  style={{ height: "110px", width: "230px" }}
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
                style={{ width: "150px" }}
              >
                <AddDecriptionIcon />
                <p>ADD DESCRIPTION</p>
              </div>
            )}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setToggleDesc(true);
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
                setToggleDesc(true);
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
                  disabled={!toggleRoundOff}
                  className={css.roundOffNumInp}
                />
              </div>
              <div className={css.totalBottomDiv}>
                <p>Total</p>
                <input
                  type="number"
                  value={invoiceData?.total}
                  name="total"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {invoiceData.total >= 1 && (
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
            {invoiceData.total >= 1 && (
              <div className={css.bottomBalanceOuterDiv}>
                <div>
                  <span></span>
                  <p>Balance</p>
                  <p>{invoiceData.total}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={css.FooterOuter}>
        <button onClick={handleSubmit} type="submit">
          {isLoading ? "Saving" : "Save"}
        </button>
        <div className={css.shareBtn}>
          <p>Share</p>
          <ArrowDown />
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
