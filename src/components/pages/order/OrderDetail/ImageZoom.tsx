/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
import ReactCrop, { PercentCrop, type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useEffect, useRef, useState } from "react";
import { Resizable, ResizableBox } from "react-resizable";
import order from "./order.module.css";
import { RectangleCrop } from "./DownloadImage";

export interface ImageZoomProps {
    mockImage: string;
    zoomLevel: number;
    imageRef: React.RefObject<HTMLImageElement>;
    setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
    crop: Crop;
    setCrop: React.Dispatch<React.SetStateAction<Crop>>;
    rectangles: RectangleCrop[];
    setRectangles: React.Dispatch<React.SetStateAction<RectangleCrop[]>>;
    resizeMode: boolean;
    setResizeMode: React.Dispatch<React.SetStateAction<boolean>>;
    selectedRectangle: number;
    setSelectedRectangle: React.Dispatch<React.SetStateAction<number>>;
}

export default function ImageZoom({
    mockImage,
    zoomLevel,
    setZoomLevel,
    imageRef,
    crop,
    setCrop,
    rectangles,
    setRectangles,
    resizeMode,
    setResizeMode,
    selectedRectangle,
    setSelectedRectangle,
}: ImageZoomProps) {
    const divRef = useRef<HTMLDivElement>(null);

    // Listen to ArrowKey to move image around using scrollbars
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowUp") {
                imageRef.current?.scrollBy(0, -20);
            }
            if (e.key === "ArrowDown") {
                imageRef.current?.scrollBy(0, 20);
            }
            if (e.key === "ArrowLeft") {
                imageRef.current?.scrollBy(-20, 0);
            }
            if (e.key === "ArrowRight") {
                imageRef.current?.scrollBy(20, 0);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [imageRef]);

    const handleCrop = (crop: Crop, percentageCrop: PercentCrop) => {
        // Update crop state with zoomLevel scale
        // TODO: Maybe use in near future
        // const x = crop.x + ((1 - zoomLevel) * crop.x) / zoomLevel;
        // const y = crop.y + ((1 - zoomLevel) * crop.y) / zoomLevel;
        const x = crop.x / zoomLevel;
        const y = crop.y / zoomLevel;
        const newCrop = { ...crop, x, y };
        setCrop(newCrop);
    };
    // Handle when complete crop image (click on image)
    const handleCompleteCrop = (crop: Crop, percentageCrop: PercentCrop) => {
        // Unselect rectangle
        setSelectedRectangle(-1);
        // Add new rectangle to rectangles state
        const newRectangle = { ...crop };
        // Check if rectangle is not exist in rectangles state
        if (!rectangles.find((rect) => rect.x === newRectangle.x && rect.y === newRectangle.y)) {
            // If rectangle width or height is 0, return
            if (newRectangle.width === 0 || newRectangle.height === 0) return;
            // If retangle is less than 10px, return
            if (newRectangle.width < 10 || newRectangle.height < 10) return;
            setRectangles([...rectangles, newRectangle]);
        }
    };
    // Handle when click on rectangle to move it
    const handleRectangleMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const rect = rectangles[index];
        // Set selected rectangle index
        setSelectedRectangle(index);
        if (!rect) {
            setSelectedRectangle(-1);
            return;
        }
        const rectStartX = rect.x;
        const rectStartY = rect.y;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const handleMouseMove = (e: MouseEvent) => {
            // Calculate mouse move distance
            const deltaX = e.clientX - mouseX;
            const deltaY = e.clientY - mouseY;
            // Calculate new rectangle position  (x, y)
            const newRectX = rectStartX + deltaX / zoomLevel;
            const newRectY = rectStartY + deltaY / zoomLevel;
            // Update rectangle state
            const updatedRectangles = [...rectangles];
            updatedRectangles[index] = { ...rect, x: newRectX, y: newRectY };

            setRectangles(updatedRectangles);
        };

        const handleMouseUp = () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };
    // Handle when click on rectangle to resize it
    const handleResizeStart = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const rect = rectangles[index];
        if (!rect) {
            setSelectedRectangle(-1);
            return;
        }
        setSelectedRectangle(index);
        const rectStartWidth = rect.width;
        const rectStartHeight = rect.height;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const handleMouseMove = (e: MouseEvent) => {
            const deltaX = e.clientX - mouseX;
            const deltaY = e.clientY - mouseY;

            const newRectWidth = rectStartWidth + deltaX / zoomLevel;
            const newRectHeight = rectStartHeight + deltaY / zoomLevel;

            const updatedRectangles = [...rectangles];
            updatedRectangles[index] = {
                ...rect,
                width: newRectWidth,
                height: newRectHeight,
            };
            setRectangles(updatedRectangles);
        };
        const handleMouseUp = () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };
    return (
        <div
            style={{
                borderRight: "0.5px solid var(--bdbdbd, #BDBDBD)",
            }}
            className={`${order.downloadImage} relative flex flex-col items-center justify-center`}
        >
            <div
                ref={divRef}
                className="relative w-full h-full"
                style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: "top left",
                }}
            >
                <ReactCrop crop={crop} onChange={handleCrop} onComplete={handleCompleteCrop}>
                    <img
                        ref={imageRef}
                        src={mockImage}
                        alt="Design image"
                        style={{
                            // marginTop: `${100 % +zoomLevel}%`,
                            // transform: `scale(${zoomLevel})`,
                            objectFit: "contain",
                            overflow: "scroll",
                        }}
                    />
                </ReactCrop>
                {/* Draw orange rectangle border */}
                {rectangles.map((rect, index) => (
                    <div
                        key={index}
                        className="absolute"
                        style={{
                            opacity: selectedRectangle === index ? 0.5 : 1,
                            background:
                                selectedRectangle === index
                                    ? "var(--Accent-Red, #FF453A)"
                                    : "transparent",
                            width: `${rect.width}px`,
                            height: `${rect.height}px`,
                            left: `${rect.x}px`,
                            top: `${rect.y}px`,
                            border: "3px solid var(--Accent-Red, #FF453A)",
                            borderRadius: "5px",
                            cursor: "move",
                        }}
                        onMouseDown={(e) => {
                            if (!resizeMode) handleRectangleMove(index, e);
                            else handleResizeStart(index, e);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
