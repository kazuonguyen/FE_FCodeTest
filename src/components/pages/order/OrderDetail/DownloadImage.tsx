/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Crop } from "react-image-crop";
import order from "./order.module.css";
import { RootState } from "@/redux/store/store";
import Loading from "@/components/global/Loading/Loading";
import { OrderResponse } from "@/hooks/useGetOrderList";
import useGetMockDesign from "@/hooks/useGetMockDesign";
import ImageZoom from "./ImageZoom";
import PostOrderCrop from "@/api/order/PostOrderCrop";

export interface RectangleCrop {
    width: number;
    height: number;
    x: number;
    y: number;
}
export interface DownloadImageProps {
    id_design: string;
}

export default function DownloadImage({ id_design }: DownloadImageProps) {
    const [showDownloadModal, setShowDownloadModal] = useState<boolean>(false);
    const { isLoadingMockDesign, mockupDesign, getMockDesign } = useGetMockDesign();
    const dispatch = useDispatch();
    const orders = useSelector<RootState, OrderResponse>((state) => state.order.orders);
    const [zoomLevel, setZoomLevel] = useState<number>(1);
    const [crop, setCrop] = useState<Crop>({ unit: "px", width: 100, height: 100, x: 50, y: 50 });
    const imageRef = useRef<HTMLImageElement>(null);
    // State for hold location to draw orange border box
    const [rectangles, setRectangles] = useState<RectangleCrop[]>([]);
    // State for change between resize and move mode
    const [resizeMode, setResizeMode] = useState<boolean>(false);
    // State for selected rectangle index
    const [selectedRectangle, setSelectedRectangle] = useState<number>(-1);
    // Reset all rectangle when open modal (make sure not to keep rectangle from previous design crop)
    useEffect(() => {
        setRectangles([]);
    }, [showDownloadModal]);

    useEffect(() => {
        getMockDesign(id_design);
    }, [id_design]);
    const handleUndoCrop = () => {
        // Remove last rectangle in rectangles state
        const newRectangles = rectangles.slice(0, rectangles.length - 1);
        setRectangles(newRectangles);
    };

    const handleRemoveAllCrop = () => {
        // Remove all rectangle in rectangles state
        setRectangles([]);
    };
    // Listen to keydown event to perform undo crop action when press Ctrl + Z
    useEffect(() => {
        const handleUndoKey = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "z") {
                handleUndoCrop();
            } else if (e.ctrlKey && e.key === "x") {
                handleRemoveAllCrop();
            }
        };
        window.addEventListener("keydown", handleUndoKey);
        return () => {
            window.removeEventListener("keydown", handleUndoKey);
        };
    }, [rectangles]);

    // Listen to keydown event to perform zoom in and zoom out action
    // when press Ctrl + 1 or Ctrl + 2 respectively
    // Also zoom in, zoom out when press Ctrl + ScrollUp or Ctrl + ScrollDown
    useEffect(() => {
        // Zoom in when press Ctrl + 1 and zoom out when press Ctrl + 2
        const handleZoomImage = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "1" && zoomLevel < 2) {
                setZoomLevel((prev) => prev + 0.1);
            } else if (e.ctrlKey && e.key === "2" && zoomLevel > 1) {
                setZoomLevel((prev) => prev - 0.1);
            }
        };
        // Zoom in when press Ctrl + ScrollUp and zoom out when press Ctrl + ScrollDown
        const handleZoomImageScroll = (e: WheelEvent) => {
            if (e.ctrlKey) {
                e.preventDefault(); // Prevent the default scroll behavior
                if (e.deltaY < 0 && zoomLevel < 2) {
                    setZoomLevel((prev) => prev + 0.1);
                } else if (e.deltaY > 0 && zoomLevel > 1) {
                    setZoomLevel((prev) => prev - 0.1);
                }
            }
        };
        window.addEventListener("keydown", handleZoomImage);
        window.addEventListener("wheel", handleZoomImageScroll);
        return () => {
            window.removeEventListener("keydown", handleZoomImage);
            window.removeEventListener("wheel", handleZoomImageScroll);
        };
    }, [zoomLevel]);

    const handleCloseModal = () => {
        setShowDownloadModal(false);
    };

    const handleDownloadImage = async () => {
        // Get height and width of image to calculate ratio (perform normalizing)
        // Use clientWidth and clientHeight to get actual size of image in DOM (not naturalWidth and naturalHeight)
        const imageWidth = imageRef.current?.clientWidth as number;
        const imageHeight = imageRef.current?.clientHeight as number;
        // Perform calculating on rectangles state to normalize it
        const newRectangles = rectangles.map((rectangle) => {
            const newRectangle = {
                x: rectangle.x / imageWidth,
                y: rectangle.y / imageHeight,
                width: rectangle.width / imageWidth,
                height: rectangle.height / imageHeight,
            };
            return newRectangle;
        });
        await PostOrderCrop(id_design, newRectangles, dispatch);
    };

    const handleChangeMode = () => {
        setResizeMode((prev) => !prev);
    };
    // Listen to keydown event Ctrl+C to perform change mode action (resize or move)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "c") {
                handleChangeMode();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [resizeMode]);

    // Handle delete selected rectangle
    const handleRemoveSelectedRectangle = () => {
        if (selectedRectangle !== -1) {
            const newRectangles = rectangles.filter((_, index) => index !== selectedRectangle);
            setRectangles(newRectangles);
            setSelectedRectangle(-1);
        } else if (rectangles.length === 1) {
            setRectangles([]);
        }
    };

    // Listen to keydown event to perform delete selected rectangle action when press Ctrl + D
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "d") {
                handleRemoveSelectedRectangle();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [rectangles, selectedRectangle]);
    return (
        <>
            <div
                role="button"
                className={`${order.orderDownload} flex flex-row items-center justify-between`}
                onClick={() => {
                    setShowDownloadModal(true);
                }}
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
                <Image src="/icon/download_order.svg" width={22} height={22} alt="download-icon" />
            </div>
            {showDownloadModal === true && (
                <div
                    className="relative"
                    role="dialog"
                    style={{
                        zIndex: 100,
                    }}
                >
                    <div className="fixed inset-0">
                        <div
                            className="flex justify-center items-center"
                            style={{
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <div className="relative transform overflow-visible transition-all">
                                {/** add div dialog modal */}
                                {isLoadingMockDesign === true ? (
                                    <div className="flex flex-col items-center justify-center w-screen h-screen">
                                        <Loading />
                                    </div>
                                ) : (
                                    <div
                                        className={`${order.downloadDialog} bg-white overflow-visible`}
                                    >
                                        <div className="flex flex-row w-full h-full">
                                            <div
                                                className={`${order.orderContent} relative flex flex-col w-full h-full`}
                                            >
                                                {/** Center title */}
                                                {/** Absolute close button on top right */}
                                                <button
                                                    type="button"
                                                    className={`${order.orderCloseButton}`}
                                                    onClick={handleCloseModal}
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
                                                        borderBottom:
                                                            "0.5px solid var(--bdbdbd, #BDBDBD)",
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
                                                {/**  */}
                                                <div
                                                    className={`flex flex-row items-center justify-start  ${order.downloadContent}`}
                                                >
                                                    {/** Image Crop Zone */}
                                                    <ImageZoom
                                                        imageRef={imageRef}
                                                        mockImage={mockupDesign?.big as string}
                                                        zoomLevel={zoomLevel}
                                                        setZoomLevel={setZoomLevel}
                                                        crop={crop}
                                                        setCrop={setCrop}
                                                        rectangles={rectangles}
                                                        setRectangles={setRectangles}
                                                        resizeMode={resizeMode}
                                                        setResizeMode={setResizeMode}
                                                        selectedRectangle={selectedRectangle}
                                                        setSelectedRectangle={setSelectedRectangle}
                                                    />
                                                    <div
                                                        className={`flex flex-col items-start justify-start ${order.downloadSidebar}`}
                                                    >
                                                        {/** Image */}

                                                        <div className="flex flex-row items-center justify-between w-full">
                                                            <div className="inline-flex">
                                                                <p
                                                                    style={{
                                                                        fontSize: "16px",
                                                                    }}
                                                                >
                                                                    Tỉ lệ zoom:
                                                                </p>
                                                            </div>
                                                            <div
                                                                className={` ${order.zoomLevel} focus:outline-none items-center text-black focus:ring-0 select-none`}
                                                            >
                                                                {`${Math.round(zoomLevel * 100)}x`}
                                                            </div>
                                                        </div>
                                                        <input
                                                            type="range"
                                                            min={1}
                                                            max={2}
                                                            step={0.1}
                                                            value={zoomLevel}
                                                            defaultValue={1}
                                                            onChange={(e) => {
                                                                setZoomLevel(
                                                                    Number(e.target.value),
                                                                );
                                                            }}
                                                            className="mt-[20px] transparent h-[4px] w-full cursor-pointer appearance-none border-transparent bg-neutral-200"
                                                            id="zoom-slide"
                                                        />
                                                        {/** Download Button */}
                                                        <div
                                                            role="button"
                                                            className={`${order.designDownload} flex flex-row items-center justify-between`}
                                                            onClick={handleDownloadImage}
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
                                                        </div>
                                                        {/** Undo Button */}
                                                        <div
                                                            role="button"
                                                            className={`${order.designUndo} flex flex-row items-center justify-between`}
                                                            onClick={handleUndoCrop}
                                                        >
                                                            <p
                                                                style={{
                                                                    color: "var(--white, #FFF)",
                                                                    textAlign: "center",
                                                                    fontSize: "16px",
                                                                    fontWeight: "500",
                                                                }}
                                                            >
                                                                Undo
                                                            </p>
                                                            <Image
                                                                src="/icon/undo.svg"
                                                                width={22}
                                                                height={22}
                                                                alt="=undo-icon"
                                                            />
                                                        </div>
                                                        {/** Remove Selected Rectangles */}
                                                        <div
                                                            role="button"
                                                            className={`${order.designUndo} flex flex-row items-center justify-between`}
                                                            onClick={handleRemoveSelectedRectangle}
                                                        >
                                                            <p
                                                                style={{
                                                                    color: "var(--white, #FFF)",
                                                                    textAlign: "center",
                                                                    fontSize: "16px",
                                                                    fontWeight: "500",
                                                                }}
                                                            >
                                                                Xoá
                                                            </p>
                                                            <Image
                                                                src="/icon/delete_select.svg"
                                                                width={22}
                                                                height={22}
                                                                alt="delete-select-icon"
                                                            />
                                                        </div>
                                                        {/** Remove All Button */}
                                                        <div
                                                            role="button"
                                                            className={`${order.designUndo} flex flex-row items-center justify-between`}
                                                            onClick={handleRemoveAllCrop}
                                                        >
                                                            <p
                                                                style={{
                                                                    color: "var(--white, #FFF)",
                                                                    textAlign: "center",
                                                                    fontSize: "16px",
                                                                    fontWeight: "500",
                                                                }}
                                                            >
                                                                Xoá hết
                                                            </p>
                                                            <Image
                                                                src="/icon/delete_all.svg"
                                                                width={22}
                                                                height={22}
                                                                alt="delete-all-icon"
                                                            />
                                                        </div>
                                                        {/** Resize/ Move Button */}
                                                        <div
                                                            role="button"
                                                            className={`${order.designResize} flex flex-row items-center justify-between`}
                                                            onClick={handleChangeMode}
                                                            style={{
                                                                backgroundColor:
                                                                    resizeMode === true
                                                                        ? "var(--Accent-Blue, #007AFF)"
                                                                        : "#30D158",
                                                            }}
                                                        >
                                                            <p
                                                                style={{
                                                                    color: "var(--white, #FFF)",
                                                                    textAlign: "center",
                                                                    fontSize: "16px",
                                                                    fontWeight: "500",
                                                                }}
                                                            >
                                                                {resizeMode === true
                                                                    ? "Resize"
                                                                    : "Move"}
                                                            </p>
                                                            <Image
                                                                src={
                                                                    resizeMode === true
                                                                        ? "/icon/resize.svg"
                                                                        : "/icon/move.svg"
                                                                }
                                                                width={22}
                                                                height={22}
                                                                alt={
                                                                    resizeMode === true
                                                                        ? "resize-icon"
                                                                        : "move-icon"
                                                                }
                                                            />
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
            )}
        </>
    );
}
