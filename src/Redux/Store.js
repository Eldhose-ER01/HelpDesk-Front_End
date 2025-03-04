import { configureStore } from "@reduxjs/toolkit";
import UserSlice from './UserSlice'
import AgentSlice from './AgentSlice'
import AdminSlice from './AdminSlice'
const store=configureStore({
    reducer:{
        user:UserSlice,
        agent:AgentSlice,
        admin:AdminSlice
    }
})
export default store
