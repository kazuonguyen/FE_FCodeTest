/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import order from "./order.module.css";

export interface PickSideShirtProps {
    side: string;
    setSide: (side: string) => void;
}

export default function PickSideShirt({ side, setSide }: PickSideShirtProps) {
    // Handle button side shirt click
    const handleButtonSideShirtClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { id } = e.currentTarget;
        setSide(id);
    };
    return (
        /** Always on top and not scrollable */
        <div
            className="flex flex-row items-center justify-center w-fit"
            style={{
                zIndex: 400,
                backdropFilter: "blur(10px)",
            }}
        >
            <div
                className={`${order.sideShirtGroup} inline-flex items-center justify-center`}
                role="group"
            >
                <div
                    role="button"
                    id="front"
                    className={`${order.sideShirtButton} ${
                        side === "front" ? "bg-black text-white" : "bg-white text-black"
                    }`}
                    onClick={handleButtonSideShirtClick}
                >
                    Mặt trước
                </div>
                <div
                    role="button"
                    id="back"
                    className={`${order.sideShirtButton} ${
                        side === "back" ? "bg-black text-white" : "bg-white text-black"
                    }`}
                    onClick={handleButtonSideShirtClick}
                >
                    Mặt sau
                </div>
            </div>
        </div>
    );
}
