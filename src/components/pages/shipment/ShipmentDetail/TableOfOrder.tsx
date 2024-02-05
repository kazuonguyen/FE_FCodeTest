/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from "react";
import Image from "next/image";
import { formatDateTime } from "@/functions/formatFunction";
import { Order } from "@/hooks/useGetOrderList";
import { OrderDetailModal } from "../../order/OrderDetail/OrderDetail";
import { NoteModal } from "../../order/NoteOrder/NoteOrder";
import { InputPrice } from "../../order/InputPrice/InputPrice";

export interface TableOfOrderProps {
    orders: Order[];
}

export default function TableOfOrder({ orders }: TableOfOrderProps) {
    // State for show order detail modal
    const [openOrderDetail, setOpenOrderDetail] = useState(false);
    /// State for selected order
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    // State for sort order by index
    const [sortIndex, setSortIndex] = useState<"asc" | "desc" | null>(null);
    // State for sort order by id_order
    const [sortIdOrder, setSortIdOrder] = useState<"asc" | "desc" | null>(null);
    // State for sort order by price
    const [sortPrice, setSortPrice] = useState<"asc" | "desc" | null>(null);
    // State for sort order by note
    const [sortNote, setSortNote] = useState<"asc" | "desc" | null>(null);
    // State for hold orders list after sort
    const [ordersAfterSort, setOrdersAfterSort] = useState<Order[]>([]);

    useEffect(() => {
        let index = 1;
        orders.forEach((order) => {
            order.index = index;
            index += 1;
        });
    }, [orders]);
    // Handle sort order by index state to render correct sort icon
    const handleSortIndex = () => {
        // If sortIndex is null then default sort icon
        // If sortIndex is asc then asc sort icon
        // If sortIndex is desc then desc sort icon
        if (sortIndex === null) {
            setSortIndex("asc");
        } else if (sortIndex === "asc") {
            setSortIndex("desc");
        } else {
            setSortIndex(null);
        }
    };
    // Handle sort order by id_order state to render correct sort icon
    const handleSortIdOrder = () => {
        // If sortIdOrder is null then default sort icon
        // If sortIdOrder is asc then asc sort icon
        // If sortIdOrder is desc then desc sort icon
        if (sortIdOrder === null) {
            setSortIdOrder("asc");
        } else if (sortIdOrder === "asc") {
            setSortIdOrder("desc");
        } else {
            setSortIdOrder(null);
        }
    };

    // Handle sort order by price state to render correct sort icon
    const handleSortPrice = () => {
        // If sortPrice is null then default sort icon
        // If sortPrice is asc then asc sort icon
        // If sortPrice is desc then desc sort icon
        if (sortPrice === null) {
            setSortPrice("asc");
        } else if (sortPrice === "asc") {
            setSortPrice("desc");
        } else {
            setSortPrice(null);
        }
    };

    // Handle sort order by note state to render correct sort icon
    const handleSortNote = () => {
        // If sortNote is null then default sort icon
        // If sortNote is asc then asc sort icon
        // If sortNote is desc then desc sort icon
        if (sortNote === null) {
            setSortNote("asc");
        } else if (sortNote === "asc") {
            setSortNote("desc");
        } else {
            setSortNote(null);
        }
    };

    // Handle sort order by index
    // Sort order by index
    const sortIndexOrder = (orders: Order[]) => {
        if (sortIndex === null) {
            return orders;
        }
        const sortedOrders = orders.slice(); // Create a copy of the array
        if (sortIndex === "asc") {
            return sortedOrders.sort((a, b) => {
                return a.index - b.index;
            });
        }
        return sortedOrders.sort((a, b) => {
            return b.index - a.index;
        });
    };
    // Sort order by id_order
    const sortIdOrderOrder = (orders: Order[]) => {
        if (sortIdOrder === null) {
            return orders;
        }
        const sortedOrders = orders.slice(); // Create a copy of the array
        if (sortIdOrder === "asc") {
            return sortedOrders.sort((a, b) => {
                return a.id_order.localeCompare(b.id_order);
            });
        }
        return sortedOrders.sort((a, b) => {
            return b.id_order.localeCompare(a.id_order);
        });
    };

    // Sort order by price
    const sortPriceOrder = (orders: Order[]) => {
        if (sortPrice === null) {
            return orders;
        }
        const sortedOrders = orders.slice(); // Create a copy of the array
        if (sortPrice === "asc") {
            return sortedOrders.sort((a, b) => {
                return a.price - b.price;
            });
        }
        return sortedOrders.sort((a, b) => {
            return b.price - a.price;
        });
    };

    // Sort order by note
    const sortNoteOrder = (orders: Order[]) => {
        if (sortNote === null) {
            return orders;
        }
        const sortedOrders = orders.slice(); // Create a copy of the array
        if (sortNote === "asc") {
            return sortedOrders.sort((a, b) => {
                return a.note.localeCompare(b.note);
            });
        }
        return sortedOrders.sort((a, b) => {
            return b.note.localeCompare(a.note);
        });
    };
    const handleShowDetail = (id_order: string) => {
        const selectedOrder = orders.find((order) => order.id_order === id_order);
        if (selectedOrder !== undefined) {
            setSelectedOrder(selectedOrder);
            setOpenOrderDetail(true);
        }
    };
    useEffect(() => {
        // Sort order by index
        const ordersAfterSortIndex = sortIndexOrder(orders);
        // Sort order by id_order
        const ordersAfterSortIdOrder = sortIdOrderOrder(ordersAfterSortIndex);
        // Sort order by price
        const ordersAfterSortPrice = sortPriceOrder(ordersAfterSortIdOrder);
        // Sort order by note
        const ordersAfterSortNote = sortNoteOrder(ordersAfterSortPrice);
        // Set state for ordersAfterSort
        setOrdersAfterSort(ordersAfterSortNote);
    }, [orders, sortIndex, sortIdOrder, sortPrice, sortNote]);
    return (
        <>
            {ordersAfterSort?.length === 0 || ordersAfterSort === undefined ? (
                <div className=" w-full h-full text-center text-lg">
                    <p>
                        Không có đơn hàng nào được tìm thấy. Vui lòng thử lại với các bộ lọc khác.
                    </p>
                </div>
            ) : (
                <div className="w-full h-full text-center text-lg">
                    {openOrderDetail && selectedOrder !== null && (
                        <OrderDetailModal
                            id_order={selectedOrder.id_order}
                            price={selectedOrder.price}
                            status={selectedOrder.status}
                            note={selectedOrder.note}
                            created_at={selectedOrder.created_at}
                            updated_at={selectedOrder.updated_at}
                            setOpenOrderDetail={setOpenOrderDetail}
                            setSelectedOrder={setSelectedOrder}
                        />
                    )}
                    <table className="w-full h-fit text-center text-lg mb-[88px]">
                        <thead
                            className="bg-white"
                            style={{
                                borderBottom: "0.5px solid var(--bdbdbd, #BDBDBD)",
                            }}
                        >
                            <tr>
                                {/** STT */}
                                <th scope="col" className="py-3">
                                    <div
                                        role="button"
                                        className="flex items-center justify-between cursor-pointer"
                                        onClick={handleSortIndex}
                                    >
                                        <span className="select-none">STT</span>
                                        {sortIndex === null ? (
                                            <Image
                                                src="/icon/sort.svg"
                                                alt="sort-default"
                                                width={12}
                                                height={21}
                                            />
                                        ) : sortIndex === "asc" ? (
                                            <Image
                                                src="/icon/sort_asc.svg"
                                                alt="sort-asc"
                                                width={12}
                                                height={21}
                                            />
                                        ) : (
                                            <Image
                                                src="/icon/sort_desc.svg"
                                                alt="sort-desc"
                                                width={12}
                                                height={21}
                                            />
                                        )}
                                    </div>
                                </th>
                                {/** Ma don */}
                                <th scope="col" className="px-10 py-3">
                                    <div
                                        role="button"
                                        className="flex items-center justify-between cursor-pointer"
                                        onClick={handleSortIdOrder}
                                    >
                                        <span className="select-none">Mã đơn</span>
                                        {sortIdOrder === null ? (
                                            <Image
                                                src="/icon/sort.svg"
                                                alt="sort-default"
                                                width={12}
                                                height={21}
                                            />
                                        ) : sortIdOrder === "asc" ? (
                                            <Image
                                                src="/icon/sort_asc.svg"
                                                alt="sort-asc"
                                                width={12}
                                                height={21}
                                            />
                                        ) : (
                                            <Image
                                                src="/icon/sort_desc.svg"
                                                alt="sort-desc"
                                                width={12}
                                                height={21}
                                            />
                                        )}
                                    </div>
                                </th>
                                {/** Gia */}
                                <th scope="col" className="px-24 py-3">
                                    <div
                                        role="button"
                                        className="flex items-center justify-between cursor-pointer"
                                        onClick={handleSortPrice}
                                    >
                                        <span className="select-none">Giá</span>
                                        {sortPrice === null ? (
                                            <Image
                                                src="/icon/sort.svg"
                                                alt="sort-default"
                                                width={12}
                                                height={21}
                                            />
                                        ) : sortPrice === "asc" ? (
                                            <Image
                                                src="/icon/sort_asc.svg"
                                                alt="sort-asc"
                                                width={12}
                                                height={21}
                                            />
                                        ) : (
                                            <Image
                                                src="/icon/sort_desc.svg"
                                                alt="sort-desc"
                                                width={12}
                                                height={21}
                                            />
                                        )}
                                    </div>
                                </th>
                                {/** Ghi chu */}
                                <th scope="col" className="px-10 py-3">
                                    <div
                                        role="button"
                                        className="flex items-center justify-between cursor-pointer"
                                        onClick={handleSortNote}
                                    >
                                        <span className="select-none">Ghi chú</span>
                                        {sortNote === null ? (
                                            <Image
                                                src="/icon/sort.svg"
                                                alt="sort-default"
                                                width={12}
                                                height={21}
                                            />
                                        ) : sortNote === "asc" ? (
                                            <Image
                                                src="/icon/sort_asc.svg"
                                                alt="sort-asc"
                                                width={12}
                                                height={21}
                                            />
                                        ) : (
                                            <Image
                                                src="/icon/sort_desc.svg"
                                                alt="sort-desc"
                                                width={12}
                                                height={21}
                                            />
                                        )}
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersAfterSort?.map((order, index) => (
                                <tr
                                    key={order.id_order}
                                    className="bg-white hover:bg-gray-200 cursor-pointer"
                                    style={{ borderBottom: "0.5px solid var(--bdbdbd, #BDBDBD)" }}
                                >
                                    {/** STT */}
                                    <td
                                        className="py-4"
                                        onClick={() => {
                                            handleShowDetail(order.id_order);
                                        }}
                                    >
                                        {order.index}
                                    </td>
                                    {/** Ma don */}
                                    <td
                                        className="px-6 py-4 font-bold"
                                        onClick={() => {
                                            handleShowDetail(order.id_order);
                                        }}
                                    >
                                        {order.id_order}
                                    </td>
                                    <td className="px-6 py-4">
                                        <InputPrice
                                            id_order={order.id_order}
                                            price={
                                                order.price === null || order.price === undefined
                                                    ? 0
                                                    : order.price
                                            }
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <NoteModal id_order={order.id_order} note={order.note} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}
