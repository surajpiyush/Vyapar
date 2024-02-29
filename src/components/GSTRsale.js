import React from "react";

const GSTRsale = ({ tableHeader1, tableHeader2, data }) => {
   return (
      <>
               <div style={{background:"yellow",textAlign:"center"}}>
                  {tableHeader1?.map((header) => (
                     <h1 key={header}  >
                        <h1>{header}</h1>
                     </h1>
                  ))}
               </div>
         <table className="excel-like-table">
            <thead>
               <tr>
                  {tableHeader2?.map((header) => (
                     <th key={header}>{header}</th>
                  ))}
               </tr>
            </thead>

            <tbody>
               {data?.map((item) => (
                  <tr key={item?.id}>
                     <td>{item?.gstNo}</td>
                     <td>{item.partyName}</td>
                     <td>{item.invoiceNumber}</td>
                     <td>
                        {new Date(item.invoiceDate).toLocaleDateString("en-GB")}
                     </td>
                     <td>{item.amount}</td>
                     {/* <td>{item.transactionType}</td>
                  <td>{item.amount}</td> */}
                  </tr>
               ))}
            </tbody>
         </table>
      </>
   );
};

export default GSTRsale;
