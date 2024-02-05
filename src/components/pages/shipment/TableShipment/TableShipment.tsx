/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from "react";
import Image from "next/image";
import { Shipment } from "@/hooks/useGetShipmentList";
import { ShipmentDetail } from "../ShipmentDetail/ShipmentDetail";
import { NoteShipment } from "../NoteShipment/NoteShipment";
import { InputPriceShipment } from "../InputPriceShipment/InputPriceShipment";
import ShipmentStatus from "../ShipmentStatus/ShipmentStatus";
import PaymentStatus from "../PaymentStatus/PaymentStatus";
import { formatDateTime } from "@/functions/formatFunction";

export interface TableShipmentProps {
    shipments: Shipment[];
}

export default function TableShipment({ shipments }: TableShipmentProps) {
    // useEffect(() => {
    //     let index = 1;
    //     shipments.forEach((shipment) => {
    //         shipment = { ...shipment, index };
    //         index++;
    //     });
    // }, [shipments]);
    // State for show shipment detail modal
    const [openShipmentDetail, setOpenShipmentDetail] = useState(false);
    // State for selected shipment
    const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);

    // State for sort by index of column
    const [sortIndex, setSortIndex] = useState<"asc" | "desc" | null>(null);
    // State for sort by id shipment
    const [sortIdShipment, setSortIdShipment] = useState<"asc" | "desc" | null>(null);
    // State for sort by price
    const [sortPrice, setSortPrice] = useState<"asc" | "desc" | null>(null);
    // State for sort by count
    const [sortCount, setSortCount] = useState<"asc" | "desc" | null>(null);
    // State for sort by arrived at
    const [sortArrivedAt, setSortArrivedAt] = useState<"asc" | "desc" | null>(null);
    // State for sort by paid at
    const [sortPaidAt, setSortPaidAt] = useState<"asc" | "desc" | null>(null);
    // State for sort by note
    const [sortNote, setSortNote] = useState<"asc" | "desc" | null>(null);
    // State for sort by shipment status
    const [sortShipmentStatus, setSortShipmentStatus] = useState<"asc" | "desc" | null>(null);
    // State for sort by payment status
    const [sortPaymentStatus, setSortPaymentStatus] = useState<"asc" | "desc" | null>(null);
    // State for hold shipment list after sort
    const [sortedShipments, setSortedShipments] = useState<Shipment[]>([]);
    // Handle sort by index of column
    const handleSortIndex = () => {
        if (sortIndex === null) {
            setSortIndex("asc");
        } else if (sortIndex === "asc") {
            setSortIndex("desc");
        } else {
            setSortIndex(null);
        }
    };
    // Handle sort by id shipment
    const handleSortIdShipment = () => {
        if (sortIdShipment === null) {
            setSortIdShipment("asc");
        } else if (sortIdShipment === "asc") {
            setSortIdShipment("desc");
        } else {
            setSortIdShipment(null);
        }
    };
    // Handle sort by price
    const handleSortPrice = () => {
        if (sortPrice === null) {
            setSortPrice("asc");
        } else if (sortPrice === "asc") {
            setSortPrice("desc");
        } else {
            setSortPrice(null);
        }
    };
    // Handle sort by count
    const handleSortCount = () => {
        if (sortCount === null) {
            setSortCount("asc");
        } else if (sortCount === "asc") {
            setSortCount("desc");
        } else {
            setSortCount(null);
        }
    };
    // Handle sort by arrived at
    const handleSortArrivedAt = () => {
        if (sortArrivedAt === null) {
            setSortArrivedAt("asc");
        } else if (sortArrivedAt === "asc") {
            setSortArrivedAt("desc");
        } else {
            setSortArrivedAt(null);
        }
    };
    // Handle sort by paid at
    const handleSortPaidAt = () => {
        if (sortPaidAt === null) {
            setSortPaidAt("asc");
        } else if (sortPaidAt === "asc") {
            setSortPaidAt("desc");
        } else {
            setSortPaidAt(null);
        }
    };
    // Handle sort by note
    const handleSortNote = () => {
        if (sortNote === null) {
            setSortNote("asc");
        } else if (sortNote === "asc") {
            setSortNote("desc");
        } else {
            setSortNote(null);
        }
    };
    // Handle sort by shipment status
    const handleSortShipmentStatus = () => {
        if (sortShipmentStatus === null) {
            setSortShipmentStatus("asc");
        } else if (sortShipmentStatus === "asc") {
            setSortShipmentStatus("desc");
        } else {
            setSortShipmentStatus(null);
        }
    };
    // Handle sort by payment status
    const handleSortPaymentStatus = () => {
        if (sortPaymentStatus === null) {
            setSortPaymentStatus("asc");
        } else if (sortPaymentStatus === "asc") {
            setSortPaymentStatus("desc");
        } else {
            setSortPaymentStatus(null);
        }
    };
    // Sort shipment by index of column
    const sortShipmentByIndex = (shipments: Shipment[]) => {
        if (sortIndex === null) return shipments;
        // Create a new copy of shipments array to sort
        const newShipments = shipments.slice();
        if (sortIndex === "asc") {
            return newShipments.sort((a, b) => a.index - b.index);
        }
        return newShipments.sort((a, b) => b.index - a.index);
    };
    // Sort shipment by id shipment
    const sortShipmentByIdShipment = (shipments: Shipment[]) => {
        if (sortIdShipment === null) return shipments;
        // Create a new copy of shipments array to sort
        const newShipments = shipments.slice();
        if (sortIdShipment === "asc") {
            return newShipments.sort((a, b) => a.id_delivery.localeCompare(b.id_delivery));
        }
        return newShipments.sort((a, b) => b.id_delivery.localeCompare(a.id_delivery));
    };
    // Sort shipment by price
    const sortShipmentByPrice = (shipments: Shipment[]) => {
        if (sortPrice === null) return shipments;
        // Create a new copy of shipments array to sort
        const newShipments = shipments.slice();
        if (sortPrice === "asc") {
            return newShipments.sort((a, b) => a.total_price - b.total_price);
        }
        return newShipments.sort((a, b) => b.total_price - a.total_price);
    };
    // Sort shipment by count
    const sortShipmentByCount = (shipments: Shipment[]) => {
        if (sortCount === null) return shipments;
        // Create a new copy of shipments array to sort
        const newShipments = shipments.slice();
        if (sortCount === "asc") {
            return newShipments.sort((a, b) => a.count - b.count);
        }
        return newShipments.sort((a, b) => b.count - a.count);
    };
    // Sort shipment by arrived at
    const sortShipmentByArrivedAt = (shipments: Shipment[]) => {
        if (sortArrivedAt === null) return shipments;
        // Create a new copy of shipments array to sort
        const newShipments = shipments.slice();
        if (sortArrivedAt === "asc") {
            return newShipments.sort((a, b) => {
                // If a.arrived_at is null, it will be sorted to the end of the array
                // If b.arrived_at is null, it will be sorted to the beginning of the array
                if (a.arrived_at === null) return -1;
                if (b.arrived_at === null) return 1;
                return new Date(a.arrived_at).getTime() - new Date(b.arrived_at).getTime();
            });
        }
        return newShipments.sort((a, b) => {
            // If a.arrived_at is null, it will be sorted to the beginning of the array
            // If b.arrived_at is null, it will be sorted to the end of the array
            if (a.arrived_at === null) return 1;
            if (b.arrived_at === null) return -1;
            return new Date(b.arrived_at).getTime() - new Date(a.arrived_at).getTime();
        });
    };
    // Sort shipment by paid at
    const sortShipmentByPaidAt = (shipments: Shipment[]) => {
        if (sortPaidAt === null) return shipments;
        // Create a new copy of shipments array to sort
        const newShipments = shipments.slice();
        if (sortPaidAt === "asc") {
            return newShipments.sort((a, b) => {
                // If a.paid_at is null, it will be sorted to the end of the array
                // If b.paid_at is null, it will be sorted to the beginning of the array
                if (a.paid_at === null) return -1;
                if (b.paid_at === null) return 1;
                return new Date(a.paid_at).getTime() - new Date(b.paid_at).getTime();
            });
        }
        return newShipments.sort((a, b) => {
            // If a.paid_at is null, it will be sorted to the beginning of the array
            // If b.paid_at is null, it will be sorted to the end of the array
            if (a.paid_at === null) return 1;
            if (b.paid_at === null) return -1;
            return new Date(b.paid_at).getTime() - new Date(a.paid_at).getTime();
        });
    };
    // Handle sort shipment by note
    const sortShipmentByNote = (shipments: Shipment[]) => {
        if (sortNote === null) return shipments;
        // Create a new copy of shipments array to sort
        const newShipments = shipments.slice();
        if (sortNote === "asc") {
            return newShipments.sort((a, b) => a.note.localeCompare(b.note));
        }
        return newShipments.sort((a, b) => b.note.localeCompare(a.note));
    };
    // Handle sort shipment by shipment status
    const sortShipmentByShipmentStatus = (shipments: Shipment[]) => {
        if (sortShipmentStatus === null) return shipments;
        // Create a new copy of shipments array to sort
        const newShipments = shipments.slice();
        if (sortShipmentStatus === "asc") {
            // Handle sort by arrived at
            return newShipments.sort((a, b) => {
                if (a.arrived_at === null) return -1;
                if (b.arrived_at === null) return 1;
                return new Date(b.arrived_at).getTime() - new Date(a.arrived_at).getTime();
            });
        }
        return newShipments.sort((a, b) => {
            if (a.arrived_at === null) return 1;
            if (b.arrived_at === null) return -1;
            return new Date(a.arrived_at).getTime() - new Date(b.arrived_at).getTime();
        });
    };
    // Handle sort shipment by payment status
    const sortShipmentByPaymentStatus = (shipments: Shipment[]) => {
        if (sortPaymentStatus === null) return shipments;
        // Create a new copy of shipments array to sort
        const newShipments = shipments.slice();
        if (sortPaymentStatus === "asc") {
            // Handle sort by paid at
            return newShipments.sort((a, b) => {
                if (a.paid_at === null) return -1;
                if (b.paid_at === null) return 1;
                return new Date(b.paid_at).getTime() - new Date(a.paid_at).getTime();
            });
        }
        return newShipments.sort((a, b) => {
            if (a.paid_at === null) return 1;
            if (b.paid_at === null) return -1;
            return new Date(a.paid_at).getTime() - new Date(b.paid_at).getTime();
        });
    };

    // Listen to sort change and sort shipment list
    useEffect(() => {
        const newSortedShipments = sortShipmentByIndex(shipments);
        const newSortedShipmentsByIdShipment = sortShipmentByIdShipment(newSortedShipments);
        const newSortedShipmentsByPrice = sortShipmentByPrice(newSortedShipmentsByIdShipment);
        const newSortedShipmentsByCount = sortShipmentByCount(newSortedShipmentsByPrice);
        const newSortedShipmentsByArrivedAt = sortShipmentByArrivedAt(newSortedShipmentsByCount);
        const newSortedShipmentsByPaidAt = sortShipmentByPaidAt(newSortedShipmentsByArrivedAt);
        const newSortedShipmentsByNote = sortShipmentByNote(newSortedShipmentsByPaidAt);
        const newSortedShipmentsByShipmentStatus =
            sortShipmentByShipmentStatus(newSortedShipmentsByNote);
        const newSortedShipmentsByPaymentStatus = sortShipmentByPaymentStatus(
            newSortedShipmentsByShipmentStatus,
        );
        setSortedShipments(newSortedShipmentsByPaymentStatus);
    }, [
        shipments,
        sortIndex,
        sortIdShipment,
        sortPrice,
        sortCount,
        sortArrivedAt,
        sortPaidAt,
        sortNote,
        sortShipmentStatus,
        sortPaymentStatus,
    ]);
    // Handle open shipment detail modal
    const handleOpenShipmentDetail = (id_shipment: string) => {
        // Find shipment by id
        const newShipment = shipments.find((item) => item.id_delivery === id_shipment);
        if (newShipment !== undefined) {
            setSelectedShipment(newShipment);
            setOpenShipmentDetail(true);
        }
    };
    return (
        <>
            {sortedShipments?.length === 0 || sortedShipments === undefined ? (
                <div className=" w-full h-full text-center text-lg mt-[88px]">
                    <p>Không có lô hàng nào được tìm thấy. Vui lòng thử lại với các bộ lọc khác.</p>
                </div>
            ) : (
                <div className="w-full h-full text-center text-lg">
                    {/** Modal for shipment detail */}
                    {openShipmentDetail && selectedShipment !== null && (
                        <ShipmentDetail
                            id_shipment={selectedShipment.id_delivery}
                            total_price={selectedShipment.total_price}
                            note={selectedShipment.note}
                            arrived_at={selectedShipment.arrived_at}
                            num_order={selectedShipment.count}
                            paid_at={selectedShipment.paid_at}
                            setSelectedShipment={setSelectedShipment}
                            setOpenShipmentDetail={setOpenShipmentDetail}
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
                                <th scope="col" className="px-4 py-3">
                                    <div
                                        role="button"
                                        className="flex items-center justify-between cursor-pointer"
                                        onClick={handleSortIdShipment}
                                    >
                                        <span className="select-none">Mã lô</span>
                                        {sortIdShipment === null ? (
                                            <Image
                                                src="/icon/sort.svg"
                                                alt="sort-default"
                                                width={12}
                                                height={21}
                                            />
                                        ) : sortIdShipment === "asc" ? (
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
                                <th scope="col" className="px-4 py-3">
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
                                <th scope="col" className="px-4 py-3">
                                    <div
                                        role="button"
                                        className="flex items-center justify-between cursor-pointer"
                                        onClick={handleSortCount}
                                    >
                                        <span className="select-none">Số lượng</span>
                                        {sortCount === null ? (
                                            <Image
                                                src="/icon/sort.svg"
                                                alt="sort-default"
                                                width={12}
                                                height={21}
                                            />
                                        ) : sortCount === "asc" ? (
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
                                <th scope="col" className="px-4 py-3">
                                    <div
                                        role="button"
                                        className="flex items-center justify-between cursor-pointer"
                                        onClick={handleSortShipmentStatus}
                                    >
                                        <span className="select-none">Trạng thái giao hàng</span>
                                        {sortShipmentStatus === null ? (
                                            <Image
                                                src="/icon/sort.svg"
                                                alt="sort-default"
                                                width={12}
                                                height={21}
                                            />
                                        ) : sortShipmentStatus === "asc" ? (
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
                                <th scope="col" className="px-4 py-3">
                                    <div
                                        role="button"
                                        className="flex items-center justify-between cursor-pointer"
                                        onClick={handleSortArrivedAt}
                                    >
                                        <span className="select-none">Ngày giao hàng</span>
                                        {sortArrivedAt === null ? (
                                            <Image
                                                src="/icon/sort.svg"
                                                alt="sort-default"
                                                width={12}
                                                height={21}
                                            />
                                        ) : sortArrivedAt === "asc" ? (
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
                                <th scope="col" className="px-4 py-3">
                                    <div
                                        role="button"
                                        className="flex items-center justify-between cursor-pointer"
                                        onClick={handleSortPaymentStatus}
                                    >
                                        <span className="select-none">Trạng thái thanh toán</span>
                                        {sortPaymentStatus === null ? (
                                            <Image
                                                src="/icon/sort.svg"
                                                alt="sort-default"
                                                width={12}
                                                height={21}
                                            />
                                        ) : sortPaymentStatus === "asc" ? (
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
                                <th scope="col" className="px-4 py-3">
                                    <div
                                        role="button"
                                        className="flex items-center justify-between cursor-pointer"
                                        onClick={handleSortPaidAt}
                                    >
                                        <span className="select-none">Ngày thanh toán</span>
                                        {sortPaidAt === null ? (
                                            <Image
                                                src="/icon/sort.svg"
                                                alt="sort-default"
                                                width={12}
                                                height={21}
                                            />
                                        ) : sortPaidAt === "asc" ? (
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
                                <th scope="col" className="px-4 py-3">
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
                            {sortedShipments?.map((shipment, index) => (
                                <tr
                                    key={shipment.id_delivery}
                                    className="bg-white hover:bg-gray-200 cursor-pointer"
                                    style={{ borderBottom: "0.5px solid var(--bdbdbd, #BDBDBD)" }}
                                >
                                    {/** STT */}
                                    <td
                                        className="py-4"
                                        onClick={() => {
                                            handleOpenShipmentDetail(shipment.id_delivery);
                                        }}
                                    >
                                        {shipment.index + 1}
                                    </td>
                                    {/** Ma lo háng chỉ hiện 10 ký tự đầu */}
                                    <td
                                        className="px-6 py-4"
                                        onClick={() => {
                                            handleOpenShipmentDetail(shipment.id_delivery);
                                        }}
                                    >
                                        {shipment.id_delivery.slice(0, 10)}
                                    </td>
                                    {/** Gia lo hang */}
                                    <td className="px-6 py-4">
                                        <InputPriceShipment
                                            id_delivery={shipment.id_delivery}
                                            price={shipment.total_price}
                                            note={shipment.note}
                                        />
                                    </td>
                                    {/** So luong don hang trong lo hang */}
                                    <td
                                        className="px-6 py-4"
                                        onClick={() => {
                                            handleOpenShipmentDetail(shipment.id_delivery);
                                        }}
                                    >
                                        {shipment.count}
                                    </td>
                                    <td className="px-6 py-4">
                                        <ShipmentStatus shipment={shipment} />
                                    </td>
                                    <td
                                        className="px-6 py-4"
                                        onClick={() => {
                                            handleOpenShipmentDetail(shipment.id_delivery);
                                        }}
                                    >
                                        {shipment.arrived_at === null
                                            ? "-"
                                            : formatDateTime(shipment.arrived_at)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <PaymentStatus shipment={shipment} />
                                    </td>
                                    <td
                                        className="px-6 py-4"
                                        onClick={() => {
                                            handleOpenShipmentDetail(shipment.id_delivery);
                                        }}
                                    >
                                        {shipment.paid_at === null
                                            ? "-"
                                            : formatDateTime(shipment.paid_at)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <NoteShipment
                                            id_delivery={shipment.id_delivery}
                                            note={shipment.note}
                                            price={shipment.total_price}
                                        />
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
