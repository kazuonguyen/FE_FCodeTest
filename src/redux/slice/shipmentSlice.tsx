/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Shipment } from "@/hooks/useGetShipmentList";

export interface ShipmentState {
    shipments: Shipment[];
    filerShipmentByCode: string;
    filterShipmentByLeftPrice: number;
    filterShipmentByRightPrice: number;
    filterShipmentByLeftCount: number;
    filterShipmentByRightCount: number;
    filterShipmentByPaymentStatus: string;
    filterShipmentByDeliveryStatus: string;
    counterPage: number;
    limitItemsPerPage: number;
}

const initialState: ShipmentState = {
    shipments: [],
    filerShipmentByCode: "",
    filterShipmentByLeftPrice: 0,
    filterShipmentByRightPrice: 2147483646,
    filterShipmentByLeftCount: 1,
    filterShipmentByRightCount: 2147483646,
    filterShipmentByPaymentStatus: "",
    filterShipmentByDeliveryStatus: "",
    counterPage: 1,
    limitItemsPerPage: 10,
};

const shipmentSlice = createSlice({
    name: "shipment",
    initialState,
    reducers: {
        setShipments(state, action: PayloadAction<Shipment[]>) {
            state.shipments = action.payload;
        },
        updateShipment(state, action: PayloadAction<Shipment>) {
            const index = state.shipments.findIndex(
                (shipment) => shipment.id_delivery === action.payload.id_delivery,
            );
            if (index !== -1) state.shipments[index] = action.payload;
        },
        setFilterShipmentByCode(state, action: PayloadAction<string>) {
            state.filerShipmentByCode = action.payload;
        },
        setFilterShipmentByLeftPrice(state, action: PayloadAction<number>) {
            state.filterShipmentByLeftPrice = action.payload;
        },
        setFilterShipmentByRightPrice(state, action: PayloadAction<number>) {
            state.filterShipmentByRightPrice = action.payload;
        },
        setFilterShipmentByLeftCount(state, action: PayloadAction<number>) {
            state.filterShipmentByLeftCount = action.payload;
        },
        setFilterShipmentByRightCount(state, action: PayloadAction<number>) {
            state.filterShipmentByRightCount = action.payload;
        },
        setFilterShipmentByPaymentStatus(state, action: PayloadAction<string>) {
            state.filterShipmentByPaymentStatus = action.payload;
        },
        setFilterShipmentByDeliveryStatus(state, action: PayloadAction<string>) {
            state.filterShipmentByDeliveryStatus = action.payload;
        },
        setCounterPage(state, action: PayloadAction<number>) {
            state.counterPage = action.payload;
        },
        setLimitItemsPerPage(state, action: PayloadAction<number>) {
            state.limitItemsPerPage = action.payload;
        },
        clearFilterShipment(state) {
            state.filerShipmentByCode = "";
            state.filterShipmentByLeftPrice = 0;
            state.filterShipmentByRightPrice = 2147483646;
            state.filterShipmentByLeftCount = 1;
            state.filterShipmentByRightCount = 2147483646;
            state.filterShipmentByPaymentStatus = "";
            state.filterShipmentByDeliveryStatus = "";
            state.counterPage = 1;
        },
        clearFilterShipmentByCode(state) {
            state.filerShipmentByCode = "";
        },
        clearFilterShipmentByPrice(state) {
            state.filterShipmentByLeftPrice = 0;
            state.filterShipmentByRightPrice = 2147483646;
        },
        clearFilterShipmentByCount(state) {
            state.filterShipmentByLeftCount = 1;
            state.filterShipmentByRightCount = 2147483646;
        },
        clearFilterShipmentByPaymentStatus(state) {
            state.filterShipmentByPaymentStatus = "";
        },
        clearFilterShipmentByDeliveryStatus(state) {
            state.filterShipmentByDeliveryStatus = "";
        },
        clearLimitItemsPerPage(state) {
            state.limitItemsPerPage = 10;
        },
    },
});

export const {
    setShipments,
    updateShipment,
    setFilterShipmentByCode,
    setFilterShipmentByDeliveryStatus,
    setFilterShipmentByLeftCount,
    setCounterPage,
    setFilterShipmentByLeftPrice,
    setFilterShipmentByPaymentStatus,
    setFilterShipmentByRightCount,
    setFilterShipmentByRightPrice,
    setLimitItemsPerPage,
    clearFilterShipment,
    clearFilterShipmentByCode,
    clearFilterShipmentByCount,
    clearFilterShipmentByDeliveryStatus,
    clearFilterShipmentByPaymentStatus,
    clearFilterShipmentByPrice,
    clearLimitItemsPerPage,
} = shipmentSlice.actions;
export default shipmentSlice.reducer;
