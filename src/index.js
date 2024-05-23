import "./index.css";
import App from "./App";
import GSTR9 from "./Page/Reports/GSTR9/GSTR9.jsx";
import GSTR3B from "./Page/Reports/GSTR3B/GSTR3B.jsx";
import Home from "./Page/Home/Home.jsx";
import Items from "./Page/Items/Items.jsx";
import Sale from "./Page/Reports/Sale/Sale.jsx";
import Marketing from "./Page/Marketing/Marketing.jsx";
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
import Expenses from "./Page/Expenses/Expenses.jsx";
import ExportItem from "./Page/Utilities/ExportItem/ExportItem.jsx";
import BankAccount from "./Page/BankAndAccount/BankAccount/BankAccount.jsx";
import { CashInHand } from "./Page/BankAndAccount/CashInHand/CashInHand.jsx";
import Cheques from "./Page/BankAndAccount/Cheques/Cheques.jsx";
import LoanAccount from "./Page/BankAndAccount/LoanAccount/LoanAccount.jsx";
import FixedAssets from "./Page/BankAndAccount/FixedAssets/FixedAssets.jsx";
import ProfitLossReport from "./Page/Reports/ProfitLoss/ProfitLoss.jsx";
import BillwiseProfit from "./Page/Reports/Billwise Profit/BillwiseProfit.jsx";
import PartyStatement from "./Page/Reports/PartyStatement/PartyStatement.jsx";
import AllParties from "./Page/Reports/AllParties/AllParties.jsx";
import BalanceSheet from "./Page/Reports/BalanceSheet/BalanceSheet.jsx";
import PartyReportByItem from "./Page/Reports/PartyReportsByItem/PartyReportByItem.jsx";
import SalePurchaseByParty from "./Page/Reports/salePurchasebyParty/SalePurchaseByParty.jsx";
import PartyReportByPartyGroup from "./Page/Reports/PartyReportsByPartyGroup/PartyReportByPartyGroup.jsx";


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
            path: "/PartyReportByItem",
            element: <PartyReportByItem/>,
         },
        
         {
            path: "/SalePurchaseByParty",
            element: <SalePurchaseByParty/>,
         },
         {
            path: "/PartyReportByPartyGroup",
            element: <PartyReportByPartyGroup/>,
         },
        
         {
            path: "/purchasereport",
            element: <Purchase />,
         },
         {
            path: "/BalanceSheet",
            element: <BalanceSheet />,
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
            path: "/BillwiseProfit",
            element: <BillwiseProfit />,
         },
         {
            path: "/cashflowreport",
            element: <CashFlow />,
         },
         {
            path: "/PartyStatement",
            element: <PartyStatement />,
         },
         {
            path: "/AllParties",
            element: <AllParties />,
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
            path:"/ProfitLossReport",
            element:<ProfitLossReport/>
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

         // Expenses
         { path: "/expenses", element: <Expenses /> },

         // Utilites
         { path: "/exportItem", element: <ExportItem /> },

         // Cash Bank And Assets

         { path: "/bankAccount", element: <BankAccount /> },
         { path: "/cashInHand", element: <CashInHand /> },
         {path:"/cheques", element : <Cheques />},
         {path:"/loanAccounts", element : <LoanAccount />},
         {path:"/fixedAssets", element : <FixedAssets/>},

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
