/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-return-await */
import { useDispatch } from "react-redux";
import Image from "next/image";
import order from "./order.module.css";
import { setError, setSuccess } from "@/redux/slice/alertSlice";

export interface OrderInfoProps {
    num: number;
    id_design: string;
    tshirt_size: string;
}

export default function OrderInfo({ num, id_design, tshirt_size }: OrderInfoProps) {
    const dispatch = useDispatch();
    // Implement copy to clipboard function
    async function copyTextToClipboard(text: string) {
        if ("clipboard" in navigator) {
            // Use new clipboard API if available
            return await navigator.clipboard.writeText(text);
        }
        // Fall back copy to clipboard method for old browsers
        return document.execCommand("copy", true, text);
    }
    const handleCopy = async () => {
        try {
            await copyTextToClipboard(id_design);
            dispatch(setSuccess("Đã copy mã thiết kế vào clipboard"));
        } catch (err) {
            dispatch(setError("Không thể copy mã thiết kế vào clipboard"));
        }
    };
    return (
        <div
            role="button"
            className={`${order.orderNum} flex flex-row items-center justify-between cursor-pointer select-none`}
            onClick={handleCopy}
        >
            {/** Num of shirt of that design */}
            <div className="flex flex-row items-center justify-start">
                <p
                    style={{
                        color: "var(--3-a-3-a-3-c, #3A3A3C)",
                        fontSize: "16px",
                    }}
                >
                    Mã thiết kế: &nbsp;
                </p>
                <p
                    style={{
                        color: "var(--3-a-3-a-3-c, #3A3A3C)",
                        fontSize: "16px",
                        fontWeight: "600",
                        paddingRight: "12px",
                    }}
                >
                    {/** Only get 16 character first in design id */}
                    {id_design.split("").slice(0, 16).join("")}
                </p>
                {/** Copy icon */}
                <Image src="/icon/copy.svg" alt="Copy" width={16} height={16} />
            </div>
            <div className="flex flex-row items-center justify-start">
                <p
                    style={{
                        color: "var(--3-a-3-a-3-c, #3A3A3C)",
                        fontSize: "16px",
                    }}
                >
                    Size: &nbsp;
                </p>
                <p
                    style={{
                        color: "var(--3-a-3-a-3-c, #3A3A3C)",
                        fontSize: "16px",
                        fontWeight: "600",
                    }}
                >
                    {tshirt_size}
                </p>
            </div>
            <div className="flex flex-row items-center justify-end">
                <p
                    style={{
                        color: "var(--3-a-3-a-3-c, #3A3A3C)",
                        fontSize: "16px",
                    }}
                >
                    Số lượng: &nbsp;
                </p>
                <p
                    style={{
                        color: "var(--3-a-3-a-3-c, #3A3A3C)",
                        fontSize: "16px",
                        fontWeight: "600",
                    }}
                >
                    {num}
                </p>
            </div>
        </div>
    );
}
