import { PrinterIcon, ShareIcon } from "../Component/utils/reactIcons";

const TableModel = ({ tableHeader, data }) => {
   console.log(data);
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
            {!data.length ? (
               <h2
                  style={{
                     textAlign: "center",
                     margin: "20px auto",
                     color: "red",
                     display: "flex",
                  }}
               >
                  No Transactions data available for the specified dates
               </h2>
            ) : (
               ""
            )}
            <tbody>
               {data?.map((item, index) => (
                  <tr key={item.id}>
                     <td>{index + 1}</td>

                     <td>
                        {new Date(item.date).toLocaleDateString("en-IN", {
                           day: "2-digit",
                           month: "2-digit",
                           year: "numeric",
                        })}
                     </td>
                     <td>{item.invoiceNumber ? item.invoiceNumber : "-"}</td>

                     <td>{item?.name}</td>
                     <td>{item.category}</td>
                     <td>{item.type}</td>
                     <td>{item.total}</td>
                     <td>{item.recived}</td>
                     <td>{item.balance}</td>
                     <td>
                        {item.dueDate
                           ? new Date(item.dueDate).toLocaleDateString("en-GB")
                           : "-"}
                     </td>
                     <td>{item.status}</td>
                     <td>
                        <PrinterIcon
                           onClick={() => {
                              window.print();
                           }}
                        />
                        <ShareIcon />
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default TableModel;
