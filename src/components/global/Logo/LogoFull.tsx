import React from "react";
import Link from "next/link";
import logo from "./logo.module.css";

interface LogoFullProps {
    className?: string;
}

export default function LogoFull({ className }: LogoFullProps) {
    return (
        <Link href="/" className="w-fit h-fit">
            <img
                draggable={false}
                src="/logo/liquids.svg"
                alt="logo-full"
                className={`${logo.logoBase} ${className} cursor-pointer`}
            />
        </Link>
    );
}
