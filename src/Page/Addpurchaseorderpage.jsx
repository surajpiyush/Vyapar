import React from "react";
// import Pourchaseorder from "../Component/Purchase/Pourchaseorder";
// import Addpurchaseorder from "../Component/Purchase/Addpurchaseorder";
import Addpurchaseitem from "../Component/Purchase/Addpurchasereturnitrm";

const Addpurchaseorderpage = () => {
  return (
    <div className="purchase-bill-container">
      <h4 className="purchase-order-h4">Orders</h4>
      <Addpurchaseitem />
    </div>
  );
};

export default Addpurchaseorderpage;
