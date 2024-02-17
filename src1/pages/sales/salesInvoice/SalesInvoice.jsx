import React, { useState } from "react";
import SalesInvoiceTable from "../../../components/TableData/SalesInvoiceTable";
import party from "../../../assets/Images/party.jpg";
import SalesInvoiceForm from "../../../components/addForm/SalesInvoiceForm";

export default function SalesInvoice() {
  const data = [];
  const [openForm, setOpenForm] = useState(false);

  const closeForm = () => {
    setOpenForm(false);
  };

  const formOpen = () => {
    setOpenForm(true)
  }

  return (
    <div>
      {openForm ? (
        <SalesInvoiceForm func={closeForm} />
      ) : (
        <div className="d-cen b-cont text-center">
          {!(data.length > 0) ? (
            <div className="">
              <div className="">
                <img src={party} alt="" className="party-img" />
                <p>Add Invoice to manage your full Stock Inventory.</p>
                <button className="party-button" onClick={() => {
                    setOpenForm(true);
                  }}>Add Invoice</button>
              </div>
            </div>
          ) : (
            <div className="">
              <SalesInvoiceTable func={formOpen} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
