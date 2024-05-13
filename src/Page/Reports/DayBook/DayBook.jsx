import * as XLSX from "xlsx";
import css from "./DayBook.module.css";
import Loader2 from "../../../Component/Loaders/Loader2";
import Setting from "../../../Component/Setting/Setting";
import Loader3 from "../../../Component/Loaders/Loader3";
import RPLayout1 from "../../../Component/PrintLayouts/RPLayout1";
import RPLayout2 from "../../../Component/PrintLayouts/RPLayout2";
import InvoicePrint from "../../../Component/PrintLayouts/InvoicePrint";
import AddPurchaseBill from "../../Purchase/PurchaseBill/AddPurchaseBill";
import UpperControlPanel, {
   GetMonthName,
} from "../../../Component/UpperControlPanel/UpperControlPanel";
import { GetAllItems } from "../../../Redux/items/actions";
import { REGULAR_PRINTER_DATA } from "../../../Redux/store";
import { TOGGLE_FALSE_INVOICE_SUCCESS } from "../../../Redux/sales/reducer";
import { FormatDate } from "../../../Redux/sales/action";
import {
   CloseIcon2,
   DeleteIcon2,
   EditIcon,
   PrintIcon2,
   PlusIcon2,
   SearchIcon,
   CalculatorIcon,
   SettingsIconOutline2,
   CrossIcon,
} from "../../../assets/Icons/ReactIcons";
import { GetPurchaseReport, GetDayBooks } from "../../../Redux/report/action";

import { useToast } from "@chakra-ui/react";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JSONDownloadButton from "../../../components/json/DownloadJsonFormate";
import ExcelDownloadButton from "../../../components/excel/DownloadExcel";
import PDFDownloadButton from "../../../components/pdf/DownloadPdf";

