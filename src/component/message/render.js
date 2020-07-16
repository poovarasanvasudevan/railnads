import React from 'react';
import {createPointerWithObjectId} from "../util";
import {Action, ContextStore} from "../../core/context";
import {TextMessage} from "./index";
import {FiArrowDown as ScrollToBottomIcon} from 'react-icons/fi';

const UserMessage = ({id}) => {
    const {Parse, messages, dispatch} = React.useContext(ContextStore);
    var subscription = undefined;
    const messagesEndRef = React.createRef();
    const scrollToBottom = () => {
        //messagesEndRef.current.scrollIntoView({behavior: 'smooth'})
    };
    React.useEffect(() => {
        if (id) {

            const fetchMessage = async () => {

                const ChatMessages = Parse.Object.extend("ChatMessages");
                const otherUser = createPointerWithObjectId("_User", id);

                const fromUser = new Parse.Query(ChatMessages);
                fromUser.equalTo("from", Parse.User.current());
                fromUser.equalTo("to", otherUser);

                const toUser = new Parse.Query(ChatMessages);
                toUser.equalTo("to", Parse.User.current());
                toUser.equalTo("from", otherUser);


                const query = Parse.Query.or(fromUser, toUser);
                query.equalTo('is_sub_message', false);
                query.include("from");
                query.include("to");
                query.include("reply_message");
                query.limit(30);
                query.descending('createdAt');

                var data = await query.find();
                const reData = data.map(iData => ({
                    message: iData.get("text_message"),
                    pinned: iData.get("pinned"),
                    userName: iData.get('from').get("username"),
                    createdAt: iData.get("createdAt"),
                    userId: iData.get('from').id,
                    isEdited: iData.get("is_edited"),
                    firstName: iData.get('from').get("first_name"),
                    lastName: iData.get('from').get("last_name"),
                    avatar: iData.get('from').get('avatar') ? iData.get('from').get('avatar').url() : null,
                    messageId: iData.id
                }));
                dispatch({type: Action.SET_MESSAGES, payload: reData});
                // await applySubscription(query)

                scrollToBottom();
            };

            fetchMessage();
        }
    }, [id]);


    React.useEffect(() => {
        const ChatMessages = Parse.Object.extend("ChatMessages");
        const otherUser = createPointerWithObjectId("_User", id);

        const fromUser = new Parse.Query(ChatMessages);
        fromUser.equalTo("from", Parse.User.current());
        fromUser.equalTo("to", otherUser);

        const toUser = new Parse.Query(ChatMessages);
        toUser.equalTo("to", Parse.User.current());
        toUser.equalTo("from", otherUser);


        const query = Parse.Query.or(fromUser, toUser);
        query.equalTo('is_sub_message', false);
        query.include("from");
        query.include("to");
        query.include("reply_message");
        query.limit(30);
        query.descending('createdAt');


        const applySubscription = async (query) => {
            subscription = await query.subscribe();
            subscription.on('create', (message) => {
                console.log("message created");
                dispatch({
                    type: Action.SET_MESSAGES, payload: [{
                        message: message.get("text_message"),
                        pinned: message.get("pinned"),
                        userName: message.get('from').get("username"),
                        userId: message.get('from').id,
                        createdAt: message.get("createdAt"),
                        isEdited: message.get("is_edited"),
                        firstName: message.get('from').get("first_name"),
                        lastName: message.get('from').get("last_name"),
                        avatar: message.get('from').get('avatar') ? message.get('from').get('avatar').url() : null,
                        messageId: message.id
                    },...messages]
                });
                // setMessages([...messages, {
                //     message: message.get("text_message"),
                //     userName: message.get('from').get("username"),
                //     createdAt: message.get("createdAt"),
                //     isEdited: message.get("is_edited"),
                //     firstName: message.get('from').get("first_name"),
                //     lastName: message.get('from').get("last_name"),
                //     avatar: message.get('from').get('avatar').url(),
                //     messageId: message.id
                // }])
            });

            subscription.on('update', (message) => {
                const index = messages.findIndex(x => x.messageId === message.id);
                if (index !== -1) {

                    dispatch({
                        type: Action.SET_MESSAGES,
                        payload: [...messages.slice(0, index), {
                            message: message.get("text_message"),
                            pinned: message.get("pinned"),
                            userName: message.get('from').get("username"),
                            userId: message.get('from').id,
                            createdAt: message.get("createdAt"),
                            isEdited: message.get("is_edited"),
                            firstName: message.get('from').get("first_name"),
                            lastName: message.get('from').get("last_name"),
                            avatar: message.get('from').get('avatar').url(),
                            messageId: message.id
                        }, ...messages.slice(index + 1)]
                    });

                } else {
                   // alert("not foung");
                }
            });
        };

        applySubscription(query);

        return () => {
            if (subscription != null)
                subscription.unsubscribe();
        };
    }, [messages]);


    const Row = ({index, data}) => (


        <TextMessage
            // message={messages[index].get("text_message")}
            // userName={messages[index].get('from').get("username")}
            // createdAt={messages[index].get("createdAt")}
            // isEdited={messages[index].get("is_edited")}
            // firstName={messages[index].get('from').get("first_name")}
            // lastName={messages[index].get('from').get("last_name")}
            // avatar={messages[index].get('from').get('avatar').url()}
            // messageId={messages[index].id}
            {...data}
        />


    );

    // <div className={"flex-1 flex-col-reverse"}>
    //     <AutoSizer>
    //         {({height, width}) => {
    //             return <List
    //                 deferredMeasurementCache={cache}
    //                 className={"scroll flex flex-col-reverse"}
    //                 overscanRowCount={0}
    //                 height={height}
    //                 rowCount={messages.length}
    //                 width={width}
    //                 rowHeight={cache.rowHeight}
    //                 rowRenderer={Row}
    //             >
    //             </List>
    //         }}
    //     </AutoSizer>
    // </div>
    //  {/*{messages && messages.length > 0 && messages.map((data, i) => <Row index={i} style={{}}/>)}*/}
    return (
        <>
            {messages && messages.length > 0 && messages.map((data, i) => <Row key={data.messageId} index={i}
                                                                               data={data}/>)}

            {/*<div ref={messagesEndRef} className="right-0  p-3 shadow bg-white">*/}
            {/*    <ScrollToBottomIcon />*/}
            {/*</div>*/}


        </>

    );
};

const isEqual = (prevProps, nextProps) => prevProps.id === nextProps.id;

export default React.memo(UserMessage, isEqual);
