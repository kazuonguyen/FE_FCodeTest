import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { clearMessage, setError, setSuccess } from "@/redux/slice/alertSlice";
import { fetchLogistics } from "../apiUtils";

export default async function PostShipmentComplete(
    id_delivery: string,
    dispatch: Dispatch<AnyAction>,
) {
    let result = false;

    try {
        const res = await fetchLogistics(`protected/shipment/ship`, {
            method: "POST",
            body: {
                id_delivery,
                status: true,
            },
            withToken: true,
        });
        const data = await res.json();
        if (res.status === 200) {
            result = true;
            dispatch(setSuccess(`Đã xác nhận giao hàng lô hàng ${id_delivery}!`));
        } else if (data.message_vi) {
            dispatch(setError(data.message_vi));
            result = false;
        } else {
            throw new Error("Cập nhật trạng thái giao hàng thất bại!");
        }
    } catch (error) {
        dispatch(setError("Cập nhật trạng thái giao hàng thất bại!"));
        result = false;
    }
    return result;
}
