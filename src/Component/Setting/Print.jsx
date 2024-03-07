import css from "./Print.module.css";

import { useState } from "react";

const Print = () => {
  const [currPrinterType, setCurrPrinterType] = useState("regular");
  const [changeType, setChangeType] = useState("layout");
  return (
    <div className={css.Outer}>
      {/* Toggle Printer Type */}
      <div className={css.toggleContDiv}>
        <div
          onClick={() => setCurrPrinterType("regular")}
          className={
            currPrinterType == "regular"
              ? css.currPrinterDiv
              : css.nonCurrPrinterDiv
          }
        >
          REGULAR PRINTER
        </div>
        <div
          onClick={() => setCurrPrinterType("thermal")}
          className={
            currPrinterType == "thermal"
              ? css.currPrinterDiv
              : css.nonCurrPrinterDiv
          }
        >
          THERMAL PRINTER
        </div>
      </div>

      {/* Content Outer Div */}
      {currPrinterType == "regular" ? (
        // Regular Content
        <div className={css.contentOuterDiv}>
          {/* Left Side Regular Printer */}
          <div className={css.LeftSideContentOuterDiv}>
            {/* Change Layout */}
            <div className={css.changeLayoutOuterDiv}>
              <div
                onClick={() => setChangeType("layout")}
                className={
                  changeType == "layout"
                    ? css.activeChangeType
                    : css.inActiveChangeType
                }
              >
                CHANGE LAYOUT
              </div>
              <div
                onClick={() => setChangeType("colors")}
                className={
                  changeType == "colors"
                    ? css.activeChangeType
                    : css.inActiveChangeType
                }
              >
                CHANGE COLORS
              </div>
            </div>
          </div>
          {/* Right Side Regular Printer */}
          <div className={css.RightSideContentOuterDiv}>Right Side</div>
        </div>
      ) : (
        // Thermal Content
        <div className={css.contentOuterDiv}>
          {/* Left Side Thermal Printer */}
          <div className={css.LeftSideContentOuterDiv}>
            {/* Change Layout */}
            <div className={css.changeLayoutOuterDiv}>
              <div
                className={css.inActiveChangeType}
                style={{
                  color: "var(--greyA)",
                  borderBottom: "2px solid var(--redB)",
                }}
              >
                CHANGE LAYOUT
              </div>
            </div>
          </div>
          {/* Right Side Thermal Printer */}
          <div className={css.RightSideContentOuterDiv}>Right Side</div>
        </div>
      )}
    </div>
  );
};

export default Print;
