import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const RegisterUser = async(data)=>{
    try{
        const response =await axios.post(`${API_URL}/api/user/register`,data).then(res=>res.data).catch(error=>error.message);
          return response;
    }catch(error){
          return error
    }
 
}

export const LoginUser = async(data)=>{
    try{
        const response =await axios.post(`${API_URL}/api/user/login`,data,
            {headers:{
                authorization: `Bearer ${localStorage.getItem("token")}`
            }}).then(res=>res.data).catch(error=>error.message)
      
          return response;
    }catch(error){
          return error
    }
 
}


export const getCurrentUser = async() =>{
    try{
        const response =await axios.get(`${API_URL}/api/user/get-current-user`, {headers:{
            authorization: `Bearer ${localStorage.getItem("token")}`
        }}).then(res=>res.data).catch(error=>error.message)
          return response;
    }catch(error){
          return error
    }
}