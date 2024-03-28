import FirstTimeFormToggle from "../../Component/FirmTimeForm/FirstTimeFormToggle";
import Loader1 from "../../Component/Loaders/Loader1";
import Setting from "../../Component/Setting/Setting";
import { FetchAllParties } from "../../Redux/parties/actions";
import party from "../../assets/Images/party.jpg";
import PartiesTable from "../../components/TableData/PartiesTable";
import AddPartyForm from "./AddPartyForm";
import css from "./Parties.module.css";

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
  
  console.log("first")
  // Fetch All Parties
  useEffect(() => {
    FetchAllParties(dispatch);
  }, [togglePartiesData]);

  const dataFromChild = (val) => {
    setPartyFormIsOpen(val);
  };

  // Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia iste reiciendis nisi perferendis similique unde eius atque nostrum ipsa. Illum unde accusamus inventore esse aliquam temporibus, iusto, eligendi vero perspiciatis architecto, labore obcaecati eveniet expedita! Possimus similique, enim voluptatibus eaque velit vero. Officiis veritatis placeat recusandae illo, minus aut dolorem error tempora officia sapiente quis vel. Accusantium qui quas excepturi architecto atque rerum dignissimos. Accusantium distinctio quae tenetur dolorem unde veritatis ipsum, nesciunt sunt autem, quidem necessitatibus eveniet ratione, non iure nobis fuga numquam ad repellendus.

  return (
    <div>
      {isLoading && <Loader1 />}
      {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}
      {partyFormIsOpen && (
        <AddPartyForm
          CloseForm={setPartyFormIsOpen}
          OpenSettings={setToggleSetting}
        />
      )}

      <div className={css.navOuter}>
        <div className={css.navOptions}>Name</div>
      </div>

      {!isLoading && partiesData.length != 0 && (
        <PartiesTable func={dataFromChild} />
      )}

      {!isLoading && partiesData.length == 0 && (
        <FirstTimeFormToggle
          img={party}
          onClick={() => setPartyFormIsOpen(true)}
          BtnText="Add Party"
          MiddleText="Add your customers & suppliers. Manage your business with them."
        />
      )}
    </div>
  );
}
