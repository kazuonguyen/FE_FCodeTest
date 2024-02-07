"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "@/redux/slice/alertSlice";
import ScreenStyleMain from "@/components/global/ScreenStyle/ScreenStyleMain";

import { RootState } from "@/redux/store/store";

export default function HbgBtn() {
    return (
        <button className="hamburger" type="button">
            <span className="hamburger__line" />
            <span className="hamburger__line" />
            <span className="hamburger__line" />
        </button>
    );
}
