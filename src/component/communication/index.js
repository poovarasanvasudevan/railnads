import React from 'react';
import Avatar from "@atlaskit/avatar";
import {ContextStore} from "../../core/context";

const CommunicationComponent = (props) => {

    const {Parse} = React.useContext(ContextStore);

    return (
        <div className="flex absolute right-0 top-0 rounded-sm shadow m-2 px-3 py-2 bg-white hidden">

            <Avatar size={"large"}
                    appearance={"square"}
                    src={(Parse.User.current() && Parse.User.current().get('avatar')) ? Parse.User.current().get("avatar").url() : null}/>

            <div className="flex-1 pl-3">
                <span className="font-semibold text-md">Poovarasan Vasudevan</span>
                <br/>
                <span className="text-sm text-gray-700">Calling...</span>
            </div>
        </div>
    );
};

export default React.memo(CommunicationComponent);