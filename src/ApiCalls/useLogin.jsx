import { message } from 'antd';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
    const navigate = useNavigate()
    const getUser = () =>{
        try{
            const decode = jwtDecode(localStorage.getItem('token'));
            const currentEpoch = Math.floor(Date.now() / 1000);
            if(currentEpoch>decode.exp){
                if (localStorage.getItem("token")) {
                    localStorage.removeItem('token')
                    navigate("/login");
                  }

                  return;
            }
        }catch(error){
            message.error(error)
            localStorage.removeItem('token')
            navigate("/login");
        }
    }
  useEffect(()=>{
       getUser();
  },[])
  
}; 

export default useLogin;