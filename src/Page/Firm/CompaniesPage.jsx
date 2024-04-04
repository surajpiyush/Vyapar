import css from "./Firm.module.css";
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
  SearchIcon2,
  RefreshIcon,
} from "../../assets/Icons/ReactIcons";

import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const CompaniesPage = () => {
  const toast = useToast();
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
    FetchAllCompanies(dispatch, toast);
  }, [toggleUpdate]);

  // Open A company Function
  const handleCompanyClick = (item) => {
    localStorage.setItem(USER_DETAILS, JSON.stringify(item));
    dispatch({ type: SET_CURRENT_COMPANY, payload: item });
    navigate("/");
  };

  const handleDeleteCompany = (id) => {
    DeleteCompany(dispatch, id, toast);
  };

  return (
    <div className={css.companyOuterDiv}>
      <div className={css.compDivOuter}>
        <div className={css.compTopDivOuter}>
          <section className={css.compTopHeaderDiv}>
            <h4>Company List</h4>
            <div className={css.searchCompInpCss}>
              <input type="text" placeholder="Search Company" />
              <SearchIcon />
            </div>
          </section>
          <section className={css.compLowerHeaderDiv}>
            <div>Companies Shared With Me</div>
            <div>My Companies</div>
          </section>
        </div>
        <section className={css.middleSectionOuter}>
          <section className={css.middleTopOuterDiv}>
            <div>Below are the company that are created by you</div>
            <div className={css.rightSideMiddleTop}>
              <input type="file" />
              <div className={css.middleRefreshDiv}>
                <RefreshIcon />
              </div>
            </div>
          </section>
          <div className={css.companyListContainer}>
            {isError ? (
              <h2 style={{ color: "var(--redC)" }}>
                No Company Data Found! Please add your business
              </h2>
            ) : allCompaniesData.length <= 0 ? (
              <h2 style={{ color: "var(--redC)" }}>
                No Company Data Found! Please add your business
              </h2>
            ) : isLoading ? (
              <h2 style={{ color: "var(--EmeraldGreen)" }}>
                Loading Companies List
              </h2>
            ) : (
              allCompaniesData?.map((item, ind) => (
                <section
                  onClick={() => setClickedCompData(item)}
                  key={ind + item?._id}
                  className={css.compItenOuterDiv}
                >
                  <h2>{item?.companyName}</h2>
                  <aside className={css.itemSyncDiv}>
                    <DesktopIconOutline />
                    <p>SYNC OFF</p>
                  </aside>
                  <aside className={css.itemRightSideDivOuter}>
                    <button onClick={() => handleCompanyClick(item)}>
                      Open
                    </button>
                    {DeleteFirmLoading && clickedCompData?._id == item?._id ? (
                      <BasicSpinnerIcon />
                    ) : (
                      <DeleteIcon2
                        onClick={() => handleDeleteCompany(item?._id)}
                        className={css.compDeleteIconCss}
                      />
                    )}
                  </aside>
                </section>
              ))
            )}
          </div>
        </section>
        <section className={css.restoreOuterDivCont}>
          <button className={css.restoreBtnCss}>Restore Backup</button>
          <button
            className={css.newCompBtnCss}
            onClick={() => navigate("/addCompany")}
          >
            New Company
          </button>
        </section>
        <section
          onClick={() => LOGOUT(navigate, toast)}
          className={css.companyFooter}
        >
          <p>Logout</p>
          <p>Logging out will stop syncing data</p>
        </section>
      </div>
    </div>
  );
};

export default CompaniesPage;
