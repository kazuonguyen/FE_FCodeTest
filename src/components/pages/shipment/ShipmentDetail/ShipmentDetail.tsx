/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import shipment from "./shipment.module.css";
import { RootState } from "@/redux/store/store";
import { formatNumber } from "@/functions/formatFunction";
import Loading from "@/components/global/Loading/Loading";
import useGetShipmentDetail from "@/hooks/useGetShipmentDetail";
import PostUpdateShipment from "@/api/shipment/PostUpdateShipment";
import { ShipmentNum } from "./ShipmentNum";
import ShipmentPrice from "./ShipmentPrice";
import ShipmentStatus from "./ShipmentStatus";
import PaymentStatus from "./PaymentStatus";
import ShipmentNote from "./ShipmentNote";
import ShipmentArrived from "./ShipmentArrived";
import ShipmentPaid from "./ShipmentPaid";
import ShipmentInfo from "./ShipmentInfo";
import TableOfOrder from "./TableOfOrder";
import { Order } from "@/hooks/useGetOrderList";
import NoteShipment from "./NoteShipment";
import { Shipment } from "@/hooks/useGetShipmentList";
// import { Shipment } from "../../hooks/useGetShipmentList";
// import { postUpdateShipment } from "@/api/shipmentAPI";
// import { updateShipmentList } from "@/store/listSlice";
// import { LiquidsLoading } from "../loading/LiquidsLoading";
// import { ErrorPopup } from "../errorPopup/ErrorPopup";
// import { clearError, setError } from "@/store/errorSlice";
// import { DownloadPopup } from "../downloadPopup/DownloadPopup";

