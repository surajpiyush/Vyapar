import { PrinterIcon, ShareIcon } from "../Component/utils/reactIcons";

const PurchaseTableModel = ({ tableHeader, data }) => {
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
        <tbody>
  {data ? (
    data.map((item, index) => (
      <tr key={item.id}>
        <td>{index + 1}</td>
        <td>
          {new Date(item.invoiceDate).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </td>
        <td>{item.invoiceNumber ? item.invoiceNumber : "-"}</td>
        <td>{item?.partyName}</td>
        <td>{item.transactionType}</td>
        <td>{item.paymentType[0].types}</td>
        <td>{item.amount}</td>
        {/* <td>{item.recived}</td> */}
        <td>{item.balanceDue}</td>
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
    ))
  ) : (
    <div style={{ textAlign: "center" }}>
      <h1 style={{alignContent:"center"}}>No data to Display</h1>
    </div>
  )}
</tbody>

      </table>
    </div>
  );
};

export default PurchaseTableModel;
