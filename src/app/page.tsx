"use client";

import React, { use, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "@/redux/store/store";

import ScreenStyleMain from "@/components/global/ScreenStyle/ScreenStyleMain";
import Product from "@/components/global/Product/Product";
import Navbar from "@/components/global/Navbar/Navbar";

export default function Home() {
    return (
        <ScreenStyleMain>
            <main>
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
                                        <img
                                            src="./assets/graphics/hero/btn-arrow-icon.png"
                                            alt=""
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

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

                <section id="about">
                    <div className="about wrp">
                        <div className="about__content">
                            <div className="about__graphic">
                                <img src="./assets/graphics/About/about-bg.png" alt="" />
                            </div>
                            <div className="about__text">
                                <p className="xd_subtitle">About us</p>
                                <h2>We Believe in Working Accredited Farmers</h2>
                                <p>
                                    Simply dummy text of the printing and typesetting industry.
                                    Lorem had ceased to been the industry`&apos;`s standard dummy
                                    text ever since the 1500s, when an unknown printer took a
                                    galley.
                                </p>

                                <div className="about__text-content">
                                    <div className="about__box about__text-one">
                                        <img src="./assets/graphics/About/Vegan-icon.png" alt="" />
                                        <div className="box__title">
                                            <h3>Organic Foods Only</h3>
                                            <p>
                                                Simply dummy text of the printing and typesetting
                                                industry. Lorem Ipsum
                                            </p>
                                        </div>
                                    </div>

                                    <div className="about__box about__text-two">
                                        <img
                                            src="./assets/graphics/About/Mailbox-icon.png"
                                            alt=""
                                        />
                                        <div className="box__title">
                                            <h3>Quality Standards</h3>
                                            <p>
                                                Simply dummy text of the printing and typesetting
                                                industry. Lorem Ipsum
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <a href="#" className="xd__btn btn-secondary">
                                    Shop Now
                                    <img src="./assets/graphics/hero/btn-arrow-icon.png" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <Product />
                <section id="testimonial">
                    <div
                        style={{
                            backgroundImage: `url("./assets/graphics/Testimonial/Testimonial-bg.png")`,
                        }}
                        className="hero__overlay"
                    />
                    <div className="testimonial__title">
                        <p className="xd_subtitle">Testimonial</p>
                        <h2>What Our Customer Saying?</h2>
                    </div>

                    <div className="splide" role="group" aria-label="Splide Basic HTML Example">
                        <div className="splide__track">
                            <ul className="splide__list">
                                <li className="splide__slide">
                                    <div className="testimonial wrp">
                                        <img
                                            src="./assets/graphics/Testimonial/profile-img.jpg"
                                            alt=""
                                        />
                                        <div className="product__rating">
                                            <span className="fa fa-star checked" />
                                            <span className="fa fa-star checked" />
                                            <span className="fa fa-star checked" />
                                            <span className="fa fa-star" />
                                            <span className="fa fa-star" />
                                        </div>
                                        <p>
                                            Simply dummy text of the printing and typesetting
                                            industry. Lorem Ipsum simply dummy text of the printing
                                            and typesetting industry. Lorem Ipsum has been.
                                        </p>
                                        <h3>Sara Taylor</h3>
                                        <p>Consumer</p>
                                    </div>
                                </li>

                                <li className="splide__slide">
                                    <div className="testimonial wrp">
                                        <img
                                            src="./assets/graphics/Testimonial/profile-img.jpg"
                                            alt=""
                                        />
                                        <div className="product__rating">
                                            <span className="fa fa-star checked" />
                                            <span className="fa fa-star checked" />
                                            <span className="fa fa-star checked" />
                                            <span className="fa fa-star" />
                                            <span className="fa fa-star" />
                                        </div>
                                        <p>
                                            Simply dummy text of the printing and typesetting
                                            industry. Lorem Ipsum simply dummy text of the printing
                                            and typesetting industry. Lorem Ipsum has been.
                                        </p>
                                        <h3>Sara Taylor</h3>
                                        <p>Consumer</p>
                                    </div>
                                </li>
                                <li className="splide__slide">
                                    <div className="testimonial wrp">
                                        <img
                                            src="./assets/graphics/Testimonial/profile-img.jpg"
                                            alt=""
                                        />
                                        <div className="product__rating">
                                            <span className="fa fa-star checked" />
                                            <span className="fa fa-star checked" />
                                            <span className="fa fa-star checked" />
                                            <span className="fa fa-star" />
                                            <span className="fa fa-star" />
                                        </div>
                                        <p>
                                            Simply dummy text of the printing and typesetting
                                            industry. Lorem Ipsum simply dummy text of the printing
                                            and typesetting industry. Lorem Ipsum has been.
                                        </p>
                                        <h3>Sara Taylor</h3>
                                        <p>Consumer</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

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
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptat
                                    accusantium doloremque laudantium. Sed ut perspiciatis.
                                </p>

                                <h3>Learn How to Grow Yourself</h3>
                                <p>
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptat
                                    accusantium doloremque laudantium. Sed ut perspiciatis.
                                </p>

                                <h3>Farming Strategies of Today</h3>
                                <p>
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptat
                                    accusantium doloremque laudantium. Sed ut perspiciatis.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

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
                                    Simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum
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
                                    Simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum
                                </p>
                                <a href="#" className="xd__btn btn-primary">
                                    Read More
                                    <img src="./assets/graphics/hero/btn-arrow-icon.png" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="blog__btn">
                        <a href="#" className="btn-primary xd__btn">
                            load More
                            <img src="./assets/graphics/hero/btn-arrow-icon.png" alt="" />
                        </a>
                    </div>
                </section>
            </main>

            <script src="https://code.jquery.com/jquery-3.6.0.min.js" />
            <script src="./assets/js/script.js" />
        </ScreenStyleMain>
    );
}
