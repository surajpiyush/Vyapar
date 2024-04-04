import { useState } from "react";
//import ReportSearchBar from "../components/ReportSearchBar";
import { PrintIcon2 } from "../assets/Icons/ReactIcons";
import UpperControlPanel from "../Component/UpperControlPanel/UpperControlPanel";

const CashFlow = () => {
  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const dataSale = [
    {
      id: 1,
      invoiceNo: "001",
      date: "2024-02-09",
      partyName: "John Doe",
      transactionType: "sale",
      paymentType: "cash",
      amount: 1000,
      balance: 500,
    },
    // Add more transactions here
  ];

  const tableHeader = [
    "#",
    "DATE",
    "INVOICE NO.",
    "PARTY NAME",
    "CATEGORY",
    "TRANSACTION TYPE",
    "TOTAL",
    "PAID",
    "BALANCE",
    "DUE DATE",
    "STATUS",
    "ACTION",
  ];

  // State to keep track of checkbox value
  const [isChecked, setIsChecked] = useState(false);

  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <UpperControlPanel
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        showPaymentData={false}
        showPrintOptions={true}
        data={dataSale}
      />

      <div className="cashflow-Opening-Cash">
        <p>Opening Cash-in Hand: ₹{0.0}</p>
        <div>
          <span>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </span>
          <p>Show zero amount transaction</p>
        </div>
      </div>
      <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
        {/* <ReportSearchBar /> */}
      </div>
      <div style={{ marginLeft: "20px", marginRight: "20PX" }}>
        {/* <TableModel tableHeader={tableHeader} data={dataSale} /> */}
        <div style={{ minHeight: "100vh" }}>
          <table className="excel-like-table">
            <thead>
              <tr>
                {tableHeader?.map((header) => (
                  <th key={header}>
                    {header}
                    {/* <FilterIcon /> */}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!dataSale.length ? (
                <tr
                  style={{
                    textAlign: "center",
                    margin: "20px auto",
                    color: "red",
                    display: "flex",
                  }}
                >
                  No Transactions data available for the specified dates
                </tr>
              ) : (
                dataSale?.map((item, index) => (
                  <tr key={item.id} style={{ textAlign: "center" }}>
                    <td>{index + 1}</td>

                    <td>
                      {new Date(item.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td>{item?.invoiceNumber || item?.refNo || "-"}</td>

                    <td>{item?.name}</td>
                    <td>{item?.category || "-"}</td>
                    <td>{item?.type || "-"}</td>
                    <td>{item?.total || 0}</td>
                    <td>{item?.recived || "0" || item?.paid}</td>
                    <td>{item.balance}</td>
                    <td>
                      {item.dueDate
                        ? new Date(item.dueDate).toLocaleDateString("en-GB")
                        : "-"}
                    </td>
                    <td>{item.status}</td>
                    <td>
                      <PrintIcon2
                        onClick={() => {
                          window.print();
                        }}
                      />
                      {/* <ShareIcon /> */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CashFlow;
