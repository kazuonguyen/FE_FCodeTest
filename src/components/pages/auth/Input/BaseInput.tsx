import React from "react";
import input from "./input.module.css";

interface BaseInputProps {
    type?: string;
    id?: string;
    placeholder?: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    children?: React.ReactNode;
}

export default function BaseInput({
    type,
    id,
    placeholder,
    className,
    value,
    onChange,
    label,
    children,
}: BaseInputProps) {
    return (
        <div className="relative">
            <input
                type={type}
                id={id}
                placeholder={placeholder || ""}
                className={`${input.baseinput} ${className} block text-neutral-700 bg-white border border-neutral-400 appearance-none focus:outline-none focus:ring-0 focus:ring-transparent focus:border-neutral-400 peer`}
                value={value}
                onChange={onChange}
            />
            <label
                htmlFor={id}
                className={`${input.baselabel} absolute text-neutral-400 duration-300 transform -translate-y-2 scale-[0.6] z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.6] peer-focus:-translate-y-2`}
            >
                {label}
            </label>
            {children}
        </div>
    );
}
