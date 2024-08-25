import axios from 'axios';

export const RegisterUser = async(data)=>{
    try{
        const response =await axios.post('http://localhost:5000/api/register',data).then(res=>res.data).catch(error=>error.message)
        console.log(response)
          return response;
    }catch(error){
          return error
    }
 
}

export const LoginUser = async(data)=>{
    try{
        const response =await axios.post('http://localhost:5000/api/login',data,
            {headers:{
                authorization: `Bearer ${localStorage.getItem("token")}`
            }}).then(res=>res.data).catch(error=>error.message)
        console.log(response)
          return response;
    }catch(error){
          return error
    }
 
}


export const getCurrentUser = async() =>{
    try{
        const response =await axios.get('http://localhost:5000/api/get-current-user', {headers:{
            authorization: `Bearer ${localStorage.getItem("token")}`
        }}).then(res=>res.data).catch(error=>error.message)
          return response;
    }catch(error){
          return error
    }
}