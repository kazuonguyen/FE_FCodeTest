/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AlertState {
    messages: number | 0;
    type: string | null;
    showMessage: boolean;
}

const initialState: AlertState = {
    messages: 0,
    type: null,
    showMessage: false,
};

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        addProduct: (state) => {
            // console.log("success");
            state.messages += 1;
            state.type = "success";
            state.showMessage = true;
        },
    },
});

export const { addProduct } = alertSlice.actions;
export default alertSlice.reducer;
