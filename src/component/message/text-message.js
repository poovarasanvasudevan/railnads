import React, {memo, Suspense, useCallback} from 'react';

import Avatar from '@atlaskit/avatar';

import Comment, {
    CommentAction,
    CommentAuthor,
    CommentEdited,
    CommentTime,
} from '@atlaskit/comment';
import {ContextStore} from "../../core/context";
import Skeleton from "react-loading-skeleton";
import EditorRender from "../render-doc";
import styled from "styled-components";

//const EditorRender = React.lazy(() => import("../render-doc"));


const propCompare = (prevProps, nextProps) => prevProps.messageId === nextProps.messageId;

const TextMessage = ({avatar, firstName, lastName, isEdited, createdAt, userName, message, messageId, userId, pinned}) => {

    const {Parse} = React.useContext(ContextStore);
    const [isPinned, setPinned] = React.useState(pinned && pinned.includes(Parse.User.current().id));


    const pinMessage = useCallback(() => {
        const ChatMessages = Parse.Object.extend("ChatMessages");
        const query = new Parse.Query(ChatMessages);
        query.get(messageId)
            .then((obj) => {
                if (!isPinned) {
                    const oldPinned = obj.get("pinned") == null ? [] : obj.get("pinned");
                    oldPinned.push(Parse.User.current().id);
                    obj.set('pinned', oldPinned);
                    obj.save().then((obj) => setPinned(true));
                } else {
                    const oldPinned = obj.get("pinned") == null ? [] : obj.get("pinned");
                    var index = oldPinned.indexOf(Parse.User.current().id);
                    if (index !== -1) {
                        obj.set('pinned', oldPinned.splice(index, 1));
                        obj.save().then((obj) => {
                            setPinned(false);
                            alert("unpinned");
                        });
                    }
                }
            });
    });

    return (
        <div className={`flex flex-col w-full px-6 py-2 hover:bg-gray-100 cursor-pointer`}>

            <div className={"flex-1"}>
                <Comment
                    avatar={
                        <Avatar
                            appearance={'square'}
                            src={avatar}
                            size="medium"/>
                    }

                    author={
                        <CommentAuthor>

                            <span>{firstName + ' ' + lastName}</span>

                        </CommentAuthor>
                    }
                    edited={isEdited ? <CommentEdited>Edited</CommentEdited> : null}
                    time={
                        <CommentTime>
                            {createdAt.toLocaleDateString("en-US", {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </CommentTime>
                    }
                    type={Parse.User.current().get("username") === userName ? "YOU" : null}
                    content={
                        <Suspense fallback={<Skeleton count={2}/>}>


                            <EditorRender doc={message}/>

                            {/*<p>*/}

                            {/*    {message.get("text_message")}*/}
                            {/*</p>*/}
                        </Suspense>
                    }
                    actions={[
                        <CommentAction onClick={pinMessage}>
                            {(isPinned) ? "Unpin" : "Pin"}
                        </CommentAction>,
                        <CommentAction>Like</CommentAction>,
                        <CommentAction>Forward</CommentAction>
                    ]}
                />
            </div>
        </div>
    );
};

export default memo(TextMessage, propCompare);
