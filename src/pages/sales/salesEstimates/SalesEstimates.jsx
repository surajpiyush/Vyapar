import React, { useState } from "react";
import SalesEstimatesTable from "../../../components/TableData/SalesEstimatesTable";
import party from "../../../assets/Images/party.jpg";
import SalesEstimatesForm from "../../../components/addForm/SalesEstimatesForm";

export default function SalesEstimates() {
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
        <SalesEstimatesForm func={closeForm} />
      ) : (
        <div className="d-cen b-cont text-center">
          {!(data.length > 0) ? (
            <div className="">
              <div className="">
                <img src={party} alt="" className="party-img" />
                <p>Add Estimates to manage your full Stock Inventory.</p>
                <button className="party-button" onClick={() => {
                    setOpenForm(true);
                  }}>Add Estimates</button>
              </div>
            </div>
          ) : (
            <div className="">
              <SalesEstimatesTable func={formOpen}/>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
