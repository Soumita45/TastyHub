import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../../features/userSlice";
import adminSlice from "../../features/adminSlice";
import cartSlice from "../../features/cartSlice";
import orderSlice from "../../features/orderSlice";



const store = configureStore({
    reducer:{
    user:userSlice,
    admin:adminSlice,
    cart:cartSlice,
    order:orderSlice
    }
})

export default store