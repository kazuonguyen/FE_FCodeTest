import Image from "next/image";
import shipment from "./shipment.module.css";
import { Order } from "@/hooks/useGetOrderList";

export interface ErrorModalProps {
    list_order: Order[];
    errorCreateShipment: string;
    setResult: React.Dispatch<React.SetStateAction<Order[] | null>>;
}

export default function ErrorModal({
    list_order,
    errorCreateShipment,
    setResult,
}: ErrorModalProps) {
    return (
        <div
            className="fixed flex flex-row inset-0 overflow-x-auto"
            role="dialog"
            style={{
                zIndex: 60,
            }}
        >
            <div className="relative inset-0 w-screen overflow-y-hidden">
                <div
                    className="flex min-h-full justify-center items-center"
                    style={{
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <div className="relative transform overflow-visible transition-all">
                        {/** add div dialog modal */}
                        <div
                            className={`${shipment.errorDialog} relative bg-white overflow-visible`}
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    // Clear error when close error modal
                                    setResult([]);
                                }}
                                style={{
                                    position: "absolute",
                                    top: "24px",
                                    right: "24px",
                                }}
                            >
                                <Image
                                    src="/icon/close_modal.svg"
                                    width={48}
                                    height={48}
                                    alt="close-note-modal"
                                />
                            </button>
                            {/** add div header close button title and save button */}
                            <div className="sticky flex flex-col justify-center items-center">
                                <h1
                                    className="text-center"
                                    style={{
                                        fontSize: "28px",
                                        fontWeight: "500",
                                    }}
                                >
                                    Lỗi đóng lô hàng
                                </h1>
                                {/** Show error on row */}
                                <div
                                    className={`${shipment.errorRow} flex flex-row items-center justify-center`}
                                    style={{}}
                                >
                                    <p
                                        style={{
                                            color: "var(--ff-6-a-6-a, #FF6A6A)",
                                            textAlign: "center",
                                            fontSize: "13px",
                                            fontWeight: "600",
                                        }}
                                    >
                                        {errorCreateShipment}
                                    </p>
                                </div>
                                <div
                                    className={` ${shipment.tableView} relative flex flex-col justify-start items-center w-full `}
                                >
                                    <table className="w-full text-center text-lg mt-[24px]">
                                        <thead
                                            className="bg-white"
                                            style={{
                                                borderBottom: "0.5px solid var(--bdbdbd, #BDBDBD)",
                                                borderTop: "0.5px solid var(--bdbdbd, #BDBDBD)",
                                            }}
                                        >
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Mã đơn
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Trạng thái
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list_order.map((order) => (
                                                <tr
                                                    key={order.id_order}
                                                    className="bg-white"
                                                    style={{
                                                        borderBottom:
                                                            "0.5px solid var(--bdbdbd, #BDBDBD)",
                                                    }}
                                                >
                                                    {/** Checkbox shipment */}
                                                    <td className="px-6 py-4">
                                                        <p>{order.id_order}</p>
                                                    </td>
                                                    {/** Status pill */}
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col justify-center items-center w-full h-full">
                                                            <div
                                                                className={` ${shipment.errorPill} flex flex-row justify-center items-center`}
                                                            >
                                                                <p
                                                                    style={{
                                                                        fontSize: "15px",
                                                                        fontWeight: "500",
                                                                        color: "#FFFFFF",
                                                                        textAlign: "center",
                                                                    }}
                                                                >
                                                                    Báo lỗi
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
