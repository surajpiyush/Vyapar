import React from "react";
import Pourchaseorder from "../Component/Purchase/Pourchaseorder";
import Addpurchaseorder from "../Component/Purchase/Addpurchaseorder";

const Addpurchaseorderpage = () => {
  return (
    <div className="purchase-bill-container">
      <h4 className="purchase-order-h4">Orders</h4>
      <Addpurchaseorder />
    </div>
  );
};

export default Addpurchaseorderpage;
