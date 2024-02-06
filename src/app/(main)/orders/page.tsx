"use client";

import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import ScreenStyleMain from "@/components/global/ScreenStyle/ScreenStyleMain";
import Product from "@/components/global/Product/Product";

export default function Page() {
    return (
        <ScreenStyleMain>
            <div id="header" />
            <div className="page__banner shop__banner">
                <h2>Shop</h2>
            </div>
            <main>
                {/* ######################################### */}
                {/*                  PRODUCT                  */}
                {/* ######################################### */}
                <Product />
            </main>{" "}
            <script src="./assets/js/script.js" />
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js" />
            <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js" />
        </ScreenStyleMain>
    );
}
