import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { Order } from "@/hooks/useGetOrderList";
import { RootState } from "@/redux/store/store";
import {
    addSelectedOrder,
    removeAllSelectedOrder,
    removeSelectedOrder,
} from "@/redux/slice/selectedOrderSlice";
import shipment from "./shipment.module.css";
import ErrorModal from "./ErrorModal";
import { formatNumber } from "@/functions/formatFunction";
import { setError } from "@/redux/slice/alertSlice";
import PostCreateShipment from "@/api/shipment/PostCreateShipment";

export interface ShipmentModalProps {
    setOpenCreateShipment: React.Dispatch<React.SetStateAction<boolean>>;
}
export function ShipmentModal({ setOpenCreateShipment }: ShipmentModalProps) {
    // TODO: Only create shipment when list_order is not empty
    const dispatch = useDispatch();
    const list_order = useSelector<RootState, string[]>(
        (state) => state.selectedOrder.selectedOrders,
    );
    // State for note value in shipment modal
    const [note, setNote] = useState<string>("");
    // State for price value in shipment modal
    const [price, setPrice] = useState<string>("");
    // State for handle error from API and show error popup
    const [errorCreateShipment, setErrorCreateShipment] = useState<string>("");
    const [result, setResult] = useState<Order[] | null>(null);
    // Check if price is not null then set price value to price else set to 0 when component mount
    useEffect(() => {
        setPrice(price === "" ? "" : formatNumber(price.toString()));
    }, []);
    // Check if price change then update price value
    useEffect(() => {
        setPrice(price === "" ? "" : formatNumber(price.toString()));
    }, [price]);
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const formattedValue = formatNumber(value);
        // Update price value in input field if is NaN set to 0 else set to formatted value
        setPrice(formattedValue === "NaN" ? "" : formattedValue);
    };

    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setNote(value);
    };
    // Handle save price and note, and list_order to post to API
    const handleCreateShipment = async () => {
        // TODO: Handle create shipment
        if (price === "" || list_order.length === 0 || note === "") {
            dispatch(setError("Vui lòng nhập đầy đủ thông tin (giá lô hàng, ghi chú)!"));
            return;
        }
        const price_number = parseInt(price.replace(/,/g, ""), 10);
        const newResult = await PostCreateShipment(list_order, price_number, note, dispatch);
        if (newResult !== null && newResult !== undefined) {
            // Get order result error from API and set to result state
            setResult(newResult);
        } else {
            // if result is null then close shipment modal (error from API)
            if (result !== null && result.length === 0) {
                // Clear list order when success create shipment (undefined result)
                dispatch(removeAllSelectedOrder());
                setOpenCreateShipment(false);
            }
            setOpenCreateShipment(false);
        }
    };

    return (
        <div
            className="relative"
            role="dialog"
            style={{
                zIndex: 50,
            }}
        >
            <div className="fixed inset-0 w-screen overflow-y-auto">
                <div
                    className="flex min-h-full justify-center items-center"
                    style={{
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <div className="relative transform overflow-visible transition-all">
                        {/** add div dialog modal */}
                        <div
                            className={`${shipment.shipmentDialog} relative bg-white overflow-visible`}
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    // Clear list order when close shipment modal
                                    // dispatch(removeAllSelectedOrder());
                                    setOpenCreateShipment(false);
                                    // Refetch order list when close shipment modal
                                }}
                                style={{
                                    position: "absolute",
                                    top: "12px",
                                    right: "12px",
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
                                        {list_order.length > 0 ? list_order.length : 0}
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
                                        onKeyDown={() => {}} // handlePriceSave
                                        className={`${shipment.inputPrice} border border-neutral-400 appearance-none focus:outline-none focus:ring-0 focus:ring-transparent focus:border-neutral-400 peer`}
                                        value={price}
                                        style={{
                                            userSelect: "none",
                                        }}
                                        placeholder="Nhập giá lô hàng (bắt buộc)"
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
                                        placeholder="Ghi chú (bắt buộc)"
                                        onChange={handleNoteChange}
                                        value={note}
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
                                        onClick={handleCreateShipment}
                                    >
                                        Lưu
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/** Show error dialog if has error from create shipment  */}
                        {result !== null && result.length > 0 && (
                            <ErrorModal
                                list_order={result}
                                errorCreateShipment={errorCreateShipment}
                                setResult={setResult}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
