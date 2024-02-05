"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import drawer from "./drawer.module.css";
import { Order } from "@/hooks/useGetOrderList";
import { Shipment } from "@/hooks/useGetShipmentList";
import FilterOrder from "@/components/pages/order/FilterOrder/FilterOrder";
import FilterShipment from "@/components/pages/shipment/FilterShipment/FilterShipment";

export interface DrawerProps {
    setOpenCreateShipment?: React.Dispatch<React.SetStateAction<boolean>>;
}
// Get header for drawer left from pathname of url
export function getHeader(pathname: string) {
    if (pathname === "/orders") {
        return "Quản lý đơn hàng";
    }
    if (pathname === "/overview") {
        return "Tổng quan";
    }
    if (pathname === "/statistics") {
        return "Thống kế";
    }
    if (pathname === "/shipments") {
        return "Quản lý lô hàng";
    }
    return "Trang chủ";
}

export default function Drawer({ setOpenCreateShipment }: DrawerProps) {
    // Set state for open drawer left
    const ref = useRef<HTMLDivElement>(null);
    const [openDrawer, setOpenDrawer] = useState(false);
    const pathname = usePathname();
    const header = getHeader(pathname);
    // Handle drawer left when click outside drawer left
    // or press ESC key on keyboard
    // or click button drawer left again to close
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            // If the target is not contain the ref element then close drawer left
            if (openDrawer && ref.current && !ref.current.contains(event.target as Node)) {
                setOpenDrawer(false);
            }
        };
        // Add event listener to handle outside click when open drawer left
        document.addEventListener("mousedown", handleOutsideClick);
        // Add event listener to handle ESC key when open drawer left
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                setOpenDrawer(false);
            }
        });
        // Remove event listener when component unmount or openDrawer change
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", (event) => {
                if (event.key === "Escape") {
                    setOpenDrawer(false);
                }
            });
        };
    }, [openDrawer]);

    return (
        <>
            <div
                ref={ref}
                id="drawer-navigation"
                className={`${drawer.drawerLeft} fixed flex flex-col left-0`}
                tabIndex={-1}
                style={{
                    aspectRatio: "auto 1 / 5",
                    transform: openDrawer ? "translateX(0)" : "translateX(-100%)", // Apply translation based on the 'show' state
                    transition: "transform 0.1s ease-in-out", // Apply a transition effect to the transform property
                    zIndex: 100,
                }}
            >
                <button
                    type="button"
                    style={{
                        marginBottom: "50px",
                    }}
                    onClick={() => {
                        setOpenDrawer(!openDrawer);
                        // console.log(openDrawer);
                    }}
                >
                    <Image
                        src="/buttonIcon/drawerShow.svg"
                        alt="drawer-left"
                        width={48}
                        height={30}
                        style={{
                            aspectRatio: "auto 1 / 2",
                            color: "white",
                        }}
                    />
                </button>
                <Link href="/overview" className={`${drawer.drawerText}`}>
                    Tổng quan
                </Link>
                <Link href="/orders" className={`${drawer.drawerText}`}>
                    Quản lý đơn hàng
                </Link>
                <Link href="/shipments" className={`${drawer.drawerText}`}>
                    Quản lý lô hàng
                </Link>
                <Link href="/statistics" className={`${drawer.drawerText}`}>
                    Thống kê
                </Link>
            </div>
            <div
                className={`${drawer.breadCrumb} fixed flex flex-row items-center justify-between`}
                style={{
                    position: "fixed",
                    zIndex: 50,
                }}
            >
                <button
                    type="button"
                    onClick={() => {
                        setOpenDrawer(!openDrawer);
                        // console.log(openDrawer);
                    }}
                    style={{
                        position: "fixed",
                        left: "39px",
                        overflowAnchor: "none",
                    }}
                >
                    <Image
                        src="/buttonIcon/drawer.svg"
                        alt="drawer-left"
                        width={48}
                        height={20}
                        style={{
                            aspectRatio: "auto 1 / 2",
                            color: "black",
                        }}
                    />
                </button>
                <p
                    className={`${drawer.breadCrumbText}`}
                    style={{
                        position: "fixed",
                        alignItems: "center",
                        left: "120px",
                        fontWeight: "600",
                    }}
                >
                    {header}
                </p>
                {pathname === "/orders" && (
                    <FilterOrder setOpenCreateShipment={setOpenCreateShipment} />
                )}
                {pathname === "/shipments" && <FilterShipment />}
            </div>
            )
        </>
    );
}
