"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "@/redux/slice/alertSlice";
import ScreenStyleMain from "@/components/global/ScreenStyle/ScreenStyleMain";

import { RootState } from "@/redux/store/store";
import HbgBtn from "../Hbgbtn/Hbgbtn";

export default function Navbar() {
    const count = useSelector((state: RootState) => state.alert.count);
    useEffect(() => {
        const hamburger = document.querySelector(".hamburger");
        const navMenu = document.querySelectorAll(".nav__wrapper");
        hamburger?.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.forEach((element) => {
                element.classList.toggle("show");
            });
        });
    }, []);
    return (
        <div
            style={{
                position: "fixed",
                width: "100%",
                backgroundColor: "white",
                display: "block",
                zIndex: 100,
            }}
            id="header"
        >
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
                                    <a href="./orders">Shop</a>
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
                    <HbgBtn />
                </header>
            </div>
        </div>
    );
}
