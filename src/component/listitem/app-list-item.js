import React from 'react';
import SquareIcon from "../icon/bg-square";

const AppListItem = ({id, label, icon}) => {

    return (
        <div key={id}
             className="px-4 py-2  flex flex-row items-center hover:bg-hovercolor cursor-pointer">
            <SquareIcon icon={icon} className=""/>
            <h2 className="ml-3 hover:text-gray-900 font-medium mt-0"
                style={{fontSize: '14px'}}> {label}</h2>
        </div>
    );
};

const isEqual = (prev, next) => prev.id === next.id;

export default React.memo(AppListItem, isEqual);
