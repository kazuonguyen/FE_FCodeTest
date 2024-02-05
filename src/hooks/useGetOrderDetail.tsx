import { useState, use } from "react";
import { useDispatch } from "react-redux";
import { fetchLogistics } from "@/api/apiUtils";
import { setError } from "@/redux/slice/alertSlice";
import { setOrders } from "@/redux/slice/orderSlice";
import { OrderDetail } from "./useGetOrderList";

export default function useGetOrderDetail() {
    const [isLoadingOrderDetail, setIsLoadingOrderDetail] = useState<boolean>(false);
    const [orderDetail, setOrderDetail] = useState<OrderDetail>();
    const dispatch = useDispatch();

    const getOrderDetail = async (id_order: string) => {
        setIsLoadingOrderDetail(true);
        try {
            const res = await fetchLogistics(`protected/order/fulldata?idorder=${id_order}`, {
                method: "GET",
                withToken: true,
            });
            const data = await res.json();
            if (res.status === 200) {
                setOrderDetail(data.data);
            } else if (data.message_vi) {
                dispatch(setError(data.message_vi));
            } else {
                throw new Error("Có lỗi xảy ra khi lấy chi tiết đơn hàng");
            }
        } catch (error) {
            dispatch(setError("Có lỗi xảy ra khi lấy chi tiết đơn hàng"));
        } finally {
            setIsLoadingOrderDetail(false);
        }
    };

    return { isLoadingOrderDetail, orderDetail, getOrderDetail };
}
