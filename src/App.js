import "./App.css";
import Navbar from "./Component/Navbar/Navbar.jsx";
import Header from "./Component/Header/Header.jsx";
import Sidebar from "./Component/Sidebar/Sidebar.jsx";
import EditFirm from "./Page/Firm/EditFirm.jsx";
import {
  USER_DETAILS,
  REGULAR_PRINTER_DATA,
  THERMAL_PRINTER_DATA,
} from "./Redux/store.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
export const ignoreRoutes = ["/auth", "/companies", "/addCompany"];
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showEditFirm, setShowEditFirm] = useState(false);
  const firmUpdate = useSelector((state) => state.BusinessReducer.toggleUpdate);

  // Regular printer data
  const regularPrinterData = {
    layoutIndex: 0,
    layoutColor: ColorArray[0]?.color,
    // Print Company Info / Header
    regularPrinterDefault: true,
    printRepeatHeaderInAllPage: true,
    showCompanyName: true,
    myCompanyName: "",
    myBusinessAddress: "",
    myEmail: "",
    companyName: "",
    showLogo: true,
    showBusinessAddress: true,
    businessAddress: "",
    showEmail: true,
    email: "",
    showPhoneNumber: true,
    phoneNumber: "",
    paperSize: "A4",
    companyNameTextSize: "Large",
    invoiceTextSize: "Large",
    printOriginal: false,
    extraSpace: 0,
    // Totals & Taxes
    showTotalItemQty: true,
    showAmountWithDecimal: true,
    showRecievedAmount: true,
    showBalanceAmount: true,
    showCurrentBalanceOfParty: false,
    showTaxDetails: true,
    showYouSaved: true,
    printAmountWithGrouping: true,
    amountInWords: "Indian",
    // Footer
    printDescription: true,
    showPrintSignatureText: true,
    signatureText: "Authorized Signatory",
    showPaymentMode: true,
    printAcknowledgement: true,
  };
  // Thermal printer data
  const thermalPrinterData = {
    thermalPrinterDefault: false,
    layoutIndex: 0,
    pageSize: "2Inch",
  };
  const IgnoreKeys = [
    "businessAddress",
    "businessCategory",
    "businessDescription",
    "businessType",
    "companyLogo",
    "companyName",
    "createdAt",
    "email",
    "gstinNumber",
    "phoneNumber",
    "signature",
    "state",
    "updatedAt",
    "userId",
    "_id",
    "pinCode",
  ];
  // to store printerdata in session storage
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    } else {
      const userDetailsData =
        JSON.parse(sessionStorage.getItem(USER_DETAILS)) || {};
      const storedRegularPrinterData = JSON.parse(
        sessionStorage.getItem(REGULAR_PRINTER_DATA)
      );
      const storedThermalPrinterData = JSON.parse(
        sessionStorage.getItem(THERMAL_PRINTER_DATA)
      );

      sessionStorage.setItem(
        REGULAR_PRINTER_DATA,
        JSON.stringify(
          storedRegularPrinterData
            ? MergeObjects(
                storedRegularPrinterData,
                userDetailsData,
                IgnoreKeys
              )
            : { ...regularPrinterData, ...userDetailsData }
        )
      );
      sessionStorage.setItem(
        THERMAL_PRINTER_DATA,
        JSON.stringify(
          storedThermalPrinterData
            ? MergeObjects(
                storedThermalPrinterData,
                userDetailsData,
                IgnoreKeys
              )
            : { ...thermalPrinterData, ...userDetailsData }
        )
      );
    }
  }, [firmUpdate]);

  return (
    <div id="App">
      {showEditFirm && <EditFirm setShowEditFirm={setShowEditFirm} />}

      {!ignoreRoutes.includes(location.pathname) && <Navbar />}

      {!ignoreRoutes.includes(location.pathname) && (
        <div className="appContentOuter">
          <Sidebar setShowEditFirm={setShowEditFirm} />
          <section className="rightSideContentOuter">
            <Header />
            <div className="outletOuterDiv">
              <Outlet />
            </div>
          </section>
        </div>
      )}

      {ignoreRoutes.includes(location.pathname) && (
        <div className="outletOuterDiv">
          <Outlet />
        </div>
      )}

      <ToastContainer
        pauseOnFocusLoss={false}
        theme="colored"
        position="top-center"
      />
    </div>
  );
}

export default App;

function MergeObjects(ABC, XYZ, IgnoreKeys) {
  const result = { ...ABC };

  for (const key in XYZ) {
    if (IgnoreKeys.includes(key)) {
      if (XYZ[key]) {
        if (IgnoreKeys.includes(key) && ABC.hasOwnProperty(key)) {
          result[key] = XYZ[key];
        } else if (!ABC.hasOwnProperty(key)) {
          result[key] = XYZ[key];
        }
      } else {
        if (IgnoreKeys.includes(key) && ABC.hasOwnProperty(key)) {
          delete result[key];
        }
      }
    } else {
      if (ABC.hasOwnProperty(key) && IgnoreKeys.includes(key)) {
        delete result[key];
      }
      if (XYZ.hasOwnProperty(key)) {
        result[key] = XYZ[key];
      }
    }
  }

  for (const key in ABC) {
    if (!XYZ.hasOwnProperty(key) && IgnoreKeys.includes(key)) {
      delete result[key];
    }
  }

  return result;
}

// Printer Color Array
export const ColorArray = [
  { name: "Magenta", color: "#FF00FF" },
  { name: "Blue", color: "#0000FF" },
  { name: "Navy", color: "#000080" },
  { name: "Red", color: "#FF0000" },
  { name: "Green", color: "#008000" },
  { name: "Yellow", color: "#FFFF00" },
  { name: "Cyan", color: "#00FFFF" },
  { name: "Orange", color: "#FFA500" },
  { name: "Purple", color: "#800080" },
  { name: "Pink", color: "#FFC0CB" },
  { name: "Teal", color: "#008080" },
  { name: "Lime", color: "#00FF00" },
  { name: "Aqua", color: "#00FFFF" },
  { name: "Maroon", color: "#800000" },
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
