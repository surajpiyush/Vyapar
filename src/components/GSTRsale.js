const GSTRsale = ({ tableHeader1, tableHeader2, data, sale }) => {
   console.log(data, sale);
   return (
      <>
         <table className="excel-like-table">
            <thead>
               <tr>
                  {tableHeader1?.map((header, index) => (
                     <th key={index}>{header}</th>
                  ))}
               </tr>

               <tr>
                  {tableHeader2?.map((header) => (
                     <th key={header}>{header}</th>
                  ))}
               </tr>
            </thead>
            {!data.length && (
               <tbody>
                  <tr>
                     <h1>Nothing to Display</h1>
                  </tr>
               </tbody>
            )}
            {data && (
               <tbody>
                  {data?.map((item) => (
                     <tr key={item?.id} style={{ textAlign: "center" }}>
                        <td>{item?.gstNo || item?.Data[0]?.gstNo || "-"}</td>
                        <td>
                           {item.partyName || item?.Data[0]?.partyName ||  "-"}
                        </td>

                        <td>{sale ? item.invoiceNumber : item?.returnNo}</td>
                        <td>
                           {new Date(item.invoiceDate).toLocaleDateString(
                              "en-GB"
                           )}
                        </td>
                        {item.creditNo ? <td>{item.creditNo}</td> : ""}
                        {item.creditNo ? <td>{item.creditNo}</td> : ""}
                        <td>{item.amount}</td>
                        <td>{item.taxRate}</td>
                        {!sale && <td> </td>}
                        {!sale && <td> </td>}
                        {!sale && <td> </td>}
                        <td>{item.cess || "-"}</td>
                        <td>{item.taxableValue}</td>
                        <td>{item.integreatedTax}</td>

                        <td>{+item?.taxableValue / 2 || "-"}</td>
                        <td>{+item?.taxableValue / 2 || "-"}</td>
                        <td>{item?.stateOfSupply || "-"}</td>
                     </tr>
                  ))}
               </tbody>
            )}
         </table>
      </>
   );
};

export default GSTRsale;
