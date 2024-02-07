"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "@/redux/slice/alertSlice";
import ScreenStyleMain from "@/components/global/ScreenStyle/ScreenStyleMain";

import { RootState } from "@/redux/store/store";

export default function Banner() {
    return (
        <section id="hero" className="">
            <div
                style={{
                    backgroundImage: `url("./assets/graphics/hero/Banner.jpg")`,
                }}
                className="hero"
            >
                <div className="hero__overlay">
                    <div className="hero__content wrp">
                        <div className="hero__text">
                            <p className="xd_subtitle">100% Natural Food</p>
                            <h1>Choose the best healthier way of life</h1>
                            <a href="#" className="xd__btn btn-primary">
                                Explore Now
                                <img src="./assets/graphics/hero/btn-arrow-icon.png" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
