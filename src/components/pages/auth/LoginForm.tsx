"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import InputLogin from "./InputLogin/InputLogin";
import FormBase from "./FormBase/FormBase";
import PostLogin from "@/api/auth/PostLogin";

interface LoginFormProps {
    className?: string;
}

export default function LoginForm({ className }: LoginFormProps) {
    const dispatch = useDispatch();
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [showNotice, setShowNotice] = useState(false);
    const router = useRouter();
    const handleInputChange = (email: string, password: string) => {
        setInputEmail(email);
        setInputPassword(password);
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await PostLogin(inputEmail, inputPassword, router, dispatch, setShowNotice);
    }

    return (
        <FormBase title="Đăng nhập" className={`${className} pl-5 pr-5`}>
            <InputLogin
                // eslint-disable-next-line react/jsx-no-bind
                onSubmit={handleSubmit}
                showNotice={showNotice}
                onChangeInput={handleInputChange}
            />
        </FormBase>
    );
}
