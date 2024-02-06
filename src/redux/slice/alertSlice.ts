/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AlertState {
    messages: string | null;
    type: string | null;
    showMessage: boolean;
    count: number | 0;
}

const initialState: AlertState = {
    messages: null,
    type: null,
    showMessage: false,
    count: 0,
};

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        addProduct: (state) => {
            // console.log("success");
            state.type = "success";
            state.showMessage = true;
            state.count += 1;
        },
        setError: (state, action: PayloadAction<string>) => {
            //  console.log("error");
            state.messages = action.payload;
            state.type = "error";
            state.showMessage = true;
        },
        setSuccess: (state, action: PayloadAction<string>) => {
            // console.log("success");
            state.messages = action.payload;
            state.type = "success";
            state.showMessage = true;
        },
        clearMessage: (state) => {
            // console.log("clear");
            state.messages = null;
            state.type = null;
            state.showMessage = false;
        },
    },
});

export const { addProduct, setError, setSuccess, clearMessage } = alertSlice.actions;
export default alertSlice.reducer;
