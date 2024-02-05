import { useEffect, useState, useRef, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Order } from "@/hooks/useGetOrderList";
import { RootState } from "@/redux/store/store";
import { updateOrder } from "@/redux/slice/orderSlice";
import { formatNumber } from "@/functions/formatFunction";
import order from "./order.module.css";
import PostOrderPrice from "@/api/order/PostOrderPrice";

export interface OrderPriceProps {
    id_order: string;
    price: number;
}

export function OrderPrice({ id_order, price }: OrderPriceProps) {
    // Store status when call API
    const inputRef = useRef<HTMLInputElement>(null);
    const [priceValue, setPriceValue] = useState<string>("0");
    // State to render input field with active or inactive style
    const [hasValue, setHasValue] = useState<boolean>(false);
    const orders = useSelector<RootState, Order[]>((state) => state.order.orders);
    const dispatch = useDispatch();
    // When click on input field then focus on input field
    useEffect(() => {
        const handleBlur = () => {
            if (inputRef.current) {
                if (price === null || price === 0) {
                    // if just input and not update price to API then set price value to 0 and hasValue to false
                    // to render input field with inactive style
                    inputRef.current.value = "0";
                    setHasValue(false);
                } else {
                    // if update price to API then set price value to price and hasValue to true
                    // to render input field with active style
                    inputRef.current.value = formatNumber(price.toString());
                    setHasValue(true);
                }
            }
        };
        // Subscribe to focus and blur events on the input when the component mounts when user click on input field
        if (inputRef.current) {
            inputRef.current.addEventListener("blur", handleBlur);
        }
        return () => {
            // Clean up the subscription when the component unmounts
            if (inputRef.current) {
                inputRef.current.removeEventListener("blur", handleBlur);
            }
        };
    }, [inputRef, price]);
    useEffect(() => {
        if (price !== null && price !== 0) {
            setPriceValue(formatNumber(price.toString()));
            setHasValue(true);
        } else {
            setPriceValue("0");
            setHasValue(false);
        }
    }, []);
    // Set price value when price props change
    useEffect(() => {
        if (price !== null && price !== 0) {
            setPriceValue(formatNumber(price.toString()));
            setHasValue(true);
        } else {
            setPriceValue("0");
            setHasValue(false);
        }
    }, [price]);
    const handlePriceSave = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            // Update order price to API
            if (priceValue !== "0") {
                await PostOrderPrice(
                    id_order,
                    parseInt(priceValue.replace(/,/g, ""), 10),
                    price,
                    setPriceValue,
                    dispatch,
                    orders,
                    setHasValue,
                );
            }
        }
    };
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const formattedValue = formatNumber(value);
        // Update price value in input field if is NaN set to 0 else set to formatted value
        setPriceValue(formattedValue === "NaN" ? "0" : formattedValue);
    };

    return (
        <div className={` ${order.orderPrice} flex flex-row items-center justify-center`}>
            <div className="flex flex-col justify-center items-center text-center">
                <p
                    style={{
                        textAlign: "center",
                        fontSize: "20px",
                    }}
                >
                    Tổng giá trị đơn:
                </p>
                <div className="flex flex-row justify-center items-center w-full">
                    <input
                        type="text"
                        id={id_order}
                        ref={inputRef}
                        autoComplete="off"
                        onKeyDown={handlePriceSave}
                        className="border-[0.5px] border-[#C7C7CC] focus:outline-none  peer focus:border-[#007aff] hover:border-[#007aff] focus:ring-1 active:border-[#007aff] focus:ring-[#007aff] hover:ring-[#007aff] active:ring-[#007aff]"
                        value={priceValue}
                        onChange={handlePriceChange}
                        style={{
                            width: "176px",
                            height: "42px",
                            borderRadius: "8px",
                            background: hasValue === true ? "#E5E5EA" : "#ffffff",
                            color: hasValue === true ? "#8E8E93" : "#3a3a3c",
                            fontWeight: hasValue === true ? 700 : 400,
                            paddingLeft: "19px",
                            paddingRight: "19px",
                            paddingTop: "6px",
                            paddingBottom: "6px",
                            fontSize: "20px",
                            textAlign: "center",
                        }}
                    />
                    <p className="ml-2 text-[#C7C7CC]">đ</p>
                </div>
            </div>
        </div>
    );
}
