import React from 'react';
import SquareIcon from "../icon/bg-square";

const SidebarUserList = ({id,label,avatar}) => {

    return (
        <div key={id}
             className=" px-2 py-1 mx-2 rounded-md flex flex-row content-center items-center">
            <SquareIcon image={avatar} className=""/>
            <h2 className="ml-3 hover:text-gray-900 font-medium text-gray-600"
                style={{fontSize: '14px'}}> {label}</h2>
        </div>
    )
}

const isEqual = (prev, next) => prev.id === next.id

export default React.memo(SidebarUserList, isEqual)
