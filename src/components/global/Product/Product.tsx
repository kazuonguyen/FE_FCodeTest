"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "@/redux/slice/alertSlice";
import ScreenStyleMain from "@/components/global/ScreenStyle/ScreenStyleMain";

export default function Product() {
    const dispatch = useDispatch();
    function addProductPage() {
        dispatch(addProduct());
    }
    return (
        <section id="product" className="wrp">
            <div className="products">
                <div className="product__title">
                    <p className="xd_subtitle">Categories</p>
                    <h2>Our Products</h2>
                </div>
                <div className="product__list">
                    {/* -------------- Product-1 -------------- */}
                    <div className="product__item shope  content">
                        <span className="product__tag">Vegetable</span>
                        <img src="./assets/graphics/Shop/product-1.png" alt="" />
                        <p className="product__name">Calabrese Broccoli</p>
                        <div className="product__detail">
                            <p className="product__discount">$20.00</p>
                            <p className="product__price">$13.00</p>
                            <div className="product__rating">
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star" />
                                <span className="fa fa-star" />
                            </div>
                            <button
                                type="button"
                                onClick={() => addProductPage()}
                                className="btn__cart xd__btn btn-secondary"
                            >
                                add to cart
                            </button>
                        </div>
                    </div>
                    {/* --------------- Product-2 --------------- */}
                    <div className="product__item shope content">
                        <span className="product__tag">Fruit</span>
                        <img src="./assets/graphics/Shop/product-2.png" alt="" />
                        <p className="product__name">Fresh Banana</p>
                        <div className="product__detail">
                            <p className="product__discount">$20.00</p>
                            <p className="product__price">$13.00</p>
                            <div className="product__rating">
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star" />
                                <span className="fa fa-star" />
                            </div>
                            <button
                                type="button"
                                onClick={() => addProductPage()}
                                className="btn__cart xd__btn btn-secondary"
                            >
                                add to cart
                            </button>
                        </div>
                    </div>
                    {/* --------------- Product-3 --------------- */}
                    <div className="product__item shope content">
                        <span className="product__tag">Nuts</span>
                        <img src="./assets/graphics/Shop/product-3.png" alt="" />
                        <p className="product__name">pistachio</p>
                        <div className="product__detail">
                            <p className="product__discount">$20.00</p>
                            <p className="product__price">$13.00</p>
                            <div className="product__rating">
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star" />
                                <span className="fa fa-star" />
                            </div>
                            <button
                                type="button"
                                onClick={() => addProductPage()}
                                className="btn__cart xd__btn btn-secondary"
                            >
                                add to cart
                            </button>
                        </div>
                    </div>
                    {/* --------------- Product-4 --------------- */}
                    <div className="product__item shope content">
                        <span className="product__tag">Vegetable</span>
                        <img src="./assets/graphics/Shop/product-4.png" alt="" />
                        <p className="product__name">Red Tomato</p>
                        <div className="product__detail">
                            <p className="product__discount">$20.00</p>
                            <p className="product__price">$13.00</p>
                            <div className="product__rating">
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star" />
                                <span className="fa fa-star" />
                            </div>
                            <button
                                type="button"
                                onClick={() => addProductPage()}
                                className="btn__cart xd__btn btn-secondary"
                            >
                                add to cart
                            </button>
                        </div>
                    </div>
                    {/* --------------- Product-5 --------------- */}
                    <div className="product__item shope content">
                        <span className="product__tag">Lentils</span>
                        <img src="./assets/graphics/Shop/product-5.png" alt="" />
                        <p className="product__name">Mung Bean</p>
                        <div className="product__detail">
                            <p>$20.00</p>
                            <p>$13.00</p>
                            <div className="product__rating">
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star" />
                                <span className="fa fa-star" />
                            </div>
                            <button
                                type="button"
                                onClick={() => addProductPage()}
                                className="btn__cart xd__btn btn-secondary"
                            >
                                add to cart
                            </button>
                        </div>
                    </div>
                    {/* --------------- Product-6 --------------- */}
                    <div className="product__item shope content">
                        <span className="product__tag">Nuts</span>
                        <img src="./assets/graphics/Shop/product-6.png" alt="" />
                        <p className="product__name">Brown Hazelnut</p>
                        <div className="product__detail">
                            <p>$20.00</p>
                            <p>$13.00</p>
                            <div className="product__rating">
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star" />
                                <span className="fa fa-star" />
                            </div>
                            <button
                                type="button"
                                onClick={() => addProductPage()}
                                className="btn__cart xd__btn btn-secondary"
                            >
                                add to cart
                            </button>
                        </div>
                    </div>
                    {/* --------------- Product-7 --------------- */}
                    <div className="product__item shope content">
                        <span className="product__tag">Dairy</span>
                        <img src="./assets/graphics/Shop/product-7.png" alt="" />
                        <p className="product__name">Eggs</p>
                        <div className="product__detail">
                            <p>$20.00</p>
                            <p>$13.00</p>
                            <div className="product__rating">
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star" />
                                <span className="fa fa-star" />
                            </div>
                            <button
                                type="button"
                                onClick={() => addProductPage()}
                                className="btn__cart xd__btn btn-secondary"
                            >
                                add to cart
                            </button>
                        </div>
                    </div>
                    {/* --------------- Product-8 --------------- */}
                    <div className="product__item shope content">
                        <span className="product__tag">Bakery</span>
                        <img src="./assets/graphics/Shop/product-8.png" alt="" />
                        <p className="product__name">Elaichi Rusk</p>
                        <div className="product__detail">
                            <p>$20.00</p>
                            <p>$13.00</p>
                            <div className="product__rating">
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star" />
                                <span className="fa fa-star" />
                            </div>
                            <button
                                type="button"
                                onClick={() => addProductPage()}
                                className="btn__cart xd__btn btn-secondary"
                            >
                                add to cart
                            </button>
                        </div>
                    </div>
                    {/* --------- Product 9 --------- */}
                    <div className="product__item shope content">
                        <span className="product__tag">Vegetable</span>
                        <img src="./assets/graphics/Shop-page/product-1.png" alt="" />
                        <p className="product__name">Mung Bean</p>
                        <div className="product__detail">
                            <p>$20.00</p>
                            <p>$13.00</p>
                            <div className="product__rating">
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star" />
                                <span className="fa fa-star" />
                            </div>
                            <button
                                type="button"
                                onClick={() => addProductPage()}
                                className="btn__cart xd__btn btn-secondary"
                            >
                                add to cart
                            </button>
                        </div>
                    </div>
                    {/* ------- Product 10 -------- */}
                    <div className="product__item shope content">
                        <span className="product__tag">Bakery</span>
                        <img src="./assets/graphics/Shop-page/product-2.png" alt="" />
                        <p className="product__name">White Hazelnut</p>
                        <div className="product__detail">
                            <p>$20.00</p>
                            <p>$13.00</p>
                            <div className="product__rating">
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star" />
                                <span className="fa fa-star" />
                            </div>
                            <button
                                type="button"
                                onClick={() => addProductPage()}
                                className="btn__cart xd__btn btn-secondary"
                            >
                                add to cart
                            </button>
                        </div>
                    </div>
                    {/* ------- Product 11 -------- */}
                    <div className="product__item shope content">
                        <span className="product__tag">Fruit</span>
                        <img src="./assets/graphics/Shop-page/product-3.png" alt="" />
                        <p className="product__name">Fresh Corn</p>
                        <div className="product__detail">
                            <p>$20.00</p>
                            <p>$13.00</p>
                            <div className="product__rating">
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star" />
                                <span className="fa fa-star" />
                            </div>
                            <button
                                type="button"
                                onClick={() => addProductPage()}
                                className="btn__cart xd__btn btn-secondary"
                            >
                                add to cart
                            </button>
                        </div>
                    </div>
                    {/* ------- Product 12 -------- */}
                    <div className="product__item shope content">
                        <span className="product__tag">Nuts</span>
                        <img src="./assets/graphics/Shop-page/product-4.png" alt="" />
                        <p className="product__name">Organic Almonds</p>
                        <div className="product__detail">
                            <p>$20.00</p>
                            <p>$13.00</p>
                            <div className="product__rating">
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star checked" />
                                <span className="fa fa-star" />
                                <span className="fa fa-star" />
                            </div>
                            <button
                                type="button"
                                onClick={() => addProductPage()}
                                className="btn__cart xd__btn btn-secondary"
                            >
                                add to cart
                            </button>
                        </div>
                    </div>
                </div>
                {/* ---------- Product Items Ends ----------- */}
                <a href="#" id="loadMore" className="product__btn xd__btn btn-secondary">
                    Load More
                    <img src="./assets/graphics/hero/btn-arrow-icon.png" alt="" />
                </a>
            </div>
        </section>
    );
}
