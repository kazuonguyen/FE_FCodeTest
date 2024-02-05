/* eslint-disable no-plusplus */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogistics } from "@/api/apiUtils";
import { setError } from "@/redux/slice/alertSlice";
import { setCounterPage, setOrders } from "@/redux/slice/orderSlice";
import { RootState } from "@/redux/store/store";

export interface OrderResponse {}

export interface Order {
    index: number;
    id_order: string;
    status: string; // Status of order ["queue", "completed", "error"]
    note: string;
    price: number;
    id_supplier: string;
    id_delivery: string;
    created_at: string;
    updated_at: string;
    clo_type: string;
    num_shirt: number; // Number of shirt => this is extra field get by query from each id_order
}

export interface SupplierPrint {
    id_order: string;
    id_design: string;
    quantity: number;
    size: string;
    status: string;
    id_print: string;
    clo_type: string;
}

export interface OrderDetail {
    id_order: string;
    order: Order;
    prints: SupplierPrint[];
}

export default function useGetOrderList() {
    const [isLoadingOrderList, setIsLoadingOrderList] = useState<boolean>(false);
    const [orderList, setOrderList] = useState<Order[]>([]);
    const dispatch = useDispatch();
    // Query order detail from order list
    const queryOrderDetail = async (id_order: string) => {
        try {
            const res = await fetchLogistics(`protected/order/fulldata?idorder=${id_order}`, {
                method: "GET",
                withToken: true,
            });
            const data = await res.json();
            if (res.status === 200) {
                let count = 0;
                let clo_type = "";
                // console.log(data.data.prints);
                data.data.prints.forEach((item: SupplierPrint) => {
                    count += item.quantity;
                    clo_type = item.clo_type;
                });
                return { count, clo_type };
            }
            throw new Error("Error");
        } catch (error) {
            throw new Error("Error");
        }
    };
    // Get order list
    const getOrderList = async (
        page: number,
        {
            sort = "asc",
            status = "",
            idorder = "",
            limit = 10,
            leftprice = 0,
            rightprice = 2147483646,
            leftcount = 1,
            rightcount = 2147483646,
            startdate = "",
            sortquery = "created_at",
        }: {
            sort?: "asc" | "desc";
            idorder?: string;
            status?: string;
            limit?: number;
            startdate?: string;
            sortquery?: string;
            leftprice?: number;
            rightprice?: number;
            leftcount?: number;
            rightcount?: number;
        } = {},
    ) => {
        // Create query string
        const queryString = [];
        // Add query string to array
        if (status !== "") queryString.push(`status=${status}`);
        if (idorder !== "") queryString.push(`idorder=${idorder}`);
        queryString.push(`sort=${sort}`);
        queryString.push(`leftprice=${leftprice}`);
        queryString.push(`rightprice=${rightprice}`);
        queryString.push(`leftcount=${leftcount}`);
        queryString.push(`rightcount=${rightcount}`);
        queryString.push(`page=${page}`);
        queryString.push(`limit=${limit}`);
        queryString.push(`sortquery=${sortquery}`);
        if (startdate !== "") queryString.push(`startdate=${startdate}`);
        // Join query string with "&" if query string is not empty
        const query = queryString.length > 0 ? `${queryString.join("&")}` : "";
        try {
            setIsLoadingOrderList(true);
            const res = await fetchLogistics(`protected/order/list?${query}`, {
                method: "GET",
                withToken: true,
            });
            const data = await res.json();
            if (res.status === 200) {
                const orders = await Promise.all(
                    Array.from(data.data.orders, async (item: Order) => {
                        try {
                            const obj = await queryOrderDetail(item.id_order);
                            return { ...item, num_shirt: obj.count, clo_type: obj.clo_type };
                        } catch (error) {
                            return { ...item, num_shirt: 0, clo_type: "" };
                        }
                    }),
                );
                setOrderList(orders);
                dispatch(setOrders(orders));
                // Update counterPage
                dispatch(setCounterPage(data.data.page));
            } else if (data.message_vi) {
                dispatch(setError(data.message_vi));
            } else {
                throw new Error("Có lỗi xảy ra khi lấy danh sách đơn hàng");
            }
        } catch (error) {
            dispatch(setError("Có lỗi xảy ra khi lấy danh sách đơn hàng"));
        } finally {
            setIsLoadingOrderList(false);
        }
    };
    return { isLoadingOrderList, orderList, getOrderList };
}
