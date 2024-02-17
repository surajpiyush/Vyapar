import { useState } from "react";
import party from "../../../assets/Images/party.jpg";
import SalesDeliveryForm from "../../../components/addForm/SalesDeliveryForm";
import SalesDeliveryChallanTable from "../../../components/TableData/SalesDeliveryChallanTable";

export default function SalesDeliveryChallan() {
  const data = [];
  const [openForm, setOpenForm] = useState(false);

  const closeForm = () => {
    setOpenForm(false);
  };

  const formOpen = () => {
    setOpenForm(true);
  };

  return (
    <div>
      {openForm ? (
        <SalesDeliveryForm func={closeForm} />
      ) : (
        <div className="d-cen b-cont text-center">
          {!(data.length > 0) ? (
            <div className="">
              <div className="">
                <img src={party} alt="" className="party-img" />
                <p>Add Delivery Challan to manage your full Stock Inventory.</p>
                <button
                  className="party-button"
                  onClick={() => {
                    setOpenForm(true);
                  }}
                >
                  Add Delivery Challan
                </button>
              </div>
            </div>
          ) : (
            <div className="">
              <SalesDeliveryChallanTable func={formOpen} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
