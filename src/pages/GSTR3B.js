import React, { useState } from 'react'
import GSTRHearder from '../components/GSTRHearder'
import GSTRsale from '../components/GSTRsale';

const GSTR3B = () => {

  const [isChecked, setIsChecked] = useState(false);

  const check = () => {
    setIsChecked(!isChecked);
  };

  const data1 = [
    {
      id: 1,
      natureOfSupplies: "Outward taxable supplies (other than zero rated, nil rated and exempted)",
      taxableValue	: 0,
      integratedTax	: 0,
      centralTax: 0,
      stateTax: 0,
      Cess: 0,
    },
    {
      id: 1,
      natureOfSupplies: "Outward taxable supplies (zero rated)",
      taxableValue	: 0,
      integratedTax	: 0,
      centralTax: 0,
      stateTax: 0,
      Cess: 0,
    },
    {
      id: 1,
      natureOfSupplies: "Other outward supplies (nil rated, exempted)",
      taxableValue	: 0,
      integratedTax	: 0,
      centralTax: 0,
      stateTax: 0,
      Cess: 0,
    },
    {
      id: 1,
      natureOfSupplies: "Inward supplies (liable to reverse charge)",
      taxableValue	: 0,
      integratedTax	: 0,
      centralTax: 0,
      stateTax: 0,
      Cess: 0,
    },
    {
      id: 1,
      natureOfSupplies: "Non-GST outward supplies",
      taxableValue	: 0,
      integratedTax	: 0,
      centralTax: 0,
      stateTax: 0,
      Cess: 0,
    },
  ];

  const tableHeader1 = [
    "Nature Of Supplies",
    "Total Taxable Value",
    "Integrated Tax",
    "Central Tax",
    "State/UT Tax	",
    "Cess",
  ];

  const tableHeader2_1 = [
    "Supplies Made To Unregistered Persons",
    "Supplies Made To Composition Taxable Persons",
    "Supplies Made To UIN Holders",
  ];
  const tableHeader2_2 = [
    "Place Of Supply (State/UT",
    "Total Taxable Value",
    "Amount Of Integrated Tax",
    "Total Taxable Value",
    "Amount Of Integrated Tax",
    "Total Taxable Value",
    "Amount Of Integrated Tax"
  ];
  
  const data2 = [
    {
        placeOfSupplyStateUT: "" ,
        totalTaxableValue: "",
        amountOfIntegratedTax: "",
        totalTaxableValue: "",
        amountOfIntegratedTax: "",
        totalTaxableValue: "",
        amountOfIntegratedTax: ""

    }
  ]

  const tableHeader3 = [
    "Details",
    "Integrated Tax",
    "Central Tax",
    "State/UT Tax",
    "Cess",
  ];


  return (
    <div>
        <GSTRHearder isChecked={isChecked} check={check} />
        <div>
            <div>
                <span style={{marginLeft:"10px",marginBottom: "20px",fontWeight:"bold"}}>GSTR 3 REPORT</span>
            </div>
            {/* table 1 */}
            <div style={{margin:"20px 20px"}}>
                <h5 style={{margin:"20px 20px"}}>1. Details of outward supplies and inward supplies liable to reverse charge</h5>
            <table className="excel-like-table">
            <thead>
              <tr>
                  <th>Nature Of Supplies</th>
                  <th>Total Taxable Value</th>
                  <th>Integrated Tax</th>
                  <th>Central Tax</th>
                  <th>State/UT Tax</th>
                  <th>Cess</th>
              </tr>
            </thead>
            <tbody>
              {data1?.map((item) => (
                <tr key={item.id}>
                  <td>{item.natureOfSupplies}</td>
                  <td>{item.taxableValue}</td>
                  <td>{item.integratedTax}</td>
                  <td>{item.centralTax}</td>
                  <td>{item.stateTax}</td>
                  <td>{item.Cess}</td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>
            {/* table 2 */}
            <div style={{margin:"20px 20px"}}>
                <h5 style={{margin:"20px 20px"}}>2. Details of inter-State supplies made to unregistered persons, composition dealer and UIN holders</h5>
            <table className="excel-like-table">
            <thead>
              <tr>
                {tableHeader2_1?.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
              <tr>
                {tableHeader2_2?.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data2?.map((item) => (
                <tr key={item.id}>
                  <td>{item.placeOfSupplyStateUT}</td>
                  <td>{item.totalTaxableValue}</td>
                  <td>{item.amountOfIntegratedTax}</td>
                  <td>{item.totalTaxableValue}</td>
                  <td>{item.amountOfIntegratedTax}</td>
                  <td>{item.totalTaxableValue}</td>
                  <td>{item.amountOfIntegratedTax}</td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>
            {/* table 3 */}
            <div style={{margin:"20px 20px"}}>
                <h5 style={{margin:"20px 20px"}}>3. Details of eligible Input Tax Credit</h5>
            <table className="excel-like-table">
            <thead>
              <tr>
                {tableHeader3?.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <h6 style={{margin:"10px 0"}}>(A) ITC Available (whether in full or part)</h6>
              <tr>
                <td>(1) Import of goods</td>
                <td>{0}</td>
                <td>{0}</td>
                <td>{0}</td>
                <td>{0}</td>
              </tr>
              <tr>
                <td>(2) Import of services</td>
                <td>{0}</td>
                <td>{0}</td>
                <td>{0}</td>
                <td>{0}</td>
              </tr>
              <tr>
                <td>(3) Inward supplies liable to reverse charge (other than 1 & 2 above)</td>
                <td>{0}</td>
                <td>{0}</td>
                <td>{0}</td>
                <td>{0}</td>
              </tr>
              <tr>
                <td>(4) Inward supplies from ISD</td>
                <td>{0}</td>
                <td>{0}</td>
                <td>{0}</td>
                <td>{0}</td>
              </tr>
              <tr>
                <td>(5) All other ITC</td>
                <td>{0}</td>
                <td>{0}</td>
                <td>{0}</td>
                <td>{0}</td>
              </tr>
              <h6 style={{margin:"10px 0"}}>(D) Ineleigible ITC</h6>
              <tr>
                <td>(1) As per section 17(5)</td>
                <td>{0}</td>
                <td>{0}</td>
                <td>{0}</td>
                <td>{0}</td>
              </tr>
              <tr>
                <td>(2) Others</td>
                <td>{0}</td>
                <td>{0}</td>
                <td>{0}</td>
                <td>{0}</td>
              </tr>
            </tbody>
          </table>
            </div>
            {/* table 4 */}
            <div style={{margin:"20px 20px"}}>
                <h5 style={{margin:"20px 20px"}}>4. Details of exempt, nil-rated and non-GST inward supplies</h5>
            <table className="excel-like-table">
            <thead>
              <tr>
                {tableHeader3?.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>From a supplier under composition scheme, Exempt and Nil rated supply</td>
                <td>{0}</td>
                <td>{0}</td>
                <td>{0}</td>
                <td>{0}</td>
              </tr>
              <tr>
                <td>Non GST supply</td>
                <td>{0}</td>
                <td>{0}</td>
                <td>{0}</td>
                <td>{0}</td>
              </tr>
            </tbody>
          </table>
            </div>
        </div>
    </div>
  )
}

export default GSTR3B