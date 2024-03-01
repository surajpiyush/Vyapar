import GSTRHearder from "../components/GSTRHearder";

import { useState } from "react";

const GSTR9 = () => {
  const [isChecked, setIsChecked] = useState(false);
  const companyName = JSON.parse(localStorage.getItem("USER_DETAILS"))?.companyName;
  const check = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <GSTRHearder isChecked={isChecked} check={check} data={['Nothing to download']} />
      <div>
        <div>
          <span
            style={{
              marginLeft: "10px",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            GSTR 3 REPORT
          </span>
        </div>
        {/* table 1 */}
        <div style={{ margin: "20px 20px" }}>
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="table-dark">
                <th scope="col">Pt. I</th>
                <th scope="col" colSpan="2">
                  Basic Details
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Financial Year</td>
                <td>2022-2023</td>
              </tr>
              <tr>
                <td>2</td>
                <td>GSTIN</td>
                <td></td>
              </tr>
              <tr>
                <td>1</td>
                <td>Financial Year</td>
                <td>2022-2023</td>
              </tr>
              <tr>
                <td>3A</td>
                <td>Legal Name</td>
                <td>{companyName}</td>
              </tr>
              <tr>
                <td>3B</td>
                <td>Trade Name (if any)</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* table 2 */}
        <div style={{ margin: "20px 20px" }}>
          <table className="table table-striped table-bordered text-center">
            <thead>
              <tr className="table-dark">
                <th scope="col">Pt. I</th>
                <th scope="col" colSpan="6">
                  Details Of Outward And Inward Supplies Declared During The
                  Financial Year
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td colSpan="2"></td>
                <td colSpan="4">(Amount in Rupees in All Tables)</td>
              </tr>
              <tr>
                <td></td>
                <td>Nature of Supplies</td>
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
        <div style={{ margin: "20px 20px" }}>
          <table className="table table-striped table-bordered text-center">
            <thead>
              <tr className="table-dark">
                <th scope="col">5</th>
                <th scope="col" colSpan="6">
                  Details of Outward supplies on which tax is not payable as
                  declared in returns filed during the financial year
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
            </tbody>
          </table>
        </div>
        {/* table 4 */}
        <div style={{ margin: "20px 20px" }}>
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="table-dark">
                <th scope="col">Pt. III</th>
                <th scope="col" colSpan="6">
                  Details Of ITC As Declared In Returns Filed During The
                  Financial Year
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
        <div style={{ margin: "20px 20px" }}>
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="table-dark">
                <th scope="col">7</th>
                <th scope="col" colSpan="6">
                  Details of ITC Reversed and Ineligible ITC as declared in
                  rerurns filed during the financial year
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
        {/* table 6 */}
        <div style={{ margin: "20px 20px" }}>
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="table-dark">
                <th scope="col">8</th>
                <th scope="col" colSpan="6" className="text-center">
                  Other ITC related information
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A</td>
                <td>ITC as per GSTR-2A (Table 3 & 5 thereof)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>B</td>
                <td>ITC as per sum total of 6(B) and 6(H) above</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>C</td>
                <td>
                  ITC on inward supplies (other than imports and inward supplies
                  liable to reverse charge but includes services received from
                  SEZs) received during 2017-18 but availed during April to
                  September, 2018
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>D</td>
                <td>Difference [A-(B+C)]</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>E</td>
                <td>ITC available but not availed (out of D)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>F</td>
                <td>ITC available but ineligible (out of D)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>G</td>
                <td>IGST paid on import of goods (as per 6(E) above)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>H</td>
                <td>
                  IGST credit availed on import of goods (as per 6(E) above)
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>I</td>
                <td>Difference (G -H)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>J</td>
                <td>
                  ITC available but not availed on import of goods (Equal to I)
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>K</td>
                <td>
                  Total ITC to be lapsed in current financial year (E+F+J)
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* table 7 */}
        <div style={{ margin: "20px 20px" }}>
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="table-dark">
                <th scope="col">Pt. IV</th>
                <th scope="col" colSpan="7" className="text-center">
                  Other ITC related information
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>9</td>
                <td>Description</td>
                <td>Tax Payable</td>
                <td>Paid through cash</td>
                <td colSpan="4" className="table-striped table-bordered">
                  <table className="table table-striped table-bordered text-center">
                    <tbody>
                      <tr colSpan="4">
                        <td className="text-center">Paid through ITC</td>
                      </tr>
                      <tr>
                        <td>Central Tax</td>
                        <td>State Tax/ UT Tax</td>
                        <td>Integrated Tax</td>
                        <td>Cess</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
              </tr>
              <tr>
                <td></td>
                <td>Integrated Tax</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>Central Tax</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>State/ UT tax</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>Cess</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>Interest</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>Late fee</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>Penalty</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>Other</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* table 8 */}
        <div style={{ margin: "20px 20px" }}>
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="table-dark">
                <th scope="col">Pt. V</th>
                <th scope="col" colSpan="6" className="text-center">
                  Particulars Of The Transactions For The Previous FY Declared
                  In Returns Of April To September Of Current FY Or Upto Date Of
                  Filing Of Annual Return Of Previous FY Whichever Is Earlier
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>Description</td>
                <td>Tax Payable</td>
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
                <td>10</td>
                <td>
                  Supplies/tax declared through Amendments (+) (net of debit
                  notes)
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>11</td>
                <td>
                  Supplies/tax reduced through Amendments (+) (net of credit
                  notes)
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>12</td>
                <td>Reversal of ITC availed during previous financial year</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>13</td>
                <td>ITC availed for the previous financial year</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* table 9 */}
        <div style={{ margin: "20px 20px" }}>
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="table-dark">
                <th scope="col">14</th>
                <th scope="col" colSpan="3" className="text-center">
                  Differential Tax Paid On Account Of Declaration In 10 & 11
                  Above
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>Description</td>
                <td>Payable</td>
                <td>Paid</td>
              </tr>
              <tr>
                <td></td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
              <tr>
                <td></td>
                <td>Integrated Tax</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>Central Tax</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>State/ UT Tax</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>Cess</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>Interest</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* table 10 */}
        <div style={{ margin: "20px 20px" }}>
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="table-dark">
                <th scope="col">Pt. VI</th>
                <th scope="col" colSpan="8" className="text-center">
                  Other Information
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>15</td>
                <td colSpan="8" className="text-center">
                  Particulars of Demands and Refunds
                </td>
              </tr>
              <tr>
                <td></td>
                <td>Details</td>
                <td>Central Tax</td>
                <td>State Tax/ UT Tax</td>
                <td>Integrated Tax</td>
                <td>Cess</td>
                <td>Interest</td>
                <td>Penalty</td>
                <td>Late Fee/ Others</td>
              </tr>
              <tr>
                <td></td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
              </tr>
              <tr>
                <td>A</td>
                <td>Total Refund claimed</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>B</td>
                <td>Total Refund sanctioned</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>C</td>
                <td>Total Refund rejected</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>D</td>
                <td>Total Refund pending</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>E</td>
                <td>Total demand of taxes</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>F</td>
                <td>Total taxes paid in respect of E above</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>G</td>
                <td>Total demands pending out of E above</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* table 11 */}
        <div style={{ margin: "20px 20px" }}>
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="table-dark">
                <th scope="col">16</th>
                <th scope="col" colSpan="6" className="text-center">
                  Information On Supplies Received From Composition Taxpayers,
                  Deemed Supply Under Section 143 And Goods Sent On Approval
                  Basis
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>Details </td>
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
                <td>A</td>
                <td>Supplies received from composition taxpayers</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>B</td>
                <td>Deemed supply under section 143</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>C</td>
                <td>Goods sent on approval basis but not returned</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* table 12 */}
        <div style={{ margin: "20px 20px" }}>
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="table-dark">
                <th scope="col">17</th>
                <th scope="col" colSpan="8" className="text-center">
                  HSN Wise Summary Of Outward Supplies
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>HSN Code</td>
                <td>UQC</td>
                <td>Total Quantity</td>
                <td>Taxable Value</td>
                <td>Rate of Tax</td>
                <td>Central Tax</td>
                <td>State/ UT Tax</td>
                <td>Integrated Tax</td>
                <td>Cess</td>
              </tr>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* table 13 */}
        <div style={{ margin: "20px 20px" }}>
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="table-dark">
                <th scope="col">18</th>
                <th scope="col" colSpan="8" className="text-center">
                  HSN Wise Summary Of Inward Supplies
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>HSN Code</td>
                <td>UQC</td>
                <td>Total Quantity</td>
                <td>Taxable Value</td>
                <td>Rate of Tax</td>
                <td>Central Tax</td>
                <td>State/ UT Tax</td>
                <td>Integrated Tax</td>
                <td>Cess</td>
              </tr>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* table 14 */}
        <div style={{ margin: "20px 20px" }}>
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="table-dark">
                <th scope="col">19</th>
                <th scope="col" colSpan="3" className="text-center">
                  Late Fee Payable And Paid
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td></td>
                <td>Description</td>
                <td>Payable</td>
                <td>Paid</td>
              </tr>
              <tr className="text-center">
                <td></td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
              <tr>
                <td>A</td>
                <td>Central Tax </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>B</td>
                <td>State Tax</td>
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
