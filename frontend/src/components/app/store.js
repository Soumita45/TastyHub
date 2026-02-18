import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../../features/userSlice";
import adminSlice from "../../features/adminSlice";

const store = configureStore({
    reducer:{
    user:userSlice,
    admin:adminSlice
    }
})

export default store