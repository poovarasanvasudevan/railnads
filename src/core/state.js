import React from 'react'
import {createOvermind} from "overmind";
import {createHook, Provider} from "overmind-react";
import Parse from 'parse';


Parse.initialize("myAppId", "jskey");
Parse.serverURL = 'http://localhost:1337/parse'

const app = createOvermind({
    state: {
        isLoggedIn: false,
    },
    actions: {
        login: ({state}, loginData) => {
            console.log(loginData)
        },
        currentUser() {
            return Parse.User.current()
        },
        parse() {
            return Parse;
        }
    }
})


export const useAppState = createHook()
export default function AppStateProvider(props) {

    return (
        <Provider value={app}>
            {props.children}
        </Provider>
    )
}
