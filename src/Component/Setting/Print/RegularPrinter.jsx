import css from "./Print.module.css";
import RpTheme1 from "../../../assets/PrinterLayouts/RPTheme1.png";
import RpTheme2 from "../../../assets/PrinterLayouts/RPTheme2.png";
import RpLayout1 from "../../../assets/PrinterLayouts/RpLayout1.png";
import RpLayout2 from "../../../assets/PrinterLayouts/RpLayout2.png";
import { ColorArray } from "../../../App";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const RegularPrinter = ({ regularPrinterData, setRegularPrinterData }) => {
  const toast = useToast();
  const [changeType, setChangeType] = useState("layout");

  // checkbox Input change function
  const handleInpChange = (e) => {
    let { type, name, checked, value } = e.target;
    if (name == "extraSpace" && value > 50) {
      toast.closeAll();
      toast({
        title: "Cannot enter value greater than 50",
        status: "error",
        position: "top-right",
      });
      value = 50;
    }
    setRegularPrinterData((prev) => {
      return { ...prev, [name]: type == "checkbox" ? checked : value };
    });
  };

  return (
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
        {changeType == "layout" ? (
          // Layouts
          <div className={css.CorouselOuterDiv}>
            {RegularLayoutArr?.map((layoutItem, layoutIndex) => (
              <div
                onClick={() =>
                  setRegularPrinterData((prev) => {
                    return { ...prev, layoutIndex: layoutItem?.themeIndex };
                  })
                }
                style={{
                  backgroundColor:
                    regularPrinterData?.layoutIndex == layoutItem?.themeIndex
                      ? "var(--greyC)"
                      : "transparent",
                }}
                className={css.eachCorouselItemOuterDiv}
                key={layoutIndex + layoutItem?.text}
              >
                <img src={layoutItem?.img} alt={layoutItem?.text} />
                <p>{layoutItem?.text}</p>
              </div>
            ))}
          </div>
        ) : (
          // Color Layout
          <div className={css.colorDivOuterDiv}>
            {ColorArray?.map((colorItem, colorIndex) => (
              <div
                onClick={() =>
                  setRegularPrinterData((prev) => {
                    return { ...prev, layoutColor: colorItem?.color };
                  })
                }
                style={{ backgroundColor: colorItem?.color }}
                key={colorIndex + colorItem?.name}
              ></div>
            ))}
          </div>
        )}
        {/* Print Company Info / Header */}
        <div className={css.PrintComInfoHeadOuterDiv}>
          Print Company Info / Header
        </div>
        {/* Make Regular Printer Default */}
        <div className={css.checkboxOuterDiv}>
          <input
            type="checkbox"
            name="regularPrinterDefault"
            checked={regularPrinterData?.regularPrinterDefault}
            onChange={handleInpChange}
          />
          <label>Make Regular Printer Default</label>
        </div>
        {/* Print repeat header in all page */}
        <div className={css.checkboxOuterDiv}>
          <input
            type="checkbox"
            name="printRepeatHeaderInAllPage"
            checked={regularPrinterData?.printRepeatHeaderInAllPage}
            onChange={handleInpChange}
          />
          <label>Print repeat header in all page</label>
        </div>
        {/* Company Name */}
        <div className={css.checkboxOuterDiv}>
          <input
            type="checkbox"
            name="showCompanyName"
            checked={regularPrinterData?.showCompanyName}
            onChange={handleInpChange}
          />
          <div className={css.inputDiv}>
            <input
              type="text"
              id="checkbox"
              name="companyName"
              value={regularPrinterData?.companyName}
              disabled={!regularPrinterData?.showCompanyName}
              readOnly={!regularPrinterData?.showCompanyName}
              onChange={handleInpChange}
              className={css.input}
            />
            <label
              className={
                regularPrinterData?.companyName
                  ? css.activeLabel
                  : css.inactiveLabel
              }
            >
              Company Name
            </label>
          </div>
        </div>
        {/* Company Logo */}
        <div className={css.checkboxOuterDiv}>
          <input
            type="checkbox"
            name="showLogo"
            checked={regularPrinterData?.showLogo}
            onChange={handleInpChange}
          />
          <label>Company Logo</label>
        </div>
        {/* Address */}
        <div className={css.checkboxOuterDiv}>
          <input
            type="checkbox"
            name="showBusinessAddress"
            checked={regularPrinterData?.showBusinessAddress}
            onChange={handleInpChange}
          />
          <div className={css.inputDiv}>
            <input
              type="text"
              name="businessAddress"
              value={regularPrinterData?.businessAddress}
              disabled={!regularPrinterData?.showBusinessAddress}
              readOnly={!regularPrinterData?.showBusinessAddress}
              onChange={handleInpChange}
              className={css.input}
            />
            <label
              className={
                regularPrinterData?.businessAddress
                  ? css.activeLabel
                  : css.inactiveLabel
              }
            >
              Address
            </label>
          </div>
        </div>
        {/* Email */}
        <div className={css.checkboxOuterDiv}>
          <input
            type="checkbox"
            name="showEmail"
            checked={regularPrinterData?.showEmail}
            onChange={handleInpChange}
          />
          <div className={css.inputDiv}>
            <input
              type="email"
              name="email"
              value={regularPrinterData?.email}
              disabled={!regularPrinterData?.showEmail}
              readOnly={!regularPrinterData?.showEmail}
              onChange={handleInpChange}
              className={css.input}
            />
            <label
              className={
                regularPrinterData?.email ? css.activeLabel : css.inactiveLabel
              }
            >
              Email
            </label>
          </div>
        </div>
        {/* Phone Number */}
        <div className={css.checkboxOuterDiv}>
          <input
            type="checkbox"
            name="showPhoneNumber"
            checked={regularPrinterData?.showPhoneNumber}
            onChange={handleInpChange}
          />
          <div className={css.inputDiv}>
            <input
              type="number"
              name="phoneNumber"
              value={regularPrinterData?.phoneNumber}
              disabled={!regularPrinterData?.showPhoneNumber}
              readOnly={!regularPrinterData?.showPhoneNumber}
              onChange={handleInpChange}
              className={css.input}
            />
            <label
              className={
                regularPrinterData?.phoneNumber
                  ? css.activeLabel
                  : css.inactiveLabel
              }
            >
              Phone Number
            </label>
          </div>
        </div>
        {/* Paper Size */}
        <div className={css.checkboxOuterDiv}>
          <label style={{ width: "180px" }}>Paper Size</label>
          <div className={css.inputDiv}>
            <select
              name="paperSize"
              value={regularPrinterData?.paperSize}
              onChange={handleInpChange}
              style={{ width: "110px" }}
            >
              <option value="A4">A4</option>
              <option value="A5">A5</option>
            </select>
          </div>
        </div>
        {/* Company Name Text Size */}
        <div className={css.checkboxOuterDiv}>
          <label style={{ width: "180px" }}>Company Name Text Size</label>
          <div className={css.inputDiv}>
            <select
              name="companyNameTextSize"
              value={regularPrinterData?.companyNameTextSize}
              onChange={handleInpChange}
              style={{ width: "110px" }}
            >
              <option value="VerySmall">V. Small</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="Very Large">V. Large</option>
              <option value="Extra Large">E. Large</option>
            </select>
          </div>
        </div>
        {/* Invoice Text Size */}
        <div className={css.checkboxOuterDiv}>
          <label style={{ width: "180px" }}>Invoice Text Size</label>
          <div className={css.inputDiv}>
            <select
              name="invoiceTextSize"
              value={regularPrinterData?.invoiceTextSize}
              onChange={handleInpChange}
              style={{ width: "110px" }}
            >
              <option value="VerySmall">V. Small</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="Very Large">V. Large</option>
              <option value="Extra Large">E. Large</option>
            </select>
          </div>
        </div>
        {/* Print Original/Duplicate */}
        <div className={css.checkboxOuterDiv}>
          <input
            type="checkbox"
            name="printOriginal"
            checked={regularPrinterData?.printOriginal}
            onChange={handleInpChange}
          />
          <label>Print Original/Duplicate</label>
        </div>
        {/* Extra Space */}
        <div className={css.checkboxOuterDiv}>
          <label>Extra Space on Top of PDF</label>
          <div className={css.inputDiv}>
            <input
              type="number"
              name="extraSpace"
              value={regularPrinterData?.extraSpace}
              onChange={handleInpChange}
              className={css.input}
              style={{ width: "80px", padding: "auto 5px" }}
            />
          </div>
        </div>

        {/* ************* Totals & Taxes ********************* */}
        <div className={css.PrintComInfoHeadOuterDiv}>Totals & Taxes</div>
        {/* Item Quantity Total */}
        <div className={css.checkboxOuterDiv}>
          <input
            type="checkbox"
            name="showTotalItemQty"
            checked={regularPrinterData?.showTotalItemQty}
            onChange={handleInpChange}
          />
          <label>Total Item Quantity</label>
        </div>
        {/* Amount With Decimal */}
        <div className={css.checkboxOuterDiv}>
          <input
            type="checkbox"
            name="showAmountWithDecimal"
            checked={regularPrinterData?.showAmountWithDecimal}
            onChange={handleInpChange}
          />
          <label>
            Amount With Decimal
            <span
              style={{
                color: "var(--greyA)",
                fontSize: "12px",
                marginLeft: "4px",
              }}
            >
              e.g.0.00
            </span>
          </label>
        </div>
        {/* Recieved Amount */}
        <div className={css.checkboxOuterDiv}>
          <input
            type="checkbox"
            name="showRecievedAmount"
            checked={regularPrinterData?.showRecievedAmount}
            onChange={handleInpChange}
          />
          <label>Recieved Amount</label>
        </div>
        {/* Balance Amount */}
        <div className={css.checkboxOuterDiv}>
          <input
            type="checkbox"
            name="showBalanceAmount"
            checked={regularPrinterData?.showBalanceAmount}
            onChange={handleInpChange}
          />
          <label>Balance Amount</label>
        </div>
        {/* Tax Details */}
        <div className={css.checkboxOuterDiv}>
          <input
            type="checkbox"
            name="showTaxDetails"
            checked={regularPrinterData?.showTaxDetails}
            onChange={handleInpChange}
          />
          <label>Tax Details</label>
        </div>
        {/* You Saved */}
        <div className={css.checkboxOuterDiv}>
          <input
            type="checkbox"
            name="showYouSaved"
            checked={regularPrinterData?.showYouSaved}
            onChange={handleInpChange}
          />
          <label>You Saved</label>
        </div>
        {/* Print Amount with Grouping */}
        <div className={css.checkboxOuterDiv}>
          <input
            type="checkbox"
            name="printAmountWithGrouping"
            checked={regularPrinterData?.printAmountWithGrouping}
            onChange={handleInpChange}
          />
          <label>Print Amount with Grouping</label>
        </div>
        {/* Amount in Words */}
        <div className={css.checkboxOuterDiv}>
          <label>Amount in Words</label>
          <div className={css.inputDiv}>
            <select
              name="amountInWords"
              checked={regularPrinterData?.amountInWords}
              onChange={handleInpChange}
              style={{ width: "110px" }}
            >
              <option value="Indian">Indian</option>
              <option value="English">English</option>
            </select>
          </div>
        </div>

        {/* ************* Footer ********************* */}
        <div className={css.PrintComInfoHeadOuterDiv}>Footer</div>
        {/* Print Description */}
        <div className={css.checkboxOuterDiv}>
          <input
            type="checkbox"
            name="printDescription"
            checked={regularPrinterData?.printDescription}
            onChange={handleInpChange}
          />
          <label>Print Description</label>
        </div>
        {/* Print Signature Text */}
        <div className={css.checkboxOuterDiv}>
          <input
            type="checkbox"
            name="showPrintSignatureText"
            checked={regularPrinterData?.showPrintSignatureText}
            onChange={handleInpChange}
          />
          <div className={css.inputDiv}>
            <input
              type="text"
              name="signatureText"
              checked={regularPrinterData?.signatureText}
              onChange={handleInpChange}
              className={css.input}
            />
            <label
              className={
                regularPrinterData?.signatureText
                  ? css.activeLabel
                  : css.inactiveLabel
              }
            >
              Print Signature Text
            </label>
          </div>
        </div>
        {/* Payment Mode */}
        <div className={css.checkboxOuterDiv}>
          <input
            type="checkbox"
            name="showPaymentMode"
            checked={regularPrinterData?.showPaymentMode}
            onChange={handleInpChange}
          />
          <label>Payment Mode</label>
        </div>
        {/* Print Acknowledgement*/}
        <div className={css.checkboxOuterDiv}>
          <input
            type="checkbox"
            name="printAcknowledgement"
            checked={regularPrinterData?.printAcknowledgement}
            onChange={handleInpChange}
          />
          <label>Print Acknowledgement</label>
        </div>
      </div>
      {/* Right Side Regular Printer */}
      <div className={css.RightSideContentOuterDiv}>
        <div>
          {regularPrinterData?.layoutIndex == 0 ? (
            <img src={RpLayout1} alt="Layout1" />
          ) : regularPrinterData?.layoutIndex == 1 ? (
            <img src={RpLayout2} alt="Layout2" />
          ) : (
            <img src={RpLayout1} alt="Layout1" />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegularPrinter;

const RegularLayoutArr = [
  { img: RpTheme1, text: "GST Theme 1", themeIndex: 0 },
  { img: RpTheme2, text: "GST Theme 2", themeIndex: 1 },
];
