import * as React from 'react';
import {EditorView} from 'prosemirror-view';
// import {storyData} from '../../core/provider/emoji';
import Button from '@atlaskit/button';
import {HTMLAttributes, ClassAttributes, ComponentClass} from 'react';
import {AnalyticsListener} from '@atlaskit/analytics-next';
import styled from 'styled-components';
import {colors, gridSize} from '@atlaskit/theme';


export const ButtonGroup: ComponentClass<HTMLAttributes<{}>> = styled.span`
  display: flex;

  & > button {
    margin-left: ${gridSize() / 2}px;
  }
`;
export const Content: ComponentClass<HTMLAttributes<{}>> = styled.div`
  & div.toolsDrawer {
    margin-top: 16px;
    padding: 8px 16px;
    background: ${colors.N800};

    & label {
      display: flex;
      color: white;
      align-self: center;
      padding-right: 8px;
    }

    & button {
      margin: 4px 0;
    }
  }

  & legend {
    margin: 8px 0;
  }

  & input {
    font-size: 13px;
  }
`;
// const providers = {
//
//     emojiProvider: {
//         resolved: storyData.getEmojiResource(),
//         // pending: pendingPromise,
//         // rejected: rejectedPromise,
//         // undefined: undefined,
//     },
//
// };
export type ToolbarFeatures = {
    dynamicTextSizing: boolean;
    imageResizing: boolean;
};

const enabledFeatureNames = {
    dynamicTextSizing: 'dynamic text sizing',
    imageResizing: 'image resizing',
};

export interface State {
    reloadEditor: boolean;
    editorEnabled: boolean;
    emojiProvider: ProviderState;
    jsonDocument?: string;
    enabledFeatures: ToolbarFeatures;
}

export interface Props {
    imageUploadProvider?: ProviderState;
}

export type ProviderState = 'resolved' | 'pending' | 'rejected' | 'undefined';

export default class ToolsDrawer extends React.PureComponent<Props & any, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            reloadEditor: false,
            editorEnabled: true,

            emojiProvider: 'resolved',
            jsonDocument: '{}',
            mediaMockEnabled: false,
            enabledFeatures: {
                dynamicTextSizing: false,
                imageResizing: false,
            },
        };

    }

    switchProvider = (providerType: string, providerName: string) => {
        this.setState({[providerType]: providerName});
    };

    reloadEditor = () => {
        this.setState({reloadEditor: true}, () => {
            this.setState({reloadEditor: false});
        });
    };

    toggleDisabled = () =>
        this.setState(prevState => ({editorEnabled: !prevState.editorEnabled}));


    onChange = (editorView: EditorView) => {
        // this.setState({
        //     jsonDocument: JSON.stringify(toJSON(editorView.state.doc), null, 2),
        // });
    };

    toggleFeature = (name) => {
        this.setState(prevState => ({
            ...prevState, enabledFeatures: {...prevState.enabledFeatures, [name]: !prevState.enabledFeatures[name],},
        }));
    };

    render() {
        const {
            jsonDocument,
            reloadEditor,
            editorEnabled,
            enabledFeatures,
        } = this.state;
        return (
            <AnalyticsListener
                channel="atlaskit"
                onEvent={(e: any) => console.log(e)}
            >
                <AnalyticsListener channel="media" onEvent={(e: any) => console.log(e)}>
                    <AnalyticsListener
                        channel="fabric-elements"
                        onEvent={(e: any) => console.log(e)}
                    >
                        <Content>

                            {reloadEditor
                                ? ''
                                : this.props.renderEditor({
                                    disabled: !editorEnabled,
                                    enabledFeatures,
                                    onChange: this.onChange,
                                })}
                        </Content>
                    </AnalyticsListener>
                </AnalyticsListener>
            </AnalyticsListener>
        );
    }
}
