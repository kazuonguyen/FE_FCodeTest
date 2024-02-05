import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { clearMessage } from "@/redux/slice/alertSlice";
import { fetchAuth } from "../apiUtils";

export default async function PostLogin(
    email: string,
    password: string,
    router: AppRouterInstance,
    dispatch: Dispatch<AnyAction>,
    setShowError: (value: boolean) => void,
) {
    try {
        const res = await fetchAuth("auth/login", {
            method: "POST",
            body: {
                username: email,
                password,
            },
            withToken: false,
        });
        const data = await res.json();
        if (res.status === 200) {
            // Save access token and refresh token in local storage
            localStorage.setItem("ACCESS_TOKEN", data.data.access_token);
            localStorage.setItem("REFRESH_TOKEN", data.data.refresh_token);
            // Save user_id in local storage
            localStorage.setItem("user_id", data.data.user.id);
            // After login success, redirect to home page
            window.location.href = "/";
        } else {
            throw new Error("Đã có lỗi xảy ra, vui lòng thử lại sau!");
        }
    } catch (error) {
        setShowError(true);
    }
}
