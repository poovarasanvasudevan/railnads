import React from 'react';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

import Parse from 'parse';


Parse.initialize("myAppId", "jskey");
Parse.serverURL = 'http://localhost:1337/parse'


export const currentUser = atom({
    key: 'currentUser', // unique ID (with respect to other atoms/selectors)
    default: Parse.User.current(), // default value (aka initial value)
});


export const parseObj = atom({
    key: 'parseObj', // unique ID (with respect to other atoms/selectors)
    default: Parse, // default value (aka initial value)
});
export default function CoilState(props) {

    return (
        <RecoilRoot>
            {props.children}
        </RecoilRoot>
    );
}
