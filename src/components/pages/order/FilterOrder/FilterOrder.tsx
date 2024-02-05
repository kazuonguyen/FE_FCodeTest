/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import { useDispatch, useSelector } from "react-redux";
import { Order } from "@/hooks/useGetOrderList";
import { RootState } from "@/redux/store/store";
import filter from "./filter.module.css";
import SearchOrder from "@/components/pages/order/FilterOrder/SearchOrder";
import FilterOrderPrice from "@/components/pages/order/FilterOrder/FilterOrderPrice";
import FilterOrderNum from "@/components/pages/order/FilterOrder/FilterOrderNum";
import FilterOrderStatus from "@/components/pages/order/FilterOrder/FilterOrderStatus";
import FilterOrderCreateAt from "./FilterOrderCreatedAt";

export interface FilterOrderProps {
    setOpenCreateShipment?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FilterOrder({ setOpenCreateShipment }: FilterOrderProps) {
    const orders = useSelector<RootState, Order[]>((state) => state.order.orders);
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
    const selectedOrders = useSelector((state: RootState) => state.selectedOrder.selectedOrders);

    return (
        <div
            className={` ${filter.filterGroup} flex flex-row items-center justify-between`}
            style={{
                position: "fixed",
                zIndex: 999,
            }}
        >
            <div className="flex flex-row items-center justify-between space-x-[20px]">
                {/* Filter button if filter has value then change title to filter value */}
                {/* Filter button check isActived when select filter */}
                {/* Filter order code get from api */}
                {/** if order is not null then render this */}
                {orders !== undefined && (
                    <>
                        {/* Search order by order code */}
                        <SearchOrder />
                        {/* Filter order num of shirt get from api */}
                        <FilterOrderNum
                            isActived={
                                filterOrderByLeftCount !== 1 ||
                                filterOrderByRightCount !== 2147483646
                            }
                        />
                        {/* Filter order price get from api */}
                        <FilterOrderPrice
                            isActived={
                                filterOrderByLeftPrice !== 0 ||
                                filterOrderByRightPrice !== 2147483646
                            }
                        />
                        {/* Filter order status get from api */}
                        <FilterOrderStatus isActived={filterOrderByStatus !== ""} />
                        {/** Filter order by created_at */}
                        <FilterOrderCreateAt isActived={filterOrderByCreateAt !== ""} />
                    </>
                )}
                {/** if shipment is not null then render this */}
            </div>
            {/* Button for create shipments from checked order in order list */}
            {/* Check if has order in order list then show button else hide button */}
            {orders !== undefined && (
                <button
                    type="button"
                    className="text-white inline-flex items-center justify-center"
                    style={{
                        marginLeft: "20px",
                        borderRadius: "100px",
                        backgroundColor: "#30D158",
                        height: "44px",
                        width: "111px",
                        padding: "8 18px",
                    }}
                    onClick={() => {
                        // Check if has order in order list then open create shipment modal else do nothing
                        if (setOpenCreateShipment !== undefined && selectedOrders.length > 0) {
                            setOpenCreateShipment(true);
                        }
                    }}
                >
                    Đóng lô
                </button>
            )}
        </div>
    );
}
