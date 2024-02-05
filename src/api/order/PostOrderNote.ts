import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { clearMessage, setError, setSuccess } from "@/redux/slice/alertSlice";
import { fetchLogistics } from "../apiUtils";
import { updateOrder } from "@/redux/slice/orderSlice";
import { Order } from "@/hooks/useGetOrderList";

export default async function PostOrderPrice(
    id_order: string,
    noteValue: string,
    note: string,
    setNoteValue: (value: string) => void,
    dispatch: Dispatch<AnyAction>,
    orders: Order[],
) {
    try {
        const res = await fetchLogistics(`protected/order/note?idorder=${id_order}`, {
            method: "POST",
            body: {
                note: noteValue,
            },
            withToken: true,
        });
        const data = await res.json();
        if (res.status === 200) {
            dispatch(setSuccess(`Cập nhật ghi chú đơn hàng ${id_order} thành công!`));
            // Update note in order list
            const orderIndex = orders.findIndex((order) => order.id_order === id_order);
            if (orderIndex !== -1) {
                const newOrder = { ...orders[orderIndex], note: noteValue };
                dispatch(updateOrder(newOrder));
            }
        } else if (data.message_vi) {
            dispatch(setError(data.message_vi));
            // Reset note value
            setNoteValue(note);
        } else {
            throw new Error("Cập nhật ghi chú thất bại!");
        }
    } catch (error) {
        dispatch(setError("Cập nhật ghi chú thất bại!"));
        setNoteValue(note);
    }
}
