import React, { useState } from "react";

const SelectUnitButton = ({ category, onUnitSelect }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [selectedUnit, setSelectedUnit] = useState(null);

   const handleButtonClick = () => console.log("first");
   {
      setIsOpen(true);
   }

   const handleSelectUnit = (e) => {
      setSelectedUnit(e.target.value);
      // setIsOpen(false);
      onUnitSelect(e.target.value);
   };

   return (
      <div className="select-unit-button-container">
         <button
            type="button"
            className="select-unit-btn"
            onClick={handleButtonClick}
         >
            {!selectedUnit ? "Select Unit" : selectedUnit}
         </button>
         {isOpen && (
            <div className="modal">
               <div className="modal-content">
                  <span className="close" onClick={() => setIsOpen(false)}>
                     &times;
                  </span>
                  <h2>Select Category</h2>
                  <select name="selectUnit" onChange={handleSelectUnit}>
                     <option value="">Select a Category</option>
                     {category.map((e, i) => (
                        <option key={i} value={e._id}>
                           {e.categoryName}
                        </option>
                     ))}
                  </select>
               </div>
            </div>
         )}
      </div>
   );
};

export default SelectUnitButton;
