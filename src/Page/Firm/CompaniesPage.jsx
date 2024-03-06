import "./CompaniesPage.css";
import { FetchAllCompanies } from "../../Redux/business/action";
import {
  SET_CURRENT_COMPANY,
  USER_DETAILS,
} from "../../Redux/business/actionTypes";

import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { GrRefresh } from "react-icons/gr";
import { PiDesktopTowerLight } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";

const CompaniesPage = () => {
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allCompaniesData = useSelector(
    (state) => state.BusinessReducer.allCompaniesData
  );
  const toggleUpdate = useSelector(
    (state) => state.BusinessReducer.toggleUpdate
  );
  const isLoading = useSelector((state) => state.BusinessReducer.isLoading);
  const isError = useSelector((state) => state.BusinessReducer.isError);

  useEffect(() => {
    FetchAllCompanies(dispatch);
  }, [toggleUpdate]);

  // Open A company Function
  const handleCompanyClick = (item) => {
    localStorage.setItem(USER_DETAILS, JSON.stringify(item));
    dispatch({ type: SET_CURRENT_COMPANY, payload: item });
    navigate("/", {
      state: { redirectTo: location.pathname },
      replace: true,
    });
  };

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem(USER_DETAILS);
    toast({ title: "Logout Successfull!", status: "success", position: "top" });
    navigate("/auth", {
      state: { redirectTo: location.pathname },
      replace: true,
    });
  };

  return (
    <div className="companyOuterDiv">
      <div className="comapny-container">
        <div className="company-topbar">
          <section className="comapny-top-section">
            <h4>Company List</h4>
            <div>
              <input type="text" name="" id="" placeholder="Search company" />
              <span>
                <IoIosSearch />
              </span>
            </div>
          </section>
          <section className="compnay-top-tab">
            <div className="company-tab-items">Companies Shared With Me</div>
            <div className="company-tab-items active-tab-item">
              My Companies
            </div>
          </section>
        </div>
        <section className="comany-section-2">
          <section className="comany-section-2-top">
            <div className="comany-section-2-top-para">
              Below are the company that are created by you
            </div>
            <div className="company-section-2-div">
              <input type="file" name="" id="" />
              <div className="company-section-2-div-line"></div>
              <div className="company-section-2-div-refresh">
                <GrRefresh />
              </div>
            </div>
          </section>
          <div className="companyListContainer">
            {isError ? (
              <h2 style={{ color: "red" }}>
                No Company Data Found! Please add your business
              </h2>
            ) : isLoading ? (
              <h2 style={{ color: "red" }}>Loading Companies List</h2>
            ) : (
              allCompaniesData?.map((item, ind) => (
                <section key={ind + item._id} className="company-section-items">
                  <aside className="company-section-items-name">
                    {item.companyName}
                  </aside>
                  <aside className="company-section-items-middle">
                    <div>
                      <PiDesktopTowerLight />
                    </div>
                    <p>SYNC OFF</p>
                  </aside>
                  <aside className="company-section-items-right">
                    <button onClick={() => handleCompanyClick(item)}>
                      Open
                    </button>
                    <BsThreeDotsVertical className="company-section-items-right-dot" />
                  </aside>
                </section>
              ))
            )}
          </div>
        </section>
        <section className="comapny-bottom-section">
          <button className="comapny-bottom-section-button">
            Restore Backup
          </button>
          <button
            className="comapny-bottom-section-button2"
            onClick={() =>
              navigate("/addCompany", {
                state: { redirectTo: location.pathname },
                replace: true,
              })
            }
          >
            New Companay
          </button>
        </section>
        <section onClick={handleLogout} className="companyFooter">
          <p>Logout</p>
          <p>Logging out will stop syncing data</p>
        </section>
      </div>
    </div>
  );
};

export default CompaniesPage;
