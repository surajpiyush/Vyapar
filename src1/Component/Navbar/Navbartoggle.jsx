import React, { useState } from 'react';
import "./Navbartoggle.css"
import { useNavigate } from 'react-router-dom';
import Renamemodel from './Renamemodel';

const Navbartoggle = ({closeTooglenav}) => {
const navigate = useNavigate();
const [openRenameModel, SetopenRenameModel] = useState(false);

const handleClosemodel = () => {
  if(openRenameModel) {
    SetopenRenameModel(false);
  }
  closeTooglenav();
}

  return (
    <div className='toggle-main-conatiner'>
    <div className='toggle-navbar-container' onClick={(e) => e.stopPropagation()} >
        <div onClick={() => navigate("/company")} className="toggle-items">Change Company</div>
        <div onClick={() => SetopenRenameModel(!openRenameModel)} className="toggle-items">Rename Company Name</div>
    </div>
    {openRenameModel && (
      <Renamemodel closerenamemodel={handleClosemodel} />
    )}
    </div>
  )
}

export default Navbartoggle
