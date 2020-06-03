import React, {useContext} from 'react';
import {
    Route,
    Redirect
} from "react-router-dom";

import {ContextStore} from "../core/context";

export function LoginRoute({children, ...rest}) {

    const {Parse} = useContext(ContextStore)

    return (
        <Route
            {...rest}
            render={({location}) =>
                Parse.User.current() ? (
                    <Redirect
                        to={{
                            pathname: "/dashboard",
                            state: {from: location}
                        }}
                    />
                ) : (children)
            }
        />
    );
}

export function PrivateRoute({children, ...rest}) {

    const {Parse} = useContext(ContextStore)

    return (
        <Route
            {...rest}
            render={({location}) =>
                Parse.User.current() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: {from: location}
                        }}
                    />
                )

            }
        />
    );
}
