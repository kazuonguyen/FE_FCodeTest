"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "@/redux/slice/alertSlice";
import ScreenStyleMain from "@/components/global/ScreenStyle/ScreenStyleMain";

import { RootState } from "@/redux/store/store";

export default function Navbar() {
    const count = useSelector((state: RootState) => state.alert.count);

    return (
        <div id="header">
            <div id="header">
                <header id="header" className="header__main flx wrp">
                    <div className="logo__main">
                        <img src="./assets/graphics/header/main-logo.png" alt="Organick logo" />
                    </div>

                    <div className="nav__wrapper">
                        <nav className="nav__main">
                            <ul style={{ marginLeft: "20px" }} className="ul__main flx">
                                <a href="./">
                                    <li>Home</li>
                                </a>
                                <a href="./">
                                    <li>About</li>
                                </a>
                                <li className="dropdown">
                                    <a href="./orders">Shope</a>
                                </li>
                                <a href="./">
                                    <li>Contact</li>
                                </a>
                                <a href="./">
                                    <li>Blog</li>
                                </a>
                            </ul>
                        </nav>

                        <div className="search flx">
                            <input type="text" id="search" />
                            <a href="">
                                <img
                                    src="./assets/graphics/header/search-icon.png"
                                    alt="search icon"
                                />
                            </a>
                        </div>

                        <div className="cart flx">
                            <img
                                src="./assets/graphics/header/cart-icon.png"
                                className="cart__icon"
                                alt="cart icon"
                            />
                            <p id="cart-count">cart {count}</p>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}
