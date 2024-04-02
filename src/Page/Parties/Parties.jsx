import css from "./Parties.module.css";
import AddPartyForm from "./AddPartyForm";
import party from "../../assets/Images/party.jpg";
import Setting from "../../Component/Setting/Setting";
import Loader3 from "../../Component/Loaders/Loader3";
import PartiesTable from "../../components/TableData/PartiesTable";
import FirstTimeFormToggle from "../../Component/FirmTimeForm/FirstTimeFormToggle";
import { FetchAllParties } from "../../Redux/parties/actions";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Parties() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.PartiesReducer.isLoading);
  const togglePartiesData = useSelector(
    (state) => state.PartiesReducer.togglePartiesData
  );
  const partiesData = useSelector((state) => state.PartiesReducer.partiesData);

  const [toggleSetting, setToggleSetting] = useState(false);
  const [partyFormIsOpen, setPartyFormIsOpen] = useState(false);

  // Fetch All Parties
  useEffect(() => {
    FetchAllParties(dispatch);
  }, [togglePartiesData]);

  const dataFromChild = (val) => {
    setPartyFormIsOpen(val);
  };

  return isLoading ? (
    <Loader3 text="Loading Parties" />
  ) : (
    <div>
      {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

      {/* Add Party Form */}
      {partyFormIsOpen && (
        <AddPartyForm
          CloseForm={setPartyFormIsOpen}
          OpenSettings={setToggleSetting}
        />
      )}

      <div className={css.navOuter}>
        <div className={css.navOptions}>NAME</div>
      </div>

      <div className={css.Outer}>
        {partiesData.length > 0 ? (
          <PartiesTable func={dataFromChild} />
        ) : (
          <FirstTimeFormToggle
            height="100%"
            img={party}
            onClick={() => setPartyFormIsOpen(true)}
            BtnText="Add Party"
            MiddleText="Add your customers & suppliers. Manage your business with them."
          />
        )}
      </div>
    </div>
  );
}
