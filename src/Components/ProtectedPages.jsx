import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../ApiCalls/ApiCalls";
import { App,message } from "antd";
import { useNavigate } from "react-router-dom";
import { getCurrentUsername } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../Redux/userSlice";
import { setLoading } from "../Redux/loaderSlice";
import logo from '../../src/Assets/saka-02.png'
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";

const ProtectedPages = ({ children }) => {
  const { currentUser } = useSelector((state) => state.users);
  const { loading } = useSelector((state) => state.loader);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUser = async() => {
    try {
      dispatch(setLoading(true));
      const decode = jwtDecode(localStorage.getItem('token'));
      const currentEpoch = Math.floor(Date.now() / 1000);
      if(currentEpoch<decode.exp){
        const response = await getCurrentUser();
        if (response.status) {
          message.success(response.message);
          dispatch(setCurrentUser(response.data));
          dispatch(setLoading(false));
        } else {
          dispatch(setLoading(false));
          throw new Error(response);
        }
      }else{
        dispatch(setLoading(false));
        logout()
      }
    
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
      logout()
    }
  };

  useEffect(() => {
   
    if (localStorage.getItem("token")) {
      getUser();
    } else {
      navigate("/login");
    }
  }, []);

const logout = () =>{
  if (localStorage.getItem("token")) {
    localStorage.removeItem('token')
    navigate("/login");
  }
}

  return (
    currentUser && (
      <App>
      <div>
        <div className="flex justify-between items-center bg-primary text-white p-9 h-3 shadow-lg absolute top-0 right-0 left-0">
        <div className="w-60 flex">
          <div className="text-center cursor-pointer" onClick={()=>navigate('/')}>
          <img className="w-32 m-0" src={logo} alt='image'/>
          <p className="-mt-3 text-lg">Blood Donation</p>
          </div>
        </div>
        <h1>{currentUser.userType}</h1>
        <div className="flex justify-between">
        <p onClick={()=>navigate('/profile')} className="text-lg me-6 cursor-pointer"><UserOutlined className="text-xl"/> {getCurrentUsername(currentUser)}</p> 
        <LogoutOutlined onClick={logout} className="ms-6 text-2xl cursor-pointer"/>
        </div>
       
        </div>
        <div className="p-5 pt-24">{children}</div>
        
      </div>
      </App>
    )
  );
};

export default ProtectedPages;
