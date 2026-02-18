import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:8000";

//getAllUser
export const getAllUsers = createAsyncThunk("admin/getAllUsers", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("accessToken");

        const res = await axios.get(`${API}/user/getAllUser`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data.users;;

    } catch (error) {
        return rejectWithValue(error.response?.data?.message);
    }
}
);

export const getDashboardStats = createAsyncThunk("admin/getDashboardStats", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("accessToken");

        const res = await axios.get(`${API}/user/getTotal`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res)
        return res.data.stats;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message);
    }
}
);

//getAllFood
export const getAllFoods = createAsyncThunk("admin/getAllFoods",
    async ({ page = 1, search = "", category = "", foodType = "" }, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${API}/food/getAllFood?page=${page}&search=${search}&category=${category}&foodType=${foodType}`,
            );
            console.log(res)
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

//deleteFood
export const deleteFoods = createAsyncThunk("food/deleteFood", async (id, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("accessToken");

        const res = await axios.delete(`${API}/food/deleteFood/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return id;

    } catch (error) {
        return rejectWithValue(error.response?.data);
    }
}
);

export const fetchAllOrders = createAsyncThunk("orders/fetchAllOrders", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("accessToken");

        const res = await axios.get(`${API}/order/getAllOrder`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(res)
        return res.data;


    } catch (error) {
        return rejectWithValue(error.response?.data);
    }
}
);

export const addFood = createAsyncThunk("food/addFood", async (formData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("accessToken");

        const res = await axios.post(
            `${API}/food/addFood`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,

                },
            }
        );

        return {
            status: res.status,
            message: res.data.message,
        };


    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || "Something went wrong"
        );
    }
}
);

export const updateFood = createAsyncThunk("admin/updateFood",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const res = await axios.put(
                `http://localhost:8000/food/updateFood/${id}`,
                data, {
                headers: {
                    Authorization: `Bearer ${token}`,

                },
            }
            );

            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Update failed"
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
