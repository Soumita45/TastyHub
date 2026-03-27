import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:8000";

export const checkoutOrder = createAsyncThunk(
    "order/checkout",
    async (paymentMethod, { rejectWithValue }) => {
        try {

            const { data } = await axios.post(
                `${API}/order/checkout`,
                { paymentMethod },
                {
                    withCredentials: true
                }
            );

            return data.order;

        } catch (error) {

            return rejectWithValue(
                error.response?.data
            );

        }
    }
);

export const getMyOrders = createAsyncThunk(
    "order/getMyOrders",
    async (_, { rejectWithValue }) => {
        try {

            const { data } = await axios.get(
                `${API}/order/getMyOrder`,
                {
                    withCredentials: true
                }
            );

            return data.orders;

        } catch (error) {

            return rejectWithValue(
                error.response?.data
            );

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

            // CHECKOUT
            .addCase(checkoutOrder.pending, (state) => {
                state.loading = true;
            })

            .addCase(checkoutOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;

                // নতুন order list-এর শুরুতে add হবে
                state.orders.unshift(
                    action.payload
                );
            })

            .addCase(checkoutOrder.rejected, (state) => {
                state.loading = false;
            })

            // GET MY ORDERS
            .addCase(getMyOrders.pending, (state) => {
                state.loading = true;
            })

            .addCase(getMyOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })

            .addCase(getMyOrders.rejected, (state) => {
                state.loading = false;
            });

    },
});

export const { resetOrderState } =
    orderSlice.actions;

export default orderSlice.reducer;