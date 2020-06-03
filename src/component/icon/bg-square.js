import React from 'react';
import {randomFlatColors} from "../util";




export default function SquareIcon(props) {
    const style= {
        backgroundColor: props.bgcolor || randomFlatColors()
    }
    return (
        <div style={style}
             className={`rounded-md ${props.paddingclass || "p-1"}`}>

            <props.icon size={props.size || 16} color={'white'}/>

        </div>
    )
}