const DayBook = () => {
   const toast = useToast();
   const dispatch = useDispatch();
   let printComponentRef = useRef();
   const [openForm, setOpenForm] = useState(false);
   const [toggleSetting, setToggleSetting] = useState(false);
	const [items, setItems] = useState();

   const [paidAmount, setPaidAmount] = useState(0);
   const [unpaidAmount, setUnpaidAmount] = useState(0);

   const [select, setSelect] = useState();
	const currentDate = new Date();
	const startOfMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1
	);
	
   const formattedStartDate = startOfMonth.toISOString().split("T")[0];
	const [startDate, setStartDate] = useState(formattedStartDate);
   const [endDate, setEndDate] = useState(
      new Date().toISOString().split("T")[0]
   );

   const toggleAddPurchaseBill = useSelector(
      (store) => store.PurchaseReducer.toggleAddPurchaseBill
   );
   const LoadingGetDayBooks = useSelector(
      (store) => store.ReportReducer.isLoading
   );
   const dayBookDataReducer = useSelector(
      (store) => store.ReportReducer.dayBookData
   );
   const toggleGetDayBooksSuccess = useSelector(
      (store) => store.ReportReducer.toggleGetDayBooksSuccess
   );
   const toggleItems = useSelector((store) => store.ItemReducer.toggleItems);
   const loadingSingleInvoice = useSelector(
      (store) => store.SalesReducer.loadingSingleInvoice
   );
   const toggleSingleInvoiceSuccess = useSelector(
      (store) => store.SalesReducer.toggleSingleInvoiceSuccess
   );
   const SingleInvoiceData = useSelector(
      (store) => store.SalesReducer.SingleInvoiceData
   );
   const [dayBooksData, setDayBooksData] = useState([]);
   useEffect(() => {
		setItems(dayBooksData);
	}, [dayBooksData]);
   useEffect(() => {
      const extractedData = dayBookDataReducer?.flatMap((data) => [
         ...(Array.isArray(data?.PuchaseBill[0]?.PuchaseBill)
            ? data.PuchaseBill[0].PuchaseBill
            : []),
         ...(Array.isArray(data?.PuchaseReturn[0]?.PuchaseReturn)
            ? data.PuchaseReturn[0].PuchaseReturn
            : []),
         ...(Array.isArray(data?.PurchaseOut[0]?.purchaseout)
            ? data.PurchaseOut[0].purchaseout
            : []),
         ...(Array.isArray(data?.purchaseOrder[0]?.purchaseOrder)
            ? data.purchaseOrder[0].purchaseOrder
            : []),
         ...(Array.isArray(data?.saleDeliverychallans[0]?.saleDeliverychallans)
            ? data.saleDeliverychallans[0].saleDeliverychallans
            : []),
         ...(Array.isArray(data?.PaymentIn[0]?.PaymentIn)
            ? data.PaymentIn[0].PaymentIn
            : []),
         ...(Array.isArray(data?.SaleCash[0]?.SaleCash)
            ? data.SaleCash[0].SaleCash
            : []),
         ...(Array.isArray(data?.SaleOrder[0]?.SaleOrder)
            ? data.SaleOrder[0].SaleOrder
            : []),
         ...(Array.isArray(data?.SalereturnCredit[0]?.SalereturnCredit)
            ? data.SalereturnCredit[0].SalereturnCredit
            : []),
         ...(Array.isArray(data?.ExpensesWithGst[0]?.ExpensesWithGst)
            ? data.ExpensesWithGst[0].ExpensesWithGst
            : []),
         ...(Array.isArray(data?.ExpensesWithOutGst[0]?.ExpensesWithOutGst)
            ? data.ExpensesWithOutGst[0].ExpensesWithOutGst
            : []),
      ]);
      extractedData?.sort((a, b) => new Date(a.date) - new Date(b.date));
      setDayBooksData(extractedData);
   }, [toggleGetDayBooksSuccess]);

   // To fetch Invoices data
   useEffect(() => {
      GetDayBooks(dispatch, endDate);
   }, [endDate]);



	const filterDataByTime = (dayBooksData, timeInterval) => {
		const currentDate = new Date();
		const currentMonth = currentDate.getMonth();
		const currentYear = currentDate.getFullYear();
		let startDate, endDate;
		switch (timeInterval) {
			case "This Month":
				startDate = new Date(currentYear, currentMonth, 1);
				endDate = new Date(currentYear, currentMonth + 1, 0);
				break;
			case "Last Month":
				startDate = new Date(currentYear, currentMonth - 1, 1);
				endDate = new Date(currentYear, currentMonth, 0);
				break;
			case "This Quarter":
				startDate = new Date(currentYear, Math.floor(currentMonth / 3) * 3, 1);
				endDate = new Date(
					currentYear,
					Math.floor(currentMonth / 3) * 3 + 3,
					0
				);
				break;
			case "This Year":
				startDate = new Date(currentYear, 0, 1);
				endDate = new Date(currentYear, 11, 31);
				break;
			case "All":
				return dayBooksData;
			default:
				startDate = new Date(timeInterval);
				endDate = new Date(
					startDate.getFullYear(),
					startDate.getMonth(),
					startDate.getDate(),
					23,
					59,
					59
				);
				break;
		}
		return dayBooksData.filter((item) => {
			const itemDate = new Date(item.invoiceDate);
			return itemDate >= startDate && itemDate <= endDate;
		});
	};

	useEffect(() => {
		const data = filterDataByTime(dayBooksData, select);
		setItems(data);
	}, [select]);








   const formOpen = () => {
      setOpenForm(true);
   };

   // ***************** Download Excel For ********************************
   const excelDownload = async () => {
      const endDateParts = endDate.split("-");

      const formattedendDate = `${endDateParts[2]}-${GetMonthName(
         endDateParts[1]
      )}`;

      const formattedFileName = `DayBook_Report_Data_${formattedendDate}_09AEIPT7331R1ZJ.xlsx`;

      const workbook = XLSX.utils.book_new();

      // Current date and time
      const currentDate = new Date();
      const formattedCurrentDateTime = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
      const currentDateRow = ["Report generated on:", formattedCurrentDateTime];

      const dayBooksDataData = dayBooksData.map((item) => [
         // Name	Ref No	Type	Total	Money In	Money Out	Description
         item?.name,
         item?.refNo,
         item?.type,
         item?.total,
         item?.moneyIn,
         item?.moneyOut,
         item?.description,
      ]);

      const tableData2 = dayBooksData.map((item) => [
         item?.invoiceDate, // Date
         item?.invoiceNumber, // Invoice No./Txn No.
         item?.partyName, // Party Name
         item.itemName, // Item Name
         item.itemCode, // Item Code
         "", // HSN/SAC (add your value here)
         item.category, // Category
         "", // MRP (add your value here)
         "", // Batch No. (add your value here)
         "", // Exp. Date (add your value here)
         "", // Mfg. Date (add your value here)
         "", // Model No. (add your value here)
         "", // Count (add your value here)
         item.description, // Description
         "", // Size (add your value here)
         "", // Quantity (add your value here)
         "", // Unit (add your value here)
         "", // UnitPrice (add your value here)
         "", // Discount Percent (add your value here)
         "", // Discount (add your value here)
         "", // Tax Percent (add your value here)
         "", // Tax (add your value here)
         "", // Cess (add your value here)
         item?.transactionType, // Transaction Type
         "", // Amount (add your value here)
      ]);

      // Calculate totals
      const totalRow = dayBooksDataData.reduce(
         (acc, curr) => {
            acc[3] += Number(curr[3]); // Total Amount
            acc[4] += Number(curr[4]);
            acc[5] += Number(curr[5]);
            return acc;
         },
         [, "Total", "", "", 0, "", 0, 0, "", "", ""]
      );

      const worksheet = XLSX.utils.aoa_to_sheet([
         [...currentDateRow],
         [""],
         [
            "Name",
            "Ref No.",
            "Type",
            "Total",
            "Money In",
            "Money Out",
            "Description",
         ],
         ...dayBooksDataData,
         [], // Empty row
         ["", "", "", "", "", "", "", "", "", "", "", "", ""], // Empty row for totals
      ]);
      const worksheet2 = XLSX.utils.aoa_to_sheet([
         [...currentDateRow],
         [""],
         [
            "Date",
            "Invoice No./Txn No.",
            "Party Name",
            "Item Name",
            "Item Code",
            "HSN/SAC",
            "Category",
            "MRP",
            "Batch No.",
            "Exp. Date",
            "Mfg. Date",
            "Model No.",
            "Count",
            "Description",
            "Size",
            "Quantity",
            "Unit",
            "UnitPrice",
            "Discount Percent",
            "Discount",
            "Tax Percent",
            "Tax",
            "Cess",
            "Transaction Type",
            "Amount",
         ],
         ...tableData2,
         [], // Empty row
         ["", "", "", "", "", "", "", "", "", "", "", "", ""], // Empty row for totals
         ["Total:"], // Label for total row
      ]);

      // Calculate totals for the second sheet
      const totalRow2 = tableData2.reduce(
         (acc, curr) => {
            // Add your logic to calculate totals for the second sheet here
            return acc;
         }
         //  [, , , "Total", "", "", 0, "", 0, 0, "", "", ""]
      );

      // Append total rows to each worksheet
      XLSX.utils.sheet_add_aoa(worksheet, [totalRow], { origin: -1 });
      XLSX.utils.sheet_add_aoa(worksheet2, [totalRow2], { origin: -1 });

      XLSX.utils.book_append_sheet(workbook, worksheet, "Day Book Report");
      XLSX.utils.book_append_sheet(workbook, worksheet2, "Item Details");
      XLSX.writeFile(workbook, formattedFileName);
   };
	useEffect(() => {
		const filteredData = dayBooksData.filter((item) => {
			// Convert item.invoiceDate to Date object
			const invoiceDate = new Date(item.invoiceDate);
			console.log("this is invoiceDate", invoiceDate);
			// Parse startDate and endDate to Date objects
			const [startMonth, startDay, startYear] = startDate.split("/");
			const [endMonth, endDay, endYear] = endDate.split("/");
			const start = new Date(`${startMonth}/${startDay}/${startYear}`);
			const end = new Date(`${endMonth}/${endDay}/${endYear}`);
			// Compare dates
			return invoiceDate >= start && invoiceDate <= end;
		});
		setItems(filteredData);
		console.log("thuis is itemdate", items);
	}, [startDate, endDate]);

   const handleSearch = (e) => {
		const query = e.target.value;
		if (query === "") {
			setItems(dayBooksData);
		} else {
			const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			const regex = new RegExp(escapedQuery, "i");
			const filteredInvoice = dayBooksData.filter((item) =>
				regex.test(item.name)
			);
			setItems(filteredInvoice);
		}
	};

