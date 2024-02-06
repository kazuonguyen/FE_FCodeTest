"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "@/redux/slice/alertSlice";
import ScreenStyleMain from "@/components/global/ScreenStyle/ScreenStyleMain";

import { RootState } from "@/redux/store/store";

export default function Footer() {
    return (
        <>
            {/* ######################################### */}
            {/*                 SUBSCRIBE                 */}
            {/* ######################################### */}
            <section id="subscribe" className="wrp">
                <div className="subscribe flx">
                    <h2>Subscribe to our Newsletter</h2>
                    <form action="" className="flx">
                        <label htmlFor="email">
                            <input type="email" id="email" placeholder="yourmail@gmail.com" />
                        </label>
                        <a href="#" type="submit" className="subscribe__btn xd__btn btn-secondary">
                            subscribe
                        </a>
                    </form>
                </div>
            </section>
            {/* ######################################### */}
            {/*                  FOOTER                   */}
            {/* ######################################### */}
            <section>
                <footer id="footer">
                    <div className="footer__grid wrp">
                        {/* --------------- Column 1 ---------------- */}
                        <div className="footer__col-1">
                            <p className="footer__col-title p-bold">Contact Us</p>
                            <div>
                                <p className="p-bold">Email</p>
                                <p>needhelp@Organia.com</p>
                            </div>
                            <div>
                                <p className="p-bold">Phone</p>
                                <p>666 888 888</p>
                            </div>
                            <div>
                                <p className="p-bold"> Address</p>
                                <p>88 road, borklyn street, USA</p>
                            </div>
                        </div>
                        {/* --------------- Column 2 ---------------- */}
                        <div className="footer__col-2">
                            <img src="./assets/graphics/header/main-logo.png" alt="" />
                            <p>
                                Simply dummy text of the printing and typesetting industry. Lorem
                                Ipsum simply dummy text of the printing{" "}
                            </p>
                            <div className="footer__soical">
                                <i className="fa fa-instagram" aria-hidden="true" />
                                <i className="fa fa-facebook-official" aria-hidden="true" />
                                <i className="fa fa-twitter" aria-hidden="true" />
                                <i className="fa fa-pinterest" aria-hidden="true" />
                            </div>
                        </div>
                        {/* --------------- Column 3 ---------------- */}
                        <div className="footer__col-3">
                            <p className="footer__col-title p-bold">Utility Pages</p>
                            <nav>
                                <ul>
                                    <a href="">
                                        <li>Changelog</li>
                                    </a>
                                    <a href="">
                                        <li>Style Guide</li>
                                    </a>
                                    <a href="">
                                        <li>404 Not Found</li>
                                    </a>
                                    <a href="">
                                        <li>Password Protected </li>
                                    </a>
                                    <a href="">
                                        <li>Licences</li>
                                    </a>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </footer>
            </section>
        </>
    );
}
