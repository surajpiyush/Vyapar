import React from 'react'
import { FaSearch } from 'react-icons/fa'

const ReportSearchBar = () => {
  return (
    <div className="sale-dashboard-search-bar">
                <input type="text" placeholder="Search" />
                <FaSearch />
     </div>
  )
}

export default ReportSearchBar