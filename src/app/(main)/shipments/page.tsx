"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import useGetShipmentList, { Shipment } from "@/hooks/useGetShipmentList";
import ScreenStyleMain from "@/components/global/ScreenStyle/ScreenStyleMain";
import Drawer from "@/components/global/Drawer/Drawer";
import useGetShipmentCounterPage from "@/hooks/useGetShipmentCounterPage";
import Pagination from "@/components/global/Pagination/Pagination";
import Loading from "@/components/global/Loading/Loading";
import TableShipment from "@/components/pages/shipment/TableShipment/TableShipment";

export default function Page() {
    // State for shipment list
    const shipments = useSelector<RootState, Shipment[]>((state) => state.shipment.shipments);
    const dispatch = useDispatch();
    const counterPage = useSelector<RootState, number>((state) => state.shipment.counterPage);
    const limitItemsPerPage = useSelector<RootState, number>(
        (state) => state.shipment.limitItemsPerPage,
    );
    // State for current page
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { isLoadingShipmentList, shipmentList, getShipmentList } = useGetShipmentList();
    // Warning Time
    const WarningTime = Number(process.env.NEXT_PUBLIC_LOGIN_TIMEOUT_WARNING);
    const filterShipmentByCode = useSelector(
        (state: RootState) => state.shipment.filerShipmentByCode,
    );
    const filterShipmentByLeftCount = useSelector(
        (state: RootState) => state.shipment.filterShipmentByLeftCount,
    );
    const filterShipmentByRightCount = useSelector(
        (state: RootState) => state.shipment.filterShipmentByRightCount,
    );
    const filterShipmentByLeftPrice = useSelector(
        (state: RootState) => state.shipment.filterShipmentByLeftPrice,
    );
    const filterShipmentByRightPrice = useSelector(
        (state: RootState) => state.shipment.filterShipmentByRightPrice,
    );
    const filterShipmentByDeliveryStatus = useSelector(
        (state: RootState) => state.shipment.filterShipmentByDeliveryStatus,
    );
    const filterShipmentByPaymentStatus = useSelector(
        (state: RootState) => state.shipment.filterShipmentByPaymentStatus,
    );
    useEffect(() => {
        // Reset orderList in store to empty array
        // // console.log('currentPage', currentPage - 1);
        getShipmentList(currentPage - 1, {
            iddelivery: filterShipmentByCode,
            leftprice: filterShipmentByLeftPrice,
            rightprice: filterShipmentByRightPrice,
            leftcount: filterShipmentByLeftCount,
            rightcount: filterShipmentByRightCount,
            delistatus: filterShipmentByDeliveryStatus,
            paymentstatus: filterShipmentByPaymentStatus,
            limit: limitItemsPerPage,
        });
    }, [
        currentPage,
        filterShipmentByCode,
        filterShipmentByLeftCount,
        filterShipmentByRightCount,
        filterShipmentByLeftPrice,
        filterShipmentByRightPrice,
        filterShipmentByDeliveryStatus,
        filterShipmentByPaymentStatus,
        limitItemsPerPage,
    ]);
    // useEffect update filterShipment when current page change
    // useEffect update filterShipment when list_shipment change

    return (
        <ScreenStyleMain>
            {/* Drawer left  for direct to other page */}
            <Drawer />
            {/** Loading UI */}
            <div className="flex flex-col justify-center items-center h-full w-screen">
                {isLoadingShipmentList === true ? (
                    <div className="flex flex-col items-center justify-center w-screen h-screen">
                        <Loading />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center px-[120px] w-screen h-full ">
                        <TableShipment shipments={shipments} />
                        {/** Not render Pagination if order list is less than 9 */}
                        {shipments.length > 0 && (
                            <Pagination
                                path="shipments"
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
