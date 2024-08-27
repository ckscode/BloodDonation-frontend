import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL;

export const addInventory = async(data) =>{
    try{
        const response =await axios.post(`${API_URL}/api/inventory/add`,data).then((res)=>res.data).catch(error=>error.message);
        return response;
    }catch(error){
        return error;
    }
 
}