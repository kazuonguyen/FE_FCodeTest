/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// STATE FOR LOGIN AND AUTHENTICATION
export interface User {
    name: string;
    avatar: string;
    birthday: string;
    email: string;
    phone_number: string;
    rank: number;
    status: string;
    username: string;
    address: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    isLoading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<User>) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logoutSuccess(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.isLoading = true;
        },
        loadingSuccess(state) {
            state.isLoading = false;
        },
        changeNameSuccess(state, action: PayloadAction<string>) {
            if (state.user) {
                state.user.name = action.payload;
            }
        },
        changePhoneSuccess(state, action: PayloadAction<string>) {
            if (state.user) {
                state.user.phone_number = action.payload;
            }
        },
        changeBirthdaySuccess(state, action: PayloadAction<string>) {
            if (state.user) {
                state.user.birthday = action.payload;
            }
        },
    },
});

export const {
    loginSuccess,
    logoutSuccess,
    loadingSuccess,
    changeNameSuccess,
    changePhoneSuccess,
    changeBirthdaySuccess,
} = authSlice.actions;
export default authSlice.reducer;
