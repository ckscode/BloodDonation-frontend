import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL;

export const addInventory = async(data) =>{
    try{
        const response =await axios.post(`${API_URL}/api/inventory/add`,data, {headers:{
            authorization: `Bearer ${localStorage.getItem("token")}`
        }}).then(res=>res.data).catch(error=>error.message)
        return response;
    }catch(error){
        return error;
    }
 
}

export const getInventory = async() =>{
    try{
        const response = await axios.get(`${API_URL}/api/inventory/get`, {headers:{
            authorization: `Bearer ${localStorage.getItem("token")}`
        }}).then(res=>res.data).catch(error=>error.message)
          return response;
    }catch(error){
          return error
    }
}


export const getInventoryWithFilters = async({filters,limit}) =>{
    try{
        const response = await axios.post(`${API_URL}/api/inventory/getWithFilters`,{filters,limit}, {headers:{
            authorization: `Bearer ${localStorage.getItem("token")}`
        }}).then(res=>res.data).catch(error=>error.message)
          return response;
    }catch(error){
          return error
    }
}









