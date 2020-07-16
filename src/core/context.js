import React, {createContext, useReducer} from 'react';
import Parse from 'parse';
import {createPointerWithObjectId} from "../component/util";
import {IntlProvider} from "react-intl";


Parse.initialize("myAppId", "jskey");
Parse.serverURL = 'http://localhost:1337/parse';

const Sidebar = {
    HELP: "help",
    USERS: "users",
};
const Action = {
    LOGIN: "login",
    LOGOUT: "logout",
    SIDEBAR: "sidebar",
    SELECT_USER: "selectUser",
    SEND_MESSAGE: "send-message",
    SET_MESSAGES: "set-message",
    SET_USERS: "setusers"
};


const initialState = {
    Parse: Parse,
    sidebar: {
        open: false,
        context: Sidebar.HELP
    },
    selectedUser: undefined,
    messages: [],
    users: []
};

const ContextStore = createContext(initialState);


const StateProvider = React.memo((props) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case Action.LOGIN : {
                Parse.User.logIn(action.username, action.password)
                    .then((user) => action.callback(user, null))
                    .catch((error) => action.callback(null, error));
                return state;
            }

            case Action.SELECT_USER : {

                const currentUser = Parse.User.current();
                const currentUserSetting = currentUser.get("settings");
                currentUser.set("settings", {...currentUserSetting, lastUser: action.user.id});
                currentUser.save()
                    .then((data) => console.log("Saved"))
                    .catch((e) => console.log(e));

                return {
                    ...state,
                    selectedUser: action.user
                };
            }

            case Action.LOGOUT: {
                Parse.User.logOut()
                    .then(() => action.callback())
                    .catch((error) => action.callback(error));

                return state;
            }
            case Action.SET_MESSAGES: {
                return {...state, messages: action.payload};
            }

            case Action.SET_USERS: {
                return {...state, users: action.payload};
            }

            case Action.SIDEBAR : {
                return {
                    ...state,
                    sidebar: {
                        open: action.open,
                        context: action.context
                    }
                };

            }

            case Action.FETCH_MESSAGES : {

                return state;
            }

            case Action.SEND_MESSAGE: {
                // const ChatMessage = Parse.Object.extend("ChatMessages");
                // const sendMessage = new ChatMessage()
                // sendMessage.set("text_message", action.payload.docs)
                // sendMessage.set("to", createPointerWithObjectId("_User", state.selectedUser.data.id))
                // sendMessage.set("from", Parse.User.current())
                //
                // console.log("Message Saved")
                // sendMessage.save()
                //     .then((data) => console.log(data))
                //     .catch((e) => console.log(e))
                return state;
            }


            default:
                throw new Error();
        }
    }, initialState);


    return (
        <IntlProvider locale='en'>
            <ContextStore.Provider value={{...state, dispatch: dispatch}}>
                {props.children}
            </ContextStore.Provider>
        </IntlProvider>
    );
});

export {ContextStore, StateProvider, Action, Parse};
