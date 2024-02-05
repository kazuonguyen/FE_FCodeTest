/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import shipment from "./shipment.module.css";
import { RootState } from "@/redux/store/store";
import PostShipmentNote from "@/api/shipment/PostShipmentNote";
import { Shipment } from "@/hooks/useGetShipmentList";

export interface NoteShipmentProps {
    id_delivery: string;
    note: string;
    price: number;
}

export default function NoteShipment({ id_delivery, note, price }: NoteShipmentProps) {
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
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <textarea
                spellCheck="false"
                className={`${shipment.shipmentNoteArea} w-full h-full appearance-none focus:outline-none focus:ring-transparent focus:border-[#007aff] hover:border-[#007aff] focus:ring-1 active:border-[#007aff] focus:ring-[#007aff] hover:ring-[#007aff] active:ring-[#007aff]`}
                placeholder="Nhập ghi chú cho lô hàng"
                onChange={handleNoteChange}
                value={noteValue}
            />
            <button
                type="button"
                className="text-white inline-flex items-center justify-center self-end"
                style={{
                    borderRadius: "100px",
                    backgroundColor: "var(--007-aff, #007AFF)",
                    height: "38px",
                    width: "85px",
                    padding: "4px 24px",
                    marginTop: "20px",
                }}
                onClick={handleSaveNote}
            >
                Lưu
            </button>
        </div>
    );
}
