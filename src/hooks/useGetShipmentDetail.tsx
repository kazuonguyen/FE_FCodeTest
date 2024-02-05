import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchLogistics } from "@/api/apiUtils";
import { setError } from "@/redux/slice/alertSlice";
import { Order } from "./useGetOrderList";

export interface ShipmentData {
    id_delivery: string;
    id_supplier: string;
    total_price: number;
    note: string;
    paid_at: string | null;
    arrived_at: string | null;
}

export interface ShipmentDetail {
    id_delivery: string;
    delivery: ShipmentData;
    orders: Order[];
}

export default function useGetShipmentDetail() {
    const [isLoadingShipmentDetail, setIsLoadingShipmentDetail] = useState<boolean>(false);
    const [shipmentDetail, setShipmentDetail] = useState<ShipmentDetail | null>();
    const dispatch = useDispatch();
    const getShipmentDetail = async (id_shipment: string) => {
        if (!id_shipment) return;
        try {
            setIsLoadingShipmentDetail(true);
            const res = await fetchLogistics(
                `protected/shipment/fulldata?idshipment=${id_shipment}`,
                {
                    method: "GET",
                    withToken: true,
                },
            );
            const data = await res.json();
            if (res.status === 200) {
                setShipmentDetail(data.data);
            } else if (data.message_vi) {
                dispatch(setError(data.message_vi));
            } else {
                throw new Error("Đã có lỗi xảy ra khi lấy thông tin lô hàng");
            }
        } catch (error) {
            dispatch(setError("Đã có lỗi xảy ra khi lấy thông tin lô hàng"));
        } finally {
            setIsLoadingShipmentDetail(false);
        }
    };
    return { isLoadingShipmentDetail, shipmentDetail, getShipmentDetail };
}
