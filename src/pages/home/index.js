import React from 'react';
import MySwitcher from "../../component/switcher";
import {GroupHeading} from "@atlaskit/navigation-next";
import SquareIcon from "../../component/icon/bg-square";
import {FaUsers} from "react-icons/fa";
import IconButton from "../../component/button/icon-button";
import {FiInfo, FiPhoneCall, FiVideo} from "react-icons/fi";
import {TiAttachmentOutline, TiCalendarOutline, TiMicrophoneOutline, TiPinOutline, TiUser} from "react-icons/ti";
import Textfield from "@atlaskit/textfield";

export default function Home(props) {
    const projects = [
        {
            label: 'Recent Projects',
            options: [
                {
                    avatar: 'endeavour',
                    id: 'endeavour',
                    pathname: '/projects/endeavour',
                    text: 'Endeavour',
                    subText: 'Software project',
                },
                {
                    avatar: 'design-system-support',
                    id: 'design-system-support',
                    pathname: '/projects/design-system-support',
                    text: 'Design System Support',
                    subText: 'Service desk project',
                },
            ],
        },
        {
            label: 'Other Projects',
            options: [
                {
                    avatar: 'design-platform',
                    id: 'design-platform',
                    pathname: '/projects/design-platform',
                    text: 'Design Platform',
                    subText: 'Software project',
                },
                {
                    avatar: 'donut-world',
                    id: 'donut-world',
                    pathname: '/projects/donut-world',
                    text: 'Donut World',
                    subText: 'Software project',
                },
                {
                    avatar: 'kitkat',
                    id: 'kitkat',
                    pathname: '/projects/kitkat',
                    text: 'KitKat',
                    subText: 'Software project',
                },
                {
                    avatar: 'tangerine',
                    id: 'tangerine',
                    pathname: '/projects/tangerine',
                    text: 'Tangerine',
                    subText: 'Software project',
                },
            ],
        },
    ];
    return (
        <div className="flex flex-row h-full">
            <div style={{width: "300px", background: '#F8F9FB'}}
                 className=" h-full border-r border-gray-200 sm:appearance-none md:block">
                <div>

                    <div
                        data-webdriver-test-key="container-header"
                        className="p-2"
                    >
                        <MySwitcher projects={projects}/>
                    </div>

                </div>

                <div>

                    <div className="px-3 pt-4">
                        <input
                            className="px-2 border-hovercolor border focus:border-hovercolor rounded-md"
                            type="text"
                            style={{height: 35, width: '100%'}}
                            placeholder="Search People"/>
                    </div>


                    <div>
                        <GroupHeading>
                            <span className="text-gray-600 font-bold">Pinned User</span>
                        </GroupHeading>

                        <div
                            className="px-4 py-1 mx-2 rounded-md flex flex-row content-center items-center hover:bg-hovercolor cursor-pointer">
                            <SquareIcon icon={FaUsers} className=""/>
                            <h2 className="ml-3 hover:text-gray-900 font-medium text-gray-600"
                                style={{fontSize: '14px'}}> Barn Users </h2>
                        </div>
                        <div
                            className="px-4 py-1 mx-2 rounded-md flex flex-row content-center items-center hover:bg-hovercolor cursor-pointer">
                            <SquareIcon icon={FaUsers} className=""/>
                            <h2 className="ml-3 hover:text-gray-900 font-medium text-gray-600"
                                style={{fontSize: '14px'}}> Barn Users </h2>
                        </div>
                    </div>

                    <div>
                        <GroupHeading>
                            <span className="text-gray-600 font-bold">Recent Chat</span>
                        </GroupHeading>

                        <div
                            className="px-4 py-2 mx-2 my-1 rounded-md flex flex-row content-center items-center hover:bg-hovercolor cursor-pointer">
                            <SquareIcon icon={FaUsers} className=""/>
                            <h2 className="ml-3 hover:text-gray-900 font-medium text-gray-600"
                                style={{fontSize: '14px'}}> Barn Users </h2>
                        </div>
                    </div>


                    <div>
                        <GroupHeading>
                            <span className="text-gray-600 font-bold">Support Team</span>
                        </GroupHeading>

                        <div
                            className="px-4 py-2 mx-2 my-1 rounded-md flex flex-row content-center items-center hover:bg-hovercolor cursor-pointer">
                            <SquareIcon icon={FaUsers} className=""/>
                            <h2 className="ml-3 hover:text-gray-900 font-medium text-gray-600"
                                style={{fontSize: '14px'}}> Barn Users </h2>
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className="flex bg-white shadow-sm px-4 py-3">
                    <div className="flex-1">
                        <div className="flex flex-row">
                            <SquareIcon
                                icon={FaUsers}
                                size={22}
                                paddingclass={'p-2'}
                                bgcolorclass={'bg-red-500'}
                            />

                            <div className="ml-2">
                                <span className="hover:text-gray-900 font-medium text-gray-600"> Barn User</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex content-center items-center ">
                        <IconButton><FiPhoneCall size={24} color={'#999999'}/></IconButton>
                        <IconButton><FiVideo size={24} color={'#999999'}/></IconButton>
                        <IconButton><TiPinOutline size={24} color={'#999999'}/></IconButton>
                        <input placeholder={'Search People, Messages, Comments...'}
                               className="px-2 border-hovercolor border rounded-md"
                               style={{width: "300px", height: "33px"}}/>
                        <IconButton><FiInfo size={24} color={'#999999'}/></IconButton>
                    </div>

                </div>

                <div className="flex-1 flex">

                    <div className="flex flex-1 flex-col">

                        <div className="flex-1">

                        </div>

                        <div className={'p-5 flex'}>
                            <div className="flex-1 mx-2">
                                <Textfield
                                    id="after-input"
                                    placeholder={'Write your message'}
                                    elemBeforeInput={
                                        <div className="flex flex-row">
                                            <TiAttachmentOutline className="mx-2" size={22}/>
                                            <TiUser className="mx-2" size={22}/>
                                            <TiMicrophoneOutline className="mx-2" size={22}/>
                                        </div>
                                    }
                                />

                            </div>

                            <div>
                                <button className="px-3 bg-product text-white h-full rounded-md inline-block">

                                    <TiCalendarOutline size={20}/>

                                </button>
                            </div>

                        </div>
                    </div>

                    <div
                        style={{width: '350px'}}
                        className="h-full border-l border-gray-200 p-2 content-center justify-center items-center sm:appearance-none">

                    </div>
                </div>

            </div>


        </div>
    )
}
