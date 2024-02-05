/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import order from "./order.module.css";
import useGetOrderDetail from "@/hooks/useGetOrderDetail";
import { OrderCode } from "./OrderCode";
import { OrderPrice } from "./OrderPrice";
import { OrderStatus } from "./OrderStatus";
import { OrderNote } from "./OrderNote";
import { OrderQR } from "./OrderQR";

import OrderInfo from "./OrderInfo";

import { RootState } from "@/redux/store/store";
import Loading from "@/components/global/Loading/Loading";
import { Order, OrderResponse } from "@/hooks/useGetOrderList";
import { updateOrder } from "@/redux/slice/orderSlice";
import DesignImage from "./DesignImage";
import DownloadImage from "./DownloadImage";
import { NoteArea } from "./NoteArea";
import OrderCreatedAt from "./OrderCreatedAt";
import OrderUpdatedAt from "./OrderUpdatedAt";

export interface OrderDetailModalProps {
    id_order: string;
    price: number;
    status: string;
    note: string;
    created_at: string;
    updated_at: string;
    setOpenOrderDetail: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedOrder: React.Dispatch<React.SetStateAction<Order | null>>;
}

export function OrderDetailModal({
    id_order,
    price,
    status,
    note,
    created_at,
    updated_at,
    setOpenOrderDetail,
    setSelectedOrder,
}: OrderDetailModalProps) {
    // Get order detail from API by id_order
    // State for show OrderDetail modal
    const dispatch = useDispatch();
    const orders = useSelector<RootState, Order[]>((state) => state.order.orders);
    // const [showModal, setShowModal] = useState<boolean>(false);
    // State for selected tab
    const [selectedTab, setSelectedTab] = useState<number>(0);

    const { isLoadingOrderDetail, orderDetail, getOrderDetail } = useGetOrderDetail();
    useEffect(() => {
        if (id_order !== null && id_order !== undefined) getOrderDetail(id_order);
    }, []);
    const handleDownloadDesign = async (id_design: string) => {
        // console.log('Download design');
        // Get download design from API
        // await getDownloadDesign(id_design);
    };
    const handleCloseModal = (id_order: string) => {
        // Perform update state to all order in order list
        const newOrderIndex = orders.findIndex((order) => order.id_order === id_order);
        if (newOrderIndex !== -1) {
            const newOrder = {
                ...orders[newOrderIndex],
                status,
                note,
                price,
            };
            dispatch(updateOrder(newOrder));
        }

        // Remove QR Image
        // Find all div with id = 'printable' and remove it and its children
        const currentWindow = window;
        const printableDiv = currentWindow.document.getElementById("printable");
        if (printableDiv) {
            printableDiv.remove();
        }
        // Find all img with id = 'qrImage' and remove it
        const qrImageImg = currentWindow.document.getElementById("qrImage");
        if (qrImageImg) {
            qrImageImg.remove();
        }
        // Close modal
        setSelectedOrder(null);
        setOpenOrderDetail(false);
    };

    return (
        <div
            className="relative"
            role="dialog"
            style={{
                zIndex: 50,
            }}
        >
            <div className="fixed inset-0 w-full">
                <div
                    className="flex justify-center items-center"
                    style={{
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <div className="relative transform overflow-visible transition-all">
                        {/** add div dialog modal */}
                        {isLoadingOrderDetail === true && orderDetail ? (
                            <div className="flex flex-col items-center justify-center w-screen h-screen">
                                <Loading />
                            </div>
                        ) : (
                            <div className={`${order.orderDialog} bg-white overflow-visible`}>
                                <div className="flex flex-row w-full h-full">
                                    {/** Add OrderNote content to show direct note */}
                                    <div
                                        className={`${order.orderNoteContent} flex flex-col items-center justify-start`}
                                    >
                                        <p
                                            style={{
                                                fontSize: "22px",
                                                fontWeight: "700",
                                                textAlign: "center",
                                                marginBottom: "20px",
                                            }}
                                        >
                                            Ghi chú
                                        </p>
                                        {/** Add note content */}
                                        <NoteArea id_order={id_order} note={note} />
                                    </div>
                                    {/** Add sidebar to display number of design template in order */}
                                    <div className={`${order.orderSideBar} flex flex-col w-full`}>
                                        {/** Order cell */}
                                        <div
                                            className={`${order.orderCell} flex flex-col items-center justify-start`}
                                        >
                                            {/** Order code  */}
                                            <OrderCode id_order={id_order} />
                                            {/** Order Price */}
                                            <OrderPrice id_order={id_order} price={price} />
                                            {/** Order Created At */}
                                            <OrderCreatedAt created_at={created_at} />
                                            {/** If order status is completed then render the OrderUpdatedAt */}
                                            {status === "completed" && (
                                                <OrderUpdatedAt updated_at={updated_at} />
                                            )}
                                            {/** Order Status */}
                                            <OrderStatus id_order={id_order} status={status} />
                                            {/** Order Note */}
                                            {/* <OrderNote id_order={id_order} note={note} /> */}
                                            {/** Order QR */}
                                            <OrderQR id_order={id_order} />
                                        </div>
                                        {/** Render tab of each design template in order code  */}
                                        <div
                                            className={`${order.scrollBar} flex flex-col items-center justify-center`}
                                            style={{
                                                paddingLeft: "12px",
                                                paddingRight: "12px",
                                                paddingTop: "16px",
                                                overflowY: "scroll", // add scroll bar y
                                                overflowX: "hidden", // Hide scroll bar x
                                                scrollBehavior: "smooth",
                                            }}
                                        >
                                            {/** Render each design template in order code */}
                                            {orderDetail?.prints.map((item, index) => {
                                                return (
                                                    <div
                                                        role="button"
                                                        key={index}
                                                        className={`${order.orderTab} flex flex-row items-center justify-center`}
                                                        style={{
                                                            border:
                                                                selectedTab === index
                                                                    ? "0.5px solid var(--bdbdbd, #BDBDBD)"
                                                                    : "none",
                                                            backgroundColor:
                                                                selectedTab === index
                                                                    ? "var(--3-a-3-a-3-c, #3A3A3C)"
                                                                    : "#ffffff",
                                                            borderRadius:
                                                                selectedTab === index
                                                                    ? "8px"
                                                                    : "none",
                                                            color:
                                                                selectedTab === index
                                                                    ? "var(--white, #FFF)"
                                                                    : "var(--3-a-3-a-3-c, #3A3A3C)",
                                                            marginBottom: "16px",
                                                            cursor: "pointer",
                                                            paddingTop: "8px",
                                                            paddingBottom: "8px",
                                                        }}
                                                        onClick={() => {
                                                            setSelectedTab(index);
                                                        }}
                                                    >
                                                        {`Mẫu ${index + 1}`}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    {/** Render each design template in this div */}
                                    <div
                                        className={`${order.orderContent} relative flex flex-col w-full h-full`}
                                    >
                                        {/** Center title */}
                                        {/** Absolute close button on top right */}
                                        <button
                                            type="button"
                                            className={`${order.orderCloseButton}`}
                                            onClick={() => handleCloseModal(id_order)}
                                            style={{
                                                position: "absolute",
                                                top: "12px",
                                                right: "12px",
                                            }}
                                        >
                                            <Image
                                                src="/icon/close_modal.svg"
                                                width={36}
                                                height={36}
                                                alt="close-icon"
                                            />
                                        </button>
                                        <div
                                            className="flex flex-row items-center justify-center"
                                            style={{
                                                borderBottom: "0.5px solid var(--bdbdbd, #BDBDBD)",
                                                paddingBottom: "24px",
                                            }}
                                        >
                                            <p
                                                style={{
                                                    fontSize: "28px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                Chi tiết đơn hàng
                                            </p>
                                        </div>
                                        <div
                                            className="flex flex-col justify-start"
                                            style={{
                                                height: "750px",
                                                width: "981px",
                                                paddingLeft: "52px",
                                                paddingRight: "52px",
                                                position: "relative",
                                            }}
                                        >
                                            <div
                                                className="flex flex-row items-center justify-center w-full"
                                                style={{
                                                    position: "sticky",
                                                    paddingTop: "16px",
                                                }}
                                            />
                                            {/** Design Item Component */}
                                            <div
                                                className={`${order.scrollBar} flex flex-row items-center justify-center h-full w-full  pb-[80px]`}
                                                style={{
                                                    paddingTop: "16px",
                                                    overflowY: "scroll", // add scroll bar y
                                                    overflowX: "hidden", // Hide scroll bar x
                                                    scrollBehavior: "smooth",
                                                    paddingLeft: "1px",
                                                    paddingRight: "1px",
                                                    marginBottom: "60px",
                                                }}
                                            >
                                                {/** Design Item Component */}
                                                <div className="flex flex-col items-start justify-start h-full w-full">
                                                    <DesignImage
                                                        id_design={
                                                            orderDetail?.prints[selectedTab]
                                                                .id_design as string
                                                        }
                                                    />
                                                </div>

                                                {/** OrderDetail Features num, get download link, download design */}
                                                <div
                                                    className="flex flex-row items-center justify-start"
                                                    style={{
                                                        position: "absolute",
                                                        bottom: "20px",
                                                        zIndex: 400,
                                                    }}
                                                >
                                                    {/** OrderInfo Component only render when prints is not null */}
                                                    {orderDetail?.prints[selectedTab] && (
                                                        <OrderInfo
                                                            num={
                                                                orderDetail?.prints[selectedTab]
                                                                    .quantity as number
                                                            }
                                                            id_design={
                                                                orderDetail?.prints[selectedTab]
                                                                    .id_design as string
                                                            }
                                                            tshirt_size={
                                                                orderDetail?.prints[selectedTab]
                                                                    .size as string
                                                            }
                                                        />
                                                    )}
                                                    {/** Download design button */}
                                                    {/* <div
                                                                role="button"
                                                                className={`${order.orderDownload} flex flex-row items-center justify-between`}
                                                                onClick={() =>
                                                                    handleDownloadDesign(
                                                                        orderDetail?.prints[
                                                                            selectedTab
                                                                        ].id_design as string,
                                                                    )
                                                                }
                                                            >
                                                                <p
                                                                    style={{
                                                                        color: "var(--white, #FFF)",
                                                                        textAlign: "center",
                                                                        fontSize: "16px",
                                                                        fontWeight: "500",
                                                                    }}
                                                                >
                                                                    Tải xuống
                                                                </p>
                                                                <Image
                                                                    src="/icon/download_order.svg"
                                                                    width={22}
                                                                    height={22}
                                                                    alt="download-icon"
                                                                />
                                                            </div> */}
                                                    <DownloadImage
                                                        id_design={
                                                            orderDetail?.prints[selectedTab]
                                                                .id_design as string
                                                        }
                                                    />
                                                    {/** Get download link button */}
                                                    <div
                                                        role="button"
                                                        className={`${order.orderDownloadLink} flex flex-row items-center justify-between`}
                                                        onClick={() => {}}
                                                    >
                                                        <p
                                                            style={{
                                                                color: "var(--white, #FFF)",
                                                                textAlign: "center",
                                                                fontSize: "16px",
                                                                fontWeight: "500",
                                                            }}
                                                        >
                                                            Lấy liên kết
                                                        </p>
                                                        <Image
                                                            src="/icon/link_order.svg"
                                                            width={23}
                                                            height={23}
                                                            alt="link-order-icon"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
