// import "../../styles/parties.css";
// import "../../styles/sales.css";

import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function SalesEstimatesTable({ func }) {
  const toast = useToast();
  const isError = useSelector((state) => state.SalesReducer.isError);
  const estimatesList = useSelector(
    (state) => state.SalesReducer.estimatesList
  );

  function formatDate(dateString) {
    // Convert the string to a Date object
    const date = new Date(dateString);

    // Extract the year, month, and day from the Date object
    const year = date.getFullYear();
    // Note: getMonth() returns 0-indexed months, so you need to add 1 to get the correct month
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Format the date in the desired form
    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;

    return formattedDate;
  }

  const openForm = () => {
    func(true);
  };

  return (
    <div className="" style={{ width: "100%", margin: "auto" }}>
      <div className="d-flex">
        <div className="grp-cont2">
          <div className="grp-cont2b">
            <div className="d-between">
              <h3>Transactions</h3>
              <button className="add-party-btn add-sale-btn" onClick={openForm}>
                + Add Estimates
              </button>
            </div>
            <div style={{ textAlign: "start" }}>
              <input
                type="text"
                placeholder="Search"
                className="search-party"
                style={{ width: "200px" }}
              />
            </div>
            <div className="" style={{ marginTop: "30px" }}>
              {isError ? (
                <p
                  style={{
                    color: "red",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  No estimates data available for the specified dates!
                </p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>
                        Date <i className="fa fa-filter"></i>
                      </th>
                      <th>
                        Reference Number <i className="fa fa-filter"></i>
                      </th>
                      <th>
                        Name <i className="fa fa-filter"></i>
                      </th>
                      <th>
                        Total Amount <i className="fa fa-filter"></i>
                      </th>
                      <th>
                        Balance <i className="fa fa-filter"></i>
                      </th>
                      <th>
                        Status <i className="fa fa-filter"></i>
                      </th>
                      <th>
                        Action <i className="fa fa-filter"></i>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {estimatesList?.map((item, ind) => (
                      <tr key={ind + item?._id}>
                        <td>{formatDate(item?.invoiceDate)}</td>
                        <td>{item?.refreanceNo}</td>
                        <td>{item?.partyName}</td>
                        <td>{item?.totalAmount}</td>
                        <td>{item?.balanceDue}</td>
                        <td style={{ color: "orangered" }}>{item?.status}</td>
                        <td
                          onClick={() =>
                            toast({
                              title: "Feature under development",
                              status: "info",
                              position: "top",
                            })
                          }
                        >
                          {item?.action}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
