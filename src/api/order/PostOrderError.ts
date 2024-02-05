import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { clearMessage, setError, setSuccess } from "@/redux/slice/alertSlice";
import { fetchLogistics } from "../apiUtils";

// Return true to check if the order is in error
// Don't use state because it's not updated yet
export default async function PostOrderError(id_order: string, dispatch: Dispatch<AnyAction>) {
    let result = false;

    try {
        const res = await fetchLogistics(`protected/order/error?idorder=${id_order}`, {
            method: "POST",
            withToken: true,
        });
        const data = await res.json();
        if (res.status === 200) {
            result = true;
            dispatch(setSuccess(`Đã xác nhận đơn hàng ${id_order} lỗi!`));
        } else if (data.message_vi) {
            dispatch(setError(data.message_vi));
            result = false;
        } else {
            throw new Error("Cập nhật trạng thái đơn hàng thất bại!");
        }
    } catch (error) {
        dispatch(setError("Cập nhật trạng thái đơn hàng thất bại!"));
        result = false;
    }
    return result;
}
