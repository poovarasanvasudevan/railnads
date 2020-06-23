import React, {memo} from 'react'
import {Editor, EditorContext, WithEditorActions} from '@atlaskit/editor-core';
import ToolsDrawer from "./ToolsDrawer";
import CollapsedEditor from '@atlaskit/editor-core/dist/esm/ui/CollapsedEditor';
import {EditorView} from "prosemirror-view";
import Button from "@atlaskit/button";
import {RiEdit2Line as EditIcon} from 'react-icons/ri'

const CommentEditor = memo((props) => {
    let eAction = undefined
    const [isExpanded, setExpanded] = React.useState(true)
    const [altEditor, setAltEditor] = React.useState("chromeless")
    const [docs, setDocs] = React.useState({})
    React.useEffect(() => {
    }, [])

    const SAVE_ACTION = () => console.log('Save');
    const CANCEL_ACTION = () => console.log('Cancel');
    const EXPAND_ACTION = () => console.log('Expand');
    const onChange = (editorView: EditorView) => {
        eAction.getValue().then(value => {
            console.log(value)
            setDocs(value)
        });
    }
    const analyticsHandler = (actionName: string, props?: {}) => console.log(actionName, props);


    const onFocus = () => setExpanded(!isExpanded)
    const alternativeEditor = () => setAltEditor(altEditor === "chromeless" ? "comment" : "chromeless")

    return (
        <EditorContext>
            <WithEditorActions
                render={actions => {
                    eAction = actions
                    return <ToolsDrawer
                        renderEditor={({disabled, enabledFeatures,}: any) => (
                            <div className={`flex ${ altEditor ==="chromeless" ? "border border-hovercolor" : ""}  py-1 pr-0 pl-2 pr-2 rounded-md`}>
                                <div>
                                    <div className="p-2 cursor-pointer hover:bg-hovercolor rounded-md" onClick={alternativeEditor}>
                                        <EditIcon/>
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
                            </div>
                        )}
                    />
                }}
            />

        </EditorContext>
    )
})
export default CommentEditor
