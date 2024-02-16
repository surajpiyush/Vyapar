import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Authpage from './Page/Authpage';
import Homepage from './Page/Homepage';
import Companypage from './Page/Companypage';
import Purchasebill from './Page/Purchase/Purchasebill.jsx';
import Paymentout from './Page/Purchase/Paymentout.jsx';
import Purchaseorderpage from './Page/Purchase/Purchaseorderpage.jsx';
import Purchasereturnpage from './Page/Purchase/Purchasereturnpage.jsx';
import AddPurchase from './Page/AddPurchasepage.jsx';
import Addpurchaseorderpage from './Page/Addpurchaseorderpage.jsx';
import Parties from "./Page/parties/Parties.jsx"
import Items from './Page/Items/Items.jsx';
import SalesDeliveryChallan from './pages/sales/salesDeliveryChallan/SalesDeliveryChallan.jsx';
import SalesEstimates from './pages/sales/salesEstimates/SalesEstimates.jsx';
import SalesInvoice from './pages/sales/salesInvoice/SalesInvoice.jsx';
import SalesOrder from './pages/sales/salesOrder/SalesOrder.jsx';
import SalesPaymentln from './pages/sales/salesPaymentIn/SalesPaymentIn.jsx';
import SalesReturn from './pages/sales/salesReturn/SalesReturn.jsx';
import Busniess from './Component/utils/Busniess.jsx';
import Sale from "./pages/Sale.js"
import Purchase from "./pages/Purchase.js"
import DayBook from "./pages/DayBook.js"
import AllTransaction from "./pages/AllTransactions.js"
import CashFlow from "./pages/CashFlow.js"
import GSTR1 from "./pages/GSTR1.js"
import GSTR2 from "./pages/GSTR2.js"
import GSTR3B from "./pages/GSTR3B.js"
import GSTR9 from './pages/GSTR9.js';
import SaleHSN from "./pages/SaleHSN.js"
import Formpage from './Page/Formpage/Formpage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Homepage/>
      },
      {
        path: "/parties",
        element: <Parties/>
      },
      {
        path: "/items",
        element: <Items/>
      },
      {
        path: "/auth",
        element: <Authpage/>
      },
      {
        path: "/company",
        element: <Companypage/>
      },
      {
        path: "/purchasebill",
        element: <Purchasebill/>
      },
      {
        path: "/paymentout",
        element: <Paymentout/>
      },
      {
        path: "/paymentorder",
        element: <Purchaseorderpage/>
      },
      {
        path: "/purchasereturn",
        element: <Purchasereturnpage/>
      },
      {
        path: "/addpurchase",
        element: <AddPurchase/>
      },
      {
        path: "/addpurchaseorder",
        element: <Addpurchaseorderpage/>
      },
      {
        path: "/addpurchasereturn",
        element: <Addpurchaseorderpage/>
      },
      {
        path: "/Busniess",
        element: <Busniess/>
      },
      {
        path: "/saledeliverychallan",
        element: <SalesDeliveryChallan/>
      },
      {
        path : "/salesestimates",
        element: <SalesEstimates/>
      },
      {
        path : "/salesinvoice",
        element : <SalesInvoice/>
      },
      {
        path : "/salesorder",
        element : <SalesOrder/>
      },
      {
        path : "/salespaymentin",
        element : <SalesPaymentln/>
      },
      {
        path : "/salereturn",
        element : <SalesReturn/>
      },
      {
        path : "/salereport",
        element : <Sale/>
      },
      {
        path : "/purchasereport",
        element : <Purchase/>
      },
      {
        path : "/daybookreport",
        element : <DayBook/>
      },
      {
        path : "/alltransactionreport",
        element : <AllTransaction/>
      },
      {
        path : "/cashflowreport",
        element : <CashFlow/>
      },
      {
        path : "/gstr1report",
        element : <GSTR1/>
      },
      {
        path : "/gstr2report",
        element : <GSTR2/>
      },
      {
        path : "/gstr3breport",
        element : <GSTR3B/>
      },
      {
        path : "/gstr9report",
        element : <GSTR9/>
      },
      {
        path : "/salehsnreport",
        element : <SaleHSN/>
      },
      {
        path: "/formpage",
        element: <Formpage/>
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();