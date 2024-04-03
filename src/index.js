import "./index.css";
import App from "./App";
import Sale from "./pages/Sale.js";
import GSTR1 from "./pages/GSTR1.js";
import GSTR2 from "./pages/GSTR2.js";
import GSTR9 from "./pages/GSTR9.js";
import GSTR3B from "./pages/GSTR3B.js";
import Home from "./Page/Home/Home.jsx";
import DayBook from "./pages/DayBook.js";
import Items from "./Page/Items/Items.jsx";
import CashFlow from "./pages/CashFlow.js";
import Purchase from "./pages/Purchase.js";
import HsnReport from "./pages/HsnReport.jsx";
import Marketing from "./pages/Marketing.jsx";
import AuthPage from "./Page/Auth/AuthPage.jsx";
import reportWebVitals from "./reportWebVitals";
import Parties from "./Page/Parties/Parties.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AllTransaction from "./pages/AllTransactions.js";
import CompaniesPage from "./Page/Firm/CompaniesPage.jsx";
import AddCompanyPage from "./Page/Firm/AddCompanyPage.jsx";
import SalesOrder from "./pages/sales/salesOrder/SalesOrder.jsx";
import PaymentOut from "./Page/Purchase/PaymentOut/PaymentOut.jsx";
import SalesReturn from "./pages/sales/salesReturn/SalesReturn.jsx";
import Purchaseorderpage from "./Page/Purchase/Purchaseorderpage.jsx";
import SalesInvoice from "./pages/sales/salesInvoice/SalesInvoice.jsx";
import PurchaseBill from "./Page/Purchase/PurchaseBill/PurchaseBill.jsx";
import SalesEstimates from "./pages/sales/salesEstimates/SalesEstimates.jsx";
import SalesPaymentln from "./pages/sales/salesPaymentIn/SalesPaymentIn.jsx";
import PurchaseReturn from "./Page/Purchase/PurchaseReturn/PurchaseReturn.jsx";
import SalesDeliveryChallan from "./pages/sales/salesDeliveryChallan/SalesDeliveryChallan.jsx";
import { store } from "./Redux/store.js";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
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
      // Auth Routes
      {
        path: "/auth",
        element: <AuthPage />,
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
      // Party Routes
      {
        path: "/parties",
        element: <Parties />,
      },
      // Items/Products Routes
      {
        path: "/items",
        element: <Items />,
      },
      // Puchase Routes
      {
        path: "/purchasebill",
        element: <PurchaseBill />,
      },
      {
        path: "/paymentout",
        element: <PaymentOut />,
      },
      {
        path: "/paymentorder",
        element: <Purchaseorderpage />,
      },
      {
        path: "/purchasereturn",
        element: <PurchaseReturn />,
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
