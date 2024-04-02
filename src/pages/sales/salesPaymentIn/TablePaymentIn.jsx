import css from "./PaymentIn.module.css";
import { FormatDate } from "../../../Redux/sales/action";
import { EditIcon, DeleteIcon2 } from "../../../assets/Icons/ReactIcons";

import { MdLocalPrintshop as PrintIcon } from "react-icons/md";
import { IoIosShareAlt as ShareIcon } from "react-icons/io";

const TablePaymentIn = ({
  _id,
  handleDelete,
  ind,
  date,
  receiptNo,
  partyName,
  type,
  total,
  recived,
  balance,
  handleEdit,
  // duedate,
  // paymentType,
  //  status,
}) => {
  return (
    <tr>
      <td>
        <div>{ind + 1}</div>
      </td>
      <td>
        <div>{FormatDate(date)}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>{receiptNo}</div>
      </td>
      <td>
        <div>{partyName}</div>
      </td>
      <td>
        <div>{type}</div>
      </td>
      {/* <td>
        <div style={{ textAlign: "right" }}>{total}</div>
      </td> */}
      <td>
        <div style={{ textAlign: "right" }}>₹{recived}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>₹{balance}</div>
      </td>
      <td>
        <div className={css.actionDivContent}>
          <DeleteIcon2 onClick={() => handleDelete(_id)} />
          <EditIcon onClick={() => handleEdit(_id)} />
        </div>
      </td>
    </tr>
  );
};

export default TablePaymentIn;
