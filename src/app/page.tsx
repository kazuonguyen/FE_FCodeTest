"use client";

import React, { use, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "@/redux/store/store";

import ScreenStyleMain from "@/components/global/ScreenStyle/ScreenStyleMain";
import Product from "@/components/global/Product/Product";
import Navbar from "@/components/global/Navbar/Navbar";
import Banner from "@/components/global/Banner/Banner";
import Categories from "@/components/global/Categories/Categories";
import About from "@/components/global/About/About";
import Testimonial from "@/components/global/Testimonial/Testimonial";
import Info from "@/components/global/Info/Info";
import Blog from "@/components/global/Blog/Blog";

export default function Home() {
    return (
        <ScreenStyleMain>
            <main>
                <Banner />
                <Categories />
                <About />
                <Product />
                <Testimonial />
                <Info />
                <Blog />
            </main>

            <script src="https://code.jquery.com/jquery-3.6.0.min.js" />
            <script src="./assets/js/script.js" />
        </ScreenStyleMain>
    );
}
