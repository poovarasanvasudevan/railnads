import React, {Suspense} from 'react';
import Layout from "../../component/layout";
import {
    Routes,
    Route,
} from 'react-router-dom';

const Home = React.lazy(() => import ("../home"))
const AccountSettings = React.lazy(() => import ("../account-settings"))
const Notification = React.lazy(() => import ("../notification"))

export default function Dashboard(props) {


    React.useEffect(() => {

    }, [])


    return (
        <Layout>
            <Suspense fallback={<p>Loading...</p>}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/application-settings" element={<AccountSettings/>}/>
                    <Route path="/notification" element={<Notification/>}/>
                </Routes>
            </Suspense>
        </Layout>
    )
}
