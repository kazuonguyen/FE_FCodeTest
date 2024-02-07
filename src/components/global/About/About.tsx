"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "@/redux/slice/alertSlice";
import ScreenStyleMain from "@/components/global/ScreenStyle/ScreenStyleMain";

import { RootState } from "@/redux/store/store";

export default function About() {
    return (
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
                            Simply dummy text of the printing and typesetting industry. Lorem had
                            ceased to been the industry`&apos;`s standard dummy text ever since the
                            1500s, when an unknown printer took a galley.
                        </p>

                        <div className="about__text-content">
                            <div className="about__box about__text-one">
                                <img src="./assets/graphics/About/Vegan-icon.png" alt="" />
                                <div className="box__title">
                                    <h3>Organic Foods Only</h3>
                                    <p>
                                        Simply dummy text of the printing and typesetting industry.
                                        Lorem Ipsum
                                    </p>
                                </div>
                            </div>

                            <div className="about__box about__text-two">
                                <img src="./assets/graphics/About/Mailbox-icon.png" alt="" />
                                <div className="box__title">
                                    <h3>Quality Standards</h3>
                                    <p>
                                        Simply dummy text of the printing and typesetting industry.
                                        Lorem Ipsum
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
    );
}
