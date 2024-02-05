import { useDispatch, useSelector } from "react-redux";
import filter from "./filter.module.css";
import { RootState } from "@/redux/store/store";
import SearchShipment from "./SearchShipment";
import FilterShipmentNum from "./FilterShipmentNum";
import FilterShipmentPrice from "./FilterShipmentPrice";
import FilterShipmentShip from "./FilterShipmentShip";
import FilterShipmentPay from "./FilterShipmentPay";

export default function FilterShipment() {
    const shipments = useSelector((state: RootState) => state.shipment.shipments);
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
    return (
        <div
            className={` ${filter.filterGroup} flex flex-row items-center justify-between`}
            style={{
                position: "fixed",
                zIndex: 999,
            }}
        >
            <div className="flex flex-row items-center justify-between space-x-[20px]">
                {shipments !== undefined && (
                    <>
                        {/* Search order by shipment code */}
                        <SearchShipment />
                        {/* Filter shipment num of order get from api */}
                        <FilterShipmentNum
                            isActived={
                                filterShipmentByLeftCount !== 1 ||
                                filterShipmentByRightCount !== 2147483646
                            }
                        />
                        {/* Filter shipment price get from api */}
                        <FilterShipmentPrice
                            isActived={
                                filterShipmentByLeftPrice !== 0 ||
                                filterShipmentByRightPrice !== 2147483646
                            }
                        />
                        {/* Filter shipment by shipment status */}
                        <FilterShipmentShip isActived={filterShipmentByDeliveryStatus !== ""} />
                        {/* Filter shipment by payment status */}
                        <FilterShipmentPay isActived={filterShipmentByPaymentStatus !== ""} />
                    </>
                )}
            </div>
        </div>
    );
}
