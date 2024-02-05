import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { clearMessage, setError, setSuccess } from "@/redux/slice/alertSlice";
import { fetchLogistics } from "../apiUtils";
import { updateOrder } from "@/redux/slice/orderSlice";
import { Order } from "@/hooks/useGetOrderList";
import { formatNumber } from "@/functions/formatFunction";

export default async function PostOrderPrice(
    id_order: string,
    priceValue: number,
    price: number,
    setPriceValue: (value: string) => void,
    dispatch: Dispatch<AnyAction>,
    orders: Order[],
    setHasValue: (value: boolean) => void,
) {
    try {
        const res = await fetchLogistics(`protected/order/price?idorder=${id_order}`, {
            method: "POST",
            body: {
                price: priceValue,
            },
            withToken: true,
        });
        const data = await res.json();
        if (res.status === 200) {
            dispatch(setSuccess(`Cập nhật giá đơn hàng ${id_order} thành công!`));
            // Update price in order list
            const orderIndex = orders.findIndex((order) => order.id_order === id_order);
            if (orderIndex !== -1) {
                const newOrder = { ...orders[orderIndex], price: priceValue };
                dispatch(updateOrder(newOrder));
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
