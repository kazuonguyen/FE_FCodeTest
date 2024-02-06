"use client";

import React from "react";
import form from "./form.module.css";

interface BaseTitleProps {
    className?: string;
    children: React.ReactNode;
}

function BaseTitle({ className, children }: BaseTitleProps) {
    return <div className={`${form.basetitle} ${className} text-center`}>{children}</div>;
}

interface FormBaseProps {
    className?: string;
    title?: string;
    children: React.ReactNode;
}

export default function FormBase({ className, title, children }: FormBaseProps) {
    return (
        <div className={`${form.baseborder} ${form.base}`}>
            <div
                className={`${form.content} w-full flex flex-col items-center justify-center ${className}`}
            >
                <BaseTitle>{title}</BaseTitle>
                {children}
            </div>
        </div>
    );
}

interface WarningPopupProps {
    className?: string;
    children?: React.ReactNode;
}

export function WarningPopup({ className, children }: WarningPopupProps) {
    return <div className={`${className} ${form.warningPopup}`}>{children}</div>;
}
