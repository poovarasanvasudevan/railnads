import React from 'react';


const ApplicationCard = ({icon, label}) => {

    return (
        <div style={{width: 100, height: 100}} className="border border-hovercolor flex flex-col items-center rounded cursor-pointer hover:bg-hovercolor">
            <div className="flex-1 flex items-center justify-center">{icon}</div>
            <span className="px-2 py-1 font-semibold">{label}</span>
        </div>
    );
};

export default React.memo(ApplicationCard);