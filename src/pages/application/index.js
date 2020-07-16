import React, {memo, Suspense} from 'react';
import {FiStar} from 'react-icons/fi';
import AppListItem from "../../component/listitem/app-list-item";
import {GroupHeading} from "@atlaskit/navigation-next";
import Skeleton from "react-loading-skeleton";
import Textfield from '@atlaskit/textfield'

const Applications = memo((props) => {

    return (
        <div className="flex flex-row h-full">
            <div style={{width: "300px"}}
                 className="flex flex-col h-full border-r border-gray-200 sm:appearance-none md:flex">


                <div className="flex-1 overflow-y-scroll scroll">
                    <GroupHeading>
                        <span className="text-gray-600 font-bold">Apps</span>
                    </GroupHeading>
                    <Suspense fallback={<div className={"px-3"}><Skeleton count={5}/></div>}>
                        <AppListItem
                            id={2}
                            icon={FiStar}
                            label={"Recent"}
                        />

                        <AppListItem
                            id={2}
                            icon={FiStar}
                            label={"Most Downloaded"}
                        />
                    </Suspense>

                </div>


            </div>

            <div className="flex-1 p-2">

                <div className="p-4">
                    <h2 className="text-3xl text-gray-800 font-semibold">Applications</h2>
                </div>


                <div className="px-4 py-2">
                    <Textfield
                        placeholer={"Search for apps, bot and other"}
                    />
                </div>
            </div>
        </div>
    );
});
export default Applications;
