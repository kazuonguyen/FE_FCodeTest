import { Dispatch, AnyAction } from "@reduxjs/toolkit";
import { fetchLogistics } from "../apiUtils";
import { setError, setSuccess } from "@/redux/slice/alertSlice";
import { Order } from "@/hooks/useGetOrderList";

export default async function PostCreateShipment(
    selectedOrders: string[],
    price: number,
    note: string,
    dispatch: Dispatch<AnyAction>,
) {
    try {
        const res = await fetchLogistics(`protected/shipment/create`, {
            method: "POST",
            body: {
                list_order: selectedOrders,
                total_price: price,
                note,
            },
            withToken: true,
        });
        const data = await res.json();
        if (res.status === 200) {
            // Return null if success
            const id_shipment = data.id_delivery;
            dispatch(setSuccess(`Tạo lô hàng ${id_shipment} thành công!`));
            return [] as Order[];
        }
        if (data.message_vi) {
            dispatch(setError(data.message_vi));
            if (data.data) return data.data as Order[];
        } else throw new Error("Đã có lỗi xảy ra, tạo lô hàng thất bại!");
    } catch (error) {
        dispatch(setError("Đã có lỗi xảy ra, tạo lô hàng thất bại!"));
        // Return null if error
        return null;
    }
}
