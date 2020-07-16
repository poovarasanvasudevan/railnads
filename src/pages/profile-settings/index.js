import React, {memo, Fragment, useState} from 'react';
import {ModalTransition} from '@atlaskit/modal-dialog';
import {
    AvatarPickerDialog,
    AsyncAvatarPickerDialogProps,
} from '@atlaskit/media-avatar-picker';
import {ContextStore} from "../../core/context";
import {RiEditLine, RiBuildingLine, RiMapPinLine, RiMailLine, RiEdit2Line, RiFolder2Line} from 'react-icons/ri';
import styled from "styled-components";
import Textfield from '@atlaskit/textfield';
import {Button} from "@atlaskit/button/dist/esm/components/Button";
import {Tab, Menu, Label} from 'semantic-ui-react';
import ApplicationCard from "../../component/card/application-card";
import {AppColor} from "../../component/util";

const ProfileAvatar = styled.div`
    width: 250px;
    height: 250px;
    border-radius: 10px;
    background: ${props => props.src ? `url("` + props.src + `")` : "green"};
    background-repeat: no-repeat;
    background-size: 250px 250px;
`;

const ProfileSettings = memo((props) => {

    const [isAvatarPickerOpen, setAvatarPickerOpen] = React.useState(false);
    const [image, setImage] = React.useState(null);
    const [isLoading, setLoading] = React.useState(false);
    const {Parse} = React.useContext(ContextStore);

    const saveDataURI = (dataURI: any) => {
        setAvatarPickerOpen(false);
        setLoading(false);
        setImage(dataURI);
    };

    const saveFileAndCrop = (file: File) => {
        setAvatarPickerOpen(false);
        setLoading(false);
        setImage(URL.createObjectURL(file));
    };

    const closePicker = () => {
        setAvatarPickerOpen(false);
        setLoading(false);
        console.log("Closed");
    };

    const panes = [
        {
            menuItem: (
                <Menu.Item key='messages'>
                    Overview
                </Menu.Item>
            ), render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>
        },
        {
            menuItem: (
                <Menu.Item key='messages'>
                    Applications<Label>15</Label>
                </Menu.Item>
            ), render: () => (
                <div>
                    <ApplicationCard
                        label={"File Storage"}
                        icon={<RiFolder2Line color={AppColor} size={50}/>}
                    />
                </div>
            )
        },
        {
            menuItem: (
                <Menu.Item key='messages'>
                    Subscriptions <Label>15</Label>
                </Menu.Item>
            ), render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>
        },

        {
            menuItem: (
                <Menu.Item key='messages'>
                    Notifications<Label>15</Label>
                </Menu.Item>
            ), render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>
        },
    ];

    return (

        <div className="p-2">
            <div className="">
                <ModalTransition>
                    {isAvatarPickerOpen && (
                        <AvatarPickerDialog
                            avatars={[]}
                            onAvatarPicked={selectedAvatar => {
                                console.log('onAvatarPicked:', selectedAvatar);
                                saveDataURI(selectedAvatar.dataURI);
                            }}
                            onImagePicked={(selectedImage, crop) => {
                                console.log('onImagePicked:', selectedImage, crop);
                                setLoading(true);
                                saveFileAndCrop(selectedImage);
                            }}
                            onImagePickedDataURI={exportedImg => {
                                console.log('onImagePickedDataURI: ', {dataURI: exportedImg});
                                setLoading(true);
                                saveDataURI(exportedImg);
                            }}
                            onCancel={closePicker}
                            isLoading={isLoading}
                            predefinedAvatarsText="Default icons"
                        />
                    )}
                </ModalTransition>
                <div className="p-4">
                    <h2 className="text-3xl text-gray-800 font-semibold">Profile Settings</h2>
                </div>

                <div className="flex">
                    <div className="flex  p-4 flex-col" style={{width: 300}}>

                        <div className="flex">
                            <ProfileAvatar src={Parse.User.current().get('avatar').url()}>
                                <RiEditLine onClick={() => setAvatarPickerOpen(true)}/>
                            </ProfileAvatar>
                        </div>

                        <div className="pt-3">
                            <div
                                className="text-2xl">{Parse.User.current().get('first_name') + " " + Parse.User.current().get('last_name')}</div>
                            <div>{"@" + Parse.User.current().get("username")}</div>
                        </div>

                        {Parse.User.current().get("extra") && (
                            <div className="pt-3">
                                {Parse.User.current().get("extra").about && (
                                    <>
                                        <div>
                                            <Button appearance="subtle"
                                                    className="w-full"
                                                    iconBefore={<RiEdit2Line size={22}/>}>Edit Profile</Button>
                                        </div>
                                        <div className="pt-3">
                                            {Parse.User.current().get("extra").about}
                                        </div>

                                        <div className="mt-3">
                                            <Textfield
                                                elemBeforeInput={
                                                    <div className="pl-1">
                                                        <RiBuildingLine color={'#6A737D'} size={22}/>
                                                    </div>
                                                }
                                                name="compact"

                                            />
                                        </div>

                                        <div className="mt-2">
                                            <Textfield
                                                elemBeforeInput={
                                                    <div className="pl-1">
                                                        <RiMapPinLine color={'#6A737D'} size={22}/>
                                                    </div>
                                                }
                                                name="compact"

                                            />
                                        </div>

                                        <div className="mt-2">
                                            <Textfield
                                                elemBeforeInput={
                                                    <div className="pl-1">
                                                        <RiMailLine color={'#6A737D'} size={22}/>
                                                    </div>
                                                }
                                                name="compact"

                                            />
                                        </div>
                                    </>
                                )}

                            </div>


                        )}


                    </div>
                    <div className="flex-1 px-10">

                        <Tab menu={{secondary: true, pointing: true, color: AppColor,}} panes={panes}/>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ProfileSettings;
