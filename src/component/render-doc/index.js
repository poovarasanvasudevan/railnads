import React from 'react';

import {
    ReactRenderer
} from '@atlaskit/renderer';
import {extensionHandlers} from '../data/Extension'

import {
    ProviderFactory,
} from '@atlaskit/editor-common';
import {getEmojiResource} from "../../core/provider/emoji/story-data";
import {storyContextIdentifierProviderFactory} from "../data/ContextIdentifier";
import {autoformattingProvider} from "../data/AutoFormat";

const providerFactory = ProviderFactory.create({
  //  emojiProvider: getEmojiResource({}),
   // contextIdentifierProvider: storyContextIdentifierProviderFactory(),
   // autoformattingProvider: Promise.resolve(autoformattingProvider),
});

const EditorRender = (props) => {
    return (
        <div>
            <ReactRenderer
                document={props.doc}
                extensionHandlers={extensionHandlers}
                dataProviders={providerFactory}
                adfStage="stage0"
                appearance={'full-width'}
            />

        </div>
    );
}

export default React.memo(EditorRender)
