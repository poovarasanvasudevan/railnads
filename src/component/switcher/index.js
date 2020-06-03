import React from 'react'
import {ContainerHeader, ItemAvatar, Switcher} from "@atlaskit/navigation-next";
import {FiChevronDown} from 'react-icons/fi'


export default class MySwitcher extends React.Component {
    state = { selected: this.props.projects[0].options[0] };

    create = () => ({
        onClick: () => {
            // eslint-disable-next-line
            const boardName = window.prompt(
                'What would you like to call your new board?',
            );
            if (boardName && boardName.length) {
                // eslint-disable-next-line
                console.log(`You created the board "${boardName}"`);
            }
        },
        text: 'Create board',
    });

    target = ({ id, subText, text }) => {
        const avatar = s => (
            <ItemAvatar
                appearance="square"
                href={null}
                isInteractive={false}
                itemState={s}
                onClick={null}
            />
        );

        return (
            <ContainerHeader
                before={avatar}
                after={FiChevronDown}
                id={id}
                subText={subText}
                text={text}
            />
        );
    };

    onChange = selected => {
        this.setState({ selected });
    };

    render() {
        const { selected } = this.state;
        return (
            <Switcher
                create={this.create()}
                onChange={this.onChange}
                options={this.props.projects}
                target={this.target(selected)}
                value={selected}
            />
        );
    }
}
