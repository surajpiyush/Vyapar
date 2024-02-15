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
                  <td>{item.date}</td>
                  <td>{item.invoiceNo}</td>
                  <td>{item.partyName}</td>
                  <td>{item.transactionType}</td>
                  <td>{item.paymentType}</td>
                  <td>{item.amount}</td>
                  <td>{item.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
    </>
  )
}

export default GSTRsale