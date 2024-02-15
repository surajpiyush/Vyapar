import React, { useState } from "react";
import party from "../../../assets/Images/party.jpg";
import SalesReturnTable from "../../../components/TableData/SaleReturnTable";
import SalesReturnForm from '../../../components/addForm/SalesReturnForm'

export default function SalesReturn() {
  const data = [];
  const [openForm, setOpenForm] = useState(false);

  const closeForm = () => {
    setOpenForm(false);
  }

  const formOpen = () => {
    setOpenForm(true)
  }

  return (
    <div>
      {
        openForm ? <SalesReturnForm func={closeForm} /> : <div className="d-cen b-cont text-center">
        {!(data.length > 0) ? (
          <div className="">
            <div className="">
              <img src={party} alt="" className="party-img" />
              <p>
                Add Return to manage your full
                Stock Inventory.
              </p>
              <button className="party-button" onClick={() => {
                    setOpenForm(true);
                  }}>Add Return</button>
            </div>
          </div>
        ) : (
          <div className="">
            <SalesReturnTable func={formOpen}/>
          </div>
        )}
      </div>
      }
      
    </div>
  );
}
