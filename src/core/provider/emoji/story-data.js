import {
    mockEmojiResourceFactory,
    UsageClearEmojiResource,
    MockEmojiResourceConfig,
} from './EmResource';
import { EmojiRepository } from '@atlaskit/emoji/resource';
import { EmojiDescription, EmojiServiceResponse } from '@atlaskit/emoji/types';
import { denormaliseEmojiServiceResponse } from '@atlaskit/emoji/utils';
import { siteEmojiWtf } from './test-data';

let emojisSets: Map<string, any[]>;

declare var require: {
    <T>(path: string): T;
};

export const getStandardEmojiData = (): EmojiServiceResponse => require('./emoji.json') ;

const siteEmojis = {
    emojis: [siteEmojiWtf],
};

export const loggedUser = 'blackpanther';

export const getSiteEmojiData = (): EmojiServiceResponse => siteEmojis;

export const getAllEmojiData = (): EmojiServiceResponse => {
    const standardEmojis = getStandardEmojiData();
    const siteEmojis = getSiteEmojiData();
    const standardSprites =
        (standardEmojis.meta && standardEmojis.meta.spriteSheets) || {};

    return {
        emojis: [
            ...standardEmojis.emojis,
            ...siteEmojis.emojis,
        ],
        meta: {
            spriteSheets: {
                ...standardSprites,
            },
        },
    };
};

const getEmojiSet = (name: string) => {
    if (!emojisSets) {
        const emojis = denormaliseEmojiServiceResponse(getAllEmojiData()).emojis;
        const standardEmojis = denormaliseEmojiServiceResponse(
            getStandardEmojiData(),
        ).emojis;

        const siteEmojis = denormaliseEmojiServiceResponse(getSiteEmojiData())
            .emojis;

        emojisSets = new Map();
        emojisSets.set('all', emojis);
        emojisSets.set('standard', standardEmojis);

        emojisSets.set('site', siteEmojis);
    }
    return emojisSets.get(name) || [];
};

export const getStandardEmojis = () => getEmojiSet('standard');
export const getAtlassianEmojis = () => getEmojiSet('atlassian');
export const getSiteEmojis = () => getEmojiSet('site');
export const getEmojis = () => getEmojiSet('all');

export const lorem = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt,
  lorem eu vestibulum sollicitudin, erat nibh ornare purus, et sollicitudin lorem
  felis nec erat. Quisque quis ligula nisi. Cras nec dui vestibulum, pretium massa ut,
  egestas turpis. Quisque finibus eget justo a mollis. Mauris quis varius nisl. Donec
  aliquet enim vel eros suscipit porta. Vivamus quis molestie leo. In feugiat felis mi,
  ac varius odio accumsan ac. Pellentesque habitant morbi tristique senectus et netus et
  malesuada fames ac turpis egestas. Mauris elementum mauris ac leo porta venenatis.
  Integer hendrerit lacus vel faucibus sagittis. Mauris elit urna, tincidunt at aliquet
  sit amet, convallis placerat diam. Mauris id aliquet elit, non posuere nibh. Curabitur
  ullamcorper lectus mi, quis varius libero ultricies nec. Quisque tempus neque ligula,
  a semper massa dignissim nec.
`;

export const getEmojiRepository = (): any => new EmojiRepository(getEmojis());

export const getEmojiResource = (config?: MockEmojiResourceConfig) =>
    mockEmojiResourceFactory(getEmojiRepository(), config);

export const getEmojiResourceWithStandardAndAtlassianEmojis = (
    config?: MockEmojiResourceConfig,
) => {
    const standardEmojis: EmojiDescription[] = getStandardEmojis();

    return mockEmojiResourceFactory(
        new EmojiRepository([...standardEmojis]),
        config,
    );
};

export const getUsageClearEmojiResource = (): UsageClearEmojiResource =>
    new UsageClearEmojiResource(getEmojis());
