import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../../features/userSlice";
import adminSlice from "../../features/adminSlice";
import cartSlice from "../../features/cartSlice";


const store = configureStore({
    reducer:{
    user:userSlice,
    admin:adminSlice,
    cart:cartSlice
    }
})

export default store