/* eslint-disable no-param-reassign */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchLogistics } from "@/api/apiUtils";
import { clearMessage, setError } from "@/redux/slice/alertSlice";
import { setCounterPage, setShipments } from "@/redux/slice/shipmentSlice";
import { nullDate } from "@/functions/constant";

export interface Shipment {
    id_delivery: string;
    id_supplier: string;
    total_price: number;
    note: string;
    paid_at: string | null;
    arrived_at: string | null;
    count: number;
    index: number;
}

// export interface ShipmentResponse {
//     delivery: Shipment;
//     num_orders: number;
// }

export default function useGetShipmentList() {
    const [isLoadingShipmentList, setIsLoadingShipmentList] = useState<boolean>(false);
    const [shipmentList, setShipmentList] = useState<Shipment[]>([]);
    // get detail of shipment
    const dispatch = useDispatch();
    const getShipmentDetail = async (id_shipment: string) => {
        try {
            const res = await fetchLogistics(`protected/shipment?idshipment=${id_shipment}`, {
                method: "GET",
                withToken: true,
            });
            const data = await res.json();
            if (res.status === 200) {
                // Add new shipment to shipment list
                return data.data;
            }
            throw new Error("Error");
        } catch (error) {
            throw new Error("Error");
        }
    };
    // Get shipment list for get shipment detail
    const getShipmentList = async (
        page: number,
        {
            sort = "asc",
            status = "",
            leftprice = 0,
            iddelivery = "",
            rightprice = 2147483646,
            leftcount = 1,
            limit = 10,
            rightcount = 2147483646,
            delistatus = "",
            paymentstatus = "",
        }: {
            sort?: "asc" | "desc";
            status?: string;
            iddelivery?: string;
            leftprice?: number;
            rightprice?: number;
            leftcount?: number;
            rightcount?: number;
            delistatus?: string;
            limit?: number;
            paymentstatus?: string;
        } = {},
    ) => {
        // Create query string
        const queryString = [];
        // Add query string to array
        if (status !== "") queryString.push(`status=${status}`);
        queryString.push(`sort=${sort}`);
        queryString.push(`leftprice=${leftprice}`);
        queryString.push(`rightprice=${rightprice}`);
        queryString.push(`leftcount=${leftcount}`);
        queryString.push(`rightcount=${rightcount}`);
        if (delistatus !== "") queryString.push(`delistatus=${delistatus}`);
        if (paymentstatus !== "") queryString.push(`paymentstatus=${paymentstatus}`);
        if (iddelivery !== "") queryString.push(`iddelivery=${iddelivery}`);
        queryString.push(`page=${page}`);
        queryString.push(`limit=${limit}`);
        // Join query string with "&" if query string is not empty
        const query = queryString.length > 0 ? `${queryString.join("&")}` : "";
        try {
            setIsLoadingShipmentList(true);
            const res = await fetchLogistics(`protected/shipment/list?${query}`, {
                method: "GET",
                withToken: true,
            });
            const data = await res.json();
            if (res.status === 200) {
                // Get shipment detail
                // const shipments = await Promise.all(
                //     Array.from(data.data.shipments, async (item: Shipment) => {
                //         try {
                //             const shipment = await getShipmentDetail(item.id_delivery);
                //             return shipment;
                //         } catch (error) {
                //             return { deleivery: item, num_orders: 0 };
                //         }
                //     }),
                // );
                const { shipments } = data.data;
                // Perform check if shipment.paid_at and shipment.arrived_at is nullDate then set it to null
                shipments.forEach((shipment: Shipment) => {
                    if (shipment.paid_at === nullDate) shipment.paid_at = null;
                    if (shipment.arrived_at === nullDate) shipment.arrived_at = null;
                });
                setShipmentList(shipments);
                dispatch(setShipments(shipments));
                // Set counter page
                dispatch(setCounterPage(data.data.page));
            } else if (data.message_vi) {
                dispatch(setError(data.message_vi));
            } else {
                throw new Error("Đã có lỗi xảy ra khi lấy thông tin lô hàng");
            }
        } catch (error) {
            dispatch(setError("Đã có lỗi xảy ra khi lấy thông tin lô hàng"));
        } finally {
            setIsLoadingShipmentList(false);
        }
    };
    return { isLoadingShipmentList, shipmentList, getShipmentList };
}
