import React, {memo} from 'react';
import {randomFlatColors} from "../util";
import Avatar from "@atlaskit/avatar";


const SquareIcon = memo((props) => {
    const style = {
        backgroundColor: props.bgcolor || randomFlatColors(),
        width: props.width || 'auto',
        height: props.height || 'auto'
    }
    return (
        <div>
            {props.icon && (
                <div style={style} className={`rounded-md ${props.paddingclass || "p-1"}`}>
                    <props.icon size={props.size || 16} color={'white'}/>
                </div>
            )}

            {props.text && (
                <div style={style} className={`rounded-md ${props.paddingclass || "p-1"}`}>
                    <span className="text-white">{props.text}</span>
                </div>
            )}

            {props.image && (
                <Avatar appearance={"square"}
                        borderColor={"transparent"}
                        size={props.size || "small"}
                        src={props.image} alt={"image"}/>
            )}
        </div>
    )
})

export default SquareIcon
