import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import noteship from "./noteship.module.css";
import { RootState } from "@/redux/store/store";

import { updateShipment } from "@/redux/slice/shipmentSlice";
import PostShipmentNote from "@/api/shipment/PostShipmentNote";
import { Shipment } from "@/hooks/useGetShipmentList";

export interface NoteShipmentProps {
    id_delivery: string;
    price: number;
    note: string;
}

export function NoteShipment({ id_delivery, price, note }: NoteShipmentProps) {
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [noteValue, setNoteValue] = useState<string>("");
    const shipments = useSelector<RootState, Shipment[]>((state) => state.shipment.shipments);
    const dispatch = useDispatch();
    // Set note value when note is not null or empty and user click note icon button to open modal
    useEffect(() => {
        if (note !== "" && note !== null) {
            setNoteValue(note);
        }
    }, []);
    // Set note value when note change
    useEffect(() => {
        if (note !== "" && note !== null) {
            setNoteValue(note);
        }
    }, [note]);
    // Store note value when user click save button
    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setNoteValue(value);
    };

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
            <button
                type="button"
                onClick={() => {
                    setIsShowModal(true);
                }}
            >
                {/** Check if note is empty or has value */}
                {note === "" || note === null ? (
                    <Image src="/icon/pen_disable.svg" width={30} height={30} alt="note-icon" />
                ) : (
                    <Image src="/icon/pen_enable.svg" width={30} height={30} alt="note-icon" />
                )}
            </button>
            {isShowModal && (
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
                                    className={`${noteship.noteDialog} relative bg-white overflow-visible`}
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
                                                Mã lô: {id_delivery.slice(0, 10)}
                                            </p>
                                        </div>
                                    </div>
                                    {/** add div content is a text area */}
                                    <div className="relative flex justify-center items-center">
                                        <textarea
                                            spellCheck="false"
                                            className={`${noteship.noteTextArea} w-full h-full focus:border-gray-500 focus:outline-none focus:ring-0`}
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
                                                bottom: "18px",
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
