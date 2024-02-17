import React from 'react'

const TableModel = ({tableHeader,data}) => {
  return (
    <div>
      <table className="excel-like-table">
        <thead>
          <tr>
            {tableHeader?.map( header => (
                <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map(item => (
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
    </div>
  )
}

export default TableModel