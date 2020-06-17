import React, {memo} from 'react'
import AppNavigation from "../nav";
import {LayoutManager, NavigationProvider} from "@atlaskit/navigation-next";

const Layout = memo((props) => {


    React.useEffect(() => {
        console.log("rendered")

        return () => {
            console.log("destroyed")
        }
    })

    return (

        <NavigationProvider>
            <LayoutManager
                globalNavigation={AppNavigation}
                showContextualNavigation={false}
                productNavigation={() => null}
            >
                <div data-webdriver-test-key="content" className="h-full">

                    {props.children}
                </div>
            </LayoutManager>
        </NavigationProvider>
    )
})

export default Layout;
