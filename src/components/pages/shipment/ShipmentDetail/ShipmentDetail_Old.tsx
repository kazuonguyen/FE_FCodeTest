import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import shipment from "./shipment.module.css";
import { RootState } from "@/redux/store/store";
import { formatNumber } from "@/functions/formatFunction";
import Loading from "@/components/global/Loading/Loading";
import useGetShipmentDetail from "@/hooks/useGetShipmentDetail";
import PostUpdateShipment from "@/api/shipment/PostUpdateShipment";
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
}

export function ShipmentDetail({ id_shipment, total_price, note, num_order }: ShipmentDetailProps) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const shipments = useSelector((state: RootState) => state.shipment.shipments);
    const [priceValue, setPriceValue] = useState<string>("");
    const [noteValue, setNoteValue] = useState<string>("");
    const dispatch = useDispatch();
    const { isLoadingShipmentDetail, shipmentDetail, getShipmentDetail } = useGetShipmentDetail();
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
    function handleGetShipmentInfo() {
        getShipmentDetail(id_shipment);
        setShowModal(true);
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

    return (
        <>
            <button type="button" onClick={handleGetShipmentInfo}>
                <Image src="/icon/info.svg" width={26} height={26} alt="preview-icon" />
            </button>
            {showModal && (
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
                                {isLoadingShipmentDetail === true ? (
                                    <div className="flex flex-col items-center justify-center w-screen h-screen">
                                        <Loading />
                                    </div>
                                ) : (
                                    <div
                                        className={`${shipment.shipmentDialog} relative bg-white overflow-visible`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => {
                                                // Clear list order when close shipment modal
                                                // Clear popup status
                                                setShowModal(false);
                                                // Refetch order list when close shipment modal
                                            }}
                                            style={{
                                                position: "absolute",
                                                top: "12px",
                                                right: "12px",
                                                zIndex: 500,
                                            }}
                                        >
                                            <Image
                                                src="/icon/close_modal.svg"
                                                width={48}
                                                height={48}
                                                alt="close-note-modal"
                                            />
                                        </button>
                                        {/** add div header close button title and save button */}
                                        <div className="flex flex-col justify-center items-center">
                                            <h1
                                                className="text-center"
                                                style={{
                                                    fontSize: "28px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                Chi tiết lô hàng
                                            </h1>
                                            {/** add div for shipment number */}
                                            <div
                                                className={`${shipment.shipmentNumber} flex flex-row items-start justify-between`}
                                            >
                                                <p
                                                    style={{
                                                        fontSize: "20px",
                                                        fontWeight: "400",
                                                        color: "var(--white, #fff)",
                                                    }}
                                                >
                                                    Số lượng đơn hàng:
                                                </p>
                                                <p
                                                    style={{
                                                        fontSize: "20px",
                                                        fontWeight: "400",
                                                        color: "var(--white, #fff)",
                                                    }}
                                                >
                                                    {num_order}
                                                </p>
                                            </div>
                                            {/** add div for input price */}
                                            <div
                                                className="relative flex flex-row justify-center items-start w-full"
                                                style={{
                                                    marginBottom: "16px",
                                                }}
                                            >
                                                <input
                                                    type="text"
                                                    id="price-shipment"
                                                    autoComplete="off"
                                                    className={`${shipment.inputPrice} border border-neutral-400 appearance-none focus:outline-none focus:ring-0 focus:ring-transparent focus:border-neutral-400 peer`}
                                                    value={priceValue}
                                                    style={{
                                                        userSelect: "none",
                                                    }}
                                                    placeholder="Nhập giá lô hàng"
                                                    onChange={handlePriceChange}
                                                />
                                                <p
                                                    style={{
                                                        fontWeight: "400",
                                                        color: "var(--bdbdbd, #BDBDBD)",
                                                        position: "absolute",
                                                        top: "13px",
                                                        right: "12px",
                                                        fontSize: "24px",
                                                        alignItems: "center",
                                                        bottom: "13px",
                                                    }}
                                                >
                                                    đ
                                                </p>
                                            </div>
                                            {/** add div for note - a text area */}
                                            <div className="relative flex justify-center items-center">
                                                <textarea
                                                    spellCheck="false"
                                                    className={`${shipment.noteTextArea} w-full h-full focus:border-gray-500 focus:outline-none focus:ring-0`}
                                                    placeholder="Ghi chú"
                                                    onChange={handleNoteChange}
                                                    value={noteValue}
                                                />
                                                <button
                                                    type="button"
                                                    className="text-white inline-flex items-center justify-center"
                                                    style={{
                                                        position: "absolute",
                                                        borderRadius: "100px",
                                                        backgroundColor: "var(--007-aff, #007AFF)",
                                                        height: "37px",
                                                        width: "85px",
                                                        right: "12px",
                                                        bottom: "12px",
                                                    }}
                                                    onClick={handleUpdateShipment}
                                                >
                                                    Lưu
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
