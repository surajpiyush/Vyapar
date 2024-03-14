import { FormatDate } from "../../../Redux/sales/action";
import {
  DeleteIcon,
  EditIcon,
  PrintIcon2,
} from "../../../Component/utils/reactIcons";

const TableInvoice = ({
  item,
  _id,
  invoiceDate,
  invoiceNumber,
  partyname,
  transactionType,
  paymentType,
  amount,
  balanceDue,
  status,
  dueDate = new Date().toISOString().split("T")[0],
  handleDelete,
  handleEdit,
  handlePrint,
  setCurrPrintItem,
}) => {
  return (
    <tr>
      <td>
        <div>{FormatDate(invoiceDate)}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>{invoiceNumber}</div>
      </td>
      <td>
        <div>{partyname}</div>
      </td>
      <td>
        <div>{transactionType}</div>
      </td>
      <td>
        <div>{paymentType[0]?.types}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>{amount}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>{balanceDue}</div>
      </td>
      <td>
        <div>{dueDate}</div>
      </td>
      <td>
        <div>{status}</div>
      </td>
      <td>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "18px",
            gap: "4px",
          }}
        >
          <DeleteIcon onClick={() => handleDelete(_id)} />
          <EditIcon onClick={() => handleEdit(_id)} />
          <PrintIcon2
            onClick={() => {
              setCurrPrintItem(item);
              handlePrint();
            }}
          />
        </div>
      </td>
    </tr>
  );
};

export default TableInvoice;
