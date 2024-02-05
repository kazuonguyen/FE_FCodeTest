/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Order } from "@/hooks/useGetOrderList";
import { RootState } from "@/redux/store/store";
import order from "./order.module.css";
import { setError } from "@/redux/slice/alertSlice";
import PostOrderQueue from "@/api/order/PostOrderQueue";
import PostOrderComplete from "@/api/order/PostOrderComplete";
import PostOrderError from "@/api/order/PostOrderError";
import { updateOrder } from "@/redux/slice/orderSlice";

export interface OrderStatusProps {
    id_order: string;
    status: string;
}

export function OrderStatus({ id_order, status }: OrderStatusProps) {
    const dispatch = useDispatch();
    const ref = useRef<HTMLDivElement>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const orders = useSelector<RootState, Order[]>((state) => state.order.orders);

    // Handle click outside the dropdown
    useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (showDropdown && ref.current && !ref.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [showDropdown, ref]);
    // Track the state of the order list
    const statusList = [
        {
            id_status: "queue",
            status_name: "Đang chờ",
        },
        {
            id_status: "completed",
            status_name: "Hoàn thành",
        },
        {
            id_status: "error",
            status_name: "Báo lỗi",
        },
    ];
    // Handle change status of order
    const handleClickedChangeStatus = async (id_status: string) => {
        // If user click the same status then do nothing
        if (status === id_status) {
            dispatch(setError("Đơn hàng đã ở trạng thái này!"));
            setShowDropdown(false);
            return;
        }
        // Call API to update order status in the database here
        let result: boolean = false;
        if (id_status === "queue") {
            // Call queue order API
            // console.log('Call queue order API');
            result = await PostOrderQueue(id_order, dispatch);
        }
        if (id_status === "completed") {
            // Call complete order API
            // console.log('Call complete order API');
            result = await PostOrderComplete(id_order, dispatch);
        }
        if (id_status === "error") {
            // Call error order API
            // console.log('Call error order API');
            result = await PostOrderError(id_order, dispatch);
        }
        // Check if has error from API THEN show error popup AND NOT update order status in the store
        if (status === "completed" && id_status === "error" && result === false) {
            // If order status is "Hoàn thành" and user click "Báo lỗi" then show error popup
            // Ensure no error from API THEN update order status in the store
            setShowDropdown(false);
            return;
        }
        if (status === "error" && id_status === "completed" && result === false) {
            // If order status is "Báo lỗi" and user click "Hoàn thành" then show error popup
            // Ensure no error from API THEN update order status in the store
            setShowDropdown(false);
            return;
        }
        if (status === "error" && id_status === "queue" && result === false) {
            // If order status is "Báo lỗi" and user click "Đang chờ" then show error popup
            // Ensure no error from API THEN update order status in the store
            setShowDropdown(false);
            return;
        }
        if (status === "completed" && id_status === "queue" && result === false) {
            // If order status is "Hoàn thành" and user click "Đang chờ" then show error popup
            // Ensure no error from API THEN update order status in the store
            setShowDropdown(false);
            return;
        }
        const newOrderIndex = orders.findIndex((order) => order.id_order === id_order);
        if (newOrderIndex !== -1) {
            const newOrder = { ...orders[newOrderIndex], status: id_status };
            dispatch(updateOrder(newOrder));
        }
        setShowDropdown(false);
    };

    if (status === "queue") {
        return (
            <div className="relative">
                <div
                    role="button"
                    id="dropdown-status"
                    data-dropdown-toggle="dropdown"
                    className="bg-white appearance-none focus:outline-none focus:ring-0 text-center inline-flex items-center justify-between cursor-pointer"
                    style={{
                        borderRadius: "100px",
                        // border: '0.5px solid var(--bdbdbd, #BDBDBD)',
                        boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.30)",
                        fontSize: "16px",
                        height: "36px",
                        width: "197px",
                        paddingTop: "6px",
                        paddingBottom: "6px",
                        paddingLeft: "36px",
                        paddingRight: "25px",
                    }}
                    onClick={() => {
                        setShowDropdown(!showDropdown);
                    }}
                >
                    <p
                        className="text-center"
                        style={{
                            fontWeight: "500",
                        }}
                    >
                        {status === "queue" ? "Đang chờ" : ""}
                    </p>

                    <Image src="/icon/more.svg" width={10} height={5} alt="show-more" />
                </div>
                {showDropdown && (
                    <div
                        ref={ref}
                        className={`${order.orderStatus} flex justify-center items-start shadow-2xl bg-white`}
                        style={{
                            position: "absolute",
                            transform: showDropdown ? "translateX(0)" : "translateX(-100%)", // Apply translation based on the 'show' state
                            transition: "transform 0.1s ease-in-out",
                            width: "197px",
                            maxWidth: "197px",
                            height: "144px",
                            maxHeight: "144px",
                            overflowY: "hidden",
                            overscrollBehavior: "contain",
                            scrollBehavior: "smooth",
                            display: "block",
                            // Div is on top of the button, so center the div horizontally
                            top: "0%",
                            zIndex: 300,
                            backgroundColor: "#ffffff",
                            overflowAnchor: "none",
                            borderRadius: "12px",
                        }}
                    >
                        <div className="flex flex-col cursor-pointer w-full">
                            {/** Only render each of this component list if has been passing through props */}
                            <button
                                type="button"
                                id={statusList[0].id_status}
                                className="flex flex-row items-center justify-start hover:bg-[#007AFF] hover:text-white w-full"
                                style={{
                                    height: "48px",
                                    padding: "12px 20px",
                                    borderTopRightRadius: "12px",
                                    borderTopLeftRadius: "12px",
                                    borderBottom: "1px solid var(--Fill-Grey-4, #E5E5EA)",
                                }}
                                onClick={() => {
                                    handleClickedChangeStatus(statusList[0].id_status);
                                }}
                            >
                                <p>{statusList[0].status_name}</p>
                            </button>
                            <button
                                type="button"
                                id={statusList[1].id_status}
                                className="flex flex-row items-center justify-start hover:bg-[#007AFF] hover:text-white w-full"
                                style={{
                                    padding: "12px 20px",
                                    borderBottom: "1px solid var(--Fill-Grey-4, #E5E5EA)",
                                    height: "48px",
                                }}
                                onClick={() => {
                                    handleClickedChangeStatus(statusList[1].id_status);
                                }}
                            >
                                <p>{statusList[1].status_name}</p>
                            </button>
                            <button
                                type="button"
                                id={statusList[2].id_status}
                                className="flex flex-row items-center justify-start hover:bg-[#007AFF] hover:text-white w-full"
                                style={{
                                    height: "48px",
                                    padding: "12px 20px",
                                    borderBottomLeftRadius: "12px",
                                    borderBottomRightRadius: "12px",
                                }}
                                onClick={() => {
                                    handleClickedChangeStatus(statusList[2].id_status);
                                }}
                            >
                                <p>{statusList[2].status_name}</p>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
    if (status === "completed") {
        // If status is "Hoàn thành" then show "Hoàn thành" text
        return (
            <div className="relative">
                <div
                    role="button"
                    id="dropdown-status"
                    data-dropdown-toggle="dropdown"
                    style={{
                        height: "36px",
                        width: "197px",
                        boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.30)",
                    }}
                    className={`${order.orderComplete} rounded-full appearance-none focus:outline-none focus:ring-0 text-center inline-flex items-center justify-center cursor-pointer `}
                    onClick={() => {
                        setShowDropdown(!showDropdown);
                    }}
                >
                    <p
                        className="text-center"
                        style={{
                            fontWeight: "500",
                        }}
                    >
                        {status === "completed" ? "Hoàn thành" : ""}
                    </p>
                </div>
                {showDropdown && (
                    <div
                        ref={ref}
                        className={`${order.orderStatus} flex justify-center items-start shadow-2xl bg-white`}
                        style={{
                            position: "absolute",
                            transform: showDropdown ? "translateX(0)" : "translateX(-100%)", // Apply translation based on the 'show' state
                            transition: "transform 0.1s ease-in-out",
                            width: "197px",
                            maxWidth: "197px",
                            height: "144px",
                            maxHeight: "144px",
                            overflowY: "hidden",
                            overscrollBehavior: "contain",
                            scrollBehavior: "smooth",
                            display: "block",
                            // Div is on top of the button, so center the div horizontally
                            top: "0%",
                            zIndex: 300,
                            backgroundColor: "#ffffff",
                            overflowAnchor: "none",
                            borderRadius: "12px",
                        }}
                    >
                        <div className="flex flex-col cursor-pointer w-full">
                            {/** Only render each of this component list if has been passing through props */}
                            <button
                                type="button"
                                id={statusList[0].id_status}
                                className="flex flex-row items-center justify-start hover:bg-[#007AFF] hover:text-white w-full"
                                style={{
                                    height: "48px",
                                    padding: "12px 20px",
                                    borderTopRightRadius: "12px",
                                    borderTopLeftRadius: "12px",
                                    borderBottom: "1px solid var(--Fill-Grey-4, #E5E5EA)",
                                }}
                                onClick={() => {
                                    handleClickedChangeStatus(statusList[0].id_status);
                                }}
                            >
                                <p>{statusList[0].status_name}</p>
                            </button>
                            <button
                                type="button"
                                id={statusList[1].id_status}
                                className="flex flex-row items-center justify-start hover:bg-[#007AFF] hover:text-white w-full"
                                style={{
                                    padding: "12px 20px",
                                    borderBottom: "1px solid var(--Fill-Grey-4, #E5E5EA)",
                                    height: "48px",
                                }}
                                onClick={() => {
                                    handleClickedChangeStatus(statusList[1].id_status);
                                }}
                            >
                                <p>{statusList[1].status_name}</p>
                            </button>
                            <button
                                type="button"
                                id={statusList[2].id_status}
                                className="flex flex-row items-center justify-start hover:bg-[#007AFF] hover:text-white w-full"
                                style={{
                                    height: "48px",
                                    padding: "12px 20px",
                                    borderBottomLeftRadius: "12px",
                                    borderBottomRightRadius: "12px",
                                }}
                                onClick={() => {
                                    handleClickedChangeStatus(statusList[2].id_status);
                                }}
                            >
                                <p>{statusList[2].status_name}</p>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
        // eslint-disable-next-line prettier/prettier
    }

    // If status is "Báo lỗi" then show "Báo lỗi" text and input checkbox to submit error report
    return (
        <div className="relative">
            <div
                role="button"
                id="dropdown-status"
                data-dropdown-toggle="dropdown"
                className={`${order.orderError} rounded-full appearance-none focus:outline-none focus:ring-0 text-center inline-flex items-center justify-center cursor-pointer`}
                onClick={() => {
                    setShowDropdown(!showDropdown);
                }}
                style={{
                    height: "36px",
                    width: "197px",
                    boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.30)",
                }}
            >
                <p
                    className="text-center"
                    style={{
                        fontWeight: "500",
                    }}
                >
                    {status === "error" ? "Báo lỗi" : ""}
                </p>
            </div>
            {showDropdown && (
                <div
                    ref={ref}
                    className={`${order.orderStatus} flex justify-center items-start shadow-2xl bg-white`}
                    style={{
                        position: "absolute",
                        transform: showDropdown ? "translateX(0)" : "translateX(-100%)", // Apply translation based on the 'show' state
                        transition: "transform 0.1s ease-in-out",
                        width: "197px",
                        maxWidth: "197px",
                        height: "144px",
                        maxHeight: "144px",
                        overflowY: "hidden",
                        overscrollBehavior: "contain",
                        scrollBehavior: "smooth",
                        display: "block",
                        // Div is on top of the button, so center the div horizontally
                        top: "0%",
                        zIndex: 300,
                        backgroundColor: "#ffffff",
                        overflowAnchor: "none",
                        borderRadius: "12px",
                    }}
                >
                    <div className="flex flex-col cursor-pointer w-full">
                        {/** Only render each of this component list if has been passing through props */}
                        <button
                            type="button"
                            id={statusList[0].id_status}
                            className="flex flex-row items-center justify-start hover:bg-[#007AFF] hover:text-white w-full"
                            style={{
                                height: "48px",
                                padding: "12px 20px",
                                borderTopRightRadius: "12px",
                                borderTopLeftRadius: "12px",
                                borderBottom: "1px solid var(--Fill-Grey-4, #E5E5EA)",
                            }}
                            onClick={() => {
                                handleClickedChangeStatus(statusList[0].id_status);
                            }}
                        >
                            <p>{statusList[0].status_name}</p>
                        </button>
                        <button
                            type="button"
                            id={statusList[1].id_status}
                            className="flex flex-row items-center justify-start hover:bg-[#007AFF] hover:text-white w-full"
                            style={{
                                padding: "12px 20px",
                                borderBottom: "1px solid var(--Fill-Grey-4, #E5E5EA)",
                                height: "48px",
                            }}
                            onClick={() => {
                                handleClickedChangeStatus(statusList[1].id_status);
                            }}
                        >
                            <p>{statusList[1].status_name}</p>
                        </button>
                        <button
                            type="button"
                            id={statusList[2].id_status}
                            className="flex flex-row items-center justify-start hover:bg-[#007AFF] hover:text-white w-full"
                            style={{
                                height: "48px",
                                padding: "12px 20px",
                                borderBottomLeftRadius: "12px",
                                borderBottomRightRadius: "12px",
                            }}
                            onClick={() => {
                                handleClickedChangeStatus(statusList[2].id_status);
                            }}
                        >
                            <p>{statusList[2].status_name}</p>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
