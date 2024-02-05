/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SelectedOrderState {
    selectedOrders: string[];
    total_price: number;
}

const initialState: SelectedOrderState = {
    selectedOrders: [],
    total_price: 0,
};

const selectedOrderSlice = createSlice({
    name: "selectedOrder",
    initialState,
    reducers: {
        addSelectedOrder(state, action: PayloadAction<string>) {
            // Check if order is not in selectedOrder
            if (!state.selectedOrders.includes(action.payload)) {
                state.selectedOrders.push(action.payload);
            }
        },
        removeSelectedOrder(state, action: PayloadAction<string>) {
            // Check if order is in selectedOrder, then remove it
            if (state.selectedOrders.includes(action.payload)) {
                state.selectedOrders = state.selectedOrders.filter(
                    (order) => order !== action.payload,
                );
            }
        },
        addAllSelectedOrder(state, action: PayloadAction<string[]>) {
            state.selectedOrders = action.payload;
        },
        removeAllSelectedOrder(state) {
            state.selectedOrders = [];
        },
    },
});

export const {
    addSelectedOrder,
    removeSelectedOrder,
    removeAllSelectedOrder,
    addAllSelectedOrder,
} = selectedOrderSlice.actions;
export default selectedOrderSlice.reducer;
