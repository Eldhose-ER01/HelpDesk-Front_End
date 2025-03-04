import { createSlice } from "@reduxjs/toolkit";
const userSlice=createSlice({
    name:'user',
    initialState:{
        userD:{
            token:null,
            username:null,
        }
    },
    reducers:{
        addUser:(state,action)=>{
            state.userD.token=action.payload.token,
            state.userD.username=action.payload.username
        },
        removeUser:(state)=>{
            state.userD.token=null
            state.userD.username=null
        }
    }
})
export const{addUser,removeUser}=userSlice.actions
export default userSlice.reducer