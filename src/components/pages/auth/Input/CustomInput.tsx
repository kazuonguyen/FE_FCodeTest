/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from "react";
import input from "./input.module.css";

interface CustomInputProps {
    type?: string;
    id: string;
    placeholder?: string;
    className?: string;
    classNameInput?: string;
    classNameLabel?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    children?: React.ReactNode;
    scale?: string;
    translate?: string;
}

export default function CustomInput({
    type,
    id,
    placeholder,
    className,
    classNameInput,
    classNameLabel,
    value,
    onChange,
    label,
    children,
    scale,
    translate,
}: CustomInputProps) {
    const translateLabel = translate || "-translate-y-2 peer-focus:-translate-y-2";
    const scaleLabel = scale || "scale-[0.6] peer-focus:scale-[0.6]";
    return (
        <div className={`${className} relative`}>
            <input
                type={type}
                id={id}
                placeholder={placeholder || ""}
                className={`${classNameInput} block text-neutral-700 bg-white border border-neutral-400 appearance-none focus:outline-none focus:ring-0 focus:ring-transparent focus:border-neutral-400 peer ${input.baseinput}`}
                value={value}
                onChange={onChange}
                autoComplete="off"
            />
            <label
                htmlFor={id}
                onClick={() => document.getElementById(id)?.focus()}
                className={`${classNameLabel} absolute cursor-text text-neutral-400 duration-300 transform z-10 origin-[0] ${translateLabel} ${scaleLabel} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 ${input.baselabel}`}
            >
                {label}
            </label>
            {children}
        </div>
    );
}
