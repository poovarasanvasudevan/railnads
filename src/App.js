import React from 'react';
import './App.css'
import {
    BrowserRouter as Router,
} from "react-router-dom";
import AppRoutes from "./routes";
import {StateProvider} from "./core/context";

function App() {
    return (
        <StateProvider>
            <Router>
                <AppRoutes/>
            </Router>
        </StateProvider>
    );
}

export default App;
