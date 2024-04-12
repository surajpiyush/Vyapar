import css from "./GSTR9.module.css";
import Loader3 from "../../../Component/Loaders/Loader3";
import ReportUpperControlPanel from "../../../Component/UpperControlPanel/ReportUpperControlPanel";
import { USER_DETAILS } from "../../../Redux/store";
import { GetPurchaseReport } from "../../../Redux/report/action";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const GSTR9 = () => {
  const dispatch = useDispatch();
  const [nonTaxExempted, setNonTaxExempted] = useState(false);
  const [financialYear, setFinancialYear] = useState("");
  const companyName = JSON.parse(
    localStorage.getItem(USER_DETAILS)
  )?.companyName;

  return (
    <div>
      <ReportUpperControlPanel
        title="GSTR9 REPORT"
        startDate={financialYear}
        setStartDate={setFinancialYear}
        nonTaxExempted={nonTaxExempted}
        setNonTaxExempted={setNonTaxExempted}
        showJson={false}
        data={["Nothing to download"]}
      />

      {/* Content */}
      <div className={css.ContentOuter}>
        {/* table 1 */}
        <div className={css.childContentParentDiv}>
          <table className={css.contentTableOuterDiv}>
            <thead>
              <tr>
                <th>
                  <div>Pt. I</div>
                </th>
                <th colSpan="2">
                  <div>Basic Details</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>1</div>
                </td>
                <td>
                  <div>Financial Year</div>
                </td>
                <td>
                  <div>2024-2025</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>2</div>
                </td>
                <td>
                  <div>GSTIN</div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <div>1</div>
                </td>
                <td>
                  <div>Financial Year</div>
                </td>
                <td>
                  <div>2024-2025</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>3A</div>
                </td>
                <td>
                  <div>Legal Name</div>
                </td>
                <td>
                  <div>{companyName}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>3B</div>
                </td>
                <td>
                  <div>Trade Name (if any)</div>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* table 2 */}
        <div className={css.childContentParentDiv}>
          <table className={css.contentTableOuterDiv}>
            <thead>
              <tr>
                <th>
                  <div>Pt. II</div>
                </th>
                <th colSpan="6">
                  <div>
                    Details Of Outward And Inward Supplies Declared During The
                    Financial Year
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div></div>
                </td>
                <td colSpan="2">
                  <div></div>
                </td>
                <td colSpan="4">
                  <div>(Amount in Rupees in All Tables)</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div></div>
                </td>
                <td>
                  <div>Nature of Supplies</div>
                </td>
                <td>Taxable Value</td>
                <td>Central Tax</td>
                <td>State Tax/ UT Tax</td>
                <td>Integrated Tax</td>
                <td>Cess</td>
              </tr>
              <tr>
                <td></td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
              </tr>
              <tr>
                <td>4</td>
                <td colSpan="6">
                  Details of advances, inward and outward supplies on which tax
                  is payable as declared in returns filed during the financial
                  year
                </td>
              </tr>
              <tr>
                <td>A</td>
                <td>Supplies made to un-registered persons(B2C) </td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>B</td>
                <td>Supplies made to registered persons(B2B)</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>C</td>
                <td>
                  Zero rated supply(Export) on payment of tax (except supplies
                  to SEZs)
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>D</td>
                <td>Supplies to SEZs on payment of tax</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>E</td>
                <td>Deemed Exports</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>F</td>
                <td>
                  Advances on which tax has been paid but invoice has not been
                  issued (not cover under (A) to (E) above)
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>G</td>
                <td>
                  Inward supplies on which tax is to be paid on reverse charge
                  basis
                </td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>H</td>
                <td>Sub-total (A to G above)</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>I</td>
                <td>
                  Credit Notes issued in respect of transactions specified in
                  (B) to (E) above (-)
                </td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>J</td>
                <td>
                  Debit Notes issued in respect of transactions specified in (B)
                  to (E) above (+)
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>K</td>
                <td>Supplies/tax declared through Amendments(+)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>L</td>
                <td>Supplies/tax reduced through Amendments(+)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>M</td>
                <td>Sub-total (I to L above)</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>N</td>
                <td>
                  Supplies and advances on which tax is to be paid (H+M) above
                </td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* table 3 */}
        <div className={css.childContentParentDiv}>
          <table className={css.contentTableOuterDiv}>
            <thead>
              <tr>
                <th>
                  <div>5</div>
                </th>
                <th colSpan="6">
                  <div>
                    Details of Outward supplies on which tax is not payable as
                    declared in returns filed during the financial year
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A</td>
                <td>Zero rated supply (Export) without payment of tax</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>B</td>
                <td>Supply to SEZs without payment of tax</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>C</td>
                <td>
                  Supplies on which tax is to be paid by the recipient on
                  reverse charge basis
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>D</td>
                <td>Exempted</td>
                <td>0</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>E</td>
                <td>Nil Rated</td>
                <td>0</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>F</td>
                <td>Non-GST supply</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>G</td>
                <td>Sub-total (A to F above)</td>
                <td>0</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>H</td>
                <td>
                  Credit Notes issued in respect of transactions specified in A
                  to F above (-)
                </td>
                <td>0</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>I</td>
                <td>
                  Debit Notes issued in respect of transactions specified in A
                  to F above (+)
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>J</td>
                <td>Supplies declared through Amendments(+)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>K</td>
                <td>Supplies reduced through Amendments(+)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>L</td>
                <td>Sub-Total (H to K above)</td>
                <td>0</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>M</td>
                <td>Turnover on which tax is not to be paid (G + L above)</td>
                <td>0</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>N</td>
                <td>
                  Total Turnover (including advances) (4N + 5M - 4G above)
                </td>
                <td>0</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>

              {/*  */}
              <tr>
                <td></td>
                <td>Nature of Supplies</td>
                <td>Taxable Value</td>
                <td>Central Tax</td>
                <td>State Tax/ UT Tax</td>
                <td>Integrated Tax</td>
                <td>Cess</td>
              </tr>
              {/*  */}
            </tbody>
          </table>
        </div>
        {/* table 4 */}
        <div className={css.childContentParentDiv}>
          <table className={css.contentTableOuterDiv}>
            <thead>
              <tr>
                <th scope="col">
                  <div>Pt. III</div>
                </th>
                <th scope="col" colSpan="6">
                  <div>
                    Details Of ITC As Declared In Returns Filed During The
                    Financial Year
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>Description</td>
                <td>Type</td>
                <td>Central Tax</td>
                <td>State Tax/ UT Tax</td>
                <td>Integrated Tax</td>
                <td>Cess</td>
              </tr>
              <tr>
                <td></td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
              </tr>
              <tr>
                <td>6</td>
                <td colSpan="6">
                  Details of ITC availed as declared in returns filed during the
                  financial year
                </td>
              </tr>
              <tr>
                <td>A</td>
                <td colSpan="2">
                  Total amount of input tax credit availed through FORM GSTR-3B
                  (sum total of Table 4A of FORM GSTR-3B)
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>B</td>
                <td>
                  Inward supplies (other than imports and inward supplies liable
                  to reverse charge but includes service received from SEZs)
                </td>
                <td colSpan="6">
                  <table className="table table-striped table-bordered text-center">
                    <tbody>
                      <tr>
                        <td>inputs</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Capital Goods</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Input Services</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>C</td>
                <td>
                  Inward supplies received from unregistered persons liable to
                  reverse charge (other than B above) on which tax is paid & ITC
                  availed
                </td>
                <td colSpan="6">
                  <table className="table table-striped table-bordered text-center">
                    <tbody>
                      <tr>
                        <td>inputs</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Capital Goods</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Input Services</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>D</td>
                <td>
                  Inward supplies received from registered persons liable to
                  reverse charge (other than B above) on which tax is paid and
                  ITC availed
                </td>
                <td colSpan="6">
                  <table className="table table-striped table-bordered text-center">
                    <tbody>
                      <tr>
                        <td>inputs</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Capital Goods</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Input Services</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>E</td>
                <td>Import of goods (including suppliesfrom SEZs)</td>
                <td colSpan="6">
                  <table className="table table-striped table-bordered text-center">
                    <tbody>
                      <tr>
                        <td>inputs</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Capital Goods</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>F</td>
                <td colSpan="2">
                  Import of services (excluding inward supplies from SEZs)
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>G</td>
                <td colSpan="2">Input Tax credit received from ISD</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>H</td>
                <td colSpan="2">
                  Amount of ITC reclaimed (other than B above) under the
                  provisons of Act
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>I</td>
                <td colSpan="2">Sub-total (B to H above)</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>J</td>
                <td colSpan="2">Difference (I - A above)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>K</td>
                <td colSpan="2">
                  Transition credit through TRAN-I (including revisions if any)
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>L</td>
                <td colSpan="2">Transition credit through TRAN-II</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>M</td>
                <td colSpan="2">
                  Any other ITC availed but not specified above
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>N</td>
                <td colSpan="2">Sub-total (K to M above)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>O</td>
                <td colSpan="2">Total ITC availed (I + N above)</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* table 5 */}
        <div className={css.childContentParentDiv}>
          <table className={css.contentTableOuterDiv}>
            <thead>
              <tr className="table-dark">
                <th scope="col">
                  <div>7</div>
                </th>
                <th scope="col" colSpan="6">
                  <div>
                    Details of ITC Reversed and Ineligible ITC as declared in
                    rerurns filed during the financial year
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A</td>
                <td>As per Rule 37</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>B</td>
                <td>As per Rule 39</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>C</td>
                <td>As per Rule 42</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>D</td>
                <td>As per Rule 43</td>
                <td>0</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>E</td>
                <td>As per section 17(5)</td>
                <td>0</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>F</td>
                <td>Reversal of TRAN-I credit</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>G</td>
                <td>Reversal of TRAN-II credit</td>
                <td>0</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>H</td>
                <td>Other reversals (pl. specify)</td>
                <td>0</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>I</td>
                <td>Total ITC reversed (A to H above)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>J</td>
                <td>Net ITC Available for Utilization (6O -7I)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GSTR9;
