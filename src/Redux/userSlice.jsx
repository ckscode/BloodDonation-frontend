import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
     name:'users',
     initialState:{
           currentUser:null
     },
     reducers:{
        setCurrentUser(state,action){
            state.currentUser = action.payload
        }
     }
})

export const {setCurrentUser} = userSlice.actions;

export default userSlice.reducer;