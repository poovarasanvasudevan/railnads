import React, {Suspense, useContext} from 'react';
import {
    Routes,
} from "react-router-dom";
import {LoginRoute, PrivateRoute} from "./extension";
import {ContextStore} from "../core/context";


const Login = React.lazy(() => import('../pages/login'));
const Dashboard = React.lazy(() => import('../pages/dashboard'));
const AccountSettings = React.lazy(() => import('../pages/account-settings'));

export const routes = [
    {
        id:"home",
        type: PrivateRoute,
        path: "/home/*",
        component: Dashboard,
    },
    {
        id:"login",
        type: LoginRoute,
        path: "/",
        component: Login
    },
];

export function RouteWithSubRoutes(route) {
    return (
        <route.type
            path={route.path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes}/>
            )}
        />
    );
}

export default function AppRoutes(props) {
    const {Parse} = useContext(ContextStore);
    React.useEffect(() => {
        console.log(Parse)
    }, [])

    return (
        <Suspense fallback={<p>Loading</p>}>
            <Routes>
                {routes.map((route, i) => (
                   <route.type path={route.path} key={"route-" + route.id} child={ <route.component />} />
                ))}
            </Routes>
        </Suspense>
    )
}
