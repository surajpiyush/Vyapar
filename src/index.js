import "./index.css";
import App from "./App";
import Sale from "./pages/Sale.js";
import GSTR1 from "./pages/GSTR1.js";
import GSTR2 from "./pages/GSTR2.js";
import GSTR9 from "./pages/GSTR9.js";
import GSTR3B from "./pages/GSTR3B.js";
import Homepage from "./Page/Homepage";
import DayBook from "./pages/DayBook.js";
import Items from "./Page/Items/Items.jsx";
import Purchase from "./pages/Purchase.js";
import CashFlow from "./pages/CashFlow.js";
import Companypage from "./Page/Companypage";
import HsnReport from "./pages/HsnReport.jsx";
import AuthPage from "./Page/Auth/AuthPage.jsx";
import Parties from "./Page/parties/Parties.jsx";
import Formpage from "./Page/Formpage/Formpage.jsx";
import AddPurchase from "./Page/AddPurchasepage.jsx";
import Busniess from "./Component/utils/Busniess.jsx";
import Paymentout from "./Page/Purchase/Paymentout.jsx";
import AllTransaction from "./pages/AllTransactions.js";
import Purchasebill from "./Page/Purchase/Purchasebill.jsx";
import SalesOrder from "./pages/sales/salesOrder/SalesOrder.jsx";
import Addpurchaseorderpage from "./Page/Addpurchaseorderpage.jsx";
import SalesReturn from "./pages/sales/salesReturn/SalesReturn.jsx";
import Purchaseorderpage from "./Page/Purchase/Purchaseorderpage.jsx";
import SalesInvoice from "./pages/sales/salesInvoice/SalesInvoice.jsx";
import Purchasereturnpage from "./Page/Purchase/Purchasereturnpage.jsx";
import AddPurchasereturn from "./Component/Purchase/AddPurchasereturn.jsx";
import SalesEstimates from "./pages/sales/salesEstimates/SalesEstimates.jsx";
import SalesPaymentln from "./pages/sales/salesPaymentIn/SalesPaymentIn.jsx";
import SalesDeliveryChallan from "./pages/sales/salesDeliveryChallan/SalesDeliveryChallan.jsx";

import { store } from "./Redux/store.js";

import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Marketing from "./pages/Marketing.jsx";
// import Setting from "./pages/setting/Setting.js";
import PageNotFound from "./pages/PageNotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
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
        path: "/company",
        element: <Companypage />,
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
        element: <AddPurchasereturn />,
      },
      {
        path: "/business",
        element: <Busniess />,
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
      {
        path: "/formpage",
        element: <Formpage />,
      },
      { path: "/marketing", element: <Marketing /> },
     
      { path: "*", element: <PageNotFound/> },

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
