import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { clearMessage, setError, setSuccess } from "@/redux/slice/alertSlice";
import { fetchLogistics } from "../apiUtils";
import { updateShipment } from "@/redux/slice/shipmentSlice";
import { Shipment } from "@/hooks/useGetShipmentList";
import { formatNumber } from "@/functions/formatFunction";

export default async function PostShipmentPrice(
    id_delivery: string,
    priceValue: number,
    price: number,
    setPriceValue: (value: string) => void,
    note: string,
    dispatch: Dispatch<AnyAction>,
    shipments: Shipment[],
    setHasValue: (value: boolean) => void,
) {
    try {
        const res = await fetchLogistics(`protected/shipment/update`, {
            method: "POST",
            body: {
                id_delivery,
                note,
                total_price: priceValue,
            },
            withToken: true,
        });
        const data = await res.json();
        if (res.status === 200) {
            dispatch(setSuccess(`Cập nhật giá lô hàng ${id_delivery} thành công!`));
            // Update price in order list
            const shipmentIndex = shipments.findIndex(
                (shipment) => shipment.id_delivery === id_delivery,
            );
            if (shipmentIndex !== -1) {
                const newShipment = {
                    ...shipments[shipmentIndex],
                    total_price: priceValue,
                };
                dispatch(updateShipment(newShipment));
            }
            setHasValue(true);
        } else if (data.message_vi) {
            dispatch(setError(data.message_vi));
            // Reset price value
            setPriceValue(formatNumber(price ? price.toString() : "0"));
        } else {
            throw new Error("Cập nhật giá thất bại!");
        }
    } catch (error) {
        dispatch(setError("Cập nhật giá thất bại!"));
        setPriceValue(formatNumber(price ? price.toString() : "0"));
    }
}
