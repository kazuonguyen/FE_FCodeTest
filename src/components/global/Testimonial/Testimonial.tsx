"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "@/redux/slice/alertSlice";
import ScreenStyleMain from "@/components/global/ScreenStyle/ScreenStyleMain";

import { RootState } from "@/redux/store/store";

export default function Testimonial() {
    return (
        <section
            style={{
                backgroundImage: `url("./assets/graphics/Testimonial/Testimonial-bg.png")`,
            }}
            id="testimonial"
        >
            <div className="hero__overlay" />
            <div className="testimonial__title">
                <p className="xd_subtitle">Testimonial</p>
                <h2>What Our Customer Saying?</h2>
            </div>

            <div className="splide" role="group" aria-label="Splide Basic HTML Example">
                <div className="splide__track">
                    <ul className="splide__list">
                        <li className="splide__slide">
                            <div className="testimonial wrp">
                                <img src="./assets/graphics/Testimonial/profile-img.jpg" alt="" />
                                <div className="product__rating">
                                    <span className="fa fa-star checked" />
                                    <span className="fa fa-star checked" />
                                    <span className="fa fa-star checked" />
                                    <span className="fa fa-star" />
                                    <span className="fa fa-star" />
                                </div>
                                <p>
                                    Simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been.
                                </p>
                                <h3>Sara Taylor</h3>
                                <p>Consumer</p>
                            </div>
                        </li>

                        <li className="splide__slide">
                            <div className="testimonial wrp">
                                <img src="./assets/graphics/Testimonial/profile-img.jpg" alt="" />
                                <div className="product__rating">
                                    <span className="fa fa-star checked" />
                                    <span className="fa fa-star checked" />
                                    <span className="fa fa-star checked" />
                                    <span className="fa fa-star" />
                                    <span className="fa fa-star" />
                                </div>
                                <p>
                                    Simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been.
                                </p>
                                <h3>Sara Taylor</h3>
                                <p>Consumer</p>
                            </div>
                        </li>
                        <li className="splide__slide">
                            <div className="testimonial wrp">
                                <img src="./assets/graphics/Testimonial/profile-img.jpg" alt="" />
                                <div className="product__rating">
                                    <span className="fa fa-star checked" />
                                    <span className="fa fa-star checked" />
                                    <span className="fa fa-star checked" />
                                    <span className="fa fa-star" />
                                    <span className="fa fa-star" />
                                </div>
                                <p>
                                    Simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been.
                                </p>
                                <h3>Sara Taylor</h3>
                                <p>Consumer</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
