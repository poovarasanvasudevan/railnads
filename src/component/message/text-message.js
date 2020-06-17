import React, {memo} from 'react';

import Avatar from '@atlaskit/avatar';

import Comment, {
    CommentAction,
    CommentAuthor,
    CommentEdited,
    CommentTime,
} from '@atlaskit/comment';
import {ContextStore} from "../../core/context";

const TextMessage = memo((props) => {

    const {message} = props
    const {Parse} = React.useContext(ContextStore)
    const [subMessage, setSubMessage] = React.useState([]);
    React.useEffect(() => {
        message
            .relation('reply_message')
            .query()
            .find()
            .then((data) => setSubMessage(data))
    }, [props.message])

    return (
        <div className="flex w-full pl-6 pr-6 pt-2 hover:bg-gray-100 cursor-pointer">
            {/*// <SquareIcon*/}
            {/*//         image={"https://avatars1.githubusercontent.com/u/8036283?s=460&u=ee689cb0a682f804189800627edfa1a0adbc9bd9&v=4"}*/}
            {/*//         size={22}*/}
            {/*//         width={"40px"}*/}
            {/*//         height={"40px"}*/}
            {/*//         paddingclass={'padd'}*/}
            {/*//         bgcolorclass={'bg-red-500'}*/}
            {/*//     />*/}
            {/*//     <div className="pl-3">*/}
            {/*//         <div className="font-semibold"> Poovarasan Vasudevan <span className="font-normal text-xs text-gray-500">12:30 AM</span></div>*/}
            {/*//*/}
            {/*//         <div className="font-normal text-gray-800">*/}
            {/*//             🦎 Meet Messages, Google's official app for texting (SMS, MMS) and chat (RCS). Message anyone from anywhere with the reliability of texting and the richness of*/}
            {/*//         </div>*/}
            {/*//     </div>*/}


            <Comment
                avatar={
                    <Avatar
                        appearance={'square'}
                        src={message.get('from').get('avatar').url()}
                        size="medium"/>
                }

                author={
                    <CommentAuthor>{message.get('from').get("first_name") + ' ' + message.get('from').get("last_name")}</CommentAuthor>}
                edited={<CommentEdited>Edited</CommentEdited>}
                time={<CommentTime>{message.get("createdAt").toLocaleDateString("en-US", {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</CommentTime>}
                type={Parse.User.current().get("username") === message.get('from').get("username") ? "YOU" : null}
                content={
                    <p>
                        {message.get("text_message")}
                    </p>
                }
                actions={[
                    <CommentAction>Reply</CommentAction>,
                    <CommentAction>Like</CommentAction>,
                ]}
            >
                {subMessage.map((data) => (
                    <Comment
                        avatar={
                            <Avatar
                                appearance={'square'}
                                src={data.get('from').get('avatar').url()}
                                size="medium"/>
                        }

                        author={
                            <CommentAuthor>{data.get('from').get("first_name") + ' ' + data.get('from').get("last_name")}</CommentAuthor>}
                        edited={<CommentEdited>Edited</CommentEdited>}
                        time={<CommentTime>{data.get("createdAt").toLocaleDateString("en-US", {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</CommentTime>}
                        type={Parse.User.current().get("username") === data.get('from').get("username") ? "YOU" : null}
                        content={
                            <p>
                                {data.get("text_message")}
                            </p>
                        }
                    />
                ))}
            </Comment>
        </div>
    )
});

export default TextMessage
