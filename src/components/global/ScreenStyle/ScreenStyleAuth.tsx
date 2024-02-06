"use client";

import React from "react";
import screen from "../../../styles/screen.module.css";

interface ScreenStyleAuthProps {
    className?: string;
    children: React.ReactNode;
}

export default function ScreenStyleAuth({ className, children }: ScreenStyleAuthProps) {
    return (
        <div className={`${screen.screenFullStyleA}`}>
            <div className={`${screen.contentStyleA} ${className}`}>{children}</div>
        </div>
    );
}
