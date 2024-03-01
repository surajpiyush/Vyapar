import TableModel from "../components/TableModel";
import ReportSearchBar from "../components/ReportSearchBar";
import SaleDashboardHeader from "../components/SaleDashboardHeader";

const SaleHSN = () => {
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
    "DATE",
    "INVOICE NO.",
    "PARTY NAME",
    "TRANSACTION TYPE",
    "PAYMENT TYPE",
    "AMOUNT",
    "BALANCE",
  ];

  return (
    <div>
      <SaleDashboardHeader />
      <div style={{ marginLeft: "20px" }}>
        <ReportSearchBar />
      </div>
      <div>
        <TableModel tableHeader={tableHeader} data={dataSale} />
      </div>
    </div>
  );
};

export default SaleHSN;
