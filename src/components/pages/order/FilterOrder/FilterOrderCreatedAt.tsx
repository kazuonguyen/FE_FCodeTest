/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import filter from "./filter.module.css";
import { RootState } from "@/redux/store/store";
import { clearFilterByCreateAt, setFilterByCreateAt } from "@/redux/slice/orderSlice";
import { createAtList } from "@/functions/constant";
import { convertDateToServerFormat } from "../../../../functions/formatFunction";

export default function FilterOrderCreateAt({ isActived }: { isActived: boolean }) {
    const dispatch = useDispatch();
    const filterOrderByCreateAt = useSelector(
        (state: RootState) => state.order.filterOrderByCreateAt,
    );
    // State for selected filter option
    const [selectedTimeRange, setSelectedTimeRange] = useState<string>("");
    const [showDropdown, setShowDropdown] = useState(false);
    // State for the selected filter option
    // create list color contain only id and color name to show in dropdown
    const ref = useRef<HTMLDivElement>(null);
    // If click outside the dropdown, close it else click inside its button then set value
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
    }, [ref]);
    // Handle time range filter
    const handleFilterTimeRange = (timeRange: string) => {
        if (!timeRange) return "";
        const currentDate = new Date();
        let startDate: Date;

        switch (timeRange) {
            case "threedays":
                startDate = new Date(currentDate);
                startDate.setDate(currentDate.getDate() - 3);
                break;
            case "lastweek":
                startDate = new Date(currentDate);
                startDate.setDate(currentDate.getDate() - 7);
                break;
            case "lastmonth":
                startDate = new Date(currentDate);
                startDate.setMonth(currentDate.getMonth() - 1);
                break;
            default:
                startDate = new Date(0); // Ngày bắt đầu từ 1/1/1970
                break;
        }
        // const startDateString = startDate.toISOString();
        const startDateString = startDate.toLocaleDateString("en-GB");
        return startDateString;
    };
    // Listen to selectedTimeRange change and dispatch action to filter order by create at
    useEffect(() => {
        if (selectedTimeRange !== "") {
            const filterDate = convertDateToServerFormat(handleFilterTimeRange(selectedTimeRange));
            dispatch(setFilterByCreateAt(filterDate));
        }
    }, [selectedTimeRange]);
    const handleFilterCreatedAt = (value: string) => {
        switch (value) {
            case "threedays":
                return "3 ngày";
            case "lastweek":
                return "1 tuần";
            case "lastmonth":
                return "1 tháng";
            default:
                return "";
        }
    };
    return (
        <div className="relative">
            <div
                role="button"
                id="filter-button"
                data-dropdown-toggle="dropdown"
                className={` ${filter.filterButton} ${filter.Dropdown} flex flex-row items-center justify-between appearance-none focus:outline-none focus:ring-0 focus:ring-transparent`}
                style={{
                    backgroundColor: isActived ? "#3a3a3c" : "#ffffff",
                }}
                onClick={() => {
                    if (!isActived) setShowDropdown(!showDropdown);
                    else {
                        dispatch(clearFilterByCreateAt());
                        setSelectedTimeRange("");
                        setShowDropdown(false);
                    }
                }}
            >
                <p
                    className={`${filter.filterText}`}
                    style={{
                        color: isActived ? "#ffffff" : "var(--3-a-3-a-3-c, #3A3A3C)",
                    }}
                >
                    {selectedTimeRange !== ""
                        ? handleFilterCreatedAt(selectedTimeRange)
                        : "Ngày tạo"}
                </p>
                {isActived ? (
                    <button
                        type="button"
                        onClick={() => {
                            dispatch(clearFilterByCreateAt());
                            setSelectedTimeRange("");
                            setShowDropdown(false);
                        }}
                    >
                        <Image
                            src="/icon/close.svg"
                            alt="dropdown"
                            width={26}
                            height={26}
                            className={`${filter.filterIconActive}`}
                        />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => {
                            setShowDropdown(!showDropdown);
                        }}
                    >
                        <Image
                            src="/icon/dropdown.svg"
                            alt="dropdown"
                            width={26}
                            height={26}
                            className={`${filter.filterIconInactive}`}
                        />
                    </button>
                )}
            </div>
            {showDropdown === true && (
                <div
                    ref={ref}
                    className={`${filter.filterDropdown} flex absolute justify-center items-center`}
                    style={{
                        position: "absolute",
                        transform: showDropdown ? "translateX(0)" : "translateX(-100%)", // Apply translation based on the 'show' state
                        transition: "transform 0.3s ease-in-out",
                        // Apply a transition effect to the transform property
                        width: "218px",
                        maxWidth: "218px",
                        // Overlap the button border
                        top: "0%",
                        height: "max-content",
                        maxHeight: "132px",
                        zIndex: 100,
                        display: "block",
                        overflow: "hidden",
                        overflowY: "scroll",
                        overflowAnchor: "none",
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                        border: "0.5px solid var(--bdbdbd, #BDBDBD)",
                        background: "#FFF",
                        /* Shadow_low */
                        boxShadow:
                            "0px 0px 3px 0px rgba(0, 0, 0, 0.55), 0px 36px 100px 0px rgba(0, 0, 0, 0.25)",
                    }}
                >
                    <div>
                        {/** Only render each of this component list if has been passing through props */}
                        {createAtList &&
                            createAtList.map((item, index) => {
                                return (
                                    <button
                                        type="button"
                                        key={index}
                                        className="flex flex-row items-center justify-start hover:bg-[#007AFF] hover:text-white w-full"
                                        onClick={() => {
                                            setSelectedTimeRange(item);
                                            setShowDropdown(false);
                                        }}
                                        style={{
                                            fontSize: "15px",
                                            padding: "12px 20px",
                                            height: "44px",
                                            maxHeight: "44px",
                                            borderBottom: "1px solid var(--Fill-Grey-4, #E5E5EA)",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <p>{handleFilterCreatedAt(item)}</p>
                                    </button>
                                );
                            })}
                    </div>
                </div>
            )}
        </div>
    );
}
