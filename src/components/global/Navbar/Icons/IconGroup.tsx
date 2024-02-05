import React from "react";
import icon from "./icon.module.css";
import { Avatar } from "./Avatar";
import LogoFull from "@/components/global/Logo/LogoFull";

interface IconGroupProps {
    className?: string;
}

export default function IconGroup({ className }: IconGroupProps) {
    return (
        <div className={`${className} flex flex-row w-full items-center justify-between`}>
            <LogoFull />
            <div className="flex flex-row items-center xl:gap-x-[46px] gap-x-[30px]">
                <Avatar className={`${icon.iconSize} ${icon.avatar}`} />
            </div>
        </div>
    );
}
