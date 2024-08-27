import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React from 'react';
import { useSelector } from 'react-redux';
import Inventory from './Inventory/Inventory';

const Profile = () => {
    const {currentUser} = useSelector((state)=>state.users);

    return (
        <div>
           <Tabs>
            {currentUser.userType === 'organisation' && (
                <>
                <Tabs.TabPane tab="Inventory" key="1"><Inventory/></Tabs.TabPane>
                <Tabs.TabPane tab="Donars" key="2"></Tabs.TabPane>
                <Tabs.TabPane tab="Oraganisation" key="3"></Tabs.TabPane>
                </>
            )}
           </Tabs>
        </div>
    );
};

export default Profile;