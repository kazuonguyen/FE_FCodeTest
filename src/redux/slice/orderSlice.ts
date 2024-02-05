/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { clear } from "console";
import { Order } from "@/hooks/useGetOrderList";

export interface OrderState {
    orders: Order[];
    filterOrderByCode: string;
    filterOrderByStatus: string;
    filterOrderLeftPrice: number;
    filterOrderRightPrice: number;
    filterOrderLeftCount: number;
    filterOrderRightCount: number;
    filterOrderCloType: string;
    counterPage: number;
    limitItemPerPage: number;
    filterOrderByCreateAt: string;
}

const initialState: OrderState = {
    orders: [],
    filterOrderByCode: "",
    filterOrderByStatus: "",
    filterOrderLeftPrice: 0,
    filterOrderRightPrice: 2147483646,
    filterOrderLeftCount: 1,
    filterOrderRightCount: 2147483646,
    counterPage: 1,
    filterOrderCloType: "",
    limitItemPerPage: 10,
    filterOrderByCreateAt: "",
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrders(state, action: PayloadAction<Order[]>) {
            state.orders = action.payload;
        },
        setCounterPage: (state, action: PayloadAction<number>) => {
            state.counterPage = action.payload;
        },
        setFilterByCode(state, action: PayloadAction<string>) {
            state.filterOrderByCode = action.payload;
        },
        setFilterByStatus(state, action: PayloadAction<string>) {
            state.filterOrderByStatus = action.payload;
        },
        setFilterByLeftPrice(state, action: PayloadAction<number>) {
            state.filterOrderLeftPrice = action.payload;
        },
        setFilterByRightPrice(state, action: PayloadAction<number>) {
            state.filterOrderRightPrice = action.payload;
        },
        setFilterByLeftCount(state, action: PayloadAction<number>) {
            state.filterOrderLeftCount = action.payload;
        },
        setFilterByRightCount(state, action: PayloadAction<number>) {
            state.filterOrderRightCount = action.payload;
        },
        setLimitItemPerPage(state, action: PayloadAction<number>) {
            state.limitItemPerPage = action.payload;
        },
        setFilterByCloType(state, action: PayloadAction<string>) {
            state.filterOrderCloType = action.payload;
        },
        setFilterByCreateAt(state, action: PayloadAction<string>) {
            state.filterOrderByCreateAt = action.payload;
        },
        updateOrder(state, action: PayloadAction<Order>) {
            // Find index of specific object using findIndex method.
            const index = state.orders.findIndex(
                (order) => order.id_order === action.payload.id_order,
            );
            // If object exists, update it.
            if (index !== -1) {
                state.orders[index] = action.payload;
            }
        },
        clearFilter(state) {
            state.filterOrderByCode = "";
            state.filterOrderByStatus = "";
            state.filterOrderLeftPrice = 0;
            state.filterOrderRightPrice = 2147483646;
            state.filterOrderLeftCount = 1;
            state.filterOrderRightCount = 2147483646;
            state.filterOrderCloType = "";
            state.filterOrderByCreateAt = "";
        },
        clearLimitItemPerPage(state) {
            state.limitItemPerPage = 10;
        },
        clearCounterPage(state) {
            state.counterPage = 1;
        },
        clearFilterByCode(state) {
            state.filterOrderByCode = "";
        },
        clearFilterByStatus(state) {
            state.filterOrderByStatus = "";
        },
        clearFilterByPrice(state) {
            state.filterOrderLeftPrice = 0;
            state.filterOrderRightPrice = 2147483646;
        },
        clearFilterByCount(state) {
            state.filterOrderLeftCount = 1;
            state.filterOrderRightCount = 2147483646;
        },
        clearFilterByCloType(state) {
            state.filterOrderCloType = "";
        },
        clearFilterByCreateAt(state) {
            state.filterOrderByCreateAt = "";
        },
    },
});

export const {
    setOrders,
    updateOrder,
    setFilterByCode,
    setFilterByLeftCount,
    setFilterByLeftPrice,
    setFilterByRightCount,
    setFilterByRightPrice,
    setFilterByStatus,
    setCounterPage,
    setFilterByCloType,
    setLimitItemPerPage,
    setFilterByCreateAt,
    clearFilter,
    clearFilterByCode,
    clearCounterPage,
    clearFilterByCount,
    clearFilterByPrice,
    clearFilterByStatus,
    clearLimitItemPerPage,
    clearFilterByCloType,
    clearFilterByCreateAt,
} = orderSlice.actions;
export default orderSlice.reducer;
