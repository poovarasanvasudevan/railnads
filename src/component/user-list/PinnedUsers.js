import React, {useCallback} from 'react';
import SidebarUserList from "./SidebarUserList";
import {Action, ContextStore} from "../../core/context";
import {avatarGenerate} from "../../core/props";
import {FixedSizeList as List} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

const PinnedUsers = (props) => {
    const {Parse, selectedUser, dispatch, users} = React.useContext(ContextStore);

    React.useEffect(() => {
        const uQuery = new Parse.Query(Parse.User);
        uQuery.notEqualTo("username", Parse.User.current().get("username"));
        //  uQuery.limit(30)
        uQuery.find()
            .then((data) => dispatch({type: Action.SET_USERS, payload: data}))
            .catch((e) => console.log(e));
    }, []);

    const onClick = useCallback((user) => {
        if (selectedUser && selectedUser.data.id === user.id) {
            console.log("old user selected");
        } else {
            dispatch({
                type: Action.SELECT_USER,
                user: {
                    type: "USER", data: {
                        id: user.id,
                        title: user.get("first_name") + " " + user.get("last_name"),
                        avatar: user.get("avatar") ? user.get("avatar").url() : avatarGenerate(user.get("email")),
                        username: user.get("username"),
                        email: user.get("email")
                    }
                }
            });
        }
    });


    const Row = ({index, style}) => (


            <div
                style={style}
                className={`${(selectedUser && selectedUser.data.id === users[index].id) ? "bg-hovercolor" : ""} hover:bg-hovercolor cursor-pointer`}
                onClick={() => onClick(users[index])}>
                <SidebarUserList key={users[index].id}
                                 id={users[index].id}
                                 avatar={(users[index] && users[index].get("avatar")) ? users[index].get("avatar").url() : avatarGenerate(users[index].get("username"))}
                                 label={users[index].get("first_name") + " " + users[index].get("last_name")}/>
            </div>
    );

    return (
        <AutoSizer>
            {({height, width}) => (
                <List
                    className={"scroll"}
                    height={height}
                    itemCount={users.length}
                    width={width}
                    itemSize={36}
                >
                    {Row}
                </List>
            )}

        </AutoSizer>
    );
};

export default React.memo(PinnedUsers);
