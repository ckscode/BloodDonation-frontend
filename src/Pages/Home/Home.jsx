import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getHomeInventory } from '../../ApiCalls/ApiCalls';
import { message } from 'antd';
import { setLoading } from '../../Redux/loaderSlice';
import { getCurrentUsername } from '../../utils/Utils';
import InventoryTable from '../../Components/InventoryTable';
import useLogin from '../../ApiCalls/useLogin';


const Home = () => {
  useLogin()
    const {currentUser} = useSelector((state)=>state.users);
    const [bloodGroupData,setBloodGroupData] = useState()
     const dispatch = useDispatch();
     const [id,setId] = useState();

     useEffect(()=>{
    getData()
   },[])
   
    const getData = async () => {
        try {
          dispatch(setLoading(true));
          const response = await getHomeInventory();
          dispatch(setLoading(false));
          if (response.status) {
            setBloodGroupData(response.data);
          } else {
            throw new Error(response.message);
          }
        } catch (error) {
          message.error(error.message);
          dispatch(setLoading(false));
        }
      };



    return (
        <div className='h-screen '>
           {currentUser&&currentUser.userType === 'donor'&&
          <>
          <div className='w-full mt-3 flex justify-evenly grid grid-cols-4 gap-5'>
          
            </div>

            <h2 className='mt-4'>Your Recent Donations</h2>
            <InventoryTable
            filters={{
                donor:currentUser._id
            }}
            limit={5}
            pagination={false}
            /></>}
          {currentUser&&currentUser.userType === 'organisation'&&
          <>
          <div className='w-full mt-3 flex justify-evenly grid grid-cols-4 gap-5'>
            {bloodGroupData&&bloodGroupData.map((ele,index)=>{
                return(
               <div key={index} className='bg-red-300 text-primary rounded-lg p-4 flex justify-between items-center shadow-md'>
                <h1 className='text-6xl'>{ele.bloodgroup}</h1>
                <div className='w-1/2'>
                <div className='font-semibold  flex justify-between'>Total In: <span className='font-bold'>{ele.totalIn} ML</span></div>
                <div className='font-semibold  flex justify-between'>Total Out: <span className='font-bold'>{ele.totalOut} ML</span></div>
                <div className='font-semibold  flex justify-between'>Available: <span className='font-bold'>{ele.available===null?'0':ele.available} ML</span></div>
                </div>
               </div>
                )
            })}
            </div>

            <h2 className='mt-4'>Your Recent Inventories</h2>
            <InventoryTable
            filters={{
                organisation:currentUser._id
            }}
            limit={5}
            pagination={false}
            /></>}
                 {currentUser&&currentUser.userType === 'hospital'&&
          <>
          <div className='w-full mt-3 flex justify-evenly grid grid-cols-4 gap-5'>
          
            </div>

            <h2 className='mt-4'>Your Recent Consumptions</h2>
            <InventoryTable
            filters={{
                hospital:currentUser._id
            }}
            limit={5}
            pagination={false}
            /></>}
        </div>
    );
};

export default Home;