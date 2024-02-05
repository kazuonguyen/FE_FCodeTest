"use client";

import React from "react";
import screen from "../../../styles/screen.module.css";
import LogoFullStyleAuth from "../Logo/LogoFullStyleAuth";

interface ScreenStyleAuthProps {
    className?: string;
    children: React.ReactNode;
}

export default function ScreenStyleAuth({ className, children }: ScreenStyleAuthProps) {
    return (
        <div className={`${screen.screenFullStyleA}`}>
            <LogoFullStyleAuth />
            <div className={`${screen.contentStyleA} ${className}`}>{children}</div>
        </div>
    );
}
