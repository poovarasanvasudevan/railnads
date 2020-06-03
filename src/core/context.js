import React, {createContext, useReducer} from 'react';
import Parse from 'parse';


Parse.initialize("myAppId", "jskey");
Parse.serverURL = 'http://localhost:1337/parse'

const Sidebar = {
    HELP: "help",
    USERS: "users",
};
const Action = {
    LOGIN: "login",
    LOGOUT: "logout",
    SIDEBAR: "sidebar"
};


const initialState = {
    Parse: Parse,
    sidebar: {
        open: false,
        context: Sidebar.HELP
    }
};

const ContextStore = createContext(initialState);


const StateProvider = (props) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case Action.LOGIN : {
                Parse.User.logIn(action.username, action.password)
                    .then((user) => action.callback(user, null))
                    .catch((error) => action.callback(null, error))
                return state
            }

            case Action.LOGOUT: {
                Parse.User.logout()
                    .then(() => action.callback())
                    .catch((error) => action.callback(error))

                return state
            }

            case Action.SIDEBAR : {
                return {
                    ...state,
                    sidebar: {
                        open: action.open,
                        context: action.context
                    }
                }

            }

            default:
                throw new Error();
        }
    }, initialState);


    return (
        <ContextStore.Provider value={{...state, dispatch: dispatch}}>
            {props.children}
        </ContextStore.Provider>
    );
};

export {ContextStore, StateProvider, Action}
