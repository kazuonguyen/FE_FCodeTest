/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect } from "react";
import Image from "next/image";
import order from "./order.module.css";
import useGetQR from "@/hooks/useGetQR";

export interface OrderQRProps {
    id_order: string;
}

export function OrderQR({ id_order }: OrderQRProps) {
    const { QR, getQR } = useGetQR();
    useEffect(() => {
        getQR(id_order);
    }, []);
    const handlePrintQR = async (id_order: string) => {
        // // console.log('Print QR');
        // Get QR code from API
        await getQR(id_order);
        // Get only one url of QR code
        const currentWindow = window;
        // Append a new div to current window  with id = 'printable'
        const printable = currentWindow.document.createElement("div");
        printable.id = "printable";
        // Append a new img to printable div with src = qrCode
        const qrImage = currentWindow.document.createElement("img");
        qrImage.id = "qrImage";
        qrImage.src = QR;
        qrImage.alt = "QR Code";
        qrImage.style.width = "100%";
        qrImage.style.height = "100%";
        qrImage.style.objectFit = "contain";
        qrImage.style.margin = "auto";
        qrImage.style.display = "block";
        printable.appendChild(qrImage);
        // Append printable div to current window
        currentWindow.document.body.appendChild(printable);
        // Print the image when it is loaded
        qrImage.onload = () => {
            // Print the image with id = 'qrImage'
            currentWindow.print();
        };
    };
    return (
        <div
            role="button"
            className={`${order.orderQR} flex flex-row items-center justify-between mt-[16px]`}
            onClick={() => {
                handlePrintQR(id_order);
            }}
        >
            <p
                style={{
                    color: "var(--3-a-3-a-3-c, #3A3A3C)",
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: "500",
                }}
            >
                In mã QR
            </p>
            <Image src="/icon/link.svg" width={16} height={16} alt="link-icon" />
        </div>
    );
}
