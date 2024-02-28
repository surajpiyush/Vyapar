import React from 'react'

const GSTRsale = ({tableHeader1,tableHeader2,data}) => {
  return (
    <>
        <table className="excel-like-table">
            <thead>
              <tr>
                {tableHeader1?.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
              <tr>
                {tableHeader2?.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr key={item.id}>
                  <td>-</td>
                  <td>{item.partyName}</td>
                  <td>{item.invoiceNumber}</td>
                  <td>{new Date(item.invoiceDate).toLocaleDateString('en-GB')}</td>
                  <td>{item.balance}</td>
                  {/* <td>{item.transactionType}</td>
                  <td>{item.amount}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
    </>
  )
}

export default GSTRsale