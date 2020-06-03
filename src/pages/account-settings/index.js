import React from 'react';
import Layout from "../../component/layout";
import Page from "@atlaskit/page";
import PageHeader from '@atlaskit/page-header';

export default function AccountSettings(props) {
    return (
        <Layout>
            <div className="p-2">
                <div className="p-4">
                    <h2 className="text-3xl text-gray-800 font-semibold">Application Settings</h2>
                </div>
            </div>
        </Layout>
    )
}
