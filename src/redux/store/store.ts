"use client";

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import alertSlice from "../slice/alertSlice";
import orderSlice from "../slice/orderSlice";
import shipmentSlice from "../slice/shipmentSlice";
import selectedOrderSlice from "../slice/selectedOrderSlice";

const store = configureStore({
    reducer: {
        alert: alertSlice,
        auth: authSlice,
        order: orderSlice,
        selectedOrder: selectedOrderSlice,
        shipment: shipmentSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
