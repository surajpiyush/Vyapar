import * as XLSX from "xlsx";
import css from "./Invoice.module.css";
import InvoiceForm from "./InvoiceForm";
import TableInvoice from "./TableInvoice";
import InvoiceGenerator from "../invoiceGenerator";
import party from "../../../assets/Images/party.jpg";
import EditableRow from "../../../Component/EditForm";
import Loader2 from "../../../Component/Loaders/Loader2";
import Setting from "../../../Component/Setting/Setting";
import Loader3 from "../../../Component/Loaders/Loader3";
import RPLayout1 from "../../../Component/PrintLayouts/RPLayout1";
import RPLayout2 from "../../../Component/PrintLayouts/RPLayout2";
import FirstTimeFormToggle from "../../../Component/FirmTimeForm/FirstTimeFormToggle";
import { GetAllItems } from "../../../Redux/items/actions";
import { REGULAR_PRINTER_DATA } from "../../../Redux/store";
import { TOGGLE_FALSE_INVOICE_SUCCESS } from "../../../Redux/sales/reducer";
import {
  GetAllSalesInvoice,
  deleteSalesInvoice,
  updateSalesInvoice,
} from "../../../Redux/sales/action";
import {
  CloseIcon2,
  DeleteIcon2,
  EditIcon,
  PlusIcon2,
  SearchIcon,
  CalculatorIcon,
  SettingsIconOutline2,
  CrossIcon,
} from "../../../assets/Icons/ReactIcons";

import { useToast } from "@chakra-ui/react";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdCloseCircle as CloseIcon } from "react-icons/io";
//import { IoCloseOutline as CrossIcon } from "react-icons/io5";

