import * as XLSX from "xlsx";
import css from "./Invoice.module.css";
import InvoiceForm from "./InvoiceForm";
import TableInvoice from "./TableInvoice";
import party from "../../../assets/Images/party.jpg";
import EditableRow from "../../../Component/EditForm";
import Loader2 from "../../../Component/Loaders/Loader2";
import Setting from "../../../Component/Setting/Setting";
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

import { useToast } from "@chakra-ui/react";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCalculator as CalculatorIcon } from "react-icons/io5";
import { MdOutlineSettings as SettingIcon } from "react-icons/md";
import { IoMdCloseCircle as CloseIcon } from "react-icons/io";
import { IoCloseOutline as CrossIcon } from "react-icons/io5";
import { IoSearch as SearchIcon } from "react-icons/io5";
import { FiPlusCircle as PlusIcon } from "react-icons/fi";
import { CiFilter as FilterIcon } from "react-icons/ci";
import { VscGraph } from "react-icons/vsc";

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
   // Calculate paid and unpaid amounts
   const [paidAmount, setPaidAmount] = useState(0);
   const [unpaidAmount, setUnpaidAmount] = useState(0);
   const toggleSalesSuccess = useSelector(
      (state) => state.SalesReducer.toggleSalesSuccess
   );
   const isLoading = useSelector((state) => state.SalesReducer.isLoading);
   const toggleItems = useSelector((state) => state.ItemReducer.toggleItems);
   const allItems = useSelector((state) => state.ItemReducer.allItems);
   const fetchAllItemsSuccessToggle = useSelector(
      (state) => state.ItemReducer.fetchAllItemsSuccessToggle
   );
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

   //   This useEffect is written to get all items data to extract item names ********************************
   useEffect(() => {
      dispatch(GetAllItems());
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
   }, [toggleSalesSuccess, startDate, endDate, dispatch]);

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
      console.log(data);
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
      GetAllSalesInvoice(dispatch, startDate, endDate);
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

   // ==== excel ===========================
   const [loading, setLoading] = useState(false);
   const getMonthName = (monthNumber) => {
      const months = [
         "Jan",
         "Feb",
         "Mar",
         "Apr",
         "May",
         "Jun",
         "Jul",
         "Aug",
         "Sep",
         "Oct",
         "Nov",
         "Dec",
      ];
      return months[parseInt(monthNumber) - 1];
   };
   const startDateParts = startDate.split("-");
   const endDateParts = endDate.split("-");
   const formattedStartDate = `${startDateParts[2]}-${getMonthName(
      startDateParts[1]
   )}`;
   const formattedEndDate = `${endDateParts[2]}-${getMonthName(
      endDateParts[1]
   )}`;
   const saveInvoicesList = async (action) => {
      switch (action) {
         case "PRINT":
            const sideBarOuter = document.querySelector(`.${css.saleOrderUpperNav}`);
            const elementsToHide = document.querySelectorAll(
               ".grp-cont-invoice > *"
            );
            elementsToHide.forEach((element) => {
               element.style.display = "none";
            });
          
            if (sideBarOuter) {
              sideBarOuter.style.display = "none";
           }

            // Trigger browser's print dialog
            window.print();

            elementsToHide.forEach((element) => {
               element.style.display = "";
            });
            
            if (sideBarOuter) {
               sideBarOuter.style.display = "";
            }
            break;

         case "EXCEL":
            try {
               //  setLoading(true);
               const formattedFileName = `SaleInovice_${formattedStartDate}_${formattedEndDate}_09AEIPT7J.xlsx`;
               const filteredHeaders = Object.keys(invoicesList[0]).filter(
                  (header) => header !== "_id"
               );

               // Construct data array with filtered data
               const filteredData = invoicesList.map((row) =>
                  filteredHeaders.map((header) => row[header])
               );

               // Fetch Excel file
               const response = await fetch(
                  process.env.PUBLIC_URL + "/GSTR1.xlsx"
               );
               const buffer = await response.arrayBuffer();

               // Read existing workbook
               const workbookMine = XLSX.read(buffer, { type: "array" });

               // Create a new workbook
               const workbook = XLSX.utils.book_new();

               // Append "Help Instructions" sheet from existing workbook
               const helpWorksheet = workbookMine.Sheets["Help Instructions"];
               XLSX.utils.book_append_sheet(
                  workbook,
                  helpWorksheet,
                  "Help Instructions"
               );

               // Create a worksheet with filtered headers and data
               const b2bsheet = XLSX.utils.aoa_to_sheet([
                  ["Summary of B2B"],
                  [""],
                  [
                     "No. Of Recipients",
                     "",
                     "No. Of Invoices",
                     "",
                     "",
                     "",
                     "",
                     "",
                     "",
                     "",
                     "",
                     "Total Taxable Value",
                     "Total Cess",
                  ],
                  [invoicesList.length, "", invoicesList.length],
                  [],
                  [
                     "STATUS",
                     "Invoice Number",
                     "Invoice date",
                     "Place Of Supply",
                     "Receiver Name",
                     "GSTIN/UIN of Recipient",
                     "Invoice Type",
                     "PAYMENT TYPE",
                     "Invoice Value",
                     "Remaining Amount",
                     "Rate",
                     "Taxable Value",
                     "Cess Amount",

                     "Reverse Charge",
                     "Applicable % of Tax Rate",
                     // "E-Commerce GSTIN",
                  ],

                  ...filteredData,
               ]);

               XLSX.utils.book_append_sheet(workbook, b2bsheet, "b2b");

               XLSX.writeFile(workbook, formattedFileName);

               //  setLoading(false);
            } catch (error) {
               console.error("Error:", error);
               //  setLoading(false);
            }
            break;

         default:
            console.warn("Unknown action:", action);
      }
   };

   // *********************************

   return (
      <div>
         {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

         {/* Print Component */}
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
                     <SettingIcon onClick={() => setToggleSetting(true)} />
                     <CloseIcon onClick={() => setOpenForm(false)} />
                  </div>
               </div>
               <InvoiceForm
                  setToggleSetting={setToggleSetting}
                  setOpenForm={setOpenForm}
               />
            </div>
         )}

         {/* Top Nav */}
         <div className="grp-cont-invoice">
            <div
               className={css.TableOuter}
               style={{
                  margin: "10px",
                  background: "white",
               }}
            >
               <div className={css.dBetween} style={{ alignItems: "center" }}>
                  <div className={css.dFlex} style={{ gap: "10px" }}>
                     <div className={css.dFlex}>
                        <select name="" id="" className={css.invoiceSelect}>
                           <option value="">This Month</option>
                           <option value="">This Quarter</option>
                           <option value="">Last Month</option>
                           <option value="">This Year</option>
                           <option value="">Custom</option>
                        </select>
                     </div>
                     <div
                        className={css.dFlex}
                        style={{ border: "1px solid gray" }}
                     >
                        <div
                           style={{
                              padding: "4px 12px 2px 15px",
                              background: "gray",
                           }}
                        >
                           <p> Between</p>
                        </div>

                        <input
                           type="date"
                           value={startDate}
                           onChange={(e) => setStartDate(e.target.value)}
                           className={css.invoiceInput}
                        />
                        <div
                           style={{
                              padding: "4px 12px 2px 15px",
                           }}
                        >
                           <span>To</span>
                        </div>

                        <input
                           type="date"
                           value={endDate}
                           onChange={(e) => setEndDate(e.target.value)}
                           className="invoice-input"
                        />
                     </div>
                     <div className={css.dFlex}>
                        <select name="" id="" className={css.invoiceSelect}>
                           <option value="">All Firms</option>
                           <option value="">My Company</option>
                        </select>
                     </div>
                  </div>
                  <div
                     className={css.dFlex}
                     style={{ gap: "20px", paddingRight: "25px" }}
                  >
                     <div>
                        <div
                           onClick={() =>
                              toast({
                                 title: "Feature currently in development",
                                 status: "info",
                                 position: "top",
                              })
                           }
                        >
                           <i
                              className="fa fa-bar-chart"
                              aria-hidden="true"
                           ></i>
                        </div>
                        <div>
                           <span>Graph</span>
                        </div>
                     </div>
                     <div className="d-flex-col">
                        <div onClick={() => saveInvoicesList("EXCEL")}>
                           <div>
                              <i
                                 class="fa fa-file-excel-o"
                                 aria-hidden="true"
                              ></i>
                           </div>
                           <div>
                              <span>Excel Report</span>
                           </div>
                        </div>
                     </div>
                     <div className="d-flex-col">
                        <div onClick={() => saveInvoicesList("PRINT")}>
                           <div>
                              <i className="fa fa-print" aria-hidden="true"></i>
                           </div>
                           <div>
                              <span>Print</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                  <div
                     style={{
                        backgroundColor: "rgba(67, 160, 71,0.75)",
                        padding: "12px 30px",
                        color: "white",
                        borderRadius: "10px",
                        textAlign: "center",
                        width: "150px",
                     }}
                  >
                     <span>Paid</span>
                     <br />
                     <span>₹{paidAmount - unpaidAmount}</span>
                  </div>
                  <div className={css.centeredItems}>
                     <span>+</span>
                  </div>
                  <div
                     style={{
                        backgroundColor: "Pink",
                        padding: "12px 30px",
                        color: "white",
                        textAlign: "center",
                        width: "150px",
                        borderRadius: "10px",
                     }}
                  >
                     <span>Unpaid</span>
                     <br />
                     <span>₹{unpaidAmount}</span>
                  </div>
                  <div className={css.centeredItems}>
                     <span>+</span>
                  </div>
                  <div
                     style={{
                        padding: "12px 30px",
                        backgroundColor: "rgba(221, 0, 0,0.5)",
                        color: "white",
                        borderRadius: "10px",
                        textAlign: "center",
                        width: "150px",
                     }}
                  >
                     <span>Over Due</span>
                     <br />
                     <span>₹{unpaidAmount}</span>
                  </div>
                  <div className={css.centeredItems}>
                     <span>=</span>
                  </div>
                  <div
                     style={{
                        backgroundColor: "rgba(144, 202, 249,0.5)",

                        padding: "12px 30px",
                        color: "white",
                        borderRadius: "10px",
                        textAlign: "center",
                        width: "150px",
                     }}
                  >
                     {" "}
                     <span>Total</span>
                     <br />
                     <span>₹{paidAmount}</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Middle */}
         {invoicesList?.length ? (
            <div className="d-cen b-cont text-center text-center">
               <div className={css.TableOuter}>
                  <div className={css.saleOrderUpperNav}>
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
                           className={css.addSaleOrderBtn}
                        >
                           <PlusIcon /> Add Sale
                        </button>
                     </div>
                  </div>

                  <div className={css.TabelOuterDivSaleOrder}>
                        <table>
                            <thead>
                              <tr>
                                  <th>
                                    <div>
                                        DATE
                                        {/*  <FilterIcon /> */}
                                    </div>
                                  </th>
                                  <th>
                                    <div>
                                        INVOICE NO.
                                        {/*  <FilterIcon /> */}
                                    </div>
                                  </th>
                                  <th>
                                    <div>
                                        PARTY NAME.
                                        {/*  <FilterIcon /> */}
                                    </div>
                                  </th>
                                  <th>
                                    <div>
                                        TRANSACTION TYPE
                                        {/*  <FilterIcon /> */}
                                    </div>
                                  </th>
                                  <th>
                                    <div>
                                        PAYMENT TYPE
                                        {/*  <FilterIcon /> */}
                                    </div>
                                  </th>
                                  <th>
                                    <div>
                                        AMOUNT
                                        {/*  <FilterIcon /> */}
                                    </div>
                                  </th>
                                  <th>
                                    <div>
                                        BALANCE DUE
                                        {/*  <FilterIcon /> */}
                                    </div>
                                  </th>
                                  <th>
                                    <div>
                                        DUE DATE
                                        {/*  <FilterIcon /> */}
                                    </div>
                                  </th>
                                  <th>
                                    <div>
                                        STATUS
                                        {/*  <FilterIcon /> */}
                                    </div>
                                  </th>
                                  <th>Action</th>
                              </tr>
                            </thead>

                            <tbody>
                              {!isLoading &&
                                  invoicesList?.map((item, ind) =>
                                    isEditing && editedData?._id === item._id ? (
                                        <tr
                                          style={{
                                              width: "82%",
                                              position: "absolute",
                                          }}
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
                     {isLoading && (
                        <h2
                           style={{
                              color: "green",
                              textAlign: "center",
                              margin: "20px auto",
                           }}
                        >
                           Loading Invoices...
                        </h2>
                     )}
                  </div>
               </div>
            </div>
         ) : isLoading ? (
            <h2
               style={{
                  color: "green",
                  textAlign: "center",
                  margin: "20px auto",
               }}
            >
               Loading Invoices...
            </h2>
         ) : (
            <div>
               <FirstTimeFormToggle
                  img={party}
                  onClick={() => setOpenForm(true)}
                  BtnText="Add Your First Sale Invoice"
                  MiddleText="Make Sale invoices & Print or share with your customers directly via WhatsApp or Email."
               />
            </div>
         )}
      </div>
   );
}
