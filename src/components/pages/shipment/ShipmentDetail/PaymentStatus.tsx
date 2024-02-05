/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import shipment from "./shipment.module.css";
import { RootState } from "@/redux/store/store";
import PostPaymentComplete from "@/api/shipment/PostPaymentComplete";
import { Shipment } from "@/hooks/useGetShipmentList";
import { setError } from "@/redux/slice/alertSlice";
import { updateShipment } from "@/redux/slice/shipmentSlice";

export interface PaymentStatusProps {
    id_delivery: string;
    paid_at: string | null;
}

export default function PaymentStatus({ id_delivery, paid_at }: PaymentStatusProps) {
    const dispatch = useDispatch();
    let result: boolean = false;
    const ref = useRef<HTMLDivElement>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const shipments = useSelector<RootState, Shipment[]>((state) => state.shipment.shipments);

    // Ensure all state from hooks is updated
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

    // Indicate print status of shipment [Chờ giao hàng, Đã giao hàng] => ["0", "1"]
    const paymentStatusList = [
        {
            id_status: "0",
            status_name: "Chờ thanh toán",
        },
        {
            id_status: "1",
            status_name: "Đã thanh toán",
        },
    ];
    async function handleClickedChangeStatus(id_status: string) {
        // IF id_status === 0 AND payment_at === null => DO NOTHING
        // IF id_status === 1 AND payment_at !== null => DO NOTHING
        if ((id_status === "0" && paid_at === null) || (id_status === "1" && paid_at !== null)) {
            dispatch(setError("Lô hàng đã ở trạng thái này!"));
            setShowDropdown(false);
            return;
        }

        // If id_status === 0 AND payment_at !== null => POST /shipment/queue
        if (id_status === "1" && paid_at === null) {
            result = await PostPaymentComplete(shipment.id_delivery, dispatch);
        }
        // If id_status === 1 AND payment_at === null => POST /shipment/complete
        // if (id_status === "1" && shipment.payment_at === null) {
        //     result = await postPaymentShipmentComplete(
        //         shipment.id_shipment,
        //         setErrorPostPaymentShipmentComplete,
        //         executeRecaptcha,
        //     );
        // }
        // If result === false => DO NOTHING (Show Error from API)
        if (result === false) {
            setShowDropdown(false);
            return;
        }
        // If result === true => Update list shipment
        // Update list shipment
        if (result === true) {
            // Update list shipment with new payment_at
            const shipmentIndex = shipments.findIndex((item) => item.id_delivery === id_delivery);
            if (shipmentIndex) {
                const newShipment = {
                    ...shipments[shipmentIndex],
                    paid_at: id_status === "0" ? null : new Date().toISOString(),
                };
                dispatch(updateShipment(newShipment));
            }
        }
        setShowDropdown(false);
    }

    if (paid_at === null) {
        return (
            <div className="relative">
                <div
                    role="button"
                    id="dropdown-status"
                    data-dropdown-toggle="dropdown"
                    className="rounded-full appearance-none focus:outline-none focus:ring-0 px-5 py-2.5 text-center inline-flex items-center justify-between cursor-pointer w-[128px] h-[36px]"
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
                    <p className="text-center">{paid_at === null ? "Đang chờ" : ""}</p>
                    <Image src="/icon/more.svg" width={11} height={6} alt="show-more" />
                </div>

                {showDropdown && (
                    <div
                        ref={ref}
                        className={`${shipment.shipmentStatus} flex justify-center items-start shadow-2xl bg-white`}
                        style={{
                            position: "absolute",
                            transform: showDropdown ? "translateX(0)" : "translateX(-100%)", // Apply translation based on the 'show' state
                            transition: "transform 0.1s ease-in-out",
                            width: "197px",
                            maxWidth: "197px",
                            height: "88px",
                            maxHeight: "88px",
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
                                id={paymentStatusList[0].id_status}
                                className="flex flex-row items-center justify-start hover:bg-[#007AFF] hover:text-white w-full"
                                style={{
                                    height: "44px",
                                    borderTopRightRadius: "12px",
                                    borderTopLeftRadius: "12px",
                                    borderBottom: "1px solid #E5E5EA",
                                    padding: "12px 20px",
                                }}
                                onClick={() => {
                                    handleClickedChangeStatus(paymentStatusList[0].id_status);
                                }}
                            >
                                <p>{paymentStatusList[0].status_name}</p>
                            </button>
                            <button
                                type="button"
                                id={paymentStatusList[1].id_status}
                                className="flex flex-row items-center justify-start hover:bg-[#007AFF] hover:text-white w-full"
                                style={{
                                    borderBottom: "1px solid #E5E5EA",
                                    padding: "12px 20px",
                                    height: "44px",
                                }}
                                onClick={() => {
                                    handleClickedChangeStatus(paymentStatusList[1].id_status);
                                }}
                            >
                                <p>{paymentStatusList[1].status_name}</p>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
    return (
        <div className="relative">
            <div
                role="button"
                id="dropdown-status"
                data-dropdown-toggle="dropdown"
                className={`${shipment.shipmentComplete} rounded-full appearance-none focus:outline-none focus:ring-0  px-[9px] py-[6px] text-center inline-flex items-center justify-center cursor-pointer w-[128px] h-[36px]`}
                onClick={() => {
                    setShowDropdown(!showDropdown);
                }}
                style={{
                    height: "36px",
                    width: "197px",
                    boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.30)",
                }}
            >
                <p className="text-center">{paid_at !== null ? "Đã thanh toán" : ""}</p>
            </div>
            {showDropdown && (
                <div
                    ref={ref}
                    className={`${shipment.shipmentStatus} flex justify-center items-start shadow-2xl bg-white`}
                    style={{
                        position: "absolute",
                        transform: showDropdown ? "translateX(0)" : "translateX(-100%)", // Apply translation based on the 'show' state
                        transition: "transform 0.1s ease-in-out",
                        width: "197px",
                        maxWidth: "197px",
                        height: "88px",
                        maxHeight: "88px",
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
                            id={paymentStatusList[0].id_status}
                            className="flex flex-row items-center justify-start hover:bg-[#007AFF] hover:text-white w-full"
                            style={{
                                height: "44px",
                                borderTopRightRadius: "12px",
                                borderTopLeftRadius: "12px",
                                borderBottom: "1px solid #E5E5EA",
                                padding: "12px 20px",
                            }}
                            onClick={() => {
                                handleClickedChangeStatus(paymentStatusList[0].id_status);
                            }}
                        >
                            <p>{paymentStatusList[0].status_name}</p>
                        </button>
                        <button
                            type="button"
                            id={paymentStatusList[1].id_status}
                            className="flex flex-row items-center justify-start hover:bg-[#007AFF] hover:text-white w-full"
                            style={{
                                borderBottom: "1px solid #E5E5EA",
                                padding: "12px 20px",
                                height: "44px",
                            }}
                            onClick={() => {
                                handleClickedChangeStatus(paymentStatusList[1].id_status);
                            }}
                        >
                            <p>{paymentStatusList[1].status_name}</p>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
