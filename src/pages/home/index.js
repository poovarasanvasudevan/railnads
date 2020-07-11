import React, {memo, Suspense} from 'react';
import {GroupHeading} from "@atlaskit/navigation-next";
import SquareIcon from "../../component/icon/bg-square";
import IconButton from "../../component/button/icon-button";
import {FiInfo, FiPhoneCall, FiVideo,FiHome,FiStar,FiBell,FiArchive} from "react-icons/fi";
import {RiStickyNoteLine} from "react-icons/ri";
import {TiPinOutline} from "react-icons/ti";
import {Action, ContextStore} from "../../core/context";
import Skeleton from 'react-loading-skeleton';
import UserMessage from "../../component/message/render";
import BtnColors from "../../component/button/btn-colors";
//import CommentEditor from '../../component/editor'
// import {Conversation} from '@atlaskit/conversation'
// import {
//     MockProvider as ConversationResource,
//     getDataProviderFactory,
// } from '../../core/provider/ConvProvider.js';
// import {MOCK_USERS} from "../../core/provider/ConvData";

const CommentEditor = React.lazy(() => import("../../component/editor"));
const PinnedUsers = React.lazy(() => import("../../component/user-list/PinnedUsers"));
const MyGroups = React.lazy(() => import("../../component/group-list/my-groups"));

const Home = memo((props) => {

    const {Parse, selectedUser, dispatch, users} = React.useContext(ContextStore);

    // const provider = new ConversationResource({
    //     url: 'http://mockservice/',
    //     user: MOCK_USERS[3],
    // });
    React.useEffect(() => {

    }, [selectedUser]);

    return (
        <div className="flex flex-row h-full">
            <div style={{width: "300px"}}
                 className="flex flex-col h-full border-r border-gray-200 sm:appearance-none md:flex">

                <div className="px-3 pt-4">
                    <input
                        className="px-2 border-hovercolor border focus:border-hovercolor rounded-md bg-gray-200"
                        type="text"
                        style={{height: 35, width: '100%'}}
                        placeholder="Search People"/>
                </div>

                <div className="px-3 pt-4 flex row justify-center">
                    <BtnColors bgClass={""}><FiHome color={"red"} size={20} /></BtnColors>
                    <BtnColors bgClass={""}><FiStar color={"green"} size={20} /></BtnColors>
                    <BtnColors bgClass={""}><FiBell color={"blue"} size={20} /></BtnColors>
                    <BtnColors bgClass={""}><FiArchive color={"teal"} size={20} /></BtnColors>
                    <BtnColors bgClass={""}><RiStickyNoteLine color={"orange"} size={20} /></BtnColors>
                </div>


                <div className="flex-1 overflow-y-hidden flex flex-col">
                    <GroupHeading>
                        <span className="text-gray-600 font-bold">Users </span>
                    </GroupHeading>

                    <div className={"flex-1 scroll"}>
                        <Suspense fallback={<div className={"px-3"}><Skeleton count={5}/></div>}>
                            <PinnedUsers/>
                        </Suspense>
                    </div>
                </div>

                <div className="flex-1 overflow-y-scroll scroll">
                    <GroupHeading>
                        <span className="text-gray-600 font-bold">Groups</span>
                    </GroupHeading>
                    <Suspense fallback={<div className={"px-3"}><Skeleton count={5}/></div>}>
                        <MyGroups/>
                    </Suspense>

                </div>


                {/*<div>*/}
                {/*    <GroupHeading>*/}
                {/*        <span className="text-gray-600 font-bold">Support Team</span>*/}
                {/*    </GroupHeading>*/}

                {/*    <div*/}
                {/*        className="px-2 py-2 mx-2 my-1 rounded-md flex flex-row content-center items-center hover:bg-hovercolor cursor-pointer">*/}
                {/*        <SquareIcon icon={FiUser} className=""/>*/}
                {/*        <h2 className="ml-3 hover:text-gray-900 font-medium text-gray-600"*/}
                {/*            style={{fontSize: '14px'}}> Barn Users </h2>*/}
                {/*    </div>*/}
                {/*</div>*/}

            </div>

            {selectedUser && (
                <div className="flex flex-col flex-1">
                    <div className="flex bg-white shadow-sm px-2 py-3" style={{"max-height": "60px"}}>
                        <div className="flex-1">
                            <div className="flex flex-row">
                                <SquareIcon
                                    // icon={FiUser}
                                    // size={22}
                                    size={"large"}
                                    image={selectedUser ? selectedUser.data.username : ""}
                                    paddingclass={'p-2'}
                                    bgcolorclass={'bg-red-500'}
                                />

                                <div className="ml-2">
                                <span
                                    className="hover:text-gray-900 font-medium text-gray-600">{selectedUser ? selectedUser.data.title : " "}</span>
                                    &nbsp;<span
                                    className="hover:text-gray-900 text-gray-500">{selectedUser ? "@" + selectedUser.data.username : " "}</span>
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

                    <div className="flex-1 flex overflow-y-hidden">

                        <div className="flex flex-1 flex-col">

                            <div className="flex-1 flex flex-col-reverse overflow-y-scroll scroll">

                                <UserMessage {...selectedUser.data} />

                            </div>

                            <div className={'p-5 flex'}>
                                <div className="flex-1 mx-2">

                                    <Suspense fallback={<Skeleton/>}>

                                        <CommentEditor/>

                                    </Suspense>
                                </div>

                                {/*<div>*/}
                                {/*    <button className="px-3 bg-product text-white h-full rounded-md inline-block">*/}

                                {/*        <TiCalendarOutline size={20}/>*/}

                                {/*    </button>*/}
                                {/*</div>*/}


                            </div>
                        </div>

                        <div
                            style={{width: '350px'}}
                            className="h-full border-l border-gray-200 p-2 content-center justify-center items-center sm:appearance-none">

                        </div>
                    </div>

                </div>
            )}

        </div>
    );
});

export default Home;
