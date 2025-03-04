import { createSlice } from "@reduxjs/toolkit";
const adminSlice=createSlice({
    name:'admin',
    initialState:{
        adminD:{
            token:null,
            adminname:null,
        }
    },
    reducers:{
        addadmin:(state,action)=>{
            state.adminD.token=action.payload.token,
            state.adminD.adminname=action.payload.adminname
        },
        removeadmin:(state)=>{
            state.adminD.token=null
            state.adminD.adminname=null
        }
    }
})
export const{addadmin,removeadmin}=adminSlice.actions
export default adminSlice.reducer