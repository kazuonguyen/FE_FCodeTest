/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import shipment from "./shipment.module.css";
import { RootState } from "@/redux/store/store";
import PostShipmentNote from "@/api/shipment/PostShipmentNote";
import { Shipment } from "@/hooks/useGetShipmentList";

export interface ShipmentNoteProps {
    id_delivery: string;
    note: string;
    price: number;
}

export default function ShipmentNote({ id_delivery, note, price }: ShipmentNoteProps) {
    // State for show note modal
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    // State for note value
    const [noteValue, setNoteValue] = useState<string>("");
    const shipments = useSelector<RootState, Shipment[]>((state) => state.shipment.shipments);
    const dispatch = useDispatch();
    // Check if note is note props is not null then set state noteValue when component is mounted
    useEffect(() => {
        if (note !== null && note !== undefined) {
            setNoteValue(note);
        }
    }, []);
    // set note value when note props change
    useEffect(() => {
        setNoteValue(note);
    }, [note]);

    // Store note value when user click save button
    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setNoteValue(value);
    };
    // Handle save note when user click save button
    const handleSaveNote = async () => {
        // Post note to API
        // Only post note when note value is not empty
        if (noteValue !== "" || noteValue !== null) {
            // Update order note to API ensure if
            await PostShipmentNote(
                id_delivery,
                price,
                note,
                noteValue,
                setNoteValue,
                dispatch,
                shipments,
            );
        }
        // Close modal
        setIsShowModal(false);
    };

    return (
        <>
            <div
                role="button"
                className={`${shipment.shipmentNote} flex flex-row items-center justify-between`}
                onClick={() => {
                    setIsShowModal(true);
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
                    Ghi chú
                </p>
                <Image src="/icon/pen_enable.svg" width={16} height={16} alt="edit-icon" />
            </div>
            {isShowModal && (
                <div
                    className="fixed flex flex-row inset-0 overflow-x-auto h-screen"
                    role="dialog"
                    style={{
                        zIndex: 400,
                    }}
                >
                    <div className="relative inset-0 w-screen overflow-y-auto">
                        <div
                            className="flex min-h-full justify-center items-center"
                            style={{
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <div className="relative transform overflow-visible transition-all">
                                {/** add div dialog modal */}
                                <div
                                    className={`${shipment.noteDialog} relative bg-white overflow-visible`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsShowModal(false);
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
                                            Ghi chú
                                        </h1>
                                        <div
                                            className="flex flex-row items-center justify-center"
                                            style={{
                                                marginTop: "12px",
                                                borderRadius: "100px",
                                                padding: "5px 16px",
                                                background: "var(--3-a-3-a-3-c, #3A3A3C)",
                                                marginBottom: "36px",
                                            }}
                                        >
                                            <p
                                                style={{
                                                    color: "var(--fbfbfd, #FBFBFD)",
                                                    textAlign: "center",
                                                    fontSize: "18px",
                                                }}
                                            >
                                                Mã lô: {id_delivery}
                                            </p>
                                        </div>
                                    </div>
                                    {/** add div content is a text area */}
                                    <div className="relative flex justify-center items-center">
                                        <textarea
                                            spellCheck="false"
                                            className={`${shipment.noteTextArea} w-full h-full focus:border-gray-500 focus:outline-none focus:ring-0`}
                                            placeholder="Nhập ghi chú cho đơn hàng"
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
                                                height: "34px",
                                                width: "85px",
                                                right: "12px",
                                                bottom: "12px",
                                            }}
                                            onClick={handleSaveNote}
                                        >
                                            Lưu
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
