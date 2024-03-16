import css from "./RPLayout.module.css";
import { FormatDate } from "../../Redux/sales/action";
import { REGULAR_PRINTER_DATA } from "../../Redux/store";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const RPLayout1 = ({ currPrintItem }) => {
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

  // console.log("RPlayout 1 currPrintItem", currPrintItem);
  // console.log("RPlayoutstoredPrintData", storedPrintData);

  return (
    <div className={css.OuterRP1}>
      <div className={css.RP1Inner}>
        {/* Top Header */}
        <div
          style={{ borderBottomColor: storedPrintData?.layoutColor }}
          className={css.topOuterDiv}
        >
          <div className={css.topOuterLeftSideDiv}>
            {storedPrintData?.showPhoneNumber && (
              <h2>Ph. no.: {storedPrintData?.phoneNumber}</h2>
            )}
            {storedPrintData?.showEmail && (
              <h2>Email: {storedPrintData?.email}</h2>
            )}
          </div>
          <div className={css.topOuterRightSideDiv}>
            {storedPrintData?.showLogo &&
              (storedPrintData?.companyLogo ? (
                <img src={storedPrintData?.companyLogo} />
              ) : (
                <div>Image</div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RPLayout1;
