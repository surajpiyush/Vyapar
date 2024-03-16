import RPLayout1 from "../../PrintLayouts/RPLayout1";
import RPLayout2 from "../../PrintLayouts/RPLayout2";
import { REGULAR_PRINTER_DATA } from "../../../Redux/store";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const PrintCarrier = ({ currPrintItem }) => {
  const updateSalePrintSettings = useSelector(
    (state) => state.SalesReducer.updateSalePrintSettings
  );

  const [printData, setPrintData] = useState(
    JSON.parse(sessionStorage.getItem(REGULAR_PRINTER_DATA)) || {}
  );

  useEffect(() => {
    const sessionStorageData =
      JSON.parse(sessionStorage.getItem(REGULAR_PRINTER_DATA)) || {};
    setPrintData((prev) => {
      return { ...prev, ...sessionStorageData };
    });
  }, [updateSalePrintSettings]);

  // console.log(currPrintItem);

  return printData?.layoutIndex == 0 ? (
    <RPLayout1 printData={printData} currPrintItem={currPrintItem} />
  ) : printData?.layoutIndex == 1 ? (
    <RPLayout2 printData={printData} currPrintItem={currPrintItem} />
  ) : (
    <RPLayout1 printData={printData} currPrintItem={currPrintItem} />
  );
};

export default PrintCarrier;