export default function SalesInvoice() {
  const toast = useToast();
  const dispatch = useDispatch();
  let printComponentRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);
  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [paidAmount, setPaidAmount] = useState(0);
  const [unpaidAmount, setUnpaidAmount] = useState(0);
  const toggleSalesSuccess = useSelector(
    (state) => state.SalesReducer.toggleSalesSuccess
  );
  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const toggleItems = useSelector((state) => state.ItemReducer.toggleItems);
  const invoicesList = useSelector((state) => state.SalesReducer.invoicesList);
  const loadingSingleInvoice = useSelector(
    (state) => state.SalesReducer.loadingSingleInvoice
  );
  const toggleSingleInvoiceSuccess = useSelector(
    (state) => state.SalesReducer.toggleSingleInvoiceSuccess
  );
  const SingleInvoiceData = useSelector(
    (state) => state.SalesReducer.SingleInvoiceData
  );
  const [confirmModel, setConfirmModel] = useState(true);
  const [temp, setTemp] = useState("");
  //   console.log(invoicesList);
  //   This useEffect is written to get all items data to extract item names ********************************
  useEffect(() => {
    GetAllItems(dispatch);
  }, [toggleItems]);
  // ********************************************************************************8

  // Calculate paid and unpaid amounts from the data
  const calculateAmounts = () => {
    let paid = 0;
    let unpaid = 0;

    invoicesList.forEach((item) => {
      paid += item.amount || 0;
      unpaid += item.balanceDue || 0;
    });
    setPaidAmount(paid);
    setUnpaidAmount(unpaid);
  };
  // To fetch Invoices data
  useEffect(() => {
    GetAllSalesInvoice(dispatch, startDate, endDate);
    calculateAmounts();
  }, [toggleSalesSuccess, startDate, endDate]);

  const formOpen = () => {
    setOpenForm(true);
  };

  // Delete function
  const handleDelete = (id) => {
    deleteSalesInvoice(dispatch, id);
  };

  // Edit handler
  const handleEdit = (_id) => {
    const data = invoicesList.filter((e) => e._id === _id);
    // console.log(data);
    setIsEditing(true);
    setEditedData(data[0]);
  };

  // Save Update function
  const handleSave = (updatedData) => {
    updatedData.partyname = updatedData.partyName;
    // console.log("updatedData-", updatedData);
    dispatch(updateSalesInvoice(updatedData._id, updatedData));
    setIsEditing(false);
    setEditedData(null);
  };

  // Cancel function
  const handleCancel = () => {
    // If the user cancels, reset the state without saving
    setIsEditing(false);
    setEditedData(null);
  };

  // Items to display while Update form is active
  const display = [
    "invoiceDate",
    "invoiceNumber",
    "partyName",
    "transactionType",
    "paymentType",
    "amount",
    "balanceDue",
    "duedate",
    "status",
    "hariom",
  ];

  // ***************************** Print ************************************
  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
    onBeforePrint: () => dispatch(TOGGLE_FALSE_INVOICE_SUCCESS()),
  });
  const updateSalePrintSettings = useSelector(
    (state) => state.SalesReducer.updateSalePrintSettings
  );
  const [storedPrintData, setStoredPrintData] = useState(
    JSON.parse(sessionStorage.getItem(REGULAR_PRINTER_DATA)) || {}
  );
  // for updating printer settings
  useEffect(() => {
    const sessionStorageData =
      JSON.parse(sessionStorage.getItem(REGULAR_PRINTER_DATA)) || {};
    setStoredPrintData((prev) => {
      return { ...prev, ...sessionStorageData };
    });
  }, [updateSalePrintSettings]);
  // for updating print item details
  useEffect(() => {
    if (toggleSingleInvoiceSuccess == true) {
      handlePrint();
    }
  }, [toggleSingleInvoiceSuccess]);
  // *********************************************************************************

  return isLoading ? (
    <Loader3 text="Loading Sale Invoices" />
  ) : (
    <div className={css.Outer}>
      {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}
      {/* {confirmModel && <InvoiceGenerator invoiceData={temp} />}  */}

      {/* Print */}
      {loadingSingleInvoice ? (
        <Loader2 />
      ) : (
        <div
          style={{
            display: "none",
          }}
        >
          <div ref={printComponentRef}>
            {storedPrintData?.layoutIndex == 0 ? (
              <RPLayout1 currPrintItem={SingleInvoiceData} />
            ) : storedPrintData?.layoutIndex == 1 ? (
              <RPLayout2 currPrintItem={SingleInvoiceData} />
            ) : (
              <RPLayout1 currPrintItem={SingleInvoiceData} />
            )}
          </div>
        </div>
      )}

      {/* Invoice Form */}
      {openForm && (
        <div className={css.formOuter}>
          <div className={css.upperNav}>
            <div>
              <p className={css.activeForm}>
                <span>Sale #1</span>
                <CrossIcon />
              </p>
            </div>
            <div>
              <CalculatorIcon
                onClick={() =>
                  toast({
                    title: "Feature currently in development",
                    status: "info",
                    position: "top",
                  })
                }
              />
              <SettingsIconOutline2 onClick={() => setToggleSetting(true)} />
              <CloseIcon onClick={() => setOpenForm(false)} />
            </div>
          </div>
          <InvoiceForm
            setToggleSetting={setToggleSetting}
            setOpenForm={setOpenForm}
            setConfirmModel={setConfirmModel}
            confirmModel={confirmModel}
            setTemp={setTemp}
          />
        </div>
      )}

      {/* Top Nav */}
      <div className={css.topNavOuter}>
        <div className={css.navTopADiv}>
          <select defaultValue="This Month" className={css.monthSelectTag}>
            <option value="All Sale Invoices">All Sale Invoices</option>
            <option value="This Month">This Month</option>
            <option value="Last Month">Last Month</option>
            <option value="This Quarter">This Quarter</option>
            <option value="This Year">This Year</option>
            <option value="Custom">Custom</option>
          </select>
          <div className={css.divContainingDateInps}>
            <h3>Between</h3>
            <div>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <p>To</p>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <select defaultValue="ALL FIRMS" className={css.navFirmsSelectTag}>
            <option value="ALL FIRMS">ALL FIRMS</option>
          </select>
        </div>
        <div className={css.navTopBDiv}>
          <div
            className={css.navCalculatedDivs}
            style={{ background: "var(--SemiTransparentMint)" }}
          >
            <h2>Paid</h2>
            <h3>
              ₹{" "}
              {(paidAmount - unpaidAmount < 0
                ? 0.0
                : paidAmount - unpaidAmount
              ).toFixed(2)}
            </h3>
          </div>
          <div className={css.mathmaticalSigns}>+</div>
          <div
            className={css.navCalculatedDivs}
            style={{ background: "var(--blueC)" }}
          >
            <h2>Unpaid</h2>
            <h3>₹ {unpaidAmount.toFixed(2)}</h3>
          </div>
          <div className={css.mathmaticalSigns}>=</div>
          <div
            className={css.navCalculatedDivs}
            style={{ backgroundColor: "var(--GoldenBeige)" }}
          >
            <h2>Total</h2>
            <h3>₹ {paidAmount.toFixed(2)}</h3>
          </div>
        </div>
      </div>

      {/* Middle */}
      {invoicesList?.length > 0 ? (
        <div className={css.ContentOuter}>
          <div className={css.contentUpperNav}>
            <div className={css.leftSideDivSaleOuter}>
              <p>TRANSACTIONS</p>
              <div className={css.saleOrderSearchDiv}>
                <SearchIcon />
                <div>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={formOpen}
                className={css.addBtnCss}
              >
                <PlusIcon2 /> Add Sale
              </button>
            </div>
          </div>

          <div className={css.contentTableOuterDiv}>
            <table>
              <thead>
                <tr>
                  <th>
                    <div>DATE</div>
                  </th>
                  <th>
                    <div>INVOICE NO.</div>
                  </th>
                  <th>
                    <div>PARTY NAME</div>
                  </th>
                  <th>
                    <div>TRANSACTION TYPE</div>
                  </th>
                  <th>
                    <div>PAYMENT TYPE</div>
                  </th>
                  <th>
                    <div>AMOUNT</div>
                  </th>
                  <th>
                    <div>BALANCE DUE</div>
                  </th>
                  <th>
                    <div>DUE DATE</div>
                  </th>
                  <th>
                    <div>STATUS</div>
                  </th>
                  <th>
                    <div>ACTION</div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {!isLoading &&
                  invoicesList?.map((item, ind) =>
                    isEditing && editedData?._id === item._id ? (
                      <tr
                        style={{
                          width: "80%",
                          position: "relative",
                        }}
                        key={item?._id + ind}
                      >
                        <EditableRow
                          display={display}
                          data={editedData}
                          onSave={handleSave}
                          onCancel={handleCancel}
                        />
                      </tr>
                    ) : (
                      <TableInvoice
                        {...item}
                        ind={ind}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        key={ind + item?._id}
                      />
                    )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <FirstTimeFormToggle
          marginTop="10px"
          height="61.75vh"
          img={party}
          onClick={() => setOpenForm(true)}
          BtnText="Add Your First Sale Invoice"
          MiddleText="Make Sale invoices & Print or share with your customers directly via WhatsApp or Email."
        />
      )}
    </div>
  );
}
