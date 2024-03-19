const ReportSelector = ({ optionType }) => {
  // console.log(optionType);
  return (
    <select name="" style={{}} id="" onSelect={(e) => console.log(e.target.value)}>
      {optionType?.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default ReportSelector;
