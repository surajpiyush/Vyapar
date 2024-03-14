import "./App.css";
import Navbar from "./Component/Navbar/Navbar.jsx";
import Header from "./Component/Layourt/Header.jsx";
import Sidebar from "./Component/Sidebar/Sidebar.jsx";
import {
  USER_DETAILS,
  REGULAR_PRINTER_DATA,
  THERMAL_PRINTER_DATA,
} from "./Redux/store.js";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const ignoreRoutes = ["/auth", "/companies", "/addCompany"];

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const firmUpdate = useSelector((state) => state.BusinessReducer.toggleUpdate);

  // Regular printer data
  const regularPrinterData = {
    layoutIndex: 0,
    layoutColor: ColorArray[0]?.color,
    // Print Company Info / Header
    regularPrinterDefault: true,
    printRepeatHeaderInAllPage: true,
    showCompanyName: true,
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
    showPaymentMode: false,
    printAcknowledgement: false,
  };

  // Thermal printer data
  const thermalPrinterData = {
    thermalPrinterDefault: false,
    layoutIndex: 0,
    pageSize: "2Inch",
  };

  // to store printerdata in session storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    } else {
      const userDetailsData =
        JSON.parse(localStorage.getItem(USER_DETAILS)) || {};
      sessionStorage.setItem(
        REGULAR_PRINTER_DATA,
        JSON.stringify({ ...regularPrinterData, ...userDetailsData })
      );
      sessionStorage.setItem(
        THERMAL_PRINTER_DATA,
        JSON.stringify({ ...thermalPrinterData, ...userDetailsData })
      );
    }
  }, [firmUpdate]);

  return (
    <div id="App">
      {!ignoreRoutes.includes(location.pathname) && <Navbar />}
      {!ignoreRoutes.includes(location.pathname) && (
        <div className="app-page-div">
          <section className="app-sidebar">
            <Sidebar />
          </section>
          <section className="app-Home">
            <div className="header-div-fixed">
              <Header />
            </div>
            <div className="outlet-layout">
              <Outlet />
            </div>
          </section>
        </div>
      )}

      {ignoreRoutes.includes(location.pathname) && <Outlet />}
    </div>
  );
}

export default App;

// Printer Color Array
export const ColorArray = [
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
