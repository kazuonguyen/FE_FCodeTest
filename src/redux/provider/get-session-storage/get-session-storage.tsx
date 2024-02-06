"use client";

//! TEST SESSION STORAGE
import { useLayoutEffect, useEffect } from "react";
import { useDispatch } from "react-redux";
import { User, loginSuccess } from "../../slice/authSlice";

interface GetSessionStorageProps {
    children: React.ReactNode;
}

export default function GetSessionStorage({ children }: GetSessionStorageProps) {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const user: User | null = JSON.parse(sessionStorage.getItem("user") || "null");

        if (user) {
            dispatch(loginSuccess(user));
        }
    }, []);
    useEffect(() => {
        const script = document.createElement("script");

        script.src = "./assets/js/slide.js";

        document.body.appendChild(script);

        return () => {
            // clean up the script when the component in unmounted
            document.body.removeChild(script);
        };
    }, []);

    return <div>{children}</div>;
}
