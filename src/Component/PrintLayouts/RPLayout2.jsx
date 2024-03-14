import { FormatDate } from "../../Redux/sales/action";

const RPLayout2 = ({ printData, currPrintItem }) => {
  return (
    <div style={{ color: printData?.layoutColor }}>
      This is Regular Printer layout 2
      <p>
        Invoice With Invoice Date. {FormatDate(currPrintItem?.invoiceDate)}
        ,invoice no. {currPrintItem?.invoiceNumber} & amount{" "}
        {currPrintItem?.amount} will be displayed here.
      </p>
    </div>
  );
};

export default RPLayout2;
