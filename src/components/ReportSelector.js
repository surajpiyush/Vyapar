import React from 'react'

const ReportSelector = ({optionType,setSe}) => {
    // console.log(optionType);
  return (
    <select name="" id="" onSelect={(e)=>console.log(e.target.value)}>
        {optionType?.map(option => (
            <option key={option} value={option}>{option}</option>
        ))}
    </select>
  )
}

export default ReportSelector