import React from 'react'

const CraeteModel = ({img,text,btnText}) => {
  return (
    <div>
            <div>
            <img src={img} alt="" />
            </div>
                <div>
                    <p>{text}</p>
                </div>
                <div>
            <button>{btnText}</button>
                </div>
        </div>
  )
}

export default CraeteModel