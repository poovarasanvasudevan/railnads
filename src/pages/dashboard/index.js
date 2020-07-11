import React, {Suspense} from 'react';
import Layout from "../../component/layout";
import {
    Routes,
    Route,
} from 'react-router-dom';
import {SocketProvider} from "../../core/socketContext";
import { RiWifiLine as NIcon } from 'react-icons/ri'

const Home = React.lazy(() => import ("../home"))
const AccountSettings = React.lazy(() => import ("../account-settings"))
const ProfileSettings = React.lazy(() => import ("../profile-settings"))
const Notification = React.lazy(() => import ("../notification"))

export default function Dashboard(props) {


    React.useEffect(() => {

    }, [])


    return (
        <Layout>
            <SocketProvider>
                <Suspense fallback={<p>Loading...</p>}>
                    <Routes>
                        <Route key={"HomeRoute"} path="/" element={<Home/>}/>
                        <Route key={"ApplicationSettingRoute"}
                               path="/application-settings"
                               element={<AccountSettings/>}/>
                        <Route key={"NotificationRoute"} path="/notification" element={<Notification/>}/>
                        <Route key={"ProfileSettingRoute"} path="/profile-settings" element={<ProfileSettings/>}/>
                    </Routes>
                </Suspense>
            </SocketProvider>

        </Layout>
    )
}
