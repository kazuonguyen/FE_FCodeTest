/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { clearMessage, setError, setSuccess } from "@/redux/slice/alertSlice";
import { fetchLogistics } from "../apiUtils";
import { updateShipment } from "@/redux/slice/shipmentSlice";
import { Shipment } from "@/hooks/useGetShipmentList";
import { formatNumber } from "@/functions/formatFunction";

export default async function PostShipmentNote(
    id_delivery: string,
    price: number,
    note: string,
    noteValue: string,
    setNoteValue: (noteValue: string) => void,
    dispatch: Dispatch<AnyAction>,
    shipments: Shipment[],
) {
    try {
        const res = await fetchLogistics(`protected/shipment/update`, {
            method: "POST",
            body: {
                id_delivery,
                note: noteValue,
                total_price: price,
            },
            withToken: true,
        });
        const data = await res.json();
        if (res.status === 200) {
            dispatch(setSuccess(`Cập nhật ghi chú lô hàng ${id_delivery} thành công!`));
            // Update price in order list
            const shipmentIndex = shipments.findIndex(
                (shipment) => shipment.id_delivery === id_delivery,
            );
            if (shipmentIndex !== -1) {
                const newShipment = {
                    ...shipments[shipmentIndex],
                    note: noteValue,
                };
                dispatch(updateShipment(newShipment));
            }
        } else if (data.message_vi) {
            dispatch(setError(data.message_vi));
            // Reset price value
            setNoteValue(note);
        } else {
            throw new Error("Cập nhật ghi chú thất bại!");
        }
    } catch (error) {
        dispatch(setError("Cập nhật ghi chú thất bại!"));
        setNoteValue(note);
    }
}
