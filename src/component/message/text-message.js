import React, {memo, Suspense} from 'react';

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
//const EditorRender = React.lazy(() => import("../render-doc"))


const propCompare = (prevProps, nextProps) => prevProps.messageId === nextProps.messageId

const TextMessage = ({avatar, firstName, lastName, isEdited, createdAt, userName, message, messageId}) => {

    const {Parse} = React.useContext(ContextStore)

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
                        <CommentAuthor>{firstName + ' ' + lastName}</CommentAuthor>
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
                        <CommentAction>Pin </CommentAction>,
                        <CommentAction>Like</CommentAction>,
                        <CommentAction>Forward</CommentAction>
                    ]}
                />
            </div>
        </div>
    )
};

export default memo(TextMessage, propCompare)
