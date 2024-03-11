const GSTRsale = ({ tableHeader1, tableHeader2, data }) => {
  console.log(data)
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

        <tbody>
          {data?.map((item) => (
            <tr key={item?.id}>
              <td>{item?.gstNo}</td>
              <td>{item.partyName}</td>

              <td>{item.invoiceNumber}</td>
              <td>{new Date(item.invoiceDate).toLocaleDateString("en-GB")}</td>
              {item.creditNo ? <td>{item.creditNo}</td> : ""}
              {item.creditNo ? <td>{item.creditNo}</td> : ""}
              <td>{item.amount}</td>
              <td>{item.taxRate}</td>

              <td>{item.cess || "-"}</td>
              <td>{item.taxableValue}</td>
              <td>{item.integreatedTax}</td>

              <td>{+item?.taxableValue / 2 || "-"}</td>
              <td>{+item?.taxableValue / 2 || "-"}</td>
              <td>{item.stateOfSupply}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default GSTRsale;
