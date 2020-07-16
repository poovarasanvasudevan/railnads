import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import AppRoutes from "./routes";
import {StateProvider} from "./core/context";
import Helmet from 'react-helmet';
import 'semantic-ui-css/semantic.min.css'

function App() {
    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="//static.parastorage.com/unpkg/@wix/wix-fonts@1.9.3/madefor.min.css"/>
            </Helmet>


            <StateProvider>
                <Router>
                    <AppRoutes/>
                </Router>
            </StateProvider>
        </>
    );
}

export default App;
