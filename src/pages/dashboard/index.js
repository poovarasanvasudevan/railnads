import React from 'react';
import Layout from "../../component/layout";
import {
    Routes,
    Route,
} from 'react-router-dom';
import Home from "../home";
import AccountSettings from "../account-settings";


export default function Dashboard(props) {


    React.useEffect(() => {

    }, [])


    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/application-settings" element={<AccountSettings/>}/>
            </Routes>

        </Layout>
    )
}
