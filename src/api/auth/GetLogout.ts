import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { setError } from "@/redux/slice/alertSlice";

export default async function GetLogout(dispatch: Dispatch<AnyAction>, router: AppRouterInstance) {
    try {
        const api = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${api}auth/logout`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("REFRESH_TOKEN")}`,
            },
        });
        const data = await res.json();
        if (res.status === 200) {
            // Remove token
            localStorage.removeItem("ACCESS_TOKEN");
            localStorage.removeItem("REFRESH_TOKEN");
            localStorage.removeItem("user_id");
            // Direct to login page
            router.push("/login");
        } else if (data.message_vi) {
            dispatch(setError(data.message_vi));
        } else {
            throw new Error("Đã có lỗi xảy ra, vui lòng thử lại sau!");
        }
    } catch (error) {
        dispatch(setError("Đã có lỗi xảy ra, vui lòng thử lại sau!"));
    }
}
