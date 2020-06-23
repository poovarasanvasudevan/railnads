import React, {useCallback, memo} from 'react'
import {GlobalItem, GlobalNav, modeGenerator, ThemeProvider} from "@atlaskit/navigation-next";
import {FiHome, FiSearch, FiSettings, FiHelpCircle, FiGrid, FiUserPlus, FiBell} from 'react-icons/fi'
import Avatar from "@atlaskit/avatar";
import {colors} from '@atlaskit/theme';
import {DropdownItemGroup, DropdownItem, DropdownMenuStateless} from "@atlaskit/dropdown-menu";
import {Link, useNavigate} from "react-router-dom";
import {Action, ContextStore} from "../../core/context";
import Drawer from '@atlaskit/drawer';
import TextField from '@atlaskit/textfield';
import {PersonResult, ResultItemGroup} from '@atlaskit/quick-search';

const customMode = modeGenerator({
    product: {
        text: colors.N0,
        background: '#00548B',
    },
});


const GlobalItemWithDropdown = memo(({items, trigger: Trigger}) => {
    const [isOpen, setOpen] = React.useState(false)
    const handleOpenChange = ({isOpen}) => setOpen(isOpen)
    return (
        <DropdownMenuStateless
            boundariesElement="window"
            isOpen={isOpen}
            onOpenChange={handleOpenChange}
            position="right bottom"
            trigger={<Trigger isOpen={isOpen}/>}
        >
            {items}
        </DropdownMenuStateless>
    )
})

const StatusBaloon = (props) => (
    <div style={{height: 10, width: 10, borderRadius: 5, background: props.color}}>

    </div>
)


const ItemComponent = memo(({dropdownItems: DropdownItems, ...itemProps}) => {
    if (DropdownItems) {
        return (
            <GlobalItemWithDropdown
                trigger={({isOpen}) => (
                    <GlobalItem isSelected={isOpen} {...itemProps} />
                )}
                items={<DropdownItems/>}
            />
        );
    }
    return <GlobalItem {...itemProps} />;
});

const AppNavigation = memo((props) => {
    const {Parse, sidebar, dispatch} = React.useContext(ContextStore)
    const currentUser = Parse.User.current()
    const [logo, setLogo] = React.useState('')
    const navigate = useNavigate()


    React.useEffect(() => {
        Parse.Config.get()
            .then((config) => {
                setLogo(config.get("logo").url())
            })
    }, [])

    const logout = useCallback((e) => {
        dispatch({
            type: Action.LOGOUT,
            callback: (err) => {
                if (err == null) {
                    navigate("/")
                }
            }
        })
    }, [])

    const closeSwitcherDrawer = useCallback(() => {
        dispatch({type: Action.SIDEBAR, open: false})
    }, [])

    const defaultProps = {
        resultId: 'result_id',
    };

    return (
        <>
            <ThemeProvider
                theme={theme => ({...theme, mode: customMode, context: 'product'})}
            >
                <GlobalNav
                    style={{height: "100vh"}}
                    itemComponent={ItemComponent}
                    primaryItems={[
                        {
                            icon: () => <img src={logo} alt={"logo"}/>,
                            id: 'logo',
                            tooltip: 'Collab',
                            onClick: () => navigate("/"),
                        },
                        {
                            icon: FiHome,
                            id: 'star',
                            tooltip: 'Home',
                            onClick: () => navigate("/home"),
                        },
                        {
                            icon: FiSearch,
                            id: 'search',
                            tooltip: 'Search',
                            onClick: () => dispatch({type: Action.SIDEBAR, open: true, context: "SEARCH"}),
                        },
                        {
                            icon: FiUserPlus,
                            id: 'create',
                            tooltip: 'Create',
                            onClick: () => dispatch({type: Action.SIDEBAR, open: true, context: "USERS"}),
                        },
                        {
                            icon: FiGrid,
                            id: 'Apps',
                            tooltip: 'Apps',
                            onClick: () => console.log('Create item clicked'),
                        },
                        {
                            icon: FiBell,
                            id: 'Notification',
                            tooltip: 'Notification',
                            onClick: () => navigate("/home/notification"),
                        },
                    ]}
                    secondaryItems={[
                        {
                            icon: FiSettings,
                            id: 'settings',
                            onClick: () => console.log('Help item clicked'),
                            tooltip: 'Settings',
                        },
                        {
                            icon: FiHelpCircle,
                            id: 'help',
                            onClick: () => dispatch({type: Action.SIDEBAR, open: true, context: "HELP"}),
                            tooltip: 'Help',
                        },
                        {
                            dropdownItems: () => {
                                return (
                                    <DropdownItemGroup>
                                        <DropdownItem>
                                            <Link to={"/home/application-settings"}> Application Settings</Link>
                                        </DropdownItem>
                                        <DropdownItem>Profile Settings</DropdownItem>
                                        <DropdownItem onClick={logout}>Logout</DropdownItem>
                                    </DropdownItemGroup>
                                )
                            },
                            icon: () => <Avatar
                                name={currentUser ? currentUser.get('first_name') + ' ' + currentUser.get('last_name') : 'User'}
                                size="small"
                                borderColor={'transparent'}
                                src={currentUser ? currentUser.get('avatar').url() : null}
                                presence="online"/>,
                            id: 'accounts',
                            tooltip: 'Accounts',
                        },
                    ]}
                />
            </ThemeProvider>
            <Drawer
                onClose={closeSwitcherDrawer}
                width={'medium'}
                isOpen={sidebar.open}>

                {sidebar.context === "HELP" && (
                    <div>
                        <h1>Help</h1>
                        <div className="flex flex-row pr-10">
                            <TextField placeholder={'Search for help...'}/>
                        </div>
                    </div>
                )}

                {sidebar.context === "USERS" && (
                    <div>
                        <div className="flex flex-col pr-10">
                            <TextField placeholder={'Search ...'}/>
                            <div className="mx-2">
                                <ResultItemGroup title="Recent">
                                    <PersonResult
                                        {...defaultProps}
                                        key="4"

                                        name="David Soundararaj"
                                        presenceState="online"
                                    />
                                </ResultItemGroup>
                            </div>
                        </div>
                    </div>
                )}


                {sidebar.context === "SEARCH" && (
                    <div>
                        <div className="flex flex-row pr-10">
                            <TextField placeholder={'Search ...'}/>
                        </div>
                    </div>
                )}

            </Drawer>
        </>
    )
})

export default AppNavigation
