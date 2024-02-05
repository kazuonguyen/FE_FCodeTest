/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ReactSlider from "react-slider";
import { RootState } from "@/redux/store/store";
import {
    clearFilterByCount,
    setFilterByLeftCount,
    setFilterByRightCount,
} from "@/redux/slice/orderSlice";
import filter from "./filter.module.css";

export default function FilterOrderNum({ isActived }: { isActived: boolean }) {
    const dispatch = useDispatch();
    const [showDropdown, setShowDropdown] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    const filterOrderByLeftCount = useSelector(
        (state: RootState) => state.order.filterOrderLeftCount,
    );
    const filterOrderByRightCount = useSelector(
        (state: RootState) => state.order.filterOrderRightCount,
    );
    const [leftCount, setLeftCount] = useState<number>(filterOrderByLeftCount);
    const [rightCount, setRightCount] = useState<number>(filterOrderByRightCount);

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
    // Make sure on input min value is 1 and max value is 2147483646
    useEffect(() => {
        if (leftCount < 1) {
            setLeftCount(1);
            dispatch(setFilterByLeftCount(1));
        }
        if (leftCount > 2147483646) {
            setLeftCount(2147483646);
            dispatch(setFilterByLeftCount(2147483646));
        }
        if (rightCount < 1) {
            setRightCount(1);
            dispatch(setFilterByRightCount(1));
        }
        if (rightCount > 2147483646) {
            setRightCount(2147483646);
            dispatch(setFilterByRightCount(2147483646));
        }
    }, [leftCount, rightCount]);
    // Listen to filterOrderByLeftCount and filterOrderByRightCount change in slider to update value in input field
    useEffect(() => {
        setLeftCount(filterOrderByLeftCount);
        setRightCount(filterOrderByRightCount);
    }, [filterOrderByLeftCount, filterOrderByRightCount]);
    const handleLeftCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        // Update price value in input field if is NaN set to 0 else set to formatted value
        if (value === "NaN") {
            setLeftCount(1);
        } else if (Number(value) > 2147483646) {
            setLeftCount(2147483646);
        } else if (Number(value) < 1) {
            setLeftCount(1);
        } else {
            setLeftCount(Number(value));
        }
        // Update price value in store
        dispatch(setFilterByLeftCount(value === "NaN" ? 1 : Number(value)));
    };
    const handleRightCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        // Update price value in input field if is NaN set to 0 else set to formatted value
        if (value === "NaN") {
            setRightCount(1);
        } else if (Number(value) > 2147483646) {
            setRightCount(2147483646);
        } else if (Number(value) < 1) {
            setRightCount(1);
        } else {
            setRightCount(Number(value));
        }
        // Update price value in store
        dispatch(setFilterByRightCount(value === "NaN" ? 1 : Number(value)));
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
                    setShowDropdown(!showDropdown);
                }}
            >
                <p
                    className={`${filter.filterText}`}
                    style={{
                        color: isActived ? "#ffffff" : "var(--3-a-3-a-3-c, #3A3A3C)",
                    }}
                >
                    Số lượng
                </p>

                {isActived ? (
                    <button
                        type="button"
                        onClick={() => {
                            dispatch(clearFilterByCount());
                            setShowDropdown(!showDropdown);
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
                        width: "600px",
                        maxWidth: "600px",
                        // Overlap the button border
                        top: "0%",
                        left: "50%",
                        translate: "-50%",
                        height: "max-content",
                        maxHeight: "max-content",
                        zIndex: 100,
                        display: "block",
                        overflow: "hidden",
                        overflowY: "scroll",
                        overflowAnchor: "none",
                        backgroundColor: "#ffffff",
                        borderRadius: "22px",
                        border: "0.5px solid var(--bdbdbd, #BDBDBD)",
                        background: "#FFF",
                        /* Shadow_low */
                        boxShadow: "0px 2px 15px 0px rgba(0, 0, 0, 0.25)",
                    }}
                >
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-row items-center justify-between w-full px-6 py-4">
                            {/* Left count */} {/* Right count */}
                            <div className="flex flex-row justify-start items-center w-full">
                                <input
                                    type="number"
                                    autoComplete="off"
                                    className="border border-neutral-400 appearance-none focus:outline-none focus:ring-0 focus:ring-transparent focus:border-neutral-400 peer"
                                    value={leftCount}
                                    onChange={handleLeftCountChange}
                                    style={{
                                        width: "176px",
                                        height: "42px",
                                        borderRadius: "8px",
                                        border: "0.5px solid var(--bdbdbd, #BDBDBD)",
                                        background: "#ffffff",
                                        paddingLeft: "19px",
                                        paddingRight: "19px",
                                        paddingTop: "6px",
                                        paddingBottom: "6px",
                                        fontSize: "20px",
                                        textAlign: "center",
                                    }}
                                />
                            </div>
                            {/* Line */}
                            <div className="flex flex-row justify-center items-center">
                                <div
                                    className="border border-neutral-400"
                                    style={{
                                        width: "42px",
                                        height: "1px",
                                    }}
                                />
                            </div>
                            <div className="flex flex-row justify-end items-center w-full">
                                <input
                                    type="number"
                                    autoComplete="off"
                                    className="border border-neutral-400 appearance-none focus:outline-none focus:ring-0 focus:ring-transparent focus:border-neutral-400 peer"
                                    value={rightCount}
                                    onChange={handleRightCountChange}
                                    style={{
                                        width: "176px",
                                        height: "42px",
                                        borderRadius: "8px",
                                        border: "0.5px solid var(--bdbdbd, #BDBDBD)",
                                        background: "#ffffff",
                                        paddingLeft: "19px",
                                        paddingRight: "19px",
                                        paddingTop: "6px",
                                        paddingBottom: "6px",
                                        fontSize: "20px",
                                        textAlign: "center",
                                    }}
                                />
                            </div>
                        </div>
                        {/* React Double Range Slider */}
                        <div className="relative flex flex-row items-center justify-center w-full px-6 py-5">
                            <ReactSlider
                                className="w-full h-1"
                                min={1}
                                max={2147483646}
                                value={[
                                    filterOrderByLeftCount as number,
                                    filterOrderByRightCount as number,
                                ]}
                                thumbClassName="aspect-square bg-white border w-[26px] h-[26px] rounded-full border-neutral-400 appearance-none focus:outline-none focus:ring-0 focus:ring-transparent drop-shadow-[0px_0px_4px_rgba(0,0,0,0.25] peer absolute top-[-10px]"
                                trackClassName=""
                                defaultValue={[1, 2147483646]}
                                ariaLabel={["Lower thumb", "Upper thumb"]}
                                ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                                renderThumb={(props, state) => <div {...props} />}
                                renderTrack={(props, state) => {
                                    // Get left and right value from state to calculate width of track dynamically.
                                    const { index, value } = state;
                                    const left = value[0];
                                    const right = value[1];
                                    const trackWidth = ((right - left) / (2147483646 - 0)) * 100;
                                    const marginLeft = (left / (2147483646 - 0)) * 100;
                                    const marginRight =
                                        ((2147483646 - right) / (2147483646 - 0)) * 100;

                                    return (
                                        <div
                                            {...props}
                                            className="bg-[#007AFF] h-[2px]"
                                            style={{
                                                width: `${trackWidth}%`,
                                                marginLeft: `${marginLeft}%`,
                                                marginRight: `${marginRight}%`,
                                            }}
                                        />
                                    );
                                }}
                                onChange={(value, index) => {
                                    if (index === 0) {
                                        dispatch(setFilterByLeftCount(value[0]));
                                    } else {
                                        dispatch(setFilterByRightCount(value[1]));
                                    }
                                }}
                                onSliderClick={(value) => {
                                    // Calculate left and right value from click position to update value in store
                                    const left = Math.abs(filterOrderByLeftCount - value);
                                    const right = Math.abs(filterOrderByRightCount - value);
                                    if (left < right) {
                                        dispatch(setFilterByLeftCount(value));
                                    } else {
                                        dispatch(setFilterByRightCount(value));
                                    }
                                }}
                                minDistance={0}
                                step={Math.floor(2147483646 / 20)}
                            />
                        </div>
                        {/* Button */}
                        <div
                            className="flex flex-row items-center justify-end w-full px-6 py-4"
                            style={{
                                gap: "20px",
                            }}
                        >
                            <button
                                type="button"
                                className="flex flex-row items-center justify-center bg-white hover:bg-gray-200"
                                onClick={() => {
                                    dispatch(clearFilterByCount());
                                    setLeftCount(1);
                                    setRightCount(2147483646);
                                    setShowDropdown(false);
                                }}
                                style={{
                                    width: "100%",
                                    height: "42px",
                                    padding: "6px 31px 6px 32px",
                                    borderRadius: "6px",
                                    border: "0.25px solid var(--Fill-Grey-3, #C7C7CC)",
                                    boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
                                }}
                            >
                                Huỷ
                            </button>
                            <button
                                type="button"
                                className="flex flex-row items-center justify-center bg-[#007AFF] hover:bg-[#006CEB] text-white"
                                onClick={() => {
                                    setShowDropdown(false);
                                }}
                                style={{
                                    width: "100%",
                                    height: "42px",
                                    padding: "6px 31px 6px 32px",
                                    borderRadius: "6px",
                                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                                }}
                            >
                                Áp dụng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
