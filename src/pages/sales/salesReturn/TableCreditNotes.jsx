import css from "./CreditNotes.module.css";
import { FormatDate } from "../../../Redux/sales/action";
import { EditIcon, DeleteIcon2 } from "../../../assets/Icons/ReactIcons";

const TableCreditNotes = ({
  _id,
  handleDelete,
  ind,
  date,
  refNo,
  partyName,
  categoryName,
  type,
  total,
  paidAmount,
  balance,
  // paymentType,
  status,
  handleEdit,
}) => {
  // console.log("Date in return -",date)
  return (
    <tr>
      <td>
        <div>{ind + 1}</div>
      </td>
      <td>
        <div>{FormatDate(date)}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>{refNo}</div>
      </td>
      <td>
        <div>{partyName}</div>
      </td>
      {/* <td>
            <div>{categoryName}</div>
         </td> */}
      <td>
        <div>{type}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>{total}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>{paidAmount ? paidAmount : 0}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>{balance}</div>
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

export default TableCreditNotes;