export interface ShipmentDetailProps {
    id_shipment: string;
    total_price: number;
    note: string;
    num_order: number;
    arrived_at: string | null;
    paid_at: string | null;
    setSelectedShipment: React.Dispatch<React.SetStateAction<null | Shipment>>;
    setOpenShipmentDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ShipmentDetail({
    id_shipment,
    total_price,
    note,
    num_order,
    arrived_at,
    paid_at,
    setSelectedShipment,
    setOpenShipmentDetail,
}: ShipmentDetailProps) {
    const shipments = useSelector((state: RootState) => state.shipment.shipments);
    const [priceValue, setPriceValue] = useState<string>("");
    const [noteValue, setNoteValue] = useState<string>("");
    const dispatch = useDispatch();
    const { isLoadingShipmentDetail, shipmentDetail, getShipmentDetail } = useGetShipmentDetail();
    // Get shipment detail
    useEffect(() => {
        getShipmentDetail(id_shipment);
    }, []);
    // if price is not null, set priceValue to price
    useEffect(() => {
        if (total_price !== null && total_price !== 0) {
            setPriceValue(formatNumber(total_price.toString()));
        } else {
            setPriceValue("0");
        }
    }, []);
    useEffect(() => {
        if (total_price !== null && total_price !== 0) {
            setPriceValue(formatNumber(total_price.toString()));
        } else {
            setPriceValue("0");
        }
    }, [total_price]);
    // if note is not null, set noteValue to note
    useEffect(() => {
        if (note !== null && note !== "") {
            setNoteValue(note);
        }
    }, []);
    useEffect(() => {
        if (note !== null && note !== "") {
            setNoteValue(note);
        }
    }, [note]);

    function handleNoteChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const { value } = event.target;
        setNoteValue(value);
    }
    function handlePriceChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        const formattedValue = formatNumber(value);
        // Update price value in input field if is NaN set to 0 else set to formatted value
        setPriceValue(formattedValue === "NaN" ? "0" : formattedValue);
    }

    async function handleUpdateShipment() {
        // Update shipment price and note
        // if noteValue and priceValue is not change then return
        if (noteValue === note && priceValue === total_price.toString()) {
            return;
        }
        await PostUpdateShipment(
            id_shipment,
            note,
            total_price,
            noteValue,
            setNoteValue,
            parseInt(priceValue.replace(/,/g, ""), 10),
            setPriceValue,
            shipments,
            dispatch,
        );
    }

    const handleCloseModal = (id_delivery: string) => {
        // Make selectedShipment null
        setSelectedShipment(null);
        // Close modal
        setOpenShipmentDetail(false);
    };
    return (
        <div
            className="relative"
            role="dialog"
            style={{
                zIndex: 50,
            }}
        >
            <div className="fixed inset-0 w-screen">
                <div
                    className="flex min-h-full justify-center items-center"
                    style={{
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <div className="relative transform overflow-visible transition-all">
                        {/** add div dialog modal */}
                        {isLoadingShipmentDetail === true && shipmentDetail !== null ? (
                            <div className="flex flex-col items-center justify-center w-screen h-screen">
                                <Loading />
                            </div>
                        ) : (
                            <div
                                className={`${shipment.shipmentDialog} relative bg-white overflow-visible`}
                            >
                                <div className="flex flex-row w-full h-full">
                                    {/* Shipment note area */}
                                    <div
                                        className={`${shipment.shipmentNoteContent} flex flex-col items-center justify-start`}
                                    >
                                        <p
                                            style={{
                                                fontSize: "22px",
                                                fontWeight: "700",
                                                textAlign: "center",
                                                marginBottom: "20px",
                                            }}
                                        >
                                            Ghi chú
                                        </p>
                                        {/** Add note content */}
                                        <NoteShipment
                                            id_delivery={id_shipment}
                                            note={note}
                                            price={total_price}
                                        />
                                        {/** Add price content */}
                                        {/* <NoteArea id_order={id_order} note={note} /> */}
                                    </div>
                                    {/** Sidebar show info of shipment */}
                                    <div
                                        className={`${shipment.shipmentSideBar} flex flex-col w-full`}
                                    >
                                        <div
                                            className={`${shipment.shipmentCell} flex flex-col items-center justify-start`}
                                        >
                                            {/** Shipment number */}
                                            <ShipmentNum count={num_order} />
                                            {/** Shipment total price */}
                                            <ShipmentPrice
                                                id_delivery={id_shipment}
                                                price={total_price}
                                                note={note}
                                            />
                                            {/** if arrived_at !== null then render this */}
                                            {arrived_at !== null && (
                                                <ShipmentArrived arrived_at={arrived_at} />
                                            )}
                                            {/** if paid_at !== null then render this */}
                                            {paid_at !== null && <ShipmentPaid paid_at={paid_at} />}
                                            {/** Shipment Status */}
                                            <p
                                                style={{
                                                    textAlign: "center",
                                                    fontSize: "20px",
                                                }}
                                            >
                                                Trạng thái GH:
                                            </p>
                                            <ShipmentStatus
                                                id_delivery={id_shipment}
                                                arrived_at={arrived_at}
                                            />
                                            {/** Payment Status */}
                                            <p
                                                style={{
                                                    textAlign: "center",
                                                    fontSize: "20px",
                                                }}
                                            >
                                                Trạng thái TT:
                                            </p>
                                            <PaymentStatus
                                                id_delivery={id_shipment}
                                                paid_at={paid_at}
                                            />
                                            {/** Shipment Note */}
                                            {/* <ShipmentNote
                                                        id_delivery={id_shipment}
                                                        price={total_price}
                                                        note={note}
                                                    /> */}
                                        </div>
                                    </div>
                                    {/** Main content */}
                                    <div
                                        className={`${shipment.shipmentContent} relative flex flex-col w-full h-full`}
                                    >
                                        {/** Center Header and Close button */}
                                        <button
                                            type="button"
                                            onClick={() => handleCloseModal(id_shipment)}
                                            style={{
                                                position: "absolute",
                                                top: "12px",
                                                right: "12px",
                                            }}
                                        >
                                            <Image
                                                src="/icon/close_modal.svg"
                                                width={36}
                                                height={36}
                                                alt="close-icon"
                                            />
                                        </button>
                                        <div
                                            className="flex flex-col items-center justify-center"
                                            style={{
                                                borderBottom: "0.5px solid var(--bdbdbd, #BDBDBD)",
                                            }}
                                        >
                                            <p
                                                style={{
                                                    fontSize: "28px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                Chi tiết lô hàng
                                            </p>
                                            <ShipmentInfo id_delivery={id_shipment} />
                                        </div>
                                        <div
                                            className="flex flex-col justify-start"
                                            style={{
                                                height: "750px",
                                                width: "981px",
                                                paddingLeft: "52px",
                                                paddingRight: "52px",
                                                position: "relative",
                                            }}
                                        >
                                            <div
                                                className="flex flex-row items-center justify-center w-full"
                                                style={{
                                                    position: "sticky",
                                                    paddingTop: "16px",
                                                }}
                                            />
                                            {/** Design Item Component */}
                                            <div
                                                className={`${shipment.scrollBar} flex flex-row items-center justify-center h-full w-full pb-[80px]`}
                                                style={{
                                                    paddingTop: "16px",
                                                    overflowY: "scroll", // add scroll bar y
                                                    overflowX: "hidden", // Hide scroll bar x
                                                    scrollBehavior: "smooth",
                                                    paddingLeft: "1px",
                                                    paddingRight: "1px",
                                                    marginBottom: "60px",
                                                }}
                                            >
                                                {/** Design Item Component */}
                                                <div className="flex flex-col items-start justify-start h-full w-full">
                                                    {/** Table Shipment make sure have data then render */}
                                                    {shipmentDetail !== null &&
                                                        shipmentDetail !== undefined && (
                                                            <TableOfOrder
                                                                orders={shipmentDetail.orders}
                                                            />
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
