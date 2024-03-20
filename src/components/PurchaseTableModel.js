import { PrinterIcon, ShareIcon } from "../Component/utils/reactIcons";

const PurchaseTableModel = ({ tableHeader, data }) => {
   console.log(data);

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
               {data && data.length > 0 ? (
                  data?.map((item, index) => (
                     
                     <tr>
                        <td>{index + 1}</td>
                        <td>
                           {new Date(item?.invoiceDate).toLocaleDateString(
                              "en-IN",
                              {
                                 day: "2-digit",
                                 month: "2-digit",
                                 year: "numeric",
                              }
                           )}
                        </td>
                        <td>{item?.invoiceNumber ? item.invoiceNumber : "-"}</td>
                        <td>{item?.partyName}</td>
                        <td>{item?.transactionType}</td>
                        <td>
                           {item?.paymentType[0]?.types || item?.paymentType[0]}
                        </td>
                        <td>{item?.amount}</td>
                        {/* <td>{item.recived}</td> */}
                        <td>{item?.balanceDue}</td>
                        <td>
                           {item?.dueDate
                              ? new Date(item.dueDate).toLocaleDateString(
                                   "en-GB"
                                )
                              : "-"}
                        </td>
                        <td>{item?.status}</td>
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
