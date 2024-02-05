/* eslint-disable no-shadow */
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { clearMessage, setError, setSuccess } from "@/redux/slice/alertSlice";
import { fetchLogistics } from "../apiUtils";
import { updateOrder } from "@/redux/slice/orderSlice";
import { Shipment } from "@/hooks/useGetShipmentList";
import { formatNumber } from "@/functions/formatFunction";
import { updateShipment } from "@/redux/slice/shipmentSlice";

export default async function PostUpdateShipment(
    id_delivery: string,
    note: string,
    price: number,
    noteValue: string,
    setNoteValue: (noteValue: string) => void,
    priceValue: number,
    setPriceValue: (priceValue: string) => void,
    shipmentList: Shipment[],
    dispatch: Dispatch<AnyAction>,
) {
    try {
        const res = await fetchLogistics(`protected/shipment/update`, {
            method: "POST",
            body: {
                id_delivery,
                note: noteValue,
                total_price: priceValue,
            },
            withToken: true,
        });
        const data = await res.json();
        if (res.status === 200) {
            dispatch(setSuccess(`Đã cập nhật trạng thái vận đơn ${id_delivery}!`));
            // Update shipment in shipmentList
            const shipmentIndex = shipmentList.findIndex(
                (shipment) => shipment.id_delivery === id_delivery,
            );
            if (shipmentIndex !== -1) {
                const newShipment = {
                    ...shipmentList[shipmentIndex],

                    note: noteValue,
                    total_price: priceValue,
                };
                dispatch(updateShipment(newShipment));
            }
        } else if (data.message_vi) {
            dispatch(setError(data.message_vi));
            setNoteValue(note);
            setPriceValue(price ? formatNumber(price.toString()) : "0");
        } else {
            throw new Error("Cập nhật trạng thái lô hàng thất bại!");
        }
    } catch (error) {
        dispatch(setError("Cập nhật trạng thái lô hàng thất bại!"));
        setNoteValue(note);
        setPriceValue(price ? formatNumber(price.toString()) : "0");
    }
}
