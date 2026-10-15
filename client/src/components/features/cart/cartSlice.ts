
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Food } from "../../../types";
interface CartState {
items: CartItem[];
}
const initialState: CartState = { items: [] };
const cartSlice = createSlice({
name: "cart",
initialState,
reducers: {
    addToCart(state, action: PayloadAction<Food>) {
    const food = action.payload;
    const existing = state.items.find((item) => item.food._id === food._id);

    if (existing) {
        existing.quantity += 1;
    } else {
        state.items.push({ food, quantity: 1 });
    }
    },
    removeFromCart(state, action: PayloadAction<string>) {
    state.items = state.items.filter(
        (item) => item.food._id !== action.payload,
    );
    },
    changeQuantity(
    state,
    action: PayloadAction<{ foodId: string; quantity: number }>,
    ) {
    const item = state.items.find(
        (entry) => entry.food._id === action.payload.foodId,
    );
    if (!item) return;

    if (action.payload.quantity <= 0) {
        state.items = state.items.filter(
        (entry) => entry.food._id !== action.payload.foodId,
        );
    } else {
        item.quantity = Math.min(action.payload.quantity, 50);
    }
    },
    clearCart(state) {
    state.items = [];
    },
},
});

export const { addToCart, removeFromCart, changeQuantity, clearCart } =
cartSlice.actions;
export default cartSlice.reducer;