import moment from "moment"

export const getCurrentUsername = (user) =>{
    if(user.userType==="donor"){
        return user.name
    }else if(user.userType==="hospital"){
        return user.hospitalName
    }else if(user.userType==="organisation"){
        return user.organisationName
    }
}


// export const getAntdValidation = () =>{
//     return [
//         {
//             required:true,
//             message:'Required'
//         },
//     ];
// };


export const getDateFormat = (date) =>{
    return moment(date).format('DD MMM YYYY hh:mm A')
}