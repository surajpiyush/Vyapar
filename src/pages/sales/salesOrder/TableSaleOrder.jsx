const TableSaleOrder = ({
  ind,
  partyName,
  no,
  date,
  dueDate,
  total,
  balance,
  type,
  status,
  action,
  paymentType,
}) => {
  function formatDate(dateString) {
    // Convert the string to a Date object
    const date = new Date(dateString);

    // Extract the year, month, and day from the Date object
    const year = date.getFullYear();
    // Note: getMonth() returns 0-indexed months, so you need to add 1 to get the correct month
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Format the date in the desired form
    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;

    return formattedDate;
  }

  return (
    <tr>
      <td>
        <div>{partyName}</div>
      </td>
      <td>
        <div>{no}</div>
      </td>
      <td>
        <div>{formatDate(date)}</div>
      </td>
      <td>
        <div>{formatDate(dueDate)}</div>
      </td>
      <td style={{ textAlign: "right" }}>
        <div>{total}</div>
      </td>
      <td style={{ textAlign: "right" }}>
        <div>{balance}</div>
      </td>
      <td>
        <div>{type}</div>
      </td>
      <td>
        <div>{status}</div>
      </td>
      <td>
        <div>{action}</div>
      </td>
      <td></td>
    </tr>
  );
};

export default TableSaleOrder;
