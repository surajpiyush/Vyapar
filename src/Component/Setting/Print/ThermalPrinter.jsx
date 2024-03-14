import css from "./Print.module.css";
import TpTheme1 from "../../../assets/PrinterLayouts/TPTheme1.png";
import TpTheme2 from "../../../assets/PrinterLayouts/TPTheme2.png";
import TpLayout1 from "../../../assets/PrinterLayouts/TpLayout1.png";
import TpLayout2 from "../../../assets/PrinterLayouts/TpLayout2.png";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ThermalPrinter = ({ thermalPrinterData, setThermalPrinterData }) => {
  return (
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

        {/* Corousel */}
        <div className={css.CorouselOuterDiv}>
          {ThermalLayoutArr?.map((layoutItem, layoutIndex) => (
            <div
              onClick={() =>
                setThermalPrinterData((prev) => {
                  return { ...prev, layoutIndex: layoutItem?.themeIndex };
                })
              }
              style={{
                backgroundColor:
                  thermalPrinterData?.layoutIndex == layoutItem?.themeIndex
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

        {/* Make Thermal Printer Default */}
        <div className={css.checkboxOuterDiv}>
          <input type="checkbox" id="checkbox" />
          <label>Make Thermal Printer Default</label>
        </div>

        {/* Page Size */}
        <div className={css.PageSizeOuterDiv}>
          <h3>Page Size</h3>
          <div className={css.SizeOptionsOuterDiv}>
            <div
              onClick={() =>
                setThermalPrinterData((prev) => {
                  return { ...prev, pageSize: "2Inch" };
                })
              }
              className={
                thermalPrinterData?.pageSize == "2Inch"
                  ? css.ActivePageSizeDiv
                  : ""
              }
            >
              <h3>2 Inch</h3>
              <span>58mm</span>
            </div>
            <div
              onClick={() =>
                setThermalPrinterData((prev) => {
                  return { ...prev, pageSize: "3Inch" };
                })
              }
              className={
                thermalPrinterData?.pageSize == "3Inch"
                  ? css.ActivePageSizeDiv
                  : ""
              }
            >
              <h3>3 Inch</h3>
              <span>68mm</span>
            </div>
            <div
              onClick={() =>
                setThermalPrinterData((prev) => {
                  return { ...prev, pageSize: "4Inch" };
                })
              }
              className={
                thermalPrinterData?.pageSize == "4Inch"
                  ? css.ActivePageSizeDiv
                  : ""
              }
            >
              <h3>4 Inch</h3>
              <span>88mm</span>
            </div>
            <div
              onClick={() =>
                setThermalPrinterData((prev) => {
                  return { ...prev, pageSize: "Custom" };
                })
              }
              className={
                thermalPrinterData?.pageSize == "Custom"
                  ? css.ActivePageSizeDiv
                  : ""
              }
            >
              <h3>Custom</h3>
              <span>48 (Chars)</span>
            </div>
          </div>
        </div>

        {/* Printing Type */}
        <div className={css.checkboxOuterDiv}>
          <label>Printing Type</label>
          <div className={css.inputDiv}>
            <select
              name="printingType"
              value={thermalPrinterData?.printingType}
              onChange={(e) =>
                setThermalPrinterData((prev) => {
                  return { ...prev, [e.target.name]: e.target.value };
                })
              }
              style={{ width: "fit-content" }}
            >
              <option value="Text Printing">Text Printing</option>
              <option value="Local Language Printing">
                Local Language Printing
              </option>
              <option value="Local Printing">Local Printing</option>
            </select>
          </div>
        </div>

        {/*  Use Text Styling (Bold) */}
        <div className={css.checkboxOuterDiv}>
          <input type="checkbox" id="checkbox" />
          <label>
            Use Text Styling
            <span style={{ color: "var(--greyA)" }}>(Bold)</span>
          </label>
        </div>

        {/*  Auto Cut Paper After Printing */}
        <div className={css.checkboxOuterDiv}>
          <input type="checkbox" id="checkbox" />
          <label>Auto Cut Paper After Printing</label>
        </div>

        {/* Open Cash Drawer After Printin */}
        <div className={css.checkboxOuterDiv}>
          <input type="checkbox" id="checkbox" />
          <label>Open Cash Drawer After Printing</label>
        </div>

        {/* Extra Lines */}
        <div className={css.checkboxOuterDiv}>
          <label>Extra Lines at the end</label>
          <div className={css.inputDiv}>
            <input
              type="number"
              name="extralines"
              value={thermalPrinterData?.extralines}
              onChange={(e) =>
                setThermalPrinterData((prev) => {
                  return { ...prev, [e.target.name]: e.target.value };
                })
              }
              className={css.input}
              style={{ width: "80px", padding: "auto 5px" }}
            />
          </div>
        </div>

        {/* Print Company Info / Header */}
        <div className={css.PrintComInfoHeadOuterDiv}>
          Print Company Info / Header
        </div>

        {/* Company Name */}
        <div className={css.checkboxOuterDiv}>
          <input type="checkbox" id="checkbox" />
          <div className={css.inputDiv}>
            <input
              type="text"
              id="checkbox"
              name="companyName"
              value={thermalPrinterData?.companyName}
              onChange={(e) =>
                setThermalPrinterData((prev) => {
                  return { ...prev, [e.target.name]: e.target.value };
                })
              }
              className={css.input}
            />
            <label
              className={
                thermalPrinterData?.companyName
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
          <input type="checkbox" id="checkbox" />
          <label>Company Logo</label>
        </div>

        {/* Address */}
        <div className={css.checkboxOuterDiv}>
          <input type="checkbox" id="checkbox" />
          <div className={css.inputDiv}>
            <input
              type="text"
              id="checkbox"
              name="address"
              value={thermalPrinterData?.address}
              onChange={(e) =>
                setThermalPrinterData((prev) => {
                  return { ...prev, [e.target.name]: e.target.value };
                })
              }
              className={css.input}
            />
            <label
              className={
                thermalPrinterData?.address
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
          <input type="checkbox" id="checkbox" />
          <div className={css.inputDiv}>
            <input
              type="text"
              id="checkbox"
              name="email"
              value={thermalPrinterData?.email}
              onChange={(e) =>
                setThermalPrinterData((prev) => {
                  return { ...prev, [e.target.name]: e.target.value };
                })
              }
              className={css.input}
            />
            <label
              className={
                thermalPrinterData?.email ? css.activeLabel : css.inactiveLabel
              }
            >
              Email
            </label>
          </div>
        </div>

        {/* Phone Number */}
        <div className={css.checkboxOuterDiv}>
          <input type="checkbox" id="checkbox" />
          <div className={css.inputDiv}>
            <input
              type="number"
              name="phoneNumber"
              value={thermalPrinterData?.phoneNumber}
              onChange={(e) =>
                setThermalPrinterData((prev) => {
                  return { ...prev, [e.target.name]: e.target.value };
                })
              }
              className={css.input}
            />
            <label
              className={
                thermalPrinterData?.phoneNumber
                  ? css.activeLabel
                  : css.inactiveLabel
              }
            >
              Phone Number
            </label>
          </div>
        </div>

        {/* ************* Totals & Taxes ********************* */}
        <div className={css.PrintComInfoHeadOuterDiv}>Totals & Taxes</div>

        {/* Item Quantity Total */}
        <div className={css.checkboxOuterDiv}>
          <input type="checkbox" id="checkbox" />
          <label>Total Item Quantity</label>
        </div>

        {/* Amount With Decimal */}
        <div className={css.checkboxOuterDiv}>
          <input type="checkbox" id="checkbox" />
          <label>
            Amount With Decimal
            <span style={{ color: "var(--greyA)" }}>e.g.0.00</span>
          </label>
        </div>

        {/* Recieved Amount */}
        <div className={css.checkboxOuterDiv}>
          <input type="checkbox" id="checkbox" />
          <label>Recieved Amount</label>
        </div>

        {/* Balance Amount */}
        <div className={css.checkboxOuterDiv}>
          <input type="checkbox" id="checkbox" />
          <label>Balance Amount</label>
        </div>

        {/* Current Balance of Party */}
        <div className={css.checkboxOuterDiv}>
          <input type="checkbox" id="checkbox" />
          <label>Current Balance of Party</label>
        </div>

        {/* Tax Details */}
        <div className={css.checkboxOuterDiv}>
          <input type="checkbox" id="checkbox" />
          <label>Tax Details</label>
        </div>

        {/* You Saved */}
        <div className={css.checkboxOuterDiv}>
          <input type="checkbox" id="checkbox" />
          <label>You Saved</label>
        </div>

        {/* HSN/SAC Code */}
        <div className={css.checkboxOuterDiv}>
          <input type="checkbox" id="checkbox" />
          <label>HSN/SAC Code</label>
        </div>

        {/* Units of Measurement */}
        <div className={css.checkboxOuterDiv}>
          <input type="checkbox" id="checkbox" />
          <label>Units of Measurement</label>
        </div>

        {/* Print Amount with Grouping */}
        <div className={css.checkboxOuterDiv}>
          <input type="checkbox" id="checkbox" />
          <label>Print Amount with Grouping</label>
        </div>

        {/* Amount in Words */}
        <div className={css.checkboxOuterDiv}>
          <label>Amount in Words</label>
          <div className={css.inputDiv}>
            <select
              name="amountInWords"
              value={thermalPrinterData?.amountInWords}
              onChange={(e) =>
                setThermalPrinterData((prev) => {
                  return { ...prev, [e.target.name]: e.target.value };
                })
              }
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
          <input type="checkbox" id="checkbox" />
          <label>Print Description</label>
        </div>
      </div>
      {/* Right Side Thermal Printer */}
      <div className={css.RightSideContentOuterDiv}>
        <div>
          {thermalPrinterData?.layoutIndex == 0 ? (
            <img src={TpLayout1} alt="Layout1" />
          ) : thermalPrinterData?.layoutIndex == 1 ? (
            <img src={TpLayout2} alt="Layout2" />
          ) : (
            <img src={TpLayout1} alt="Layout1" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ThermalPrinter;

const ThermalLayoutArr = [
  { img: TpTheme1, text: "Theme 1", themeIndex: 0 },
  { img: TpTheme2, text: "Theme 2", themeIndex: 1 },
];
