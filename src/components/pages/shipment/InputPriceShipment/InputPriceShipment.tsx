import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { Shipment } from "@/hooks/useGetShipmentList";
import { updateShipment } from "@/redux/slice/shipmentSlice";
import { formatNumber } from "@/functions/formatFunction";
import PostShipmentPrice from "@/api/shipment/PostShipmentPrice";

export interface InputPriceShipmentProps {
    id_delivery: string;
    price: number;
    note: string;
}

export function InputPriceShipment({ id_delivery, price, note }: InputPriceShipmentProps) {
    const result: boolean = false;
    const inputRef = useRef<HTMLInputElement>(null);
    const [priceValue, setPriceValue] = useState<string>("");
    const [hasValue, setHasValue] = useState<boolean>(false);
    const dispatch = useDispatch();
    const shipments = useSelector<RootState, Shipment[]>((state) => state.shipment.shipments);
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

        if (inputRef.current) {
            // Subscribe to focus and blur events on the input when the component mounts
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
        // hasValue to render input field with active or inactive style
        if (price !== null && price !== 0) {
            setPriceValue(formatNumber(price.toString()));
            setHasValue(true);
        } else {
            setPriceValue("0");
            setHasValue(false);
        }
    }, []);
    // Check if price change then update price value
    useEffect(() => {
        if (price !== null && price !== 0) {
            // Check if price is changed then update price value and hasValue to true to render input field with active style
            setPriceValue(formatNumber(price.toString()));
            setHasValue(true);
        } else {
            // Check if price is changed then update price value and hasValue to false to render input field with inactive style
            setPriceValue("0");
            setHasValue(false);
        }
    }, [price]);
    // Detect if user press enter key to save price value and post to API
    const handlePriceSave = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            // Update order price to API
            if (priceValue !== "0") {
                await PostShipmentPrice(
                    id_delivery,
                    parseInt(priceValue.replace(/,/g, ""), 10),
                    price,
                    setPriceValue,
                    note,
                    dispatch,
                    shipments,
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
        <div className="relative flex flex-row justify-center items-center w-full">
            <input
                type="text"
                id={id_delivery}
                ref={inputRef}
                autoComplete="off"
                onKeyDown={handlePriceSave}
                className="border border-neutral-400 appearance-none focus:outline-none focus:ring-0 focus:ring-transparent focus:border-neutral-400 peer"
                value={priceValue}
                onChange={handlePriceChange}
                style={{
                    width: "122px",
                    height: "38px",
                    maxHeight: "38px",
                    maxWidth: "122px",
                    borderRadius: "5px",
                    border: "0.5px solid var(--bdbdbd, #BDBDBD)",
                    background: hasValue === true ? "#E5E5EA" : "#ffffff",
                    color: hasValue === true ? "#8E8E93" : "#3a3a3c",
                    fontWeight: hasValue === true ? 700 : 400,
                    paddingLeft: "9px",
                    paddingRight: "9px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                    fontSize: "16px",
                    textAlign: "center",
                }}
            />
            <p className="px-2 text-neutral-400">đ</p>
        </div>
    );
}
