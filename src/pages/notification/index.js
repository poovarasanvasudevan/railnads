import React, {memo} from 'react';


const Notification = memo((props) => {

    return (
        <div className="p-2">
            <div className="p-4">
                <h2 className="text-3xl text-gray-800 font-semibold">Notification</h2>
            </div>
        </div>
    )
})
export default Notification
