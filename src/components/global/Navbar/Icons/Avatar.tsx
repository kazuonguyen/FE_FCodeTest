/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { logoutSuccess, User } from "@/redux/slice/authSlice";
import { RootState } from "@/redux/store/store";
import icon from "./icon.module.css";
import GetLogout from "@/api/auth/GetLogout";

interface AvatarLinkProps {
    href: string;
    children: React.ReactNode;
}

export function AvatarLink({ href, children }: AvatarLinkProps) {
    return (
        <li>
            <Link href={href} className="block px-4 py-2 text-sm hover:bg-gray-600">
                {children}
            </Link>
        </li>
    );
}

interface AvatarDropdownProps {
    className?: string;
}

export function AvatarDropdown({ className }: AvatarDropdownProps) {
    const user = useSelector<RootState, User | null>((state) => state.auth.user);
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await GetLogout(dispatch, router);
        router.push("/login");
        dispatch(logoutSuccess());
    };

    return (
        <div
            className={`${icon.avatarDropdown} text-base text-white list-none bg-gray-900 divide-y divide-gray-500 rounded-b-lg shadow-2xl ${className}`}
        >
            <div className="px-4 py-3">
                <span className="block text-sm">{user?.name}</span>
                <span className="block text-sm truncate">{user?.email}</span>
            </div>
            <ul className="py-2">
                <AvatarLink href="#">Tài khoản</AvatarLink>
                <button
                    type="button"
                    className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left"
                    onClick={handleLogout}
                >
                    Đăng xuất
                </button>
            </ul>
        </div>
    );
}

interface AvatarProps {
    className?: string;
}

export function Avatar({ className }: AvatarProps) {
    const [isHidden, setIsHidden] = useState(true);
    const avatarRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (avatarRef.current && !avatarRef.current.contains(event.target as Node)) {
                setIsHidden(true);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    const user = useSelector<RootState, User | null>((state) => state.auth.user);

    const handleAvatarClick = () => {
        //  console.log("user", user);
        setIsHidden(!isHidden);
    };

    return (
        <>
            <div
                role="button"
                onClick={handleAvatarClick}
                ref={avatarRef}
                className={`${className} flex text-sm bg-black rounded-full border-2 border-white cursor-pointer`}
            >
                <span className="sr-only">Open user menu</span>
                <img draggable={false} className="rounded-full" src={user?.avatar} alt="avatar" />
            </div>
            <AvatarDropdown className={isHidden ? "hidden" : ""} />
        </>
    );
}
