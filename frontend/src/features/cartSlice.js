import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:8000";

// GET CART
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");

            const { data } = await axios.get(`${API}/cart/getCart`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return data.cart;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// ADD TO CART
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ foodId, quantity }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");

            const { data } = await axios.post(
                `${API}/cart/addToCart`,
                { foodId, quantity },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            return data.cart;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 🔹 REMOVE ITEM
export const removeItem = createAsyncThunk(
    "cart/removeItem",
    async (foodId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");

            const { data } = await axios.delete( `${API}/cart/removeCartItem`, 
                { data: { foodId },
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            return data.cart;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateCartItem = createAsyncThunk(
    "cart/updateCart",
    async ({ foodId, type }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");

            const { data } = await axios.put(
                `${API}/cart/updateCart`,
                { foodId, type },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            return data.cart;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
    builder
        //  FETCH CART
        .addCase(fetchCart.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
        })
        .addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //  ADD TO CART
        .addCase(addToCart.fulfilled, (state, action) => {
            state.cart = action.payload;
        })

        // REMOVE ITEM
        .addCase(removeItem.fulfilled, (state, action) => {
            state.cart = action.payload;
        })

        //  UPDATE CART (OPTIMISTIC UPDATE)
        .addCase(updateCartItem.pending, (state, action) => {
            const { foodId, type } = action.meta.arg;

            const item = state.cart?.items?.find(
                (i) => i.food._id === foodId
            );

            if (item) {
                if (type === "inc") item.quantity += 1;
                if (type === "dec" && item.quantity > 1)
                    item.quantity -= 1;
            }

            // totalPrice locally calculate
            if (state.cart) {
                state.cart.totalPrice = state.cart.items.reduce(
                    (acc, item) =>
                        acc + item.food.price * item.quantity,
                    0
                );
            }
        })
        .addCase(updateCartItem.rejected, (state, action) => {
            state.error = action.payload;
        });
}

});

export default cartSlice.reducer;
