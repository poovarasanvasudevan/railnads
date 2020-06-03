import React from 'react';

export default function IconButton(props) {

    return (
        <button className="px-1 py-1 rounded-md mx-2
                hover:bg-hovercolor
                 ">
            {props.children}
        </button>
    )
}
