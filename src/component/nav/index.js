import React, {useCallback} from 'react'
import {GlobalItem, GlobalNav, modeGenerator, ThemeProvider} from "@atlaskit/navigation-next";
import {FaStar} from 'react-icons/fa'
import {FiHome, FiSearch, FiSettings, FiHelpCircle, FiGrid, FiUserPlus, FiBell} from 'react-icons/fi'
import Avatar from "@atlaskit/avatar";
import {colors} from '@atlaskit/theme';
import {DropdownItemGroup, DropdownItem, DropdownMenuStateless} from "@atlaskit/dropdown-menu";
import {Link, useHistory} from "react-router-dom";
import {Action, ContextStore} from "../../core/context";
import Drawer from '@atlaskit/drawer';
import TextField from '@atlaskit/textfield';

const customMode = modeGenerator({
    product: {
        text: colors.N0,
        background: '#00548B',
    },
});

class GlobalItemWithDropdown extends React.Component {
    state = {
        isOpen: false,
    };

    handleOpenChange = ({isOpen}) => this.setState({isOpen});

    render() {
        const {items, trigger: Trigger} = this.props;
        const {isOpen} = this.state;
        return (
            <DropdownMenuStateless
                boundariesElement="window"
                isOpen={isOpen}
                onOpenChange={this.handleOpenChange}
                position="right bottom"
                trigger={<Trigger isOpen={isOpen}/>}
            >
                {items}
            </DropdownMenuStateless>
        );
    }
}

const StatusBaloon = (props) => (
    <div style={{height: 10, width: 10, borderRadius: 5, background: props.color}}>

    </div>
)


const ItemComponent = ({dropdownItems: DropdownItems, ...itemProps}) => {
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
};

export default function AppNavigation(props) {
    const {Parse,sidebar, dispatch,config} = React.useContext(ContextStore)
    const currentUser = Parse.User.current()
    const [logo,setLogo] = React.useState('')

    React.useEffect(()=>{
        Parse.Config.get()
            .then((config) => {
                setLogo(config.get("logo").url())
            })
    },[])

    const logout = (e) => {
        console.log(e)
        dispatch({
            type: Action.LOGOUT,
            callback: (err) => {
                if (err == null) {
                    window.location.href = "/"
                }
            }
        })
    }

    const closeSwitcherDrawer = useCallback(() => {
        dispatch({type: Action.SIDEBAR, open: false})
    },[])

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
                            icon: () => <img src={logo} alt={"logo"} />,
                            id: 'logo',
                            tooltip: 'Atlassian',
                            href: "/dashboard"
                        },
                        {
                            icon: FiHome,
                            id: 'star',
                            tooltip: 'Starred and recent',
                            onClick: () => console.log('Search item clicked'),
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
                            onClick: () => console.log('Create item clicked'),
                        },
                    ]}
                    secondaryItems={[
                        {
                            icon: FiSettings,
                            id: 'settings',
                            onClick: () => console.log('Help item clicked'),
                            tooltip: 'Help',
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
                                            <Link to={"/application-settings"}> Application Settings</Link>
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
                            <TextField placeholder={'Search for help...'} />
                        </div>
                    </div>
                )}

                {sidebar.context === "USERS" && (
                    <h1>Users</h1>
                )}


                {sidebar.context === "SEARCH" && (
                    <div>
                        <div className="flex flex-row pr-10">
                            <TextField placeholder={'Search ...'} />
                        </div>
                    </div>
                )}

            </Drawer>
        </>
    )
}
