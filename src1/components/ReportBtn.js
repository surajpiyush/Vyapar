import React from 'react'
import { FaPlus } from 'react-icons/fa'

const ReportBtn = ({btnText}) => {
  return (
    <div className="sale-dashboard-search-btn">
                <button>
                <FaPlus />
               {btnText}
                </button>
    </div>
  )
}

export default ReportBtn