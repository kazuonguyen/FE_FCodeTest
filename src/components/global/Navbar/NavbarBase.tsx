"use client";

import React from "react";
import screen from "../../../styles/screen.module.css";

interface NavbarBaseProps {
    className?: string;
    children: React.ReactNode;
}

export default function NavbarBase({ className, children }: NavbarBaseProps) {
    return (
        <nav className=" bg-orange-300 border-none fixed w-full top-0 left-0 right-0 z-[999]">
            <div className={`${screen.liquidsNavbar} max-w-screen ${className}`}>{children}</div>
        </nav>
    );
}
