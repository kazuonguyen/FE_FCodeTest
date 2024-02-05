/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import dropdown from "./dropdown.module.css";
import { Order } from "@/hooks/useGetOrderList";
import { setError } from "@/redux/slice/alertSlice";
import PostOrderQueue from "@/api/order/PostOrderQueue";
import PostOrderComplete from "@/api/order/PostOrderComplete";
import PostOrderError from "@/api/order/PostOrderError";
import { updateOrder } from "@/redux/slice/orderSlice";

export interface DropdownStatusProps {
    order: Order;
}

export default function DropdownStatus({ order }: DropdownStatusProps) {
    const dispatch = useDispatch();
    const ref = useRef<HTMLDivElement>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    // Use hooks post order status to API
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
    const handleClickedChangeStatus = async (id_status: string) => {
        // console.log("order.status", order.status);
        // console.log("id_status", id_status);
        if (order.status === id_status) {
            // console.log("Đơn hàng đã ở trạng thái này");
            dispatch(setError("Đơn hàng đã ở trạng thái này"));
            setShowDropdown(false);
            return;
        }

        let result = false;

        switch (id_status) {
            case "queue":
                result = await PostOrderQueue(order.id_order, dispatch);
                break;
            case "completed":
                result = await PostOrderComplete(order.id_order, dispatch);
                break;
            case "error":
                result = await PostOrderError(order.id_order, dispatch);
                break;
            default:
                break;
        }

        if (order.status === "completed" && id_status === "error" && result === false) {
            setShowDropdown(false);
            return;
        }

        if (order.status === "error" && id_status === "completed" && result === false) {
            setShowDropdown(false);
            return;
        }

        if (order.status === "error" && id_status === "queue" && result === false) {
            setShowDropdown(false);
            return;
        }

        if (order.status === "completed" && id_status === "queue" && result === false) {
            setShowDropdown(false);
            return;
        }

        const newOrder = { ...order, status: id_status };
        dispatch(updateOrder(newOrder));
        setShowDropdown(false);
    };
    // Conditionally render the dropdown
    // If status is empty or is "Đang chờ in" then show dropdown button
    if (order.status === "queue" || order.status === "") {
        return (
            <div className="relative">
                <div
                    role="button"
                    id="dropdown-status"
                    data-dropdown-toggle="dropdown"
                    className="bg-white rounded-full appearance-none focus:outline-none focus:ring-0 px-5 py-2.5 text-center inline-flex items-center justify-between cursor-pointer w-[128px] h-[36px]"
                    style={{
                        borderRadius: "100px",
                        border: "0.5px solid var(--bdbdbd, #BDBDBD)",
                        paddingTop: "6px",
                        paddingBottom: "6px",
                        paddingLeft: "16px",
                        paddingRight: "16px",
                        fontSize: "16px",
                    }}
                    onClick={() => {
                        setShowDropdown(!showDropdown);
                    }}
                >
                    <p className="text-center">{order.status === "queue" ? "Đang chờ" : ""}</p>

                    <Image src="/icon/more.svg" width={11} height={6} alt="show-more" />
                </div>
                {showDropdown && (
                    <div
                        ref={ref}
                        className={`${dropdown.Dropdown} flex justify-center items-start shadow-2xl bg-white`}
                        style={{
                            position: "absolute",
                            transform: showDropdown ? "translateX(0)" : "translateX(-100%)", // Apply translation based on the 'show' state
                            transition: "transform 0.1s ease-in-out",
                            // Apply a transition effect to the transform property
                            width: "218px",
                            maxWidth: "218px",
                            height: "132px",
                            maxHeight: "132px",
                            overflowY: "hidden",
                            overscrollBehavior: "contain",
                            scrollBehavior: "smooth",
                            display: "block",
                            // Div is on top of the button, so center the div horizontally
                            top: "0%",
                            zIndex: 100,
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
                                    height: "43px",
                                    borderTopRightRadius: "12px",
                                    borderTopLeftRadius: "12px",
                                    borderBottom: "1px solid #E5E5EA",
                                    padding: "12px 20px",
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
                                    borderBottom: "1px solid #E5E5EA",
                                    height: "44px",
                                    padding: "12px 20px",
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
                                    height: "44px",
                                    borderBottomLeftRadius: "12px",
                                    borderBottomRightRadius: "12px",
                                    padding: "12px 20px",
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
    if (order.status === "completed") {
        // If status is "Hoàn thành" then show "Hoàn thành" text
        return (
            <div className="relative">
                <div
                    role="button"
                    id="dropdown-status"
                    data-dropdown-toggle="dropdown"
                    className={`${dropdown.Completed} rounded-full appearance-none focus:outline-none focus:ring-0 px-5 py-2.5 text-center inline-flex items-center justify-between cursor-pointer w-[128px] h-[36px]`}
                    onClick={() => {
                        setShowDropdown(!showDropdown);
                    }}
                >
                    <p className="text-center">
                        {" "}
                        {order.status === "completed" ? "Hoàn thành" : ""}
                    </p>
                </div>
                {showDropdown && (
                    <div
                        ref={ref}
                        className={`${dropdown.Dropdown} flex justify-center items-start shadow-2xl bg-white`}
                        style={{
                            position: "absolute",
                            transform: showDropdown ? "translateX(0)" : "translateX(-100%)", // Apply translation based on the 'show' state
                            transition: "transform 0.1s ease-in-out",
                            // Apply a transition effect to the transform property
                            width: "218px",
                            maxWidth: "218px",
                            height: "132px",
                            maxHeight: "132px",
                            overflowY: "hidden",
                            overscrollBehavior: "contain",
                            scrollBehavior: "smooth",
                            display: "block",
                            // Div is on top of the button, so center the div horizontally
                            top: "0%",
                            zIndex: 100,
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
                                    height: "43px",
                                    borderTopRightRadius: "12px",
                                    borderTopLeftRadius: "12px",
                                    borderBottom: "1px solid #E5E5EA",
                                    padding: "12px 20px",
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
                                    borderBottom: "1px solid #E5E5EA",
                                    height: "44px",
                                    padding: "12px 20px",
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
                                    height: "44px",
                                    borderBottomLeftRadius: "12px",
                                    borderBottomRightRadius: "12px",
                                    padding: "12px 20px",
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
                className={`${dropdown.Error} rounded-full appearance-none focus:outline-none focus:ring-0 px-5 py-2.5 text-center inline-flex items-center justify-center cursor-pointer w-[128px] h-[36px]`}
                onClick={() => {
                    setShowDropdown(!showDropdown);
                }}
            >
                <p className="text-center"> {order.status === "error" ? "Báo lỗi" : ""}</p>
            </div>
            {showDropdown && (
                <div
                    ref={ref}
                    className={`${dropdown.Dropdown} flex justify-center items-start shadow-2xl bg-white`}
                    style={{
                        position: "absolute",
                        transform: showDropdown ? "translateX(0)" : "translateX(-100%)", // Apply translation based on the 'show' state
                        transition: "transform 0.1s ease-in-out",
                        // Apply a transition effect to the transform property
                        width: "218px",
                        maxWidth: "218px",
                        height: "132px",
                        maxHeight: "132px",
                        overflowY: "hidden",
                        overscrollBehavior: "contain",
                        scrollBehavior: "smooth",
                        display: "block",
                        // Div is on top of the button, so center the div horizontally
                        top: "0%",
                        zIndex: 100,
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
                                height: "43px",
                                borderTopRightRadius: "12px",
                                borderTopLeftRadius: "12px",
                                borderBottom: "1px solid #E5E5EA",
                                padding: "12px 20px",
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
                                borderBottom: "1px solid #E5E5EA",
                                height: "44px",
                                padding: "12px 20px",
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
                                height: "44px",
                                borderBottomLeftRadius: "12px",
                                borderBottomRightRadius: "12px",
                                padding: "12px 20px",
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
