import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getHomeInventory } from '../../ApiCalls/ApiCalls';
import { message } from 'antd';
import { setLoading } from '../../Redux/loaderSlice';
import { getCurrentUsername } from '../../utils/Utils';


const Home = () => {
    const {currentUser} = useSelector((state)=>state.users);
    const [bloodGroupData,setBloodGroupData] = useState()
     const dispatch = useDispatch();
  
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

useEffect(()=>{
   getData()
},[])

    return (
        <div className='h-screen '>
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
        </div>
    );
};

export default Home;