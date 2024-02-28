import React from "react";
import { FilterIcon } from "../Component/utils/reactIcons";

const TableModel = ({ tableHeader, data }) => {
   return (
      <div>
         <table className="excel-like-table">
            <thead>
               <tr>
                  {tableHeader?.map((header) => (
                     <th key={header}>
                        
                           {header}
                           {/* <FilterIcon /> */}
                        
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {data?.map((item) => (
                  <tr key={item.id}>
                     <td>
                        {new Date(item.invoiceDate).toLocaleDateString("en-GB")}
                     </td>
                     <td>{item.invoiceNumber}</td>
                     <td>{item.partyName}</td>
                     <td>{item.transactionType}</td>
                     <td>-</td>
                     <td>{item.amount}</td>
                     <td>{item.balanceDue}</td>
                     <td>
                     {new Date(item.dueDate).toLocaleDateString("en-GB")}

                     </td>
                     <td>{item.status}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default TableModel;
