import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Inventory from './Inventory/Inventory';
import Donors from './Donor/Donors';
import Hospitals from './Hospital/Hospitals';
import Organisations from './Organisation/Organisations';
import Donations from './Donation/Donations';
import InventoryTable from '../../Components/InventoryTable';

const Profile = () => {
    const {currentUser} = useSelector((state)=>state.users);

     const items = [
        {
            key:'1',
            label:'Inventory',
            children:<Inventory />
        },   
        {
            key:'2',
            label:'Donors',
            children:<Donors />,
        },
        {
            key:'3',
            label:'Hospitals',
            children:<Hospitals />,
        }
     ]
    
     const items2 = [
        {
            key:'1',
            label:'Donations',
            children:<InventoryTable
            filters={{
                inventoryType:'in',
                donor:currentUser._id
            }}/>
        },   
        {
            key:'2',
            label:'Organisations',
            children:<Organisations userType={'donor'}/>
        }
     ]

     const items3 = [
        {
            key:'1',
            label:'Consumptions',
            children:<InventoryTable
            filters={{
                inventoryType:'out',
                hospital:currentUser._id
            }}/>
        },   
        {
            key:'2',
            label:'Organisations',
            children:<Organisations userType={'hospital'}/>
        }
     ]

    
    return (
        <div>
           
            {currentUser.userType === 'organisation' && (
                <Tabs defaultActiveKey='1' items={items}/>
             
            )}
            {currentUser.userType === 'donor' && (
           <Tabs defaultActiveKey='1' items={items2}/>
            )}
         
         {currentUser.userType === 'hospital' && (
           <Tabs defaultActiveKey='1' items={items3}/>
            )}
        </div>
    );
};

export default Profile;