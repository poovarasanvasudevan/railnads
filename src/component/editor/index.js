import React, {memo, useCallback} from 'react'
import {Editor, EditorContext, WithEditorActions} from '@atlaskit/editor-core';
import ToolsDrawer from "./ToolsDrawer";
import CollapsedEditor from '@atlaskit/editor-core/dist/esm/ui/CollapsedEditor';
import {EditorView} from "prosemirror-view";
import Button from "@atlaskit/button";
import {RiEdit2Line as EditIcon, RiSendPlane2Line as SendIcon} from 'react-icons/ri'
import {Action, ContextStore} from "../../core/context";
import Parse from "parse";
import {createPointerWithObjectId} from "../util";

const CommentEditor = memo((props) => {
    let eAction = undefined
    const [isExpanded, setExpanded] = React.useState(true)
    const [altEditor, setAltEditor] = React.useState("chromeless")
    const [docs, setDocs] = React.useState({})
    const {dispatch,Parse,selectedUser} = React.useContext(ContextStore)

    const sendAction = useCallback(() => {
        if (docs.content.length > 0) {
            console.log("sended")

            const ChatMessage = Parse.Object.extend("ChatMessages");
            const sendMessage = new ChatMessage()
            sendMessage.set("text_message", docs)
            sendMessage.set("to", createPointerWithObjectId("_User", selectedUser.data.id))
            sendMessage.set("from", Parse.User.current())

            console.log("Message Saved")
            sendMessage.save()
                .then((data) => {
                    console.log(data)
                    eAction.clear()
                    setDocs({})
                })
                .catch((e) => console.log(e))
            // dispatch({
            //     type: Action.SEND_MESSAGE,
            //     payload: {
            //         docs: docs
            //     }
            // })


        }
    })

    const SAVE_ACTION = () => {
        eAction.getValue().then(value => {
            setDocs(value)
        })
    };
    const CANCEL_ACTION = () => console.log('Cancel');
    const EXPAND_ACTION = () => console.log('Expand');
    const onChange = (editorView: EditorView) => {
        eAction.getValue().then(value => {
            setDocs(value)
        });
    }
    const analyticsHandler = (actionName: string, props?: {}) => console.log(actionName, props);


    const onFocus = () => setExpanded(!isExpanded)
    const alternativeEditor = useCallback(() => setAltEditor(altEditor === "chromeless" ? "comment" : "chromeless"))

    return (
        <EditorContext>
            <WithEditorActions
                render={actions => {
                    eAction = actions
                    return <ToolsDrawer
                        renderEditor={({disabled, enabledFeatures,}: any) => (
                            <div
                                className={`flex ${altEditor === "chromeless" ? "border border-hovercolor" : ""}  py-1 pr-0 pl-2 pr-2 rounded-md`}>
                                <div>
                                    <div className="p-2 cursor-pointer hover:bg-hovercolor rounded-md"
                                         onClick={alternativeEditor}>
                                        <EditIcon />
                                    </div>
                                </div>
                                <div className={"flex-1 pl-2"}>
                                    <CollapsedEditor
                                        placeholder="What do you want to say?"
                                        isExpanded={isExpanded}
                                        onFocus={onFocus}
                                        onExpand={EXPAND_ACTION}
                                    >
                                        <Editor
                                            appearance={altEditor}
                                            placeholder={props.placeholder || "What do you want to say?"}
                                            analyticsHandler={analyticsHandler}
                                            allowAnalyticsGASV3={true}
                                            shouldFocus={true}
                                            quickInsert={true}
                                            allowTextColor={true}
                                            // saveOnEnter={true}
                                            allowRule={true}
                                            allowTables={{
                                                allowControls: true,
                                            }}
                                            allowHelpDialog={true}
                                            disabled={disabled}

                                            allowDynamicTextSizing={true}
                                            onChange={onChange}
                                            onSave={SAVE_ACTION}
                                            onCancel={CANCEL_ACTION}
                                            allowExtension={true}

                                            maxHeight={250}

                                            contentComponents={undefined}
                                            {...props.editorProps}
                                        />
                                    </CollapsedEditor>
                                </div>

                                <div>
                                    <div className="p-2 cursor-pointer hover:bg-hovercolor rounded-md"
                                         onClick={sendAction}>
                                        <SendIcon color={(docs.content && docs.content.length) > 0 ? "green" : "black"}/>
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                }}
            />

        </EditorContext>
    )
})
export default CommentEditor
