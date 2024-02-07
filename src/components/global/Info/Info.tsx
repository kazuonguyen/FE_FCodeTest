"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "@/redux/slice/alertSlice";
import ScreenStyleMain from "@/components/global/ScreenStyle/ScreenStyleMain";

import { RootState } from "@/redux/store/store";

export default function Info() {
    return (
        <section id="who">
            <div className="who__Content">
                <div className="who__graphic">
                    <img src="./assets/graphics/who-we-are/who-bg.png" alt="" />
                </div>
                <div style={{ position: "unset" }} className="who__text">
                    <p className="xd_subtitle">Eco Friendly</p>
                    <h2>Econis is a Friendly Organic Store</h2>

                    <div className="who__detail">
                        <h3>Start with Our Company First</h3>
                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptat accusantium
                            doloremque laudantium. Sed ut perspiciatis.
                        </p>

                        <h3>Learn How to Grow Yourself</h3>
                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptat accusantium
                            doloremque laudantium. Sed ut perspiciatis.
                        </p>

                        <h3>Farming Strategies of Today</h3>
                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptat accusantium
                            doloremque laudantium. Sed ut perspiciatis.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
