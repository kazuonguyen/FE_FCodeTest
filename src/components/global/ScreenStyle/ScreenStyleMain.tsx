"use client";

import React from "react";
import screen from "../../../styles/screen.module.css";
import Navbar from "../Navbar/Navbar";
import Alert from "../Alert/Alert";

interface ScreenStyleMainProps {
    className?: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

export default function ScreenStyleMain({ className, children, style }: ScreenStyleMainProps) {
    return (
        <div className={`${screen.screenFullStyleMain}`}>
            <div className={`${screen.contentStyleMain} ${className}`} style={style}>
                {children}
            </div>
        </div>
    );
}