const handleSelect=(e)=>{
   setSelect(e.target.value)
}

   // ***************************** Print ************************************
   const handlePrint = useReactToPrint({
      content: () => printComponentRef.current,
      onBeforePrint: () => dispatch(TOGGLE_FALSE_INVOICE_SUCCESS()),
   });
   const updateSalePrintSettings = useSelector(
      (store) => store.PurchaseReducer.updateSalePrintSettings
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

   console.log(dayBooksData);
   const relevantFields = [
		"invoiceNumber",
		"partyName",
		"invoiceDate",
		"amount",
		"balanceDue",
		"status",
	];
   return LoadingGetDayBooks ? (
      <Loader3 text="Loading Day books" />
   ) : (
      <div className={css.Outer}>
         {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

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
                     <InvoicePrint currPrintItem={SingleInvoiceData} />
                  ) : storedPrintData?.layoutIndex == 1 ? (
                     <RPLayout2 currPrintItem={SingleInvoiceData} />
                  ) : (
                     <RPLayout1 currPrintItem={SingleInvoiceData} />
                  )}
               </div>
            </div>
         )}

         {/* Top Nav */}
         <div className={css.topNavOuter}>
				<div className={css.navTopADiv}>
					<select
						defaultValue="All"
						onChange={handleSelect}
						style={{
							backgroundColor: "#BFBFBF",
							padding: "3px 3px",
							borderRadius: "5px",
						}}
					>
						<option value="All">All Reports</option>
						<option value="This Month">This Month</option>
						<option value="Last Month">Last Month</option>
						<option value="This Quarter">This Quarter</option>
						<option value="This Year">This Year</option>
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
					<div
						style={{
							display: "flex",
							justifyContent: "space-around",
							marginLeft: "250px",
						}}
					>
						 <div style={{ marginRight: "30px" }}><JSONDownloadButton data={items} /><p style={{ fontSize: "10px", fontWeight: "bold" }}>
								Json
							</p></div>
						<div style={{ marginRight: "10px" }}>
							<ExcelDownloadButton data={items} />
							<p style={{ fontSize: "10px", fontWeight: "bold" }}>
								Excel Reports
							</p>
						</div>
						<div style={{ marginLeft: "10px" }}>
							<PDFDownloadButton
								data={items}
								fields={relevantFields}
								title={"Sale Report"}
								totalText="Total Purchanse"
							/>
							<p
								style={{
									fontSize: "10px",
									fontWeight: "bold",
									marginRight: "40px",
								}}
							>
								Print
							</p>
						</div>
					</div>
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
         <div className={css.ContentOuter}>
            <div className={css.contentUpperNav}>
               <div className={css.leftSideDivSaleOuter}>
                  {/* <p>TRANSACTIONS</p> */}
                  <div className={css.saleOrderSearchDiv}>
                     <SearchIcon />
                     <div>
                        <input type="text" placeholder="Search.." onChange={handleSearch} />
                     </div>
                  </div>
               </div>
               {/* <div>
            <button type="button" onClick={formOpen} className={css.addBtnCss}>
              <PlusIcon2 /> Add Purchase
            </button>
          </div> */}
            </div>

            {/* Table */}
            <div className={css.contentTableOuterDiv}>
               <table>
                  <thead>
                     <tr>
                        {[
                           // "#",
                           "NAME",
                           "REF NO.",
                           "TYPE",
                           "TOTAL",
                           "MONEY IN",
                           "MONEY OUT",
                           // "PRINT/SHARE",
                           // "DUE DATE",
                           // "STATUS",
                           // "ACTION",
                        ].map((item, ind) => (
                           <th key={item + ind}>
                              <div>{item}</div>
                           </th>
                        ))}
                     </tr>
                  </thead>

                  {!LoadingGetDayBooks && dayBooksData?.length > 0 && (
                     <tbody>
                        {items?.map((item, ind) => (
                           <tr key={ind + item?._id}>
                              <td>
                                 <div>{item?.name}</div>
                              </td>
                              <td>
                                 <div>{item?.refNo}</div>
                              </td>
                              <td>
                                 <div>{item?.type}</div>
                              </td>
                              <td>
                                 <div>{item?.total}</div>
                              </td>

                              <td>
                                 <div style={{ textAlign: "right" }}>
                                    ₹{item?.moneyIn || 0}
                                 </div>
                              </td>
                              <td>
                                 <div style={{ textAlign: "right" }}>
                                    ₹{item?.moneyOut || 0}
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  )}
               </table>
               {!LoadingGetDayBooks && dayBooksData?.length <= 0 && (
                  <div className={css.noDataDiv}>
                     <p>No transactions to show</p>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default DayBook;
