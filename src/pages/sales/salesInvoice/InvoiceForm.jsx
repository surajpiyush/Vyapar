import css from "../../../styles/SalesStyles/SalesForms.module.css";
import {
  CalculateFinalAmount,
  PostSalesInvoice,
} from "../../../Redux/sales/action";
import { GetSingleItem, GetAllItems } from "../../../Redux/items/actions";
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
  Input,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown as ArrowDown } from "react-icons/io";
import { FiPlusCircle as PlusIcon } from "react-icons/fi";
import { MdDelete as DeleteIcon } from "react-icons/md";
import { TbArrowsMove as MoveIcon } from "react-icons/tb";
import { AiFillFileAdd as AddDecriptionIcon } from "react-icons/ai";
import { HiMiniDocumentText as AddDocumentIcon } from "react-icons/hi2";
import { BiSolidCameraPlus as AddCameraIcon } from "react-icons/bi";
import { ImCheckboxUnchecked as EmptyCheckedBox } from "react-icons/im";
import { BiSolidCheckboxChecked as CheckedBox } from "react-icons/bi";
import ItemsForm from "../../../components/addForm/ItemsForm";

const InvoiceForm = () => {
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
  const toggleGetItemSuccess = useSelector(
    (state) => state.ItemReducer.toggleGetItemSuccess
  );
  const singleItemData = useSelector(
    (state) => state.ItemReducer.singleItemData
  );

  const items = useSelector((state) => state.ItemReducer.items);

  const [toggleDesc, setToggleDesc] = useState(false);
  const [toggleRoundOff, setToggleRoundOff] = useState(false);
  const [toggleReceived, setToggleReceived] = useState(false);
  const [toggleCheckReferenceInp, setToggleCheckReferenceInp] = useState(false);
  const [paymentTypeSelectTag, setPaymentTypeSelectTag] = useState("Cash");
  const [checkReferenceInpval, setCheckReferenceInpval] = useState("");
  const [currentCustomerData, setCurrentCustomerData] = useState({});
  const [selectedpartyName, setSelectedPartyName] = useState("");
  const [topMarginAddDescriptionInp, setTopMarginAddDescriptionInp] =
    useState("");
  const [showItemsListMenu, setShowItemsListMenu] = useState(false);
  const [indexSaleItem, setIndexSaleItem] = useState(0);

  const [itemObj, setItemObj] = useState({
    itemName: "",
    qty: "",
    unit: "",
    priceUnit: "",
    discountpersant: "",
    discountAmount: "",
    taxPersant: "",
    taxAmount: "",
    amount: "",
  });
  const [itemSearchterm, setItemSearchterm] = useState("");
  const [foundItems, setFoundItems] = useState([]);
  const [itemIdToGet, setItemIdToGet] = useState("");
  const [rowFooterData, setRowFooterData] = useState({});
  const [showItemForm, setShowItemForm] = useState(false);

  const [invoiceData, setInvoiceData] = useState({
    type: "Credit",
    status: "Pending",
    customerName: "",
    billingName: "John Doe",
    billingAddress: "",
    phoneNumber: "",
    eWayBill: "ABC123456", // *
    poNo: "PO123", // *
    poDate: "2024-02-09", // *
    invoiceNumber: "",
    invoiceDate: "",
    stateOfSupply: "",
    time: "10:00 AM", // *
    paymentTerm: "Net 30", // *
    dueDate: "2024-03-10", // *
    priceUnitWithTax: "false",
    sale: [
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
        // category: "Category A",
        // itemCode: "ABC123",
        // hsnCode: "HSN123",
        // serialNo: "S123",
        //  description: "Description of item 1",
        //  batchNo: 1,
        //  modelNo: 123,
        //  expDate: "2025-02-09",
        //  mfgDate: "2023-01-01",
        //  customField: "Custom Field Value",
        //  size: "Size A",
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
    firmId: "",
    userId: "",
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

  useEffect(() => {
    let footerObj = { totalQty: 0, totalAmount: 0 };
    invoiceData?.sale?.forEach((item) => {
      if (Number(item?.qty)) {
        footerObj.totalQty += Number(item?.qty);
      }
      if (Number(item?.qty) && Number(item?.priceUnit)) {
        footerObj.totalAmount += Number(item?.qty) * Number(item?.priceUnit);
      }
    });
    //  console.log(footerObj);
    setRowFooterData(footerObj);
  }, [
    invoiceData?.sale[indexSaleItem]?.qty,
    invoiceData?.sale[indexSaleItem]?.priceUnit,
  ]);

  // Submit Request Function
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      type: invoiceData.type,
      status: "Pending",
      // invoice data need to be changed to customer id after krishna sir change it in backend
      customerName: invoiceData?.customerName,
      billingName: invoiceData?.customerName,
      billingAddress: invoiceData?.billingAddress,
      phoneNumber: invoiceData?.phoneNumber,
      invoiceNumber: invoiceData?.invoiceNumber,
      invoiceDate: invoiceData?.invoiceDate,
      stateOfSupply: invoiceData?.stateOfSupply,
      priceUnitWithTax: invoiceData?.priceUnitWithTax == "true",
      sale: invoiceData?.sale,
      firmId: invoiceData?.firmId,
      userId: invoiceData?.userId,
      addDescription: invoiceData?.addDescription,
      total: rowFooterData?.totalAmount,
      tax: {
        tax: "5%",
        taxamount: 5,
      },
      roundOff: 0,
      recived: 350,
      balance: -155,
    };
    console.log("data", data);

    PostSalesInvoice(dispatch, toast, invoiceData);
  };

  // useEffect to set current user Name
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setInvoiceData((prev) => {
      return { ...prev, userId };
    });
  }, []);

  // for fetching all parties list on form mount
  useEffect(() => {
    FetchAllParties(dispatch);
  }, [togglePartiesData]);

  // for fetching all items list on form mount
  useEffect(() => {
    dispatch(GetAllItems());
  }, [toggleItems]);

  // Search Item
  useEffect(() => {
    const regex = new RegExp(itemSearchterm, "i");
    const foundItem = items?.filter((ite) => regex.test(ite.itemName));
    setFoundItems(foundItem);
  }, [itemSearchterm]);

  // send single item get request
  useEffect(() => {
    let newSaleData = invoiceData?.sale?.map((item, ind) => {
      if (ind == indexSaleItem) {
        return itemObj;
      } else {
        return item;
      }
    });

    setInvoiceData((prev) => {
      return { ...prev, sale: newSaleData };
    });
  }, [itemIdToGet]);

  // This useEffect changes current customer/party Data
  useEffect(() => {
    const currentPartyData = partiesData.filter(
      (item) => item._id == selectedpartyName
    );
    if (currentPartyData.length > 0) {
      setCurrentCustomerData(currentPartyData[0]);
    }
  }, [selectedpartyName]);

  useEffect(() => {
    let obj = {
      customerName: currentCustomerData?.partyName || "",
      billingName: currentCustomerData?.partyName || "",
      phoneNumber: currentCustomerData?.phoneNumber || "",
      stateOfSupply: currentCustomerData?.stateOfSupply || "",
      firmId: currentCustomerData?._id || "",
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

  // Party Select tag input change
  const handlePartySelectChange = (e) => {
    e.stopPropagation();
    const { name, value } = e.target;
    setSelectedPartyName(value);
  };

  // Input Change Function
  const handleInputChange = (e) => {
    e.stopPropagation();
    const { name, value } = e.target;
    setInvoiceData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // Items Change Function
  const handleItemsChange = (e) => {
    e.stopPropagation();
    const { name, value } = e.target;
    let currSaleItem = { ...invoiceData?.sale[indexSaleItem], [name]: value };
    let newSaleData = invoiceData?.sale.map((ite, ind) =>
      ind == indexSaleItem ? currSaleItem : ite
    );
    setInvoiceData((prev) => {
      return { ...prev, sale: newSaleData };
    });
  };

  // handleNumericChanges
  const handleNumericChanges = (e, item) => {
    const { name, value } = e.target;
    // console.log("item", item);
    const ans = CalculateFinalAmount(
      item?.qty,
      item?.priceUnit,
      item?.discountpersant,
      item?.discountAmount,
      item?.taxPersant
    );

    let currSaleItem = { ...invoiceData?.sale[indexSaleItem], ...ans };
    let newSaleData = invoiceData?.sale.map((ite, ind) =>
      ind == indexSaleItem ? currSaleItem : ite
    );
    setInvoiceData((prev) => {
      return { ...prev, sale: newSaleData };
    });
  };

  // Add Row Function
  const handleAddRow = (e) => {
    e.stopPropagation();
    setInvoiceData((prev) => {
      let newRowData = {
        itemName: "",
        qty: 1,
        unit: "",
        priceUnit: 0,
        discountpersant: 0,
        discountAmount: 0,
        taxPersant: "",
        taxAmount: 0,
        amount: 0,
        // category: "",
        // itemName: "",
        // itemCode: "",
        // hsnCode: "",
        // serialNo: "",
        // description: "",
        // batchNo: 1,
        // modelNo: 1,
        // expDate: "",
        // mfgDate: "",
        // customField: "",
        // size: "",
        // qty: 1,
        // unit: "None",
        // priceUnit: "",
        // discountpersant: "",
        // discountAmount: "",
        // taxPersant: "",
        // taxAmount: "",
        // amount: "",
      };
      let obj = { ...prev, sale: [...prev.sale, newRowData] };
      return obj;
    });
  };

  // Delete Row Function
  const handleDeleteRow = (e, index, item) => {
    e.stopPropagation();
    const deletedRowdata = invoiceData.sale.filter(
      (ite, ind) => ind != indexSaleItem
    );
    setInvoiceData((prev) => {
      return { ...prev, sale: deletedRowdata };
    });
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
        {showItemForm && <ItemsForm func={setShowItemForm} />}

        {/* Middle  */}
        <div className={css.middleOuter}>
          <div className={css.leftSideCont}>
            <div className={css.selectOuter}>
              <select
                name="customerName"
                value={selectedpartyName}
                onChange={handlePartySelectChange}
                className={css.selectTag}
                placeholder="test"
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
                required
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
              {invoiceData.sale?.map((item, ind) => {
                const calculated = CalculateFinalAmount(
                  item?.qty,
                  item?.priceUnit,
                  item?.discountpersant,
                  item?.discountAmount,
                  item?.taxPersant
                );
                item = { ...item, calculated };
                // console.log("calculated", calculated);
                return (
                  <tr
                    style={{
                      background:
                        ind % 2 == 0 ? "var(--greyishBlue)" : "var(--greyB)",
                    }}
                    key={ind + item?.itemName}
                    onFocus={() => {
                      setIndexSaleItem(ind);
                      setShowItemsListMenu(true);
                    }}
                    onBlur={() => {
                      setShowItemsListMenu(false);
                    }}
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
                    <td
                      className={css.itemNameBody}
                      style={{ position: "relative" }}
                      onFocus={() => setShowItemsListMenu(true)}
                    >
                      <Menu isOpen={showItemsListMenu && ind == indexSaleItem}>
                        <input
                          type="text"
                          name="itemName"
                          value={item.itemName}
                          onChange={(e) => {
                            handleItemsChange(e);
                            setItemSearchterm(e.target.value);
                          }}
                          className={css.tableInputs}
                          required
                          onFocus={() => {
                            setIndexSaleItem(ind);
                            setShowItemsListMenu(true);
                          }}
                          onBlur={() => setShowItemsListMenu(false)}
                        />
                        <MenuList
                          style={{
                            position: "absolute",
                            marginTop: `140px`,
                          }}
                          onFocus={() => setShowItemsListMenu(true)}
                        >
                          <MenuItem onClick={() => setShowItemForm(true)}>
                            Add Item
                          </MenuItem>
                          {item?.itemName.length > 0 &&
                            foundItems?.map((item) => (
                              <MenuItem
                                key={item?._id}
                                onClick={() => {
                                  setItemObj(item);
                                  setItemIdToGet(item?._id);
                                  setShowItemsListMenu(false);
                                }}
                              >
                                {item?.itemName}
                              </MenuItem>
                            ))}
                        </MenuList>
                      </Menu>
                    </td>
                    <td className={css.qtyBody}>
                      <input
                        type="number"
                        value={item?.qty}
                        name="qty"
                        placeholder="1"
                        onChange={handleItemsChange}
                        // onChange={(e) => {
                        //   const ans = CalculateFinalAmount(
                        //     e.target.value,
                        //     item.priceUnit,
                        //     item.discountpersant,
                        //     item.discountAmount,
                        //     item.taxPersant
                        //   );
                        //   let currSaleItem = {
                        //     ...invoiceData?.sale[indexSaleItem],
                        //     ...ans,
                        //   };
                        //   let newSaleData = invoiceData?.sale.map((ite, ind) =>
                        //     ind == indexSaleItem ? currSaleItem : ite
                        //   );
                        //   setInvoiceData((prev) => {
                        //     return { ...prev, sale: newSaleData };
                        //   });
                        // }}
                        className={css.tableInputs}
                      />
                    </td>
                    <td className={css.unitBody} placeholder="None">
                      {/* <select name="" id="" >
                      <option value="">None</option>
                      <option value="Bags">Bags</option>
                      <option value="Bottles">Bottles</option>
                      <option value="Box">Box</option>
                      <option value="Bundle">Bundle</option>
                      <option value="Can">Can</option>
                    </select> */}
                      <input
                        type="text"
                        value={item.unit}
                        className={css.tableInputs}
                        name="unit"
                        placeholder="NONE"
                        onChange={handleItemsChange}
                        style={{
                          background: "transparent",
                          fontSize: "14px",
                          fontWeight: 400,
                          textAlign: "left",
                        }}
                        // required
                      />
                    </td>
                    <td className={css.qtyBody}>
                      <input
                        type="number"
                        value={item.priceUnit}
                        placeholder="0"
                        name="priceUnit"
                        onChange={handleItemsChange}
                        // onChange={(e) => {
                        //   const ans = CalculateFinalAmount(
                        //     item.qty,
                        //     e.target.value,
                        //     item.discountpersant,
                        //     item.discountAmount,
                        //     item.taxPersant
                        //   );

                        //   let currSaleItem = {
                        //     ...invoiceData?.sale[indexSaleItem],
                        //     ...ans,
                        //   };
                        //   let newSaleData = invoiceData?.sale.map((ite, ind) =>
                        //     ind == indexSaleItem ? currSaleItem : ite
                        //   );
                        //   setInvoiceData((prev) => {
                        //     return { ...prev, sale: newSaleData };
                        //   });
                        // }}
                        className={css.tableInputs}
                      />
                    </td>
                    <td className={css.DiscountBody}>
                      <input
                        type="number"
                        value={item.discountpersant}
                        placeholder="0"
                        name="discountpersant"
                        onChange={handleItemsChange}
                        // onChange={(e) => {
                        //   const ans = CalculateFinalAmount(
                        //     item.qty,
                        //     item.priceUnit,
                        //     e.target.value,
                        //     item.discountAmount,
                        //     item.taxPersant
                        //   );
                        //   let currSaleItem = {
                        //     ...invoiceData?.sale[indexSaleItem],
                        //     ...ans,
                        //   };
                        //   let newSaleData = invoiceData?.sale.map((ite, ind) =>
                        //     ind == indexSaleItem ? currSaleItem : ite
                        //   );
                        //   setInvoiceData((prev) => {
                        //     return { ...prev, sale: newSaleData };
                        //   });
                        // }}
                        className={css.tableInputs}
                      />
                      <input
                        type="number"
                        //  value={item.discountAmount}
                        value={item.discountAmount}
                        placeholder="0"
                        name="discountAmount"
                        onChange={handleItemsChange}
                        // onChange={(e) => {
                        //   const ans = CalculateFinalAmount(
                        //     item.qty,
                        //     item.priceUnit,
                        //     item.discountpersant,
                        //     e.target.value,
                        //     item.taxPersant
                        //   );
                        //   console.log("ans", ans);
                        //   let currSaleItem = {
                        //     ...invoiceData?.sale[indexSaleItem],
                        //     ...ans,
                        //   };
                        //   let newSaleData = invoiceData?.sale.map((ite, ind) =>
                        //     ind == indexSaleItem ? currSaleItem : ite
                        //   );
                        //   setInvoiceData((prev) => {
                        //     return { ...prev, sale: newSaleData };
                        //   });
                        // }}
                        className={css.tableInputs}
                      />
                    </td>
                    <td className={css.ItemTaxBody}>
                      <span>
                        <div>
                          <select
                            value={item.taxPersant}
                            name="taxPersant"
                            // onChange={(e) => {
                            //   const ans = CalculateFinalAmount(
                            //     item.qty,
                            //     item.priceUnit,
                            //     item.discountpersant,
                            //     item.discountAmount,
                            //     Number(e.target.value)
                            //   );
                            //   let currSaleItem = {
                            //     ...invoiceData?.sale[indexSaleItem],
                            //     ...ans,
                            //   };
                            //   let newSaleData = invoiceData?.sale.map(
                            //     (ite, ind) =>
                            //       ind == indexSaleItem ? currSaleItem : ite
                            //   );
                            //   setInvoiceData((prev) => {
                            //     return { ...prev, sale: newSaleData };
                            //   });
                            // }}
                            onChange={handleItemsChange}
                          >
                            <option value="">None</option>
                            <option value="0">IGST@0%</option>
                            <option value="0">GST@0%</option>
                            <option value="0.25">IGST@0.25%</option>
                            <option value="0.25">GST@0.25%</option>
                            <option value="3">IGST@3%</option>
                            <option value="3">GST@3%</option>
                            <option value="5">IGST@5%</option>
                            <option value="5">GST@5%</option>
                            <option value="12">IGST@12%</option>
                            <option value="12">GST@12%</option>
                            <option value="18">IGST@18%</option>
                            <option value="18">GST@18%</option>
                            <option value="28">IGST@28%</option>
                            <option value="28">GST@28%</option>
                          </select>
                        </div>
                        <input
                          type="number"
                          value={item.taxAmount}
                          placeholder="0"
                          name="taxAmount"
                          onChange={(e) => handleNumericChanges(e, item)}
                          className={css.tableInputs}
                          readOnly
                        />
                      </span>
                    </td>
                    <td className={css.qtyBody}>
                      <input
                        type="number"
                        value={(item?.qty * item?.priceUnit).toFixed(2)}
                        placeholder="0"
                        name="amount"
                        // onChange={(e) => {
                        //   const ans = CalculateFinalAmount(
                        //     item.qty,
                        //     item.priceUnit,
                        //     item.discountpersant,
                        //     item.discountAmount,
                        //     item.taxPersant
                        //   );
                        //   let currSaleItem = {
                        //     ...invoiceData?.sale[indexSaleItem],
                        //     ...ans,
                        //   };
                        //   let newSaleData = invoiceData?.sale.map((ite, ind) =>
                        //     ind == indexSaleItem ? currSaleItem : ite
                        //   );
                        //   setInvoiceData((prev) => {
                        //     return { ...prev, sale: newSaleData };
                        //   });
                        // }}
                        onChange={handleItemsChange}
                        className={css.tableInputs}
                        readOnly
                      />
                    </td>
                  </tr>
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
                <td className={css.addRowChildTd}>0</td>
                <td className={css.addRowChildTd}>0</td>
                <td className={css.addRowChildTd}>
                  {rowFooterData?.totalAmount}
                </td>
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
                  <Menu
                    offset={[0, 0]}
                    onOpen={() => setTopMarginAddDescriptionInp("110px")}
                    onClose={() => setTopMarginAddDescriptionInp("0px")}
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
              <div
                className={css.inputDiv}
                style={{ marginTop: topMarginAddDescriptionInp }}
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
        <button type="submit">{isLoading ? "Saving" : "Save"}</button>
        <div className={css.shareBtn}>
          <p>Share</p>
          <ArrowDown />
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
