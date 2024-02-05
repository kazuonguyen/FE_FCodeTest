import React from "react";
import logo from "./logo.module.css";

interface LogoFullStyleAuthProps {
    className?: string;
}

export default function LogoFullStyleAuth({ className }: LogoFullStyleAuthProps) {
    return (
        <div className="w-fit h-fit">
            <img
                draggable={false}
                src="/logo/liquids-styled.svg"
                alt="logo"
                className={`${logo.logo} ${className}`}
            />
        </div>
    );
}
