import React, {useContext} from 'react';
import {
    Route,
    Navigate
} from "react-router-dom";

import {ContextStore} from "../core/context";

export function LoginRoute({path, child}) {

    const {Parse} = useContext(ContextStore)

    return (
        Parse.User.current() ? <Navigate to={"/home"}/> : <Route path={path} element={child}/>
    );
}

export function PrivateRoute({path, child}) {

    const {Parse} = useContext(ContextStore)

    return (
        Parse.User.current() ? <Route path={path} element={child}/> : <Navigate to={"/"}/>
    );
}
