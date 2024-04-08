import "./index.css";
import App from "./App";
import GSTR9 from "./pages/GSTR9.js";
import GSTR3B from "./pages/GSTR3B.js";
// import GSTR3B from "./Page/Reports/GSTR3B/GSTR3B.jsx";
import Home from "./Page/Home/Home.jsx";
import Items from "./Page/Items/Items.jsx";
import Marketing from "./pages/Marketing.jsx";
import Sale from "./Page/Reports/Sale/Sale.jsx";
import SaleHSN from "./Page/Reports/SaleHSN/SaleHSN.jsx";
import CashFlow from "./Page/Reports/CashFlow/CashFlow.jsx";
import AuthPage from "./Page/Auth/AuthPage.jsx";
import reportWebVitals from "./reportWebVitals";
import Parties from "./Page/Parties/Parties.jsx";
import GSTR1 from "./Page/Reports/GSTR1/GSRT1.jsx";
import GSTR2 from "./Page/Reports/GSTR2/GSTR2.jsx";
import DayBook from "./Page/Reports/DayBook/DayBook.jsx";
import CompaniesPage from "./Page/Firm/CompaniesPage.jsx";
import Purchase from "./Page/Reports/Purchase/Purchase.jsx";
import AddCompanyPage from "./Page/Firm/AddCompanyPage.jsx";
import NotFoundPage from "./Page/NotFoundPage/NotFoundPage.jsx";
import SalesOrder from "./pages/sales/salesOrder/SalesOrder.jsx";
import PaymentOut from "./Page/Purchase/PaymentOut/PaymentOut.jsx";
import SalesReturn from "./pages/sales/salesReturn/SalesReturn.jsx";
import SalesInvoice from "./pages/sales/salesInvoice/SalesInvoice.jsx";
import PurchaseBill from "./Page/Purchase/PurchaseBill/PurchaseBill.jsx";
import PurchaseOrder from "./Page/Purchase/PurchaseOrder/PurchaseOrder.jsx";
import SalesEstimates from "./pages/sales/salesEstimates/SalesEstimates.jsx";
import SalesPaymentln from "./pages/sales/salesPaymentIn/SalesPaymentIn.jsx";
import PurchaseReturn from "./Page/Purchase/PurchaseReturn/PurchaseReturn.jsx";
import AllTransactions from "./Page/Reports/AllTransactions/AllTransactions.jsx";
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
        path: "/purchaseorder",
        element: <PurchaseOrder />,
      },
      {
        path: "/purchasereturn",
        element: <PurchaseReturn />,
      },
      // Reports Routes
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
        element: <AllTransactions />,
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
        element: <SaleHSN />,
      },
      { path: "/marketing", element: <Marketing /> },

      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ChakraProvider toastOptions={{ defaultOptions: { position: "top" } }}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </Provider>
);

reportWebVitals();
