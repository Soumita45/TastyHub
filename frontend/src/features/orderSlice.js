import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:8000";

//  CHECKOUT
export const checkoutOrder = createAsyncThunk(
    "order/checkout",
    async (paymentMethod, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");

            const { data } = await axios.post(
                `${API}/order/checkout`,
                { paymentMethod },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            return data.order;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//  GET MY ORDERS
export const getMyOrders = createAsyncThunk(
    "order/getMyOrders",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");

            const { data } = await axios.get(
                `${API}/order/getMyOrder`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            return data.orders;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        loading: false,
        success: false,
    },
    reducers: {
        resetOrderState: (state) => {
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkoutOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkoutOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.orders.unshift(action.payload);
            })
            .addCase(getMyOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
            });
    },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;