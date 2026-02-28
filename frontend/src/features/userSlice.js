import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API = "http://localhost:8000";

// Get User Profile
export const getUser = createAsyncThunk("user/getUser", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("accessToken");

        const res = await axios.get(`${API}/user/getProfile`, {
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


// Delete User
export const deleteUser = createAsyncThunk("user/deleteUser", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("accessToken");

        const res = await axios.delete(`${API}/user/deleteProfile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;

    } catch (error) {
        return rejectWithValue(error.response?.data);
    }
}
);

//getSingleFood
export const getSingleFood = createAsyncThunk(
    "food/getSingleFood",
    async (id, { rejectWithValue }) => {
        try {
              const token = localStorage.getItem("accessToken");
            const res = await axios.get(`${API}/food/getSingleFood/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        foods: [],
        singleFood: null,
        user: null,
        loading: false,
        error: null,
    },

    extraReducers: (builder) => {
        builder

            // GET USER
            .addCase(getUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // DELETE USER
            .addCase(deleteUser.fulfilled, (state) => {
                state.user = null;
                localStorage.removeItem("token");
            })
            // GET SINGLE FOOD
            .addCase(getSingleFood.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleFood.fulfilled, (state, action) => {
                state.loading = false;
                state.singleFood = action.payload;
            })
            .addCase(getSingleFood.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;
