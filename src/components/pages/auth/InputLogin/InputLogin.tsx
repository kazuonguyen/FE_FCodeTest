"use client";

import { useState, useEffect, FormEvent } from "react";
import login from "./login.module.css";
import { WarningPopup } from "../FormBase/FormBase";
import CustomInput from "../Input/CustomInput";
import SubmitButton from "../Input/SubmitButton";
import Notice from "../Input/Notice";

interface InputLoginProps {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    showNotice: boolean;
    onChangeInput: (email: string, password: string) => void;
}

export default function InputLogin({ onSubmit, showNotice, onChangeInput }: InputLoginProps) {
    const [showLoginButton, setShowLoginButton] = useState(false);
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const WarningTime = Number(process.env.NEXT_PUBLIC_TIMEOUT_WARNING);

    useEffect(() => {
        if (inputEmail.length > 0 && inputPassword.length > 0) {
            setShowLoginButton(true);
        } else {
            setShowLoginButton(false);
        }
        onChangeInput(inputEmail, inputPassword);
    }, [inputEmail, inputPassword]);

    useEffect(() => {
        if (showNotice) {
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, WarningTime);
        }
    }, [showNotice]);
    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(e);
        if (showNotice) {
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, WarningTime);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <CustomInput
                // type="email"
                id="email"
                classNameInput={`${login.inputEmail} ${login.size} border-b-0 ${
                    showNotice ? "border-red-500 focus:border-red-500" : ""
                }`}
                classNameLabel={`${login.label}`}
                label="Email hoặc username"
                onChange={(e) => setInputEmail(e.target.value)}
                value={inputEmail}
            >
                {showNotice ? <Notice className={`${login.inputNotice}`} /> : null}
            </CustomInput>
            <CustomInput
                type="password"
                id="password"
                classNameInput={`${login.inputPassword} ${login.size} ${
                    showNotice ? "border-red-500 focus:border-red-500" : ""
                }`}
                classNameLabel={`${login.label}`}
                label="Mật khẩu"
                onChange={(e) => setInputPassword(e.target.value)}
                value={inputPassword}
            >
                {showNotice ? <Notice className={`${login.inputNotice}`} /> : null}
                {showLoginButton && (
                    <SubmitButton
                        className={`${login.inputButton} text-white font-bold bg-black`}
                    />
                )}
                {showPopup && (
                    <WarningPopup
                        className={`${login.warningPopup} flex flex-col items-center justify-center`}
                    >
                        <span>Email hoặc mật khẩu bạn vừa nhập không đúng.</span>
                        <span className={`${login.forgetPassword}`}>Quên mật khẩu?</span>
                    </WarningPopup>
                )}
            </CustomInput>
        </form>
    );
}
