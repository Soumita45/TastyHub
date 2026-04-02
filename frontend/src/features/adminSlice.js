import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getAllUsers = createAsyncThunk(
    "admin/getAllUsers",
    async (_, { rejectWithValue }) => {
        try {

            const res = await axios.get(
                `${API}/user/getAllUser`,
                {
                    withCredentials: true
                }
            );

            return res.data.users;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message
            );

        }
    }
);

export const getDashboardStats = createAsyncThunk(
    "admin/getDashboardStats",
    async (_, { rejectWithValue }) => {
        try {

            const res = await axios.get(
                `${API}/user/getTotal`,
                {
                    withCredentials: true
                }
            );

            console.log(res);

            return res.data.stats;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message
            );

        }
    }
);

export const getAllFoods = createAsyncThunk(
    "admin/getAllFoods",
    async (
        { page = 1, search = "", category = "", foodType = "" },
        { rejectWithValue }
    ) => {
        try {

            const res = await axios.get(
                `${API}/food/getAllFood?page=${page}&search=${search}&category=${category}&foodType=${foodType}`,
                {
                    withCredentials: true
                }
            );

            console.log(res);

            return res.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message
            );

        }
    }
);

export const deleteFoods = createAsyncThunk(
    "food/deleteFood",
    async (id, { rejectWithValue }) => {
        try {

            await axios.delete(
                `${API}/food/deleteFood/${id}`,
                {
                    withCredentials: true
                }
            );

            return id;

        } catch (error) {

            return rejectWithValue(
                error.response?.data
            );

        }
    }
);

export const fetchAllOrders = createAsyncThunk(
    "orders/fetchAllOrders",
    async (_, { rejectWithValue }) => {
        try {

            const res = await axios.get(
                `${API}/order/getAllOrder`,
                {
                    withCredentials: true
                }
            );

            console.log(res);

            return res.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data
            );

        }
    }
);

export const addFood = createAsyncThunk(
    "food/addFood",
    async (formData, { rejectWithValue }) => {
        try {

            const res = await axios.post(
                `${API}/food/addFood`,
                formData,
                {
                    withCredentials: true
                }
            );

            return {
                status: res.status,
                message: res.data.message,
            };

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message
                || "Something went wrong"
            );

        }
    }
);

export const updateFood = createAsyncThunk(
    "admin/updateFood",
    async ({ id, data }, { rejectWithValue }) => {
        try {

            const res = await axios.put(
                `${API}/food/updateFood/${id}`,
                data,
                {
                    withCredentials: true
                }
            );

            return res.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message
                || "Update failed"
            );

        }
    }
);

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        foods: [],
        orders: [],
        totalUsers: 0,
        totalOrders: 0,
        totalFoods: 0,
        totalPages: 1,
        totalItems: 0,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            //getAllUser
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })

            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //getTotal
            .addCase(getDashboardStats.fulfilled, (state, action) => {
                state.loading = false;
                state.totalUsers = action.payload.totalUsers;
                state.totalOrders = action.payload.totalOrders;
                state.totalFoods = action.payload.totalFoods;
            })
            //getAllFood
            .addCase(getAllFoods.fulfilled, (state, action) => {
                state.loading = false;
                state.foods = action.payload.data;
                state.totalPages = action.payload.totalPages;
                state.totalItems = action.payload.totalItems;
            })
            //deleteFood 
            .addCase(deleteFoods.fulfilled, (state, action) => {
                state.loading = false;

                state.foods = state.foods.filter(
                    (food) => food._id !== action.payload
                );
            })
            //fetchOrder
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders;

            })
            //addFood
            .addCase(addFood.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })

            .addCase(addFood.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.statusCode = action.payload.status;
                state.message = action.payload.message; 
            })

            .addCase(addFood.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload; 
            })

            //update food 
            .addCase(updateFood.fulfilled, (state, action) => {
                state.loading = false;
                const updatedFood = action.payload.data;
                state.foods = state.foods.map((food) =>
                    food._id === updatedFood._id ? updatedFood : food
                );
            })

    },
});

export default adminSlice.reducer;
