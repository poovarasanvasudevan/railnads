import React from 'react';


const BtnColors = ({ children , bgClass , onClick})=> {
    return (
        <div onClick={onClick} className={bgClass + " p-2 rounded-md ml-1 mr-1 hover:bg-hovercolor cursor-pointer"}>
            {children}
        </div>
    )
}
export default React.memo(BtnColors)