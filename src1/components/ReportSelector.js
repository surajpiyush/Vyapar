import React from 'react'

const ReportSelector = ({optionType}) => {
    console.log(optionType);
  return (
    <select name="" id="">
        {optionType?.map(option => (
            <option key={option}>{option}</option>
        ))}
    </select>
  )
}

export default ReportSelector