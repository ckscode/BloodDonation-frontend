import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../ApiCalls/ApiCalls';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getCurrentUsername } from '../utils/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../Redux/userSlice';

const ProtectedPages = ({children}) => {
   const {currentUser} = useSelector((state)=>state.users);
   const dispatch = useDispatch();
   const navigate = useNavigate();
    const getUser = async() =>{
    try{
       const response = await getCurrentUser();
       if(response.status){
        message.success(response.message)
       dispatch(setCurrentUser(response.data))
       }else{
        throw new Error(response)
       }
    }catch(error){
          message.error(error.message)
    }
    }

  useEffect(()=>{
    if(localStorage.getItem("token")){
        getUser()
    }else{
         navigate('/login')
    }
  },[])

    return (
    currentUser&&(
        <div>
        <h1>{getCurrentUsername(currentUser)}</h1>
            {children}
        </div>
    )
       
    );
};

export default ProtectedPages;