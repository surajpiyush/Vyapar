import { FormatDate } from "../../Redux/sales/action";
import { REGULAR_PRINTER_DATA } from "../../Redux/store";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const RPLayout2 = ({ currPrintItem }) => {
  const updateSalePrintSettings = useSelector(
    (state) => state.SalesReducer.updateSalePrintSettings
  );
  const [storedPrintData, setStoredPrintData] = useState(
    JSON.parse(sessionStorage.getItem(REGULAR_PRINTER_DATA)) || {}
  );

  // for updating printer settings
  useEffect(() => {
    const sessionStorageData =
      JSON.parse(sessionStorage.getItem(REGULAR_PRINTER_DATA)) || {};
    setStoredPrintData((prev) => {
      return { ...prev, ...sessionStorageData };
    });
  }, [updateSalePrintSettings]);

  // console.log("RPlayout 2 currPrintItem", currPrintItem);
  // console.log("RPlayout2 storedPrintData", storedPrintData);
  return (
    <div style={{ color: storedPrintData?.layoutColor }}>
      This is Regular Printer layout 2
      <p>
        Invoice With Invoice Date. {FormatDate(currPrintItem?.invoiceDate)}
        ,invoice no. {currPrintItem?.invoiceNumber} & amount
        {currPrintItem?.amount} will be displayed here.
      </p>
    </div>
  );
};

export default RPLayout2;
