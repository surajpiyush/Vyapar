import css from "./GSTR1.module.css";

const SaleTable = ({ saleData }) => {
  return (
    <div className={css.ContentOuter}>
      <div className={css.contentTableOuterDiv}>
        <table>
          <thead>
            <tr className={css.upperTableHeader}>
              {/* Upper Header */}
              {[
                "",
                "",
                "Invoice Details",
                "",
                "",
                "Tax Rate",
                "Cess Rate",
                "Taxable Value",
                "",
                "Amount",
                "",
                "Place of Supply (Name Of State)",
              ].map((item, ind) => (
                <th key={item + ind}>
                  <div>{item}</div>
                </th>
              ))}
            </tr>
            <tr className={css.lowerTableHeader}>
              {/* Lower Header */}
              {[
                "#",
                "GSTIN/UIN",
                "Party Name",
                "Invoice NO.",
                "Date",
                "Value",
                "",
                "",
                "",
                "Integrated Tax",
                "Central Tax",
                "State/UT Tax",
                "",
              ].map((item, ind) => (
                <th key={item + ind}>
                  <div>{item}</div>
                </th>
              ))}
            </tr>
          </thead>

          {saleData?.length > 0 && (
            <tbody>
              {saleData?.map((item, ind) => (
                <tr key={ind + item?._id}>
                <td>
                  {ind+1}
                </td>
                  <td>
                    <div>{item?.gstNo || "-"}</div>
                  </td>
                  <td>
                    <div>{item?.partyName || "-"}</div>
                  </td>
                  <td>
                    <div>{item?.invoiceNumber || "-"}</div>
                  </td>
                  <td>
                    <div>
                      {new Date(item?.invoiceDate).toLocaleDateString("en-GB")}
                    </div>
                  </td>
                  <td>
                    <div style={{ textAlign: "right" }}>
                      ₹{item?.amount || 0}
                    </div>
                  </td>
                  <td>
                    <div style={{ textAlign: "right" }}>
                      {item?.taxRate || " "}
                    </div>
                  </td>
                  <td>
                    <div style={{ textAlign: "right" }}>
                      {item?.cess || 0}
                    </div>
                  </td>
                  <td>
                    <div style={{ textAlign: "right" }}>
                      ₹{item?.amount - item?.taxableValue || 0}
                    </div>
                  </td>
                  <td>
                    <div style={{ textAlign: "right" }}>
                      ₹{item?.integreatedTax || 0}
                    </div>
                  </td>
                  <td>
                    <div style={{ textAlign: "right" }}>
                      ₹
                      {Number(item?.taxableValue)
                        ? (Number(item?.taxableValue) / 2).toFixed(2)
                        : 0}
                    </div>
                  </td>
                  <td>
                    <div style={{ textAlign: "right" }}>
                      ₹
                      {Number(item?.taxableValue)
                        ?(Number(item?.taxableValue) / 2).toFixed(2)
                        : 0}
                    </div>
                  </td>
                  <td>
                    <div>{item?.stateOfSupply}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>

        {saleData?.length <= 0 && (
          <div className={css.noDataDiv}>
            <p>No GSTR1 Report is available for Sale.</p>
            <p>Please try again after making relevant changes.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaleTable;
