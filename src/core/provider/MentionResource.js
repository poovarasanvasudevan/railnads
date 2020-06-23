import {
    MentionDescription,
    MentionsResult,
    AbstractMentionResource,
    MentionNameResolver,
    DefaultMentionNameResolver,
    ResolvingMentionProvider,
    MentionNameDetails,
    MentionNameStatus,
    TeamMentionProvider,
} from '@atlaskit/mention/resource';
import React from 'react';
import Parse from 'parse';


export interface MockMentionConfig {
    minWait?: number;
    maxWait?: number;
    mentionNameResolver?: MentionNameResolver;
    enableTeamMentionHighlight?: boolean;
}

const debug = (data) => {

};

export class MMentionResource extends AbstractMentionResource
    implements ResolvingMentionProvider, TeamMentionProvider {

    config: MockMentionConfig;
    lastReturnedSearch: number;
    Parse: Parse;

    constructor(config: MockMentionConfig, parse: Parse) {
        super();

        this.config = config;

        this.lastReturnedSearch = 0;
        this.Parse = parse;

    }

    filter(query: string): void {
        const searchTime = Date.now();
        const notify = (mentions: MentionsResult) => {
            if (searchTime >= this.lastReturnedSearch) {
                this.lastReturnedSearch = searchTime;
                let stats: { teamMentionDuration?: number; duration?: number } = {};
                if (query === 'team') {
                    stats.teamMentionDuration = 200;
                } else {
                    stats.duration = 100;
                }

                this._notifyListeners(mentions, stats);
            } else {
                const date = new Date(searchTime).toISOString().substr(17, 6);
                debug('Stale search result, skipping', date, query); // eslint-disable-line no-console, max-len
            }
            this._notifyAllResultsListeners(mentions);
        };

        const notifyErrors = (error: Error) => {
            this._notifyErrorListeners(error);
        };

        const minWait = this.config.minWait || 0;
        const randomTime = (this.config.maxWait || 0) - minWait;
        const waitTime = Math.random() * randomTime + minWait;

        setTimeout(async () => {
            const Users = this.Parse.Object.extend("User");
            var querys = null;

            if (query !== '') {
                //
                const userNameQ = new this.Parse.Query(Users);
                userNameQ.contains('username', query);

                const first_name = new this.Parse.Query(Users);
                first_name.contains('first_name', query);

                const last_name = new this.Parse.Query(Users);
                last_name.contains('last_name', query);

                querys = this.Parse.Query.or(userNameQ, first_name, last_name);
            } else {
                querys = new this.Parse.Query(Users);
            }
            var data = await querys.find();
            const users = [];

            for (var i = 0; i < data.length; i++) {
                users.push({
                    "id": data[i].id,
                    "name": data[i].get('first_name') + ' ' + data[i].get('last_name'),
                    "mentionName": data[i].get('username'),
                    "nickname": data[i].get('username'),
                    "avatarUrl": data[i].get('avatar').url()
                });
            }

            notify({
                mentions: users,
                query,
            });
        }, waitTime + 1);
    }

    // eslint-disable-next-line class-methods-use-this
    recordMentionSelection(mention: MentionDescription): void {
        debug(`Record mention selection ${mention.id}`);
    }

    resolveMentionName(id: string,): Promise<MentionNameDetails> | MentionNameDetails {
        debug('(mock)resolveMentionName', id);
        if (!this.config.mentionNameResolver) {
            return {
                id,
                name: '',
                status: MentionNameStatus.UNKNOWN,
            };
        }
        return this.config.mentionNameResolver.lookupName(id);
    }

    cacheMentionName(id: string, name: string) {
        debug('(mock)cacheMentionName', id, name);
        if (this.config.mentionNameResolver) {
            this.config.mentionNameResolver.cacheName(id, name);
        }
    }

    supportsMentionNameResolving() {
        const supported = !!this.config.mentionNameResolver;
        debug('supportsMentionNameResolving', supported);
        return supported;
    }

    shouldHighlightMention(mention: MentionDescription): boolean {
        return mention.id === 'oscar';
    }

    mentionTypeaheadHighlightEnabled = () => this.config.enableTeamMentionHighlight || false;
    mentionTypeaheadCreateTeamPath = () => '/people/search#createTeam';
}

export const resourceProvider = (parse) => {

    return new MMentionResource({
        minWait: 10,
        maxWait: 25,
    }, parse);
};
