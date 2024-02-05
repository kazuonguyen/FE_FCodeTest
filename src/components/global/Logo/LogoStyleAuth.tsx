import React from "react";
import logo from "./logo.module.css";

interface LogoStyleAuthProps {
    className?: string;
}

export default function LogoStyleAuth({ className }: LogoStyleAuthProps) {
    return (
        <div className="w-fit h-fit">
            <img
                draggable={false}
                src="/logo/logo-styled.svg"
                alt="logo-form"
                className={`${logo.logoForm} ${className}`}
            />
        </div>
    );
}
