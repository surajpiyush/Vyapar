import App from "./App";
import AddPurchase from "./Page/AddPurchasepage.jsx";
import Addpurchaseorderpage from "./Page/Addpurchaseorderpage.jsx";
import Addpurchasereturnpage from "./Page/Addpurchasereturnpage.jsx";
import AuthPage from "./Page/Auth/AuthPage.jsx";
import AddCompanyPage from "./Page/Firm/AddCompanyPage.jsx";
import CompaniesPage from "./Page/Firm/CompaniesPage.jsx";
import Home from "./Page/Home/Home.jsx";
import Items from "./Page/Items/Items.jsx";
import Parties from "./Page/Parties/Parties.jsx";


import Paymentout from "./Page/Purchase/Paymentout.jsx";
import Purchasebill from "./Page/Purchase/Purchasebill.jsx";
import Purchaseorderpage from "./Page/Purchase/Purchaseorderpage.jsx";
import Purchasereturnpage from "./Page/Purchase/Purchasereturnpage.jsx";
import { store } from "./Redux/store.js";
import "./index.css";
import AllTransaction from "./pages/AllTransactions.js";
import CashFlow from "./pages/CashFlow.js";
import DayBook from "./pages/DayBook.js";
import GSTR1 from "./pages/GSTR1.js";
import GSTR2 from "./pages/GSTR2.js";
import GSTR3B from "./pages/GSTR3B.js";
import GSTR9 from "./pages/GSTR9.js";
import HsnReport from "./pages/HsnReport.jsx";
import Marketing from "./pages/Marketing.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Purchase from "./pages/Purchase.js";
import Sale from "./pages/Sale.js";
import SalesDeliveryChallan from "./pages/sales/salesDeliveryChallan/SalesDeliveryChallan.jsx";
import SalesEstimates from "./pages/sales/salesEstimates/SalesEstimates.jsx";
import SalesInvoice from "./pages/sales/salesInvoice/SalesInvoice.jsx";
import SalesOrder from "./pages/sales/salesOrder/SalesOrder.jsx";
import SalesPaymentln from "./pages/sales/salesPaymentIn/SalesPaymentIn.jsx";
import SalesReturn from "./pages/sales/salesReturn/SalesReturn.jsx";
import reportWebVitals from "./reportWebVitals";

import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // Firm / Company Routes
      {
        path: "/companies",
        element: <CompaniesPage />,
      },
      {
        path: "/addCompany",
        element: <AddCompanyPage />,
      },

      {
        path: "/parties",
        element: <Parties />,
      },
      {
        path: "/items",
        element: <Items />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/purchasebill",
        element: <Purchasebill />,
      },
      {
        path: "/paymentout",
        element: <Paymentout />,
      },
      {
        path: "/paymentorder",
        element: <Purchaseorderpage />,
      },
      {
        path: "/purchasereturn",
        element: <Purchasereturnpage />,
      },
      {
        path: "/addpurchase",
        element: <AddPurchase />,
      },
      {
        path: "/addpurchaseorder",
        element: <Addpurchaseorderpage />,
      },
      {
        path: "/addpurchasereturn",
        element: <Addpurchasereturnpage />,
      },
      // Sales Routes
      {
        path: "/invoices",
        element: <SalesInvoice />,
      },
      {
        path: "/estimates",
        element: <SalesEstimates />,
      },
      {
        path: "/paymentin",
        element: <SalesPaymentln />,
      },
      {
        path: "/saleorder",
        element: <SalesOrder />,
      },
      {
        path: "/deliverychallan",
        element: <SalesDeliveryChallan />,
      },
      {
        path: "/salereturn",
        element: <SalesReturn />,
      },
      {
        path: "/salereport",
        element: <Sale />,
      },
      {
        path: "/purchasereport",
        element: <Purchase />,
      },
      {
        path: "/daybookreport",
        element: <DayBook />,
      },
      {
        path: "/alltransactionreport",
        element: <AllTransaction />,
      },
      {
        path: "/cashflowreport",
        element: <CashFlow />,
      },
      {
        path: "/gstr1report",
        element: <GSTR1 />,
      },
      {
        path: "/gstr2report",
        element: <GSTR2 />,
      },
      {
        path: "/gstr3breport",
        element: <GSTR3B />,
      },
      {
        path: "/gstr9report",
        element: <GSTR9 />,
      },
      {
        path: "/salehsnreport",
        element: <HsnReport />,
      },
      { path: "/marketing", element: <Marketing /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </Provider>
);

reportWebVitals();
