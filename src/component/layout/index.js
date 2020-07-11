import React, {memo} from 'react';
import AppNavigation from "../nav";
import {LayoutManager, NavigationProvider} from "@atlaskit/navigation-next";
import {RiWifiLine as NIcon} from "react-icons/ri";

const CommunicationComponent = React.lazy(() => import("../communication"));

const Layout = memo((props) => {

    const [isOnline, setOnline] = React.useState(navigator.onLine);
    React.useEffect(() => {

        window.addEventListener("online", () => setOnline(navigator.onLine));
        window.addEventListener("offline", () => setOnline(navigator.onLine));
    }, []);

    return (

        <NavigationProvider>
            <LayoutManager
                globalNavigation={AppNavigation}
                showContextualNavigation={false}
                productNavigation={() => null}
            >
                <div data-webdriver-test-key="content" className="h-full">

                    {props.children}


                    <React.Suspense fallback={<span></span>}>
                        <CommunicationComponent/>
                    </React.Suspense>

                    <div
                        className="absolute right-0 bottom-0 p-2 m-2 rounded-md cursor-pointer hover:bg-hovercolor shadow">
                        <NIcon color={isOnline ? "green" : "red"}/>
                    </div>

                </div>
            </LayoutManager>
        </NavigationProvider>
    );
});

export default Layout;
