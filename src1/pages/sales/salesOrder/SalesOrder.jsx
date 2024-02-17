import React, { useState } from "react";
import party from "../../../assets/Images/party.jpg";
import SalesOrderTable from "../../../components/TableData/SalesOrderTable";
import SalesOrderForm from "../../../components/addForm/SalesOrderForm";

export default function SalesOrder() {
  const data = [];
  const [openForm, setOpenForm] = useState(false);
  const [opt, setOpt] = useState(true);

  const closeForm = () => {
    setOpenForm(false);
  };

  const formOpen = () => {
    setOpenForm(true);
  };

  const handleOption = (val) => {
    if (val === 0) {
      setOpt(true);
    } else {
      setOpt(false);
    }
  };

  return (
    <div>
      <div className="nav">
        <div
          className="nav-opt"
          onClick={() => {
            handleOption(0);
          }}
        >
          SALE ORDERS
        </div>
        <div
          className="nav-opt"
          onClick={() => {
            handleOption(1);
          }}
        >
          ONLINE ORDERS
        </div>
      </div>
      {
        opt ?    <div className="">
        {openForm ? (
          <SalesOrderForm func={closeForm} />
        ) : (
          <div className="d-cen b-cont text-center text-center">
            {!(data.length > 0) ? (
              <div className="">
                <div className="">
                  <img src={party} alt="" className="party-img" />
                  <p>Add Order to manage your full Stock Inventory.</p>
                  <button
                    className="party-button"
                    onClick={() => {
                      setOpenForm(true);
                    }}
                  >
                    Add Order
                  </button>
                </div>
              </div>
            ) : (
              <div className="">
                <SalesOrderTable func={formOpen} />
              </div>
            )}
          </div>
        )}
      </div> : <div className="d-cen b-cont text-center">
      <div className="">
                  <img src={party} alt="" className="party-img" />
                  <p style={{fontWeight : "bold"}}>No Online Orders</p>
                  <p>
                  Share your Online Store to get orders.
                  </p>
                  <button className="party-button">
                    <i className="fa fa-share"></i> <span>Share Store</span>
                  </button>
                </div>
      </div>
      }
   
    </div>
  );
}
