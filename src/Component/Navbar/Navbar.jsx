import css from "./Navbar.module.css";
import Logo from "../../assets/Shop.svg";
import { LOGOUT } from "../../Redux/business/action";
import { USER_DETAILS } from "../../Redux/business/actionTypes";
import { RefreshIcon, CloseIcon2 } from "../../assets/Icons/ReactIcons";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [inpVal, setInpVal] = useState(
    JSON.parse(localStorage.getItem(USER_DETAILS))?.companyName || ""
  );
  const [showRename, setShowRename] = useState(false);
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);

  // Save Name Function
  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Feature Under Development",
      status: "info",
      position: "top",
    });
  };

  // Change Company Click
  const handleChangeCompanyClick = () => {
    setShowCompanyMenu((prev) => !prev);
    navigate("/companies");
  };

  const handleCloseToogle = () => {
    if (showCompanyMenu) {
      setShowCompanyMenu(false);
    }
  };

  return (
    <nav
      onMouseLeave={() => setShowCompanyMenu(false)}
      className={css.navOuterDiv}
      onClick={handleCloseToogle}
    >
      <div className={css.innerParentDiv}>
        <div className={css.leftSideNavOptionsDiv}>
          <img src={Logo} alt="Asaanly" />
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowCompanyMenu((prev) => !prev);
            }}
            style={{
              backgroundColor: showCompanyMenu ? "var(--greyC)" : "transparent",
            }}
          >
            Company
          </div>
          <div>Help</div>
          {/* <div>Shotcuts</div> */}
          <div onClick={() => LOGOUT(navigate, toast)}>Logout</div>
          <div onClick={() => window.location.reload()}>
            <RefreshIcon />
          </div>
        </div>
      </div>

      {/* Company Menu */}
      {showCompanyMenu && (
        <div
          onMouseEnter={() => setShowCompanyMenu(true)}
          className={css.companyMenuOuterDiv}
        >
          <div onClick={handleChangeCompanyClick}>Change Company</div>
          <div
            onClick={() => {
              setShowRename(true);
              setShowCompanyMenu(false);
            }}
          >
            Rename Company Name
          </div>
        </div>
      )}

      {/* Rename Component */}
      {showRename && (
        <div
          className={css.renameOuterDiv}
          onClick={() => setShowRename(false)}
        >
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className={css.renameFormDivOuter}
          >
            <div className={css.headerRenameForm}>
              <div>Update company display name</div>
              <CloseIcon2 onClick={() => setShowRename(false)} />
            </div>
            <div className={css.renameInputDivOuter}>
              <input
                type="text"
                value={inpVal}
                onChange={(e) => setInpVal(e.target.value)}
                required
              />
            </div>
            <div className={css.footerOuterDiv}>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
