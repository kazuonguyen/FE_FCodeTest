"use client";

import { useLayoutEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import LoadingPage from "../Loading/LoadingPage";
import { RootState } from "@/redux/store/store";
import { loginSuccess, loadingSuccess } from "@/redux/slice/authSlice";
import { fetchAuth } from "@/api/apiUtils";

export default function ProtectedAuth({ children }: { children: React.ReactNode }) {
    // // State for checking if the user is authenticated
    // const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    // // State for checking if the user is loading
    // const isLoading = useSelector((state: RootState) => state.auth.isLoading);
    // // Dispatch function
    // const dispatch = useDispatch();
    // // Router for redirecting the user
    // const router = useRouter();
    // // Pathname for redirecting the user
    // const pathname = usePathname();
    // // Ref for storing the previous pathname
    // const prevPathname = useRef<string>(pathname);
    // // Cookies for storing the access token and refresh token
    // const [cookies, , removeCookie] = useCookies();
    // // Function for get profile user
    // const getProfile = async () => {
    //     try {
    //         const res = await fetchAuth("protected/profile", {
    //             method: "GET",
    //             withToken: true,
    //         });

    //         if (res.status === 200) {
    //             const data = await res.json();
    //             dispatch(loginSuccess(data.data));
    //             if (pathname === "/login") {
    //                 router.replace("/");
    //             } else {
    //                 dispatch(loadingSuccess());
    //             }
    //         } else {
    //             throw new Error("Error");
    //         }
    //     } catch (error) {
    //         if (pathname === "/login") {
    //             dispatch(loadingSuccess());
    //         } else {
    //             router.replace("/login");
    //         }
    //     }
    // };

    // // Get profile data when the component is mounted
    // useLayoutEffect(() => {
    //     getProfile();
    // }, []);

    // // Perform check if the pathname is changed
    // useLayoutEffect(() => {
    //     // Check if changed pathname is not the same as the previous pathname
    //     if (pathname !== prevPathname.current) {
    //         if (pathname === "/" && isAuthenticated) {
    //             dispatch(loadingSuccess());
    //         }
    //         // Check if the user is not authenticated
    //         else if (pathname === "/login" && !isAuthenticated) {
    //             dispatch(loadingSuccess());
    //         }
    //     }
    //     // Update the previous pathname
    //     prevPathname.current = pathname;
    // }, [pathname, isAuthenticated]);

    // Return the loading page if the user is loading
    // if (isLoading) {
    //     return <LoadingPage />;
    // }

    // Return the children if the user is not loading
    return children;
}
