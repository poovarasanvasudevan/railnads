import React, {memo} from 'react';
import {ModalTransition} from '@atlaskit/modal-dialog';
import {
    AvatarPickerDialog,
    AsyncAvatarPickerDialogProps,
} from '@atlaskit/media-avatar-picker';
import {ContextStore} from "../../core/context";
import {RiEditLine} from 'react-icons/ri';
import styled from "styled-components";

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


                <div className="flex p-4">
                    <div className="">
                        <ProfileAvatar src={Parse.User.current().get('avatar').url()}>
                            <RiEditLine onClick={() => setAvatarPickerOpen(true)}/>
                        </ProfileAvatar>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ProfileSettings;
