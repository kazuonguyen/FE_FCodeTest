"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "@/redux/slice/alertSlice";
import ScreenStyleMain from "@/components/global/ScreenStyle/ScreenStyleMain";

import { RootState } from "@/redux/store/store";

export default function Blog() {
    return (
        <section id="blog" className="wrp">
            <div className="blog__title">
                <p className="xd_subtitle">News</p>
                <h2>Discover weekly content about organic food, & more</h2>
            </div>

            <div className="blog__content">
                <div
                    style={{
                        backgroundImage: `url("./assets/graphics/blog/blog-post-1.png")`,
                    }}
                    className="blog__post post-1"
                >
                    <p className="blog-tag">25 Nov</p>
                    <div className="blog__detial">
                        <h3>The Benefits of Vitamin D</h3>
                        <p>
                            Simply dummy text of the printing and typesetting industry. Lorem Ipsum
                        </p>
                        <a href="#" className="xd__btn btn-primary">
                            Read More
                            <img src="./assets/graphics/hero/btn-arrow-icon.png" alt="" />
                        </a>
                    </div>
                </div>
                <div
                    style={{
                        backgroundImage: `url("./assets/graphics/blog/blog-post-2.png")`,
                    }}
                    className="blog__post post-2"
                >
                    <p className="blog-tag">25 Nov</p>
                    <div className="blog__detial">
                        <h3>Our Favorite Summertime Tomato</h3>
                        <p>
                            Simply dummy text of the printing and typesetting industry. Lorem Ipsum
                        </p>
                        <a href="#" className="xd__btn btn-primary">
                            Read More
                            <img src="./assets/graphics/hero/btn-arrow-icon.png" alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
