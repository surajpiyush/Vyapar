import css from "./GSTR1.module.css";

const SaleReturn = ({ saleReturnData }) => {
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
                "",
                "Cr. Note Details",
                "",
                "",
                "",
                "Tax Rate",
                "Cess Rate",
                "Taxable Value",
                "",
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
                "Invoice Date",
                "Note No.",
                "Note Date",
                "Value",
                "",
                "",
                "",
                "Integrated Tax",
                "Central Tax",
                "State/UT Tax",
                "Cess",
                "",
              ].map((item, ind) => (
                <th key={item + ind}>
                  <div>{item}</div>
                </th>
              ))}
            </tr>
          </thead>

          {saleReturnData?.length > 0 && (
            <tbody>
              {saleReturnData?.map((item, ind) => (
                <tr key={ind + item?._id}>
                <td>
                  <div>{ind+1}</div>
                </td>
                  <td>
                    <div>{item?.gstNo || item?.Data[0]?.gstNo || "-"}</div>
                  </td>
                  <td>
                    <div>
                      {item?.partyName || item?.Data[0]?.partyName || "-"}
                    </div>
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
                    <div>{item?.returnNo || "-"}</div>
                  </td>
                  <td>
                    <div>
                      {new Date(item?.date).toLocaleDateString("en-GB")}
                    </div>
                  </td>
                  <td>
                    <div style={{ textAlign: "right" }}>
                      ₹{item?.total || 0}
                    </div>
                  </td>
                  <td>
                    <div style={{ textAlign: "right" }}>
                      {item?.taxRate || "-"}
                    </div>
                  </td>
                  <td>
                    <div style={{ textAlign: "right" }}>
                      {item?.cess || "-"}
                    </div>
                  </td>
                  <td>
                    <div style={{ textAlign: "right" }}>
                      ₹{item?.total - item?.taxableValue || 0}
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
                        ? (Number(item?.taxableValue) / 2).toFixed(2)
                        : 0}
                    </div>
                  </td>
                  <td>
                    <div style={{ textAlign: "right" }}>
                      {item?.cess || "-"}
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
        {saleReturnData?.length <= 0 && (
          <div className={css.noDataDiv}>
            <p>No GSTR1 Report is available for Sale Return.</p>
            <p>Please try again after making relevant changes.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaleReturn;
