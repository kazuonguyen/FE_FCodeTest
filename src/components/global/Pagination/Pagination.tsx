/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ReactPaginate from "react-paginate";
import Image from "next/image";
import { use, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import pagination from "./pagination.module.css";
import { RootState } from "@/redux/store/store";
import { paginateList } from "@/functions/constant";
import { setLimitItemPerPage } from "@/redux/slice/orderSlice";
import { setLimitItemsPerPage } from "@/redux/slice/shipmentSlice";

export interface PaginationProps {
    path: string;
    totalPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

export default function Pagination({
    path,
    totalPage,
    currentPage,
    setCurrentPage,
}: PaginationProps) {
    const dispatch = useDispatch();
    // State for show dropdown items per page list
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const itemsPerPage = useSelector((state: RootState) => state.order.limitItemPerPage);
    const limitItemsPerPage = useSelector((state: RootState) => state.shipment.limitItemsPerPage);
    const ref = useRef<HTMLDivElement>(null);
    // Close dropdown when click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]);

    function moveToTop() {
        setCurrentPage(1);
    }
    function moveToBottom() {
        setCurrentPage(totalPage);
    }

    function handleItemsPerPageChange(value: number) {
        if (path === "orders") {
            dispatch(setLimitItemPerPage(value));
        } else if (path === "shipments") {
            dispatch(setLimitItemsPerPage(value));
        }
        setShowDropdown(false);
    }
    return (
        <div
            className="flex flex-row items-center justify-center"
            style={{
                position: "absolute",
                maxHeight: "44px",
                borderRadius: "100px",
                backgroundColor: "var(--transparent-85, rgba(0, 0, 0, 0.85))",
                backdropFilter: "blur(2px)",
                maxWidth: "522px",
                display: "flex",
                width: "max-content",
                height: "44px",
                bottom: "20px",
                paddingTop: "8px",
                paddingBottom: "8px",
                paddingRight: "20px",
                paddingLeft: "20px",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div className="flex flex-row items-center justify-center">
                <p
                    style={{
                        color: "#C7C7CC",
                        fontSize: "16px",
                        fontWeight: 500,
                        marginRight: "12px",
                    }}
                >
                    Số lượng:
                </p>
                {/* Dropdown button */}
                <div
                    style={{
                        position: "relative",
                        cursor: "pointer",
                        userSelect: "none",
                    }}
                    onClick={() => {
                        setShowDropdown(!showDropdown);
                    }}
                >
                    <div
                        className="flex flex-row items-center justify-between "
                        style={{
                            width: "71px",
                            height: "28px",
                            borderRadius: "6px",
                            border: "1px solid #FFFFFF",
                            paddingLeft: "8px",
                            paddingRight: "8px",
                        }}
                    >
                        <p
                            style={{
                                color: "#FFFFFF",
                                fontSize: "16px",
                                fontWeight: 500,
                            }}
                        >
                            {path === "orders" ? itemsPerPage : limitItemsPerPage}
                        </p>
                        <Image src="/icon/arrow_down.svg" width={8} height={16} alt="arrow-down" />
                        {/* Dropdown */}
                        {showDropdown === true && (
                            <div
                                ref={ref}
                                className={`${pagination.Dropdown} flex absolute justify-center items-center`}
                                style={{
                                    position: "absolute",
                                    transform: showDropdown ? "translateX(0)" : "translateX(-100%)", // Apply translation based on the 'show' state
                                    transition: "transform 0.3s ease-in-out",
                                    // Apply a transition effect to the transform property
                                    width: "79px",
                                    maxWidth: "79px",
                                    // Overlap the button border
                                    bottom: "0",
                                    left: "0",
                                    height: "max-content",
                                    backdropFilter: "blur(6px)",
                                    maxHeight: "256px",
                                    zIndex: 100,
                                    display: "block",
                                    overflow: "hidden",
                                    overflowY: "scroll",
                                    overflowAnchor: "none",
                                    backgroundColor: "var(--transparent-85, rgba(0, 0, 0, 0.85))",
                                    borderRadius: "12px",
                                    background: "var(--transparent-85, rgba(0, 0, 0, 0.85))",
                                    /* Shadow_low */
                                    boxShadow:
                                        "0px 0px 3px 0px rgba(0, 0, 0, 0.55), 0px 36px 100px 0px rgba(0, 0, 0, 0.25)",
                                }}
                            >
                                {paginateList.map((item) => (
                                    <div
                                        key={item}
                                        className="flex flex-row items-center justify-start hover:bg-[#007AFF]"
                                        style={{
                                            width: "100%",
                                            height: "32px",
                                            borderBottom: "1px solid #8E8E93",
                                            cursor: "pointer",
                                            padding: "4px 47px 4px 12px",
                                            userSelect: "none",
                                            backgroundColor:
                                                path === "orders"
                                                    ? itemsPerPage === item
                                                        ? "#007AFF"
                                                        : ""
                                                    : limitItemsPerPage === item
                                                    ? "#007AFF"
                                                    : "",
                                        }}
                                        onClick={() => handleItemsPerPageChange(item)}
                                    >
                                        <p
                                            style={{
                                                color: "#FFFFFF",
                                                fontSize: "16px",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Divider */}
            <div
                style={{
                    width: "1px",
                    height: "20px",
                    backgroundColor: "#AEAEB2",
                    marginLeft: "20px",
                    marginRight: "20px",
                }}
            />
            <div className="flex flex-row items-center justify-center space-x-[12px]">
                <div
                    style={{
                        cursor: "pointer",
                        userSelect: "none",
                    }}
                >
                    <Image
                        src="/icon/double_arrow_left.svg"
                        width={12.5}
                        height={13}
                        alt="double-arrow-left"
                        onClick={() => {
                            moveToTop();
                        }}
                    />
                </div>
                <ReactPaginate
                    pageCount={totalPage}
                    breakLabel="..."
                    forcePage={currentPage - 1}
                    previousLabel={
                        <Image
                            src="/icon/arrow_left.svg"
                            width={5.5}
                            height={13}
                            alt="arrow-left"
                        />
                    }
                    nextLabel={
                        <Image
                            src="/icon/arrow_right.svg"
                            width={5.5}
                            height={13}
                            alt="arrow-right"
                        />
                    }
                    breakClassName={`${pagination.breakLabel}`}
                    onPageChange={({ selected }) => {
                        setCurrentPage(selected + 1);
                    }}
                    containerClassName="flex flex-row items-center justify-end self-end space-x-[12px] bg-transparent w-full"
                    pageClassName={`${pagination.disable}`}
                    activeClassName={`${pagination.active} text-white border-1 border-white px-[7px]`}
                    previousClassName={`${pagination.labelPrev}`}
                    nextClassName={`${pagination.labelNext}`}
                    disabledClassName={`${pagination.disable}`}
                />
                <div
                    style={{
                        cursor: "pointer",
                        userSelect: "none",
                    }}
                >
                    <Image
                        src="/icon/double_arrow_right.svg"
                        width={12.5}
                        height={13}
                        alt="double-arrow-right"
                        onClick={() => {
                            moveToBottom();
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
