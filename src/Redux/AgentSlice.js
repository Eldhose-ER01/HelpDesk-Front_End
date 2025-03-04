import { createSlice } from "@reduxjs/toolkit";
const agentSlice=createSlice({
    name:'agent',
    initialState:{
        agentD:{
            token:null,
            agentname:null,
        }
    },
    reducers:{
        addagent:(state,action)=>{
            state.agentD.token=action.payload.token,
            state.agentD.agentname=action.payload.agentname
        },
        removeagent:(state)=>{
            state.agentD.token=null
            state.agentD.agentname=null
        }
    }
})
export const{addagent,removeagent}=agentSlice.actions
export default agentSlice.reducer