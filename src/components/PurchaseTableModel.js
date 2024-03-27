import { PrinterIcon, ShareIcon } from "../Component/utils/reactIcons";

const PurchaseTableModel = ({ tableHeader, data }) => {
   console.log("Data:", data);

   return (
      <div>
         <table className="excel-like-table">
            <thead>
               <tr>
                  {tableHeader.map((header) => (
                     <th key={header}>
                        {header}
                        {/* <FilterIcon /> */}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {Array.isArray(data) && data.length > 0 ? (
                  data.map((item, index) => (
                     <tr key={item._id || index}>
                        <td>{index + 1}</td>
                        <td>
                           {item.invoiceDate
                              ? new Date(item.invoiceDate).toLocaleDateString(
                                   "en-GB"
                                )
                              : "-"}
                        </td>

                        <td>{item.invoiceNumber || "-"}</td>
                        <td>{item.partyName || "-"}</td>
                        <td>{item.transactionType || "-"}</td>
                        <td>
                           {(item.paymentType && item.paymentType[0]?.types) ||
                              "-"}
                        </td>
                        <td>{item.amount || "-"}</td>
                        <td>
                           {item.balanceDue > 0 && (item.balanceDue || "-")}
                        </td>
                        <td>
                           {item.dueDate
                              ? new Date(item.dueDate).toLocaleDateString(
                                   "en-GB"
                                )
                              : "-"}
                        </td>
                        <td>{item.status || "-"}</td>
                        <td>
                           <PrinterIcon
                              onClick={() => {
                                 window.print();
                              }}
                           />
                           <ShareIcon />
                        </td>
                     </tr>
                  ))
               ) : (
                  <tr>
                     <td
                        colSpan={tableHeader.length}
                        style={{ textAlign: "center" }}
                     >
                        <h1>No data to Display</h1>
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
      </div>
   );
};

export default PurchaseTableModel;
