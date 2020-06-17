import React, {memo} from 'react';
import {randomFlatColors} from "../util";


const SquareIcon = memo((props) => {
    const style = {
        backgroundColor: props.bgcolor || randomFlatColors(),
        width: props.width || 'auto',
        height: props.height || 'auto'
    }
    return (
        <div style={style}
             className={`rounded-md ${props.paddingclass || "p-1"}`}>
            { props.icon && <props.icon size={props.size || 16} color={'white'}/> }
            { props.text && <span className="text-white">{props.text}</span>}
            { props.image && <img src={props.image}  alt={"image"}/>}
        </div>
    )
})

export default SquareIcon
