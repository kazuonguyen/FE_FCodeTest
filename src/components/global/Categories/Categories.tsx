"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "@/redux/slice/alertSlice";
import ScreenStyleMain from "@/components/global/ScreenStyle/ScreenStyleMain";

import { RootState } from "@/redux/store/store";

export default function Categories() {
    return (
        <section id="offer">
            <div className="offer wrp">
                <div className="offer__card offer__one">
                    <a href="#">
                        <img src="./assets/graphics/offer/offer-1-img.png" alt="" />
                        <p>Natural!!</p>
                        <h2>
                            <span>Get Garden Fresh Fruits</span>
                        </h2>
                    </a>
                </div>

                <div className="offer__card offer__two">
                    <a href="#">
                        <img src="./assets/graphics/offer/offer-2-img.png" alt="" />
                        <p>Offer!!</p>
                        <h2>
                            <span>Get 10% off on Vegetables</span>
                        </h2>
                    </a>
                </div>
            </div>
        </section>
    );
}
