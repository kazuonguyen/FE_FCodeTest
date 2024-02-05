/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from "react";
import Image from "next/image";
import { Order } from "@/hooks/useGetOrderList";
import DropdownStatus from "../DropdownStatus/DropdownStatus";
import { NoteModal } from "../NoteOrder/NoteOrder";
import { InputPrice } from "../InputPrice/InputPrice";
import { SelectAllOrder } from "../SelectOrder/SelectAllOrder";
import SelectOrder from "../SelectOrder/SelectOrder";
import { OrderDetailModal } from "../OrderDetail/OrderDetail";
import { formatDateTime } from "@/functions/formatFunction";
import useGetOrderDetail from "@/hooks/useGetOrderDetail";
import { OrderDetail } from "../../../../hooks/useGetOrderList";

export interface TableOrderProps {
    orders: Order[];
}

export default function TableOrder({ orders }: TableOrderProps) {
    // State for show order detail modal
    const [openOrderDetail, setOpenOrderDetail] = useState(false);
    /// State for selected order
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    // State for sort order by index
    const [sortIndex, setSortIndex] = useState<"asc" | "desc" | null>(null);
    // State for sort order by id_order
    const [sortIdOrder, setSortIdOrder] = useState<"asc" | "desc" | null>(null);
    // State for sort order by num_shirt
    const [sortNumShirt, setSortNumShirt] = useState<"asc" | "desc" | null>(null);
    // State for sort order by price
    const [sortPrice, setSortPrice] = useState<"asc" | "desc" | null>(null);
    // State for sort order by status
    const [sortStatus, setSortStatus] = useState<"asc" | "desc" | null>(null);
    // State for sort order by created_at
    const [sortCreatedAt, setSortCreatedAt] = useState<"asc" | "desc" | null>(null);
    // State for sort order by note
    const [sortNote, setSortNote] = useState<"asc" | "desc" | null>(null);
    // State for sort order by clo_type
    const [sortCloType, setSortCloType] = useState<"asc" | "desc" | null>(null);
    // State for sort order by updated_at
    const [sortUpdatedAt, setSortUpdatedAt] = useState<"asc" | "desc" | null>(null);

    // State for hold orders list after sort
    const [ordersAfterSort, setOrdersAfterSort] = useState<Order[]>([]);
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
    // Handle sort order by num_shirt state to render correct sort icon
    const handleSortNumShirt = () => {
        // If sortNumShirt is null then default sort icon
        // If sortNumShirt is asc then asc sort icon
        // If sortNumShirt is desc then desc sort icon
        if (sortNumShirt === null) {
            setSortNumShirt("asc");
        } else if (sortNumShirt === "asc") {
            setSortNumShirt("desc");
        } else {
            setSortNumShirt(null);
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
    // Handle sort order by status state to render correct sort icon
    const handleSortStatus = () => {
        // If sortStatus is null then default sort icon
        // If sortStatus is asc then asc sort icon
        // If sortStatus is desc then desc sort icon
        if (sortStatus === null) {
            setSortStatus("asc");
        } else if (sortStatus === "asc") {
            setSortStatus("desc");
        } else {
            setSortStatus(null);
        }
    };
    // Handle sort order by created_at state to render correct sort icon
    const handleSortCreatedAt = () => {
        // If sortCreatedAt is null then default sort icon
        // If sortCreatedAt is asc then asc sort icon
        // If sortCreatedAt is desc then desc sort icon
        if (sortCreatedAt === null) {
            setSortCreatedAt("asc");
        } else if (sortCreatedAt === "asc") {
            setSortCreatedAt("desc");
        } else {
            setSortCreatedAt(null);
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
    // Handle sort order by clo_type state to render correct sort icon
    const handleSortCloType = () => {
        // If sortCloType is null then default sort icon
        // If sortCloType is asc then asc sort icon
        // If sortCloType is desc then desc sort icon
        if (sortCloType === null) {
            setSortCloType("asc");
        } else if (sortCloType === "asc") {
            setSortCloType("desc");
        } else {
            setSortCloType(null);
        }
    };
    // Handle sort order by updated_at state to render correct sort icon
    const handleSortUpdatedAt = () => {
        // If sortUpdatedAt is null then default sort icon
        // If sortUpdatedAt is asc then asc sort icon
        // If sortUpdatedAt is desc then desc sort icon
        if (sortUpdatedAt === null) {
            setSortUpdatedAt("asc");
        } else if (sortUpdatedAt === "asc") {
            setSortUpdatedAt("desc");
        } else {
            setSortUpdatedAt(null);
        }
    };
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
    // Sort order by num_shirt
    const sortNumShirtOrder = (orders: Order[]) => {
        if (sortNumShirt === null) {
            return orders;
        }
        const sortedOrders = orders.slice(); // Create a copy of the array
        if (sortNumShirt === "asc") {
            return sortedOrders.sort((a, b) => {
                return a.num_shirt - b.num_shirt;
            });
        }
        return sortedOrders.sort((a, b) => {
            return b.num_shirt - a.num_shirt;
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
    // Sort order by status
    const sortStatusOrder = (orders: Order[]) => {
        if (sortStatus === null) {
            return orders;
        }
        const sortedOrders = orders.slice(); // Create a copy of the array
        if (sortStatus === "asc") {
            return sortedOrders.sort((a, b) => {
                return a.status.localeCompare(b.status);
            });
        }
        return sortedOrders.sort((a, b) => {
            return b.status.localeCompare(a.status);
        });
    };
    // Sort order by created_at
    const sortCreatedAtOrder = (orders: Order[]) => {
        if (sortCreatedAt === null) {
            return orders;
        }
        const sortedOrders = orders.slice(); // Create a copy of the array
        if (sortCreatedAt === "asc") {
            return sortedOrders.sort((a, b) => {
                return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
            });
        }
        return sortedOrders.sort((a, b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
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

    // Sort order by clo_type
    const sortCloTypeOrder = (orders: Order[]) => {
        if (sortCloType === null) {
            return orders;
        }
        const sortedOrders = orders.slice(); // Create a copy of the array
        if (sortCloType === "asc") {
            return sortedOrders.sort((a, b) => {
                return a.clo_type.localeCompare(b.clo_type);
            });
        }
        return sortedOrders.sort((a, b) => {
            return b.clo_type.localeCompare(a.clo_type);
        });
    };

    // Sort order by updated_at
    const sortUpdatedAtOrder = (orders: Order[]) => {
        if (sortUpdatedAt === null) {
            return orders;
        }
        const sortedOrders = orders.slice(); // Create a copy of the array
        if (sortUpdatedAt === "asc") {
            return sortedOrders.sort((a, b) => {
                return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
            });
        }
        return sortedOrders.sort((a, b) => {
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });
    };

    // Because we need to show order detail modal when click on order row
    // but the modal is in another component (button in order row) so we need to use
    // querySelector to get the button and click it when click on order row
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
        // Sort order by num_shirt
        const ordersAfterSortNumShirt = sortNumShirtOrder(ordersAfterSortIdOrder);
        // Sort order by price
        const ordersAfterSortPrice = sortPriceOrder(ordersAfterSortNumShirt);
        // Sort order by status
        const ordersAfterSortStatus = sortStatusOrder(ordersAfterSortPrice);
        // Sort order by created_at
        const ordersAfterSortCreatedAt = sortCreatedAtOrder(ordersAfterSortStatus);
        // Sort order by note
        const ordersAfterSortNote = sortNoteOrder(ordersAfterSortCreatedAt);
        // Sort order by clo_type
        const ordersAfterSortCloType = sortCloTypeOrder(ordersAfterSortNote);
        // Sort order by updated_at
        const ordersAfterSortUpdatedAt = sortUpdatedAtOrder(ordersAfterSortCloType);
        // Set state for ordersAfterSort
        setOrdersAfterSort(ordersAfterSortUpdatedAt);
    }, [
        orders,
        sortIndex,
        sortIdOrder,
        sortNumShirt,
        sortPrice,
        sortStatus,
        sortCreatedAt,
        sortNote,
        sortCloType,
        sortUpdatedAt,
    ]);
    return (
        <>
            {ordersAfterSort?.length === 0 || ordersAfterSort === undefined ? (
                <div className=" w-full h-full text-center text-lg mt-[88px]">
                    <p>
                        Không có đơn hàng nào được tìm thấy. Vui lòng thử lại với các bộ lọc khác.
                    </p>
                </div>
            ) : (
                <div className="w-full h-full text-center text-lg">
                    {/** Order detail modal component */}
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
                    <table className="w-full h-full text-center text-lg my-[88px]">
                        <thead
                            className="bg-white"
                            style={{
                                borderBottom: "0.5px solid var(--bdbdbd, #BDBDBD)",
                            }}
                        >
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    <SelectAllOrder orders={orders} />
                                </th>
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
                                <th scope="col" className="px-7 py-3">
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
                                {/** Loai mẫu */}
                                <th scope="col" className="px-7 py-3">
                                    <div
                                        role="button"
                                        className="flex items-center justify-between cursor-pointer"
                                        onClick={handleSortCloType}
                                    >
                                        <span className="select-none">Loại mẫu</span>
                                        {sortCloType === null ? (
                                            <Image
                                                src="/icon/sort.svg"
                                                alt="sort-default"
                                                width={12}
                                                height={21}
                                            />
                                        ) : sortCloType === "asc" ? (
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
                                {/** So luong ao */}
                                <th scope="col" className="px-7 py-3">
                                    <div
                                        role="button"
                                        className="flex items-center justify-between cursor-pointer"
                                        onClick={handleSortNumShirt}
                                    >
                                        <span className="select-none">Số lượng</span>
                                        {sortNumShirt === null ? (
                                            <Image
                                                src="/icon/sort.svg"
                                                alt="sort-default"
                                                width={12}
                                                height={21}
                                            />
                                        ) : sortNumShirt === "asc" ? (
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
                                <th scope="col" className="px-7 py-3">
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
                                {/** Trang thai */}
                                <th scope="col" className="px-7 py-3">
                                    <div
                                        role="button"
                                        className="flex items-center justify-between cursor-pointer"
                                        onClick={handleSortStatus}
                                    >
                                        <span className="select-none">Trạng thái</span>
                                        {sortStatus === null ? (
                                            <Image
                                                src="/icon/sort.svg"
                                                alt="sort-default"
                                                width={12}
                                                height={21}
                                            />
                                        ) : sortStatus === "asc" ? (
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
                                {/** Ngay tao */}
                                <th scope="col" className="px-7 py-3">
                                    <div
                                        role="button"
                                        className="flex items-center justify-between cursor-pointer"
                                        onClick={handleSortCreatedAt}
                                    >
                                        <span className="select-none">Ngày tạo</span>
                                        {sortCreatedAt === null ? (
                                            <Image
                                                src="/icon/sort.svg"
                                                alt="sort-default"
                                                width={12}
                                                height={21}
                                            />
                                        ) : sortCreatedAt === "asc" ? (
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
                                {/** Ngay hoan thanh */}
                                <th scope="col" className="px-7 py-3">
                                    <div
                                        role="button"
                                        className="flex items-center justify-between cursor-pointer"
                                        onClick={handleSortUpdatedAt}
                                    >
                                        <span className="select-none">Ngày hoàn thành</span>
                                        {sortUpdatedAt === null ? (
                                            <Image
                                                src="/icon/sort.svg"
                                                alt="sort-default"
                                                width={12}
                                                height={21}
                                            />
                                        ) : sortUpdatedAt === "asc" ? (
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
                                <th scope="col" className="px-7 py-3">
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
                                    {/** Checkbox shipment */}
                                    <td className="px-6 py-4">
                                        <SelectOrder
                                            id_order={order.id_order}
                                            id_delivery={order.id_delivery}
                                        />
                                    </td>
                                    {/** STT */}
                                    <td
                                        className="py-4"
                                        onClick={() => {
                                            handleShowDetail(order.id_order);
                                        }}
                                    >
                                        {order.index + 1}
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
                                    {/** Loai mau */}
                                    <td
                                        className="px-6 py-4"
                                        onClick={() => {
                                            handleShowDetail(order.id_order);
                                        }}
                                    >
                                        {order.clo_type === "tshirt" ? "Áo thun" : "Áo Polo"}
                                    </td>
                                    {/** So luong ao */}
                                    <td
                                        className="px-6 py-4"
                                        onClick={() => {
                                            handleShowDetail(order.id_order);
                                        }}
                                    >
                                        {order.num_shirt}
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
                                    <td
                                        className="px-6 py-4"
                                        style={{
                                            // Not overlap with dropdown filter  component
                                            zIndex: 1,
                                        }}
                                    >
                                        <DropdownStatus order={order} />
                                    </td>
                                    {/** Ngay tao */}
                                    <td
                                        className="px-6 py-4"
                                        onClick={() => {
                                            handleShowDetail(order.id_order);
                                        }}
                                    >
                                        {formatDateTime(order.created_at)}
                                    </td>
                                    {/** Ngay hoan thanh */}
                                    <td
                                        className="px-6 py-4"
                                        onClick={() => {
                                            handleShowDetail(order.id_order);
                                        }}
                                    >
                                        {order.updated_at === null || order.updated_at === undefined
                                            ? "Chưa hoàn thành"
                                            : formatDateTime(order.updated_at)}
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
