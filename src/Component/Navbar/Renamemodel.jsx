import React from 'react'
import { RxCross2 } from "react-icons/rx";
import "./renamemodel.css"


const Renamemodel = ({closerenamemodel}) => {
  return (
    <div className='rename-model-container' onClick={closerenamemodel}>
        <div className="rename-model-content" onClick={(e) => e.stopPropagation()}>
            <section className="rename-top-bar">
                <p>Update Company display name</p>
                <div onClick={closerenamemodel}>
                <RxCross2 className='rename-top-bar-cross' />
                </div>
            </section>
            <section className="rename-model-middle">
                <input type="text" placeholder='My Company' />
            </section>
            <section className="rename-model-button">
                <button onClick={closerenamemodel} >Save</button>
            </section>
        </div>
    </div>
  )
}

export default Renamemodel
