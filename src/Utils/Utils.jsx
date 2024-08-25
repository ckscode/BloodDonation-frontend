export const getCurrentUsername = (user) =>{
    if(user.userType==="donor"){
        return user.name
    }else if(user.userType==="hospital"){
        return user.hospitalName
    }else if(user.userType==="organisation"){
        return user.organisationName
    }
}