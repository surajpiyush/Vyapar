import css from "./Invoice.module.css";
import { FormatDate, GetSingleInvoiceData } from "../../../Redux/sales/action";
import {
  EditIcon,
  PrintIcon2,
  DeleteIcon2,
} from "../../../assets/Icons/ReactIcons";

import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

const TableInvoice = ({
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
}) => {
  const toast = useToast();
  const dispatch = useDispatch();
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
        <div className={css.actionDivContent}>
          <DeleteIcon2 onClick={() => handleDelete(_id)} />
          <EditIcon onClick={() => handleEdit(_id)} />
          <PrintIcon2
            onClick={() => {
              GetSingleInvoiceData(dispatch, _id, toast);
            }}
          />
        </div>
      </td>
    </tr>
  );
};

export default TableInvoice;
