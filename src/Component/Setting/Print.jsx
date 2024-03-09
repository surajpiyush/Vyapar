import css from "./Print.module.css";
import RpTheme1 from "../../assets/PrinterLayouts/RPTheme1.png";
import RpTheme2 from "../../assets/PrinterLayouts/RPTheme2.png";
import TpTheme1 from "../../assets/PrinterLayouts/TPTheme1.png";
import TpTheme2 from "../../assets/PrinterLayouts/TPTheme2.png";
import RpLayout1 from "../../assets/PrinterLayouts/RpLayout1.png";
import RpLayout2 from "../../assets/PrinterLayouts/RpLayout2.png";
import TpLayout1 from "../../assets/PrinterLayouts/TpLayout1.png";
import TpLayout2 from "../../assets/PrinterLayouts/TpLayout2.png";
import { USER_DETAILS } from "../../Redux/business/actionTypes";

import { useEffect, useState } from "react";
import { FaCheck as CheckIcon } from "react-icons/fa";
import { IoMdInformationCircle as InfoIcon } from "react-icons/io";
import { Tooltip } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Print = () => {
  const toggleUpdate = useSelector(
    (state) => state.BusinessReducer.toggleUpdate
  );

  const [colorSelected, setColorSelected] = useState(colorArray[0]?.color);
  const [changeType, setChangeType] = useState("layout");
  const [currPrinterType, setCurrPrinterType] = useState("regular");
  const [regularPrinterIndex, setRegularPrinterIndex] = useState(1);
  const [thermalPrinterIndex, setThermalPrinterIndex] = useState(1);

  const [companyData, setCompanyData] = useState({
    printSignatureText: "Authorized Signatory",
    pageSize: "2Inch",
    paperSize: "A4",
    companyNameTextSize: "Large",
    invoiceTextSize: "Large",
    amountInWords: "Indian",
  });

  const [regularPrinterData, setRegularPrinterData] = useState({});
  const [ThermalPrinterData, setThermalPrinterData] = useState({});

  useEffect(() => {
    const updatedCompanyData = JSON.parse(localStorage.getItem(USER_DETAILS));
    setRegularPrinterData((prev) => {
      return { ...prev, ...updatedCompanyData };
    });
    setThermalPrinterData((prev) => {
      return { ...prev, ...updatedCompanyData };
    });
  }, [toggleUpdate]);
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
            {changeType == "layout" ? (
              // Layouts
              <div className={css.CorouselOuterDiv}>
                {regularLayoutArr?.map((layoutItem, layoutIndex) => (
                  <div
                    onClick={() =>
                      setRegularPrinterIndex(layoutItem?.themeIndex)
                    }
                    style={{
                      backgroundColor:
                        regularPrinterIndex == layoutItem?.themeIndex
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
                {colorArray?.map((colorItem, colorIndex) => (
                  <div
                    onClick={() => setColorSelected(colorItem?.color)}
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
              <input type="checkbox" id="checkbox" />
              <label>Make Regular Printer Default</label>
            </div>

            {/* Print repeat header in all page */}
            <div className={css.checkboxOuterDiv}>
              <input type="checkbox" id="checkbox" />
              <label>Print repeat header in all page</label>
            </div>

            {/* Company Name */}
            <div className={css.checkboxOuterDiv}>
              <input type="checkbox" id="checkbox" />
              <div className={css.inputDiv}>
                <input
                  type="text"
                  id="checkbox"
                  name="companyName"
                  value={companyData?.companyName}
                  onChange={(e) =>
                    setCompanyData((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    })
                  }
                  className={css.input}
                />
                <label
                  className={
                    companyData?.companyName
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
                  value={companyData?.address}
                  onChange={(e) =>
                    setCompanyData((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    })
                  }
                  className={css.input}
                />
                <label
                  className={
                    companyData?.address ? css.activeLabel : css.inactiveLabel
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
                  value={companyData?.email}
                  onChange={(e) =>
                    setCompanyData((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    })
                  }
                  className={css.input}
                />
                <label
                  className={
                    companyData?.email ? css.activeLabel : css.inactiveLabel
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
                  value={companyData?.phoneNumber}
                  onChange={(e) =>
                    setCompanyData((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    })
                  }
                  className={css.input}
                />
                <label
                  className={
                    companyData?.phoneNumber
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
                  // value={companyData?.paperSize}
                  onChange={(e) =>
                    setCompanyData((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    })
                  }
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
                  // value={companyData?.companyNameTextSize}
                  onChange={(e) =>
                    setCompanyData((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    })
                  }
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
                  // value={companyData?.invoiceTextSize}
                  onChange={(e) =>
                    setCompanyData((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    })
                  }
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
              <input type="checkbox" id="checkbox" />
              <label>Print Original/Duplicate</label>
            </div>

            {/* Extra Space */}
            <div className={css.checkboxOuterDiv}>
              <label>Extra Space on Top of PDF</label>
              <div className={css.inputDiv}>
                <input
                  type="number"
                  name="extraSpace"
                  value={companyData?.extraSpace}
                  onChange={(e) =>
                    setCompanyData((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    })
                  }
                  className={css.input}
                  style={{ width: "80px", padding: "auto 5px" }}
                />
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
                  value={companyData?.amountInWords}
                  onChange={(e) =>
                    setCompanyData((prev) => {
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

            {/* Print Signature Text */}
            <div className={css.checkboxOuterDiv}>
              <input type="checkbox" id="checkbox" />
              <div className={css.inputDiv}>
                <input
                  type="text"
                  name="printSignatureText"
                  value={companyData?.printSignatureText}
                  onChange={(e) =>
                    setCompanyData((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    })
                  }
                  className={css.input}
                />
                <label
                  className={
                    companyData?.printSignatureText
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
              <input type="checkbox" id="checkbox" />
              <label>Payment Mode</label>
            </div>

            {/* Print Acknowledgement*/}
            <div className={css.checkboxOuterDiv}>
              <input type="checkbox" id="checkbox" />
              <label>Print Acknowledgement</label>
            </div>
          </div>
          {/* Right Side Regular Printer */}
          <div className={css.RightSideContentOuterDiv}>
            <div>
              {regularPrinterIndex == 1 ? (
                <img src={RpLayout1} alt="Layout1" />
              ) : regularPrinterIndex == 2 ? (
                <img src={RpLayout2} alt="Layout2" />
              ) : (
                <img src={RpLayout1} alt="Layout1" />
              )}
            </div>
          </div>
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

            {/* Corousel */}
            <div className={css.CorouselOuterDiv}>
              {thermalLayoutArr?.map((layoutItem, layoutIndex) => (
                <div
                  onClick={() => setThermalPrinterIndex(layoutItem?.themeIndex)}
                  style={{
                    backgroundColor:
                      thermalPrinterIndex == layoutItem?.themeIndex
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
                    setCompanyData((prev) => {
                      return { ...prev, pageSize: "2Inch" };
                    })
                  }
                  className={
                    companyData?.pageSize == "2Inch"
                      ? css.ActivePageSizeDiv
                      : ""
                  }
                >
                  <h3>2 Inch</h3>
                  <span>58mm</span>
                </div>
                <div
                  onClick={() =>
                    setCompanyData((prev) => {
                      return { ...prev, pageSize: "3Inch" };
                    })
                  }
                  className={
                    companyData?.pageSize == "3Inch"
                      ? css.ActivePageSizeDiv
                      : ""
                  }
                >
                  <h3>3 Inch</h3>
                  <span>68mm</span>
                </div>
                <div
                  onClick={() =>
                    setCompanyData((prev) => {
                      return { ...prev, pageSize: "4Inch" };
                    })
                  }
                  className={
                    companyData?.pageSize == "4Inch"
                      ? css.ActivePageSizeDiv
                      : ""
                  }
                >
                  <h3>4 Inch</h3>
                  <span>88mm</span>
                </div>
                <div
                  onClick={() =>
                    setCompanyData((prev) => {
                      return { ...prev, pageSize: "Custom" };
                    })
                  }
                  className={
                    companyData?.pageSize == "Custom"
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
                  value={companyData?.printingType}
                  onChange={(e) =>
                    setCompanyData((prev) => {
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
                  value={companyData?.extralines}
                  onChange={(e) =>
                    setCompanyData((prev) => {
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
                  value={companyData?.companyName}
                  onChange={(e) =>
                    setCompanyData((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    })
                  }
                  className={css.input}
                />
                <label
                  className={
                    companyData?.companyName
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
                  value={companyData?.address}
                  onChange={(e) =>
                    setCompanyData((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    })
                  }
                  className={css.input}
                />
                <label
                  className={
                    companyData?.address ? css.activeLabel : css.inactiveLabel
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
                  value={companyData?.email}
                  onChange={(e) =>
                    setCompanyData((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    })
                  }
                  className={css.input}
                />
                <label
                  className={
                    companyData?.email ? css.activeLabel : css.inactiveLabel
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
                  value={companyData?.phoneNumber}
                  onChange={(e) =>
                    setCompanyData((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    })
                  }
                  className={css.input}
                />
                <label
                  className={
                    companyData?.phoneNumber
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
                  value={companyData?.amountInWords}
                  onChange={(e) =>
                    setCompanyData((prev) => {
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
              {thermalPrinterIndex == 1 ? (
                <img src={TpLayout1} alt="Layout1" />
              ) : thermalPrinterIndex == 2 ? (
                <img src={TpLayout2} alt="Layout2" />
              ) : (
                <img src={TpLayout1} alt="Layout1" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Print;

const regularLayoutArr = [
  { img: RpTheme1, text: "GST Theme 1", themeIndex: 1 },
  { img: RpTheme2, text: "GST Theme 2", themeIndex: 2 },
];

const thermalLayoutArr = [
  { img: TpTheme1, text: "Theme 1", themeIndex: 1 },
  { img: TpTheme2, text: "Theme 2", themeIndex: 2 },
];

const colorArray = [
  { name: "Red", color: "#FF0000" },
  { name: "Green", color: "#008000" },
  { name: "Blue", color: "#0000FF" },
  { name: "Yellow", color: "#FFFF00" },
  { name: "Cyan", color: "#00FFFF" },
  { name: "Magenta", color: "#FF00FF" },
  { name: "Orange", color: "#FFA500" },
  { name: "Purple", color: "#800080" },
  { name: "Pink", color: "#FFC0CB" },
  { name: "Teal", color: "#008080" },
  { name: "Lime", color: "#00FF00" },
  { name: "Aqua", color: "#00FFFF" },
  { name: "Maroon", color: "#800000" },
  { name: "Navy", color: "#000080" },
  { name: "Olive", color: "#808000" },
  { name: "Silver", color: "#C0C0C0" },
  { name: "Gray", color: "#808080" },
  { name: "Black", color: "#000000" },
  { name: "White", color: "#FFFFFF" },
  { name: "Brown", color: "#A52A2A" },
  { name: "Indigo", color: "#4B0082" },
  { name: "Turquoise", color: "#40E0D0" },
  { name: "Gold", color: "#FFD700" },
  { name: "Violet", color: "#EE82EE" },
];
