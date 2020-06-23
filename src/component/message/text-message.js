import React, {memo, Suspense} from 'react';

import Avatar from '@atlaskit/avatar';

import Comment, {
    CommentAction,
    CommentAuthor,
    CommentEdited,
    CommentTime,
} from '@atlaskit/comment';
import {ContextStore} from "../../core/context";
import CollapseText from "../collapse-text";
import {CollapseProps} from "../../core/props";
import Skeleton from "react-loading-skeleton";

const CommentEditor = React.lazy(() => import("../editor"))
const propCompare = (prevProps, nextProps) => prevProps.message.id === nextProps.message.id

const TextMessage = ({message}) => {

    const {Parse} = React.useContext(ContextStore)
    const [subMessage, setSubMessage] = React.useState([]);
    const [isReplyMessage, setReplyMessage] = React.useState(false);
    const [actionButton, setActionButton] = React.useState([]);

    const replyMessage = () => {
        console.log(isReplyMessage)
        setReplyMessage(!isReplyMessage)
    }

    React.useEffect(() => {
        message
            .relation('reply_message')
            .query()
            .find()
            .then((data) => setSubMessage(data))

        if (message.get("from").id === Parse.User.current().id) {
            setActionButton([
                <CommentAction onClick={replyMessage}>Reply </CommentAction>,
                <CommentAction>Pin </CommentAction>,
                <CommentAction>Like</CommentAction>
            ])
        } else {
            setActionButton([
                <CommentAction onClick={replyMessage}>Reply </CommentAction>,
                <CommentAction>Pin </CommentAction>,
                <CommentAction>Like</CommentAction>
            ])
        }

    }, [message])


    return (
        <div
            className={`flex flex-col w-full pl-6 pr-6 pt-2 ${!isReplyMessage ? "hover:bg-gray-100 cursor-pointer" : ""}`}>

            <div className={"flex-1"}>
                <Comment
                    avatar={
                        <Avatar
                            appearance={'square'}
                            src={message.get('from').get('avatar').url()}
                            size="medium"/>
                    }

                    author={
                        <CommentAuthor>{message.get('from').get("first_name") + ' ' + message.get('from').get("last_name")}</CommentAuthor>
                    }
                    edited={message.get("is_edited") ? <CommentEdited>Edited</CommentEdited> : null}
                    time={
                        <CommentTime>
                            {message.get("createdAt").toLocaleDateString("en-US", {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </CommentTime>
                    }
                    type={Parse.User.current().get("username") === message.get('from').get("username") ? "YOU" : null}
                    content={

                        <CollapseText {...CollapseProps}>
                            <p>
                                {message.get("text_message")}
                            </p>
                        </CollapseText>
                    }
                    actions={[
                        <CommentAction onClick={replyMessage}>Reply </CommentAction>,
                        <CommentAction>Pin </CommentAction>,
                        <CommentAction>Like</CommentAction>
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
                            edited={message.get("is_edited") ? <CommentEdited>Edited</CommentEdited> : null}
                            time={
                                <CommentTime>{data.get("createdAt").toLocaleDateString("en-US", {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</CommentTime>
                            }
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
            {isReplyMessage && (

                <Suspense fallback={<Skeleton/>}>
                    <div className="ml-10">
                        <CommentEditor
                            placeholder={"Reply To : " + message.get('from').get("first_name") + ' ' + message.get('from').get("last_name")}/>
                    </div>
                </Suspense>
            )}
        </div>
    )
};

export default memo(TextMessage, propCompare)
