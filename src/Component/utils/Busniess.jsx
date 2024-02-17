import { INPUTCHANGE } from "../../Redux/business/actionTypes";
import { SendRegisterRequest } from "../../Redux/business/action";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoLockOpenOutline } from "react-icons/io5";
import { CgOrganisation } from "react-icons/cg";

function Busniess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoading = useSelector((state) => state.BusinessReducer.isLoading);
  const companyName = useSelector((state) => state.BusinessReducer.companyName);
  const email = useSelector((state) => state.BusinessReducer.email);
  const password = useSelector((state) => state.BusinessReducer.password);

  // Input Change Function
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: INPUTCHANGE, payload: value, name });
  };

  // Handle Submit Function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoading) {
      const sendData = { companyName, email, password };
      SendRegisterRequest(dispatch, sendData, navigate, location);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="Container1">
      <div>
        <h2 className="heading1">ADD BUSINESS</h2>
        <div className="inputbox">
          <label htmlFor="companyName" className="hidden">
            Enter your companyName:
          </label>
          <input
            type="text"
            name="companyName"
            placeholder="companyName"
            value={companyName}
            onChange={handleChange}
            className="input"
            required
          />
          <div className="react-icon">
            <CgOrganisation />
          </div>
        </div>
        <div className="inputbox1">
          <label htmlFor="email" className="hidden">
            Enter your email:
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={handleChange}
            className="input1"
            required
          />
          <div className="react-icon">
            <MdOutlineMailOutline />
          </div>
        </div>
        <div className="inputbox1">
          <label htmlFor="password" className="hidden">
            Enter your password:
          </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={handleChange}
            className="input1"
            required
          />
          <div className="react-icon">
            <IoLockOpenOutline />
          </div>
        </div>
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? "Loading" : "Login"}
        </button>
      </div>
    </form>
  );
}

export default Busniess;
