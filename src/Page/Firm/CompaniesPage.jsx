import css from "./Firm.module.css";
import Loader3 from "../../Component/Loaders/Loader3";
import { USER_DETAILS } from "../../Redux/store";
import { SET_CURRENT_COMPANY } from "../../Redux/business/actionTypes";
import {
  DeleteCompany,
  FetchAllCompanies,
  LOGOUT,
} from "../../Redux/business/action";
import {
  DeleteIcon2,
  BasicSpinnerIcon,
  DesktopIconOutline,
  SearchIcon,
  RefreshIcon,
} from "../../assets/Icons/ReactIcons";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allCompaniesData = useSelector(
    (state) => state.BusinessReducer.allCompaniesData
  );
  const toggleUpdate = useSelector(
    (state) => state.BusinessReducer.toggleUpdate
  );
  const isLoading = useSelector((state) => state.BusinessReducer.isLoading);
  const DeleteFirmLoading = useSelector(
    (state) => state.BusinessReducer.DeleteFirmLoading
  );
  const isError = useSelector((state) => state.BusinessReducer.isError);
  const [clickedCompData, setClickedCompData] = useState({});

  useEffect(() => {
    FetchAllCompanies(dispatch);
  }, [toggleUpdate]);

  // Open A company Function
  const handleCompanyClick = (item) => {
    sessionStorage.setItem(USER_DETAILS, JSON.stringify(item));
    dispatch({ type: SET_CURRENT_COMPANY, payload: item });
    navigate("/");
  };

  // handle Refresh
  const handleRefresh = () => {
    FetchAllCompanies(dispatch);
  };

  // Delete Firm
  const handleDeleteCompany = (firmId) => {
    DeleteCompany(dispatch, firmId);
  };

  return (
    <div className={css.companyOuterDiv}>
      <div className={css.compDivOuter}>
        {/* Top Section */}
        <div className={css.compTopDivOuter}>
          <section className={css.compTopHeaderDiv}>
            <h4>Company List</h4>
            <div className={css.searchCompInpCss}>
              <SearchIcon />
              <input type="text" placeholder="Search Company" />
            </div>
          </section>
          <section className={css.compLowerHeaderDiv}>
            <div>Companies Shared with Me</div>
            <div>My Companies</div>
          </section>
        </div>

        {/* Middle */}
        <section className={css.middleSectionOuter}>
          <section className={css.middleTopOuterDiv}>
            <p>Below are the company that are created by you</p>
            <div onClick={handleRefresh} className={css.middleRefreshDiv}>
              <RefreshIcon />
            </div>
          </section>
          <div className={css.companyListContainer}>
            {isLoading ? (
              <Loader3 text="Loading Business..." />
            ) : isError ? (
              <h2 style={{ color: "var(--redC)" }}>
                No Company Data Found! Please add your business
              </h2>
            ) : allCompaniesData.length <= 0 ? (
              <h2 style={{ color: "var(--redC)" }}>
                No Company Data Found! Please add your business
              </h2>
            ) : (
              allCompaniesData?.map((item, ind) => (
                <section
                  onClick={() => setClickedCompData(item)}
                  key={ind + item?._id}
                  className={css.compItenOuterDiv}
                >
                  <h2>{item?.companyName}</h2>
                  <div className={css.itemRightSideDiv}>
                    <div className={css.itemSyncDiv}>
                      <DesktopIconOutline />
                      <p>SYNC OFF</p>
                    </div>
                    <div className={css.itemRightSideBtnCont}>
                      <button onClick={() => handleCompanyClick(item)}>
                        Open
                      </button>
                      {DeleteFirmLoading &&
                      clickedCompData?._id == item?._id ? (
                        <BasicSpinnerIcon />
                      ) : (
                        <DeleteIcon2
                          onClick={() => handleDeleteCompany(item?._id)}
                          className={css.compDeleteIconCss}
                        />
                      )}
                    </div>
                  </div>
                </section>
              ))
            )}
          </div>
        </section>

        {/* Bottom */}
        <div>
          <section className={css.restoreOuterDivCont}>
            {/* <button className={css.restoreBtnCss}>Restore Backup</button> */}
            <button
              className={css.newCompBtnCss}
              onClick={() => navigate("/addCompany")}
            >
              New Company
            </button>
          </section>
          <section className={css.companyFooter}>
            <p onClick={() => LOGOUT(navigate, true)}>Logout</p>
            <p>Logging out will stop syncing data</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;
