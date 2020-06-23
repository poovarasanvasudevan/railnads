import React from "react";
import SidebarUserList from "../user-list/SidebarUserList";
import {ContextStore} from "../../core/context";

const MyGroups = (props) => {

    const [groups, setGroups] = React.useState([]);
    const {Parse} = React.useContext(ContextStore)
    React.useEffect(() => {
        const UserGroups = Parse.Object.extend("UserGroups");
        const myGroups = new Parse.Query(UserGroups);
        myGroups.include("group")

        myGroups.find()
            .then((data) => setGroups(data))
            .catch((e) => console.log(e))

    }, [])


    return (
        <>
            {groups && groups.map((data) => (
                <div
                    className={`hover:bg-gray-100 cursor-pointer`}>
                    <SidebarUserList key={data.get("group").id}
                                     id={data.get("group").id}
                                     avatar={data.get("group").get("avatar").url()}
                                     label={data.get("group").get("title")}/>
                </div>
            ))}
        </>
    )
}

export default React.memo(MyGroups)
