/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import status from "./status.module.css";
import { ShipmentData } from "@/hooks/useGetShipmentDetail";
import { RootState } from "@/redux/store/store";
import PostShipmentComplete from "@/api/shipment/PostShipmentComplete";
import { updateShipment } from "@/redux/slice/shipmentSlice";
import { setError } from "@/redux/slice/alertSlice";
import { Shipment } from "@/hooks/useGetShipmentList";

export interface ShipmentStatusProps {
    shipment: Shipment;
}

export default function ShipmentStatus({ shipment }: ShipmentStatusProps) {
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
    // useEffect to check if has error from API and show error popup
    // Indicate print status of shipment [Chờ giao hàng, Đã giao hàng] => ["0", "1"]
    const statusShipmentList = [
        {
            id_status: "0",
            status_name: "Chờ giao hàng",
        },
        {
            id_status: "1",
            status_name: "Đã giao hàng",
        },
    ];
    async function handleClickedChangeStatus(id_status: string) {
        // IF id_status === 0 AND shipment_at === null => DO NOTHING
        // IF id_status === 1 AND shipment_at !== null => DO NOTHING
        if (
            (id_status === "0" && shipment.arrived_at === null) ||
            (id_status === "1" && shipment.arrived_at !== null)
        ) {
            dispatch(setError("Lô hàng đã ở trạng thái này!"));
            setShowDropdown(false);
            return;
        }

        // If id_status === 0 AND shipment_at === null => POST /shipment/queue
        if (id_status === "1" && shipment.arrived_at === null) {
            result = await PostShipmentComplete(shipment.id_delivery, dispatch);
        }
        // If id_status === 1 AND shipment_at === null => POST /shipment/complete
        // if (id_status === "1" && shipment.delivery.arrived_at === null) {
        //     result = await postShipmentComplete(
        //         shipment.id_shipment,
        //         setErrorPostShipmentComplete,
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
            // Update list shipment with new shipment_at
            // const new_list_shipment = list_shipment.map((item) => {
            //     if (item.id_shipment === shipment.id_shipment) {
            //         return {
            //             ...item,
            //             shipment_at: id_status === "0" ? null : new Date().toISOString(),
            //         };
            //     }
            //     return item;
            // });
            // dispatch(updateShipmentList(new_list_shipment));
            // Update list shipment with new shipment_at
            const newShipment = {
                ...shipment,
                arrived_at: id_status === "0" ? null : new Date().toISOString(),
            };
            dispatch(updateShipment(newShipment));
        }
        setShowDropdown(false);
    }

    if (shipment.arrived_at === null) {
        return (
            <div className="relative">
                <div
                    role="button"
                    id="dropdown-status"
                    data-dropdown-toggle="dropdown"
                    className={` bg-white
                    rounded-full appearance-none focus:outline-none focus:ring-0 px-5 py-2.5 text-center inline-flex items-center justify-between cursor-pointer w-[128px] h-[36px]`}
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
                    <p className="text-center">{shipment.arrived_at === null ? "Đang chờ" : ""}</p>
                    <Image src="/icon/more.svg" width={11} height={6} alt="show-more" />
                </div>
                {showDropdown && (
                    <div
                        ref={ref}
                        className={`${status.Dropdown} flex justify-center items-start shadow-2xl bg-white`}
                        style={{
                            position: "absolute",
                            transform: showDropdown ? "translateX(0)" : "translateX(-100%)", // Apply translation based on the 'show' state
                            transition: "transform 0.1s ease-in-out",
                            // Apply a transition effect to the transform property
                            width: "218px",
                            maxWidth: "218px",
                            height: "88px",
                            maxHeight: "88px",
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
                                id={statusShipmentList[0].id_status}
                                className="flex flex-row items-center justify-start hover:bg-[#007AFF] hover:text-white w-full"
                                style={{
                                    height: "44px",
                                    borderTopRightRadius: "12px",
                                    borderTopLeftRadius: "12px",
                                    borderBottom: "1px solid #E5E5EA",
                                    padding: "12px 20px",
                                }}
                                onClick={() => {
                                    handleClickedChangeStatus(statusShipmentList[0].id_status);
                                }}
                            >
                                <p>{statusShipmentList[0].status_name}</p>
                            </button>
                            <button
                                type="button"
                                id={statusShipmentList[1].id_status}
                                className="flex flex-row items-center justify-start hover:bg-[#007AFF] hover:text-white w-full"
                                style={{
                                    borderBottom: "1px solid #E5E5EA",
                                    padding: "12px 20px",
                                    height: "44px",
                                }}
                                onClick={() => {
                                    handleClickedChangeStatus(statusShipmentList[1].id_status);
                                }}
                            >
                                <p>{statusShipmentList[1].status_name}</p>
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
                className={`${status.Completed} rounded-full appearance-none focus:outline-none focus:ring-0  px-[9px] py-[6px] text-center inline-flex items-center justify-center cursor-pointer w-[128px] h-[36px]`}
                onClick={() => {
                    setShowDropdown(!showDropdown);
                }}
            >
                <p className="text-center">{shipment.arrived_at !== null ? "Đã giao hàng" : ""}</p>
            </div>
            {showDropdown && (
                <div
                    ref={ref}
                    className={`${status.Dropdown} flex justify-center items-start shadow-2xl bg-white`}
                    style={{
                        position: "absolute",
                        transform: showDropdown ? "translateX(0)" : "translateX(-100%)", // Apply translation based on the 'show' state
                        transition: "transform 0.1s ease-in-out",
                        // Apply a transition effect to the transform property
                        width: "218px",
                        maxWidth: "218px",
                        height: "88px",
                        maxHeight: "88px",
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
                            id={statusShipmentList[0].id_status}
                            className="flex flex-row items-center justify-start hover:bg-[#007AFF] hover:text-white w-full"
                            style={{
                                height: "44px",
                                borderTopRightRadius: "12px",
                                borderTopLeftRadius: "12px",
                                borderBottom: "1px solid #E5E5EA",
                                padding: "12px 20px",
                            }}
                            onClick={() => {
                                handleClickedChangeStatus(statusShipmentList[0].id_status);
                            }}
                        >
                            <p>{statusShipmentList[0].status_name}</p>
                        </button>
                        <button
                            type="button"
                            id={statusShipmentList[1].id_status}
                            className="flex flex-row items-center justify-start hover:bg-[#007AFF] hover:text-white w-full"
                            style={{
                                borderBottom: "1px solid #E5E5EA",
                                padding: "12px 20px",
                                height: "44px",
                            }}
                            onClick={() => {
                                handleClickedChangeStatus(statusShipmentList[1].id_status);
                            }}
                        >
                            <p>{statusShipmentList[1].status_name}</p>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
