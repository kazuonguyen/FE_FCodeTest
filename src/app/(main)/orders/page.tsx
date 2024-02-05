"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ScreenStyleMain from "@/components/global/ScreenStyle/ScreenStyleMain";
import Drawer from "@/components/global/Drawer/Drawer";
import Loading from "@/components/global/Loading/Loading";
import { RootState } from "@/redux/store/store";
import useGetOrderList, { Order } from "@/hooks/useGetOrderList";
import Pagination from "../../../components/global/Pagination/Pagination";
import TableOrder from "@/components/pages/order/TableOrder/TableOrder";
import { ShipmentModal } from "@/components/pages/order/ShipmentModal/ShipmentModal";

export default function Page() {
    const orders = useSelector<RootState, Order[]>((state) => state.order.orders);
    const selectedOrders = useSelector((state: RootState) => state.selectedOrder.selectedOrders);
    const limitItemsPerPage = useSelector((state: RootState) => state.order.limitItemPerPage);
    const [currentPage, setCurrentPage] = useState<number>(1);
    // State for show create shipment modal
    const [openCreateShipment, setOpenCreateShipment] = useState(false);
    // get order list from API and dispatch to store to update state using hooks
    const { isLoadingOrderList, getOrderList } = useGetOrderList();
    const counterPage = useSelector((state: RootState) => state.order.counterPage);
    // Get filter value in store
    const filterOrderByCode = useSelector((state: RootState) => state.order.filterOrderByCode);
    const filterOrderByLeftPrice = useSelector(
        (state: RootState) => state.order.filterOrderLeftPrice,
    );
    const filterOrderByRightPrice = useSelector(
        (state: RootState) => state.order.filterOrderRightPrice,
    );
    const filterOrderByLeftCount = useSelector(
        (state: RootState) => state.order.filterOrderLeftCount,
    );
    const filterOrderByRightCount = useSelector(
        (state: RootState) => state.order.filterOrderRightCount,
    );
    const filterOrderByCreateAt = useSelector(
        (state: RootState) => state.order.filterOrderByCreateAt,
    );
    const filterOrderByStatus = useSelector((state: RootState) => state.order.filterOrderByStatus);
    useEffect(() => {
        // Reset orderList in store to empty array
        if (openCreateShipment === false) {
            getOrderList(currentPage - 1, {
                idorder: filterOrderByCode,
                leftprice: filterOrderByLeftPrice,
                rightprice: filterOrderByRightPrice,
                leftcount: filterOrderByLeftCount,
                rightcount: filterOrderByRightCount,
                status: filterOrderByStatus,
                limit: limitItemsPerPage,
                startdate: filterOrderByCreateAt,
            });
        }
    }, [
        currentPage,
        openCreateShipment,
        filterOrderByCode,
        filterOrderByLeftPrice,
        filterOrderByRightPrice,
        filterOrderByLeftCount,
        filterOrderByRightCount,
        filterOrderByStatus,
        limitItemsPerPage,
        filterOrderByCreateAt,
    ]);

    return (
        <ScreenStyleMain>
            <Drawer setOpenCreateShipment={setOpenCreateShipment} />
            <div className="flex flex-col justify-center items-center h-full w-screen">
                {isLoadingOrderList === true ? (
                    <div className="flex flex-col items-center justify-center w-screen h-screen">
                        <Loading />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center w-screen h-full px-[120px]">
                        <TableOrder orders={orders} />
                        {/** Create shipment modal component */}
                        {openCreateShipment && selectedOrders.length > 0 && (
                            <ShipmentModal setOpenCreateShipment={setOpenCreateShipment} />
                        )}
                        {/** Not render Pagination if order list is less than 9 */}
                        {orders.length > 0 && (
                            <Pagination
                                path="orders"
                                totalPage={counterPage}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        )}
                    </div>
                )}
            </div>
        </ScreenStyleMain>
    );
}
