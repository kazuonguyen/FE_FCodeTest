/* eslint-disable no-plusplus */
import { use, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Order } from "@/hooks/useGetOrderList";
import { addAllSelectedOrder, removeAllSelectedOrder } from "@/redux/slice/selectedOrderSlice";
import { RootState } from "@/redux/store/store";

export interface SelectAllOrderProps {
    orders: Order[];
}

export function SelectAllOrder({ orders }: SelectAllOrderProps) {
    // State for checked or not checked checkbox (if checked is true then add all unchecked order to shipment list else remove from shipment list)
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    const list_order = useSelector((state: RootState) => state.selectedOrder.selectedOrders);
    // Function to check if all order in orders list is selected (which has id_shipment is null or empty)
    const countAllOrder = () => {
        let sum = 0;
        for (let i = 0; i < orders.length; i++) {
            if (orders[i].id_delivery === null || orders[i].id_delivery === "") sum++;
        }
        return sum;
    };
    // Check if all order in orders list is in selected order list
    const countSelectedOrder = () => {
        let sum = 0;
        for (let i = 0; i < orders.length; i++) {
            // Check if order has id_shipment is null or empty and is in selected order list
            if (orders[i].id_delivery === null || orders[i].id_delivery === "") {
                if (list_order.includes(orders[i].id_order)) sum++;
            }
        }
        return sum;
    };
    // When component is mounted, get list order from local storage
    useEffect(() => {
        const list_order_local = localStorage.getItem("list_order");
        // Check if list order contain all order in orders list
        if (list_order_local) {
            dispatch(addAllSelectedOrder(JSON.parse(list_order_local)));
            // Check if all order in orders list is selected
            if (
                countAllOrder() !== 0 &&
                countSelectedOrder() !== 0 &&
                countAllOrder() === countSelectedOrder()
            ) {
                setChecked(true);
            } else {
                setChecked(false);
            }
        }
    }, []);
    // When list order is changed, save to local storage
    useEffect(() => {
        localStorage.setItem("list_order", JSON.stringify(list_order));
        if (
            countAllOrder() !== 0 &&
            countSelectedOrder() !== 0 &&
            countAllOrder() === countSelectedOrder()
        )
            setChecked(true);
        else setChecked(false);
    }, [list_order]);

    // Listen on event press key Ctrl + A to select all order in orders
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "a") {
                e.preventDefault();
                if (!checked) {
                    setChecked(true);
                    const newSelectedOrder: string[] = [];
                    orders.forEach((order) => {
                        if (order.id_delivery === null || order.id_delivery === "")
                            newSelectedOrder.push(order.id_order);
                    });
                    dispatch(addAllSelectedOrder(newSelectedOrder));
                    localStorage.setItem("list_order", JSON.stringify(newSelectedOrder));
                } else {
                    setChecked(false);
                    dispatch(removeAllSelectedOrder());
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [checked]);

    return (
        <div className="inline-flex items-center">
            <label
                className="relative flex cursor-pointer items-center rounded-full p-3"
                htmlFor="select-all"
                data-ripple-dark="true"
            >
                <input
                    id="select-all"
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-[6px] border border-[#3a3a3c] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#3a3a3c] before:opacity-0 before:transition-opacity checked:border-[#007AFF] checked:bg-[#007AFF] checked:before:bg-[#007AFF] hover:before:opacity-10"
                    onClick={() => {
                        setChecked(!checked);
                        if (checked) {
                            // Remove all order from shipment list
                            dispatch(removeAllSelectedOrder());
                            localStorage.removeItem("list_order");
                        } else {
                            // Add all order which has id_shipment is null to shipment list
                            const newSelectedOrder: string[] = [];
                            orders.forEach((order) => {
                                if (order.id_delivery === null || order.id_delivery === "")
                                    newSelectedOrder.push(order.id_order);
                            });
                            dispatch(addAllSelectedOrder(newSelectedOrder));
                        }
                    }}
                    checked={checked}
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <Image src="/icon/tick.svg" alt="checked-icon" width={20} height={20} />
                </div>
            </label>
        </div>
    );
}
