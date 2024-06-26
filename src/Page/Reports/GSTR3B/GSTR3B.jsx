import * as XLSX from "xlsx";
import css from "./GSTR3B.module.css";
import Loader3 from "../../../Component/Loaders/Loader3";
import ReportUpperControlPanel from "../../../Component/UpperControlPanel/ReportUpperControlPanel";
import { GetMonthName } from "../../../Component/UpperControlPanel/UpperControlPanel";

import { useState } from "react";
import { useSelector } from "react-redux";

const GSTR3B = () => {
   const [nonTaxExempted, setNonTaxExempted] = useState(false);
   const [startDate, setStartDate] = useState("2024-02-01");
   const [endDate, setEndDate] = useState(
      new Date().toISOString().split("T")[0]
   );
   const isLoading = useSelector((store) => store.ReportReducer.isLoading);
   const purchaseReportData = useSelector(
      (store) => store.ReportReducer.saleReportData
   );
   const saleTax = useSelector((store) => store.ReportReducer.totalSaleTax);
   const integratedTax = useSelector(
      (store) => store.ReportReducer.integratedTax
   );
   const cessTax = useSelector((store) => store.ReportReducer.cessTax);
   const saleTaxReturn = useSelector(
      (store) => store.ReportReducer.totalSaleTaxReturn
   );
   const integratedTaxReturn = useSelector(
      (store) => store.ReportReducer.integratedTaxReturn
   );
   const cessTaxReturn = useSelector(
      (store) => store.ReportReducer.cessTaxReturn
   );
   const tax = saleTax / 2 || 0;
   const taxReturn = saleTaxReturn / 2 || 0;

   // Function to gather data
   const getDataForDownload = () => {
      return {
         tableData1,
         table2Data,
         table2UpperHead,
         table2LowerHead,
         table3Head,
      };
   };

   const tableData1 = [
      {
         id: 1,
         natureOfSupplies:
            "Outward taxable supplies (other than zero rated, nil rated and exempted)",
         taxableValue: saleTax,
         integratedTax: integratedTax,
         centralTax: tax,
         stateTax: tax,
         Cess: cessTax,
      },
      {
         id: 1,
         natureOfSupplies: "Outward taxable supplies (zero rated)",
         taxableValue: 0,
         integratedTax: 0,
         centralTax: 0,
         stateTax: 0,
         Cess: 0,
      },
      {
         id: 1,
         natureOfSupplies: "Other outward supplies (nil rated, exempted)",
         taxableValue: 0,
         integratedTax: 0,
         centralTax: 0,
         stateTax: 0,
         Cess: 0,
      },
      {
         id: 1,
         natureOfSupplies: "Inward supplies (liable to reverse charge)",
         taxableValue: saleTaxReturn,
         integratedTax: integratedTaxReturn,
         centralTax: taxReturn,
         stateTax: taxReturn,
         Cess: cessTaxReturn,
      },
      {
         id: 1,
         natureOfSupplies: "Non-GST outward supplies",
         taxableValue: 0,
         integratedTax: 0,
         centralTax: 0,
         stateTax: 0,
         Cess: 0,
      },
      {
         id: 1,
         natureOfSupplies: "Total",
         taxableValue: saleTax + saleTaxReturn,
         integratedTax: integratedTax + integratedTaxReturn,
         centralTax: tax + taxReturn,
         stateTax: tax + taxReturn,
         Cess: cessTax + cessTaxReturn,
      },
   ];
   const table2Data = [
      {
         placeOfSupplyStateUT: "-",
         totalTaxableValue: "-",
         amountOfIntegratedTax: "-",
         totalTaxableValue: "-",
         amountOfIntegratedTax: "-",
         totalTaxableValue: "-",
         amountOfIntegratedTax: "-",
      },
   ];
   const table2UpperHead = [
      "",
      "Supplies Made To Unregistered Persons",
      "Supplies Made To Composition Taxable Persons",
      "Supplies Made To UIN Holders",
   ];
   const table2LowerHead = [
      "Place Of Supply (State/UT",
      "Total Taxable Value",
      "Amount Of Integrated Tax",
      "Total Taxable Value",
      "Amount Of Integrated Tax",
      "Total Taxable Value",
      "Amount Of Integrated Tax",
   ];
   const table3Head = [
      "Details",
      "Integrated Tax",
      "Central Tax",
      "State/UT Tax",
      "Cess",
   ];

   // ********************** excel download **********************

   const excelDownload = async () => {
      const workbook = XLSX.utils.book_new();

      // Data for Table 1
      const table1Data = tableData1.map((item) => [
         item.natureOfSupplies,
         item.taxableValue,
         item.integratedTax,
         item.centralTax,
         item.stateTax,
         item.Cess,
      ]);
      const table1Sheet = XLSX.utils.aoa_to_sheet([
         [""],
         [
            "Nature Of Supplies",
            "Total Taxable Value",
            "Integrated Tax",
            "Central Tax",
            "State/UT Tax",
            "Cess",
         ],
         [],
         ...table1Data,
      ]);
      XLSX.utils.book_append_sheet(workbook, table1Sheet, "Report 3.1");

      // Data for Table 2
      const table2Sheet = XLSX.utils.aoa_to_sheet([
         [""],
         [
            "Place Of Supply (State/UT)",
            "Total Taxable Value",
            "Amount Of Integrated Tax",
            "Total Taxable Value",
            "Amount Of Integrated Tax",
            "Total Taxable Value",
            "Amount Of Integrated Tax",
         ],
         [""],
         [
            table2Data[0].placeOfSupplyStateUT,
            table2Data[0].totalTaxableValue,
            table2Data[0].amountOfIntegratedTax,
            table2Data[0].totalTaxableValue,
            table2Data[0].amountOfIntegratedTax,
            table2Data[0].totalTaxableValue,
            table2Data[0].amountOfIntegratedTax,
         ],
      ]);
      XLSX.utils.book_append_sheet(workbook, table2Sheet, "Report 3.2");

      // Data for Table 3
      const table3Data = [
         [""],
         ["(A) ITC Available (whether in full or part)", "", "", "", ""],
         ["(1) Import of goods", 0, 0, 0, 0],
         ["(2) Import of services", 0, 0, 0, 0],
         [
            "(3) Inward supplies liable to reverse charge (other than 1 & 2 above)",
            0,
            0,
            0,
            0,
         ],
         ["(4) Inward supplies from ISD", 0, 0, 0, 0],
         ["(5) All other ITC", 0, 0, 0, 0],
         ["(D) Ineleigible ITC", "", "", "", ""],
         ["(1) As per section 17(5)", 0, 0, 0, 0],
         ["(2) Others", 0, 0, 0, 0],
      ];
      const table3Sheet = XLSX.utils.aoa_to_sheet(table3Data);
      XLSX.utils.book_append_sheet(workbook, table3Sheet, "Report 4");

      // Data for Table 4
      const table4Data = [
         [""],
         [
            "From a supplier under composition scheme, Exempt and Nil rated supply",
            0,
            0,
            0,
            0,
         ],
         ["Non GST supply", 0, 0, 0, 0],
      ];
      const table4Sheet = XLSX.utils.aoa_to_sheet(table4Data);
      XLSX.utils.book_append_sheet(workbook, table4Sheet, "Report 5");

      // Save the workbook as an Excel file
      XLSX.writeFile(workbook, "GSTR3B_Report.xlsx");
   };

   return isLoading ? (
      <Loader3 text="Loading GSTR3 Report" />
   ) : (
      <div>
         {/* Upper Control Panel */}
         <ReportUpperControlPanel
            title="GSTR3 REPORT"
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            nonTaxExempted={nonTaxExempted}
            setNonTaxExempted={setNonTaxExempted}
            showJson={false}
            excelDownload={excelDownload}
         />

         {/* Content */}
         <div className={css.ContentOuter}>
            {/* table 1 */}
            <div className={css.childContentParentDiv}>
               <p>
                  1. Details of outward supplies and inward supplies liable to
                  reverse charge
               </p>

               <table className={css.contentTableOuterDiv}>
                  <thead>
                     <tr>
                        {[
                           "Nature Of Supplies",
                           "Total Taxable Value",
                           "Integrated Tax",
                           "Central Tax",
                           "State/UT Tax",
                           "Cess",
                        ]?.map((headerItem, headerInd) => (
                           <th key={headerItem + headerInd}>
                              <div>{headerItem}</div>
                           </th>
                        ))}
                     </tr>
                  </thead>
                  <tbody>
                     {tableData1?.map((item) => (
                        <tr key={item.id}>
                           <td>
                              <div>{item?.natureOfSupplies}</div>
                           </td>
                           <td>
                              <div style={{ textAlign: "right" }}>
                                 {item?.taxableValue}
                              </div>
                           </td>
                           <td>
                              <div style={{ textAlign: "right" }}>
                                 {item?.integratedTax}
                              </div>
                           </td>
                           <td>
                              <div style={{ textAlign: "right" }}>
                                 {item?.centralTax}
                              </div>
                           </td>
                           <td>
                              <div style={{ textAlign: "right" }}>
                                 {item?.stateTax}
                              </div>
                           </td>
                           <td>
                              <div style={{ textAlign: "right" }}>
                                 {item?.Cess}
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            {/* table 2 */}
            <div className={css.childContentParentDiv}>
               <p>
                  2. Details of inter-State supplies made to unregistered
                  persons, composition dealer and UIN holders
               </p>

               <table className={css.contentTableOuterDiv}>
                  <thead>
                     <tr>
                        {table2UpperHead?.map((headerItem, headerInd) => (
                           <th
                              colSpan={headerInd != 0 && 2}
                              key={headerItem + headerInd}
                           >
                              <div
                                 style={{
                                    display: "grid",
                                    placeContent: "center",
                                    placeItems: "center",
                                 }}
                              >
                                 {headerItem}
                              </div>
                           </th>
                        ))}
                     </tr>
                     <tr>
                        {table2LowerHead?.map((headerItem, headerInd) => (
                           <th key={headerItem + headerInd}>
                              <div>{headerItem}</div>
                           </th>
                        ))}
                     </tr>
                  </thead>
                  <tbody>
                     {table2Data?.map((item) => (
                        <tr key={item.id}>
                           <td>
                              <div>{item.placeOfSupplyStateUT}</div>
                           </td>
                           <td>
                              <div>{item.totalTaxableValue}</div>
                           </td>
                           <td>
                              <div>{item.amountOfIntegratedTax}</div>
                           </td>
                           <td>
                              <div>{item.totalTaxableValue}</div>
                           </td>
                           <td>
                              <div>{item.amountOfIntegratedTax}</div>
                           </td>
                           <td>
                              <div>{item.totalTaxableValue}</div>
                           </td>
                           <td>
                              <div>{item.amountOfIntegratedTax}</div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            {/* table 3 */}
            <div className={css.childContentParentDiv}>
               <p>3. Details of eligible Input Tax Credit</p>

               <table className={css.contentTableOuterDiv}>
                  <thead>
                     <tr>
                        {table3Head?.map((headerItem, headerInd) => (
                           <th key={headerItem + headerInd}>
                              <div>{headerItem}</div>
                           </th>
                        ))}
                     </tr>
                  </thead>
                  <tbody>
                     <h6>(A) ITC Available (whether in full or part)</h6>
                     <tr>
                        <td>
                           <div>(1) Import of goods</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <div>(2) Import of services</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <div>
                              (3) Inward supplies liable to reverse charge
                              (other than 1 & 2 above)
                           </div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <div>(4) Inward supplies from ISD</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <div>(5) All other ITC</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                     </tr>
                     <h6>(D) Ineleigible ITC</h6>
                     <tr>
                        <td>
                           <div>(1) As per section 17(5)</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <div>(2) Others</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
            {/* table 4 */}
            <div className={css.childContentParentDiv}>
               <p>
                  4. Details of exempt, nil-rated and non-GST inward supplies
               </p>

               <table className={css.contentTableOuterDiv}>
                  <thead>
                     <tr>
                        {table3Head?.map((headerItem, headerInd) => (
                           <th key={headerItem + headerInd}>
                              <div>{headerItem}</div>
                           </th>
                        ))}
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>
                           <div>
                              From a supplier under composition scheme, Exempt
                              and Nil rated supply
                           </div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <div>Non GST supply</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                        <td>
                           <div>{0}</div>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default GSTR3B;
