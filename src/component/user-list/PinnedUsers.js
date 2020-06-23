import React from 'react';
import SidebarUserList from "./SidebarUserList";
import {Action, ContextStore} from "../../core/context";
import {avatarGenerate} from "../../core/props";

const PinnedUsers = (props) => {
    const [users, setUsers] = React.useState([])
    const {Parse, selectedUser, dispatch} = React.useContext(ContextStore)

    React.useEffect(() => {
        const uQuery = new Parse.Query(Parse.User);
        uQuery.notEqualTo("username", Parse.User.current().get("username"))
        uQuery.limit(30)
        uQuery.find()
            .then((data) => setUsers(data))
            .catch((e) => console.log(e))
    }, [])

    const onClick = (user) => {
        if (selectedUser && selectedUser.data.id === user.id) {
            console.log("old user selected")
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
            })
        }
    }

    return (
        <>
            {users && users.map((data) => (
                <div
                    className={`${(selectedUser && selectedUser.data.id === data.id) ? "bg-hovercolor" : ""} hover:bg-gray-100 cursor-pointer`}
                    onClick={() => onClick(data)}>
                    <SidebarUserList key={data.id}
                                     id={data.id}
                                     avatar={data.get("avatar") ? data.get("avatar").url() : avatarGenerate(data.get("email"))}
                                     label={data.get("first_name") + " " + data.get("last_name")}/>
                </div>
            ))}
        </>
    )
}

export default React.memo(PinnedUsers)
