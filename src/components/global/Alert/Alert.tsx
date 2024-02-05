"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/store";
import { clearMessage } from "@/redux/slice/alertSlice";
import { XIcon } from "@/components/svg/svg";
import alert from "./alert.module.css";

export default function Alert() {
    const dispatch = useDispatch();

    const message = useSelector((state: RootState) => state.alert.messages);
    const showMessage = useSelector((state: RootState) => state.alert.showMessage);
    const type = useSelector((state: RootState) => state.alert.type);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (showMessage) dispatch(clearMessage());
        }, 3000);
        return () => clearTimeout(timeout);
    }, [showMessage]);

    return (
        <div
            className={`${alert.PopUp} ${showMessage ? "flex" : "hidden"} ${
                type === "success" ? "bg-[#ECFFEC]" : "bg-[#ffecec]"
            } flex flex-row items-center justify-between max-h-fit py-[0.875em] px-[1.75em] gap-x-[1.75em]`}
        >
            <p
                className={`${alert.Message} text-black
                text-[1.2em] font-[600]`}
            >
                {message}
            </p>
            <button
                type="button"
                className="w-fit h-fit"
                onClick={() => {
                    dispatch(clearMessage());
                }}
            >
                <XIcon
                    className="w-[1.2em] aspect-square"
                    strokeColor={`${type === "success" ? "#71F871" : "#F87171"}`}
                />
            </button>
        </div>
    );
}
