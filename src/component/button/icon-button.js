import React, {memo} from 'react';

const IconButton = memo((props) => {

    return (
        <button className="px-1 py-1 rounded-md mx-2
                hover:bg-hovercolor
                 ">
            {props.children}
        </button>
    )
})


export default IconButton;
