import css from "./GSTR2.module.css";
import Loader3 from "../../../Component/Loaders/Loader3";
import ReportUpperControlPanel from "../../../Component/UpperControlPanel/ReportUpperControlPanel";
import { GetPurchaseReport } from "../../../Redux/report/action";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const GSTR2 = () => {
   const dispatch = useDispatch();
   const isLoading = useSelector((store) => store.ReportReducer.isLoading);
   const purchaseReportData = useSelector(
      (store) => store.ReportReducer.saleReportData
   );
   // const purchaseReportData = useSelector(
   //   (store) => store.ReportReducer.purchaseReportData
   // );
   const [nonTaxExempted, setNonTaxExempted] = useState(false);
   const [startDate, setStartDate] = useState("2024-02-01");
   const [endDate, setEndDate] = useState(
      new Date().toISOString().split("T")[0]
   );

   // fetch gstr2 Data
   useEffect(() => {
      GetPurchaseReport(dispatch, startDate, endDate);
   }, [startDate, endDate]);
   console.log(purchaseReportData)

   return isLoading ? (
      <Loader3 text="Loading GSTR2" />
   ) : (
      <div className={css.Outer}>
         {/* Upper Control Panel */}
         <ReportUpperControlPanel
            title="GSTR2 REPORT"
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            nonTaxExempted={nonTaxExempted}
            setNonTaxExempted={setNonTaxExempted}
            showJson={false}
            data={purchaseReportData}
         />

         {/* Content */}
         <div className={css.ContentOuter}>
            <div className={css.contentTableOuterDiv}>
               <table>
                  <thead>
                     <tr className={css.upperTableHeader}>
                        {/* Upper Header */}
                        {[
                           "",
                           "",
                           "Bill Details",
                           "",
                           "",
                           "Rate",
                           "Cess Rate",
                           "Taxable Value",
                           "Reverse Charge",
                           "",
                           "Amount",
                           "",
                           "",
                           "Place of Supply (Name Of State)",
                        ].map((item, ind) => (
                           <th key={item + ind}>
                              <div>{item}</div>
                           </th>
                        ))}
                     </tr>
                     <tr className={css.lowerTableHeader}>
                        {/* Lower Header */}
                        {[
                           "GSTIN/UIN",
                           "Party Name",
                           "No.",
                           "Date",
                           "Value",
                           "",
                           "",
                           "",
                           "",
                           "Integrated Tax",
                           "Central Tax",
                           "State/UT Tax",
                           "Cess",
                           "",
                        ].map((item, ind) => (
                           <th key={item + ind}>
                              <div>{item}</div>
                           </th>
                        ))}
                     </tr>
                  </thead>

                  {purchaseReportData?.length > 0 && (
                     <tbody>
                        {purchaseReportData?.map((item, ind) => (
                           <tr key={ind + item?._id}>
                              <td>
                                 <div>{item?.gstNo || "-"}</div>
                              </td>
                              <td>
                                 <div>{item?.partyName || "-"}</div>
                              </td>
                              <td>
                                 <div>{item?.invoiceNumber || "-"}</div>
                              </td>
                              <td>
                                 <div>
                                    {new Date(
                                       item?.invoiceDate
                                    ).toLocaleDateString("en-GB")}
                                 </div>
                              </td>
                              <td>
                                 <div style={{ textAlign: "right" }}>
                                    ₹{item?.amount || 0}
                                 </div>
                              </td>
                              <td>
                                 <div style={{ textAlign: "right" }}>
                                    {item?.taxRate || " "}
                                 </div>
                              </td>
                              <td>
                                 <div style={{ textAlign: "right" }}>
                                    {item?.cess || 0}
                                 </div>
                              </td>
                              <td>
                                 <div style={{ textAlign: "right" }}>
                                    ₹{item?.amount - item?.taxableValue || 0}
                                 </div>
                              </td>
                              <td>
                                 <div style={{ textAlign: "right" }}>
                                    ₹{item?.reverseCharge || 0}
                                 </div>
                              </td>
                              <td>
                                 <div style={{ textAlign: "right" }}>
                                    ₹{item?.integreatedTax || 0}
                                 </div>
                              </td>
                              <td>
                                 <div style={{ textAlign: "right" }}>
                                    ₹
                                    {Number(item?.taxableValue)
                                       ? (
                                            Number(item?.taxableValue) / 2
                                         ).toFixed(2)
                                       : 0}
                                 </div>
                              </td>
                              <td>
                                 <div style={{ textAlign: "right" }}>
                                    ₹
                                    {Number(item?.taxableValue)
                                       ? (
                                            Number(item?.taxableValue) / 2
                                         ).toFixed(2)
                                       : 0}
                                 </div>
                              </td>
                              <td>
                                 <div style={{ textAlign: "right" }}>
                                    {item?.cess || 0}
                                 </div>
                              </td>
                              <td>
                                 <div>{item?.stateOfSupply}</div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  )}
               </table>

               {purchaseReportData?.length <= 0 && (
                  <div className={css.noDataDiv}>
                     <p>No data is available for GSTR2 Report.</p>
                     <p>Please try again after making relevant changes.</p>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default GSTR2;
